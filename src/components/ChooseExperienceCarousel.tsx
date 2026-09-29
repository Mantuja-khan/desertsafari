import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Sun, Crown, Zap, Clock, Check, Sparkles, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../lib/i18n";

export interface ExperiencePackageItem {
  id: string;
  title: string;
  tag: string;
  badge: string;
  badgeType: "green" | "gold" | "teal" | string;
  image: string;
  duration: string;
  price: string;
  buttonColor: string;
  buttonIcon: string;
  inclusions: { text: string; icon: string }[];
  shows?: string;
  actionText?: string;
  actionUrl?: string;
}

interface ChooseExperienceCarouselProps {
  packages: ExperiencePackageItem[];
  maxInclusions?: number; // Defaults to 7 for Home page
  showAllInclusions?: boolean;
  className?: string;
}

export function ChooseExperienceCarousel({
  packages,
  maxInclusions = 7,
  showAllInclusions = false,
  className = "",
}: ChooseExperienceCarouselProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  // Auto-scroll loop on small screens when not dragging
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animFrame: number;
    let lastTime = performance.now();

    const step = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (isAutoScrolling && !isDragging && el) {
        el.scrollLeft += delta * 0.03;

        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
          el.scrollLeft = 0;
        }
      }
      animFrame = requestAnimationFrame(step);
    };

    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [isAutoScrolling, isDragging]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setIsAutoScrolling(false);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers
  const handleTouchStart = () => {
    setIsAutoScrolling(false);
  };

  const scrollStep = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    setIsAutoScrolling(false);
    const scrollAmount = 340;
    containerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Top Carousel Navigation Controls */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollStep("left")}
            className="w-9 h-9 rounded-full border border-[#D4A353]/40 flex items-center justify-center text-[#0D3B33] hover:bg-[#D4A353] hover:text-white transition-all shadow-xs cursor-pointer"
            aria-label="Previous Package"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollStep("right")}
            className="w-9 h-9 rounded-full border border-[#D4A353]/40 flex items-center justify-center text-[#0D3B33] hover:bg-[#D4A353] hover:text-white transition-all shadow-xs cursor-pointer"
            aria-label="Next Package"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <a
          href="/packages"
          className="text-xs font-bold uppercase tracking-wider text-[#0D3B33] hover:text-[#D4A353] flex items-center gap-1 transition-colors"
        >
          {t("viewAllPackages", "View All Packages →")}
        </a>
      </div>

      {/* 
        COMPACT SLEEK PACKAGE CARDS:
        - Buttons & Entertainment box removed to reduce height
        - Single row with drag & touch swipe
      */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        className="flex lg:grid lg:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto lg:overflow-x-visible scrollbar-none cursor-grab active:cursor-grabbing pb-2 px-1"
        style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
      >
        {packages.map((pkg) => {
          const displayedInclusions = showAllInclusions
            ? pkg.inclusions
            : pkg.inclusions.slice(0, maxInclusions);
          const remainingCount = pkg.inclusions.length - displayedInclusions.length;
          const tourLink = `/desert-safari/${
            pkg.id === "vip"
              ? "evening-desert-safari"
              : pkg.id === "quad"
                ? "quad-bike-desert-safari"
                : "private-desert-safari"
          }`;

          return (
            <a
              key={pkg.id}
              href={tourLink}
              className="w-[280px] xs:w-[310px] sm:w-[330px] lg:w-auto shrink-0 bg-white rounded-2xl overflow-hidden shadow-md border border-[#E5E0D6] flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group select-none block no-underline"
            >
              {/* Package Compact Image Header */}
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                {/* Top Left Tag */}
                <span className="absolute top-3 left-3 text-[8px] sm:text-[9px] tracking-[0.2em] font-bold text-white uppercase bg-black/50 px-2.5 py-1 rounded-sm backdrop-blur-xs">
                  {pkg.tag}
                </span>

                {/* Top Right Badge */}
                <span
                  className={`absolute top-3 right-3 text-[8px] sm:text-[9px] tracking-wider font-bold uppercase px-2.5 py-1 rounded-sm flex items-center gap-1 shadow-md ${
                    pkg.badgeType === "green"
                      ? "bg-[#145248] text-white"
                      : pkg.badgeType === "gold"
                        ? "bg-[#E4B564] text-[#0D3B33]"
                        : "bg-[#0D3B33] text-white"
                  }`}
                >
                  {pkg.badgeType === "green" && <Sun className="w-3 h-3 text-[#E4B564]" />}
                  {pkg.badgeType === "gold" && <Crown className="w-3 h-3 text-[#0D3B33]" />}
                  {pkg.badgeType === "teal" && <Zap className="w-3 h-3 text-[#E4B564]" />}
                  {pkg.badge}
                </span>

                {/* Title inside image bottom */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug group-hover:text-[#E4B564] transition-colors drop-shadow-sm">
                    {pkg.title}
                  </h3>
                </div>
              </div>

              {/* Card Content Body - Compact Height */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Duration & Price Row */}
                  <div className="flex items-center justify-between py-2 border-b border-[#E5E0D6] mb-3 text-xs font-semibold text-[#0D3B33]">
                    <span className="flex items-center gap-1.5 text-[#5A554C]">
                      <Clock className="w-3.5 h-3.5 text-[#D4A353]" />
                      {pkg.duration}
                    </span>
                    <span className="font-serif text-base font-bold text-[#D4A353]">
                      {pkg.price}
                    </span>
                  </div>

                  {/* 7 Inclusion Bullets */}
                  <ul className="space-y-1.5 mb-3">
                    {displayedInclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-[11px] sm:text-xs text-[#524E46] leading-tight">
                        <Check className="w-3.5 h-3.5 text-[#D4A353] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item.text}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Remaining benefits hint */}
                  {!showAllInclusions && remainingCount > 0 && (
                    <div className="inline-flex items-center gap-1 text-[10px] font-bold text-[#C68A36] pt-1">
                      <Sparkles className="w-3 h-3 text-[#C68A36]" />
                      <span>+{remainingCount} {t("moreBenefitsInPackagesPage", "more benefits • Explore package →")}</span>
                    </div>
                  )}
                </div>

                {/* Subtle Bottom Link Indicator */}
                <div className="pt-3 border-t border-[#F2EDE2] mt-3 flex items-center justify-between text-xs font-bold text-[#0D3B33] group-hover:text-[#D4A353] transition-colors">
                  <span className="uppercase tracking-wider text-[10px]">Explore Package</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D4A353] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Mobile Swipe Hint */}
      <div className="flex lg:hidden items-center justify-between text-[11px] text-[#8C877D] mt-2 px-1">
        <span>⟷ {t("swipeDragHint", "Swipe or drag to see all safari options")}</span>
      </div>
    </div>
  );
}
