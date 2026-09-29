import { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Calendar, ArrowRight } from "lucide-react";
import { useLanguage } from "../lib/i18n";
import { useBookingModal } from "../lib/BookingModalContext";

export interface AttractionTourItem {
  title: string;
  tag: string;
  price: string;
  image: string;
  inclusions: string[];
  footerTag: string;
  slug?: string;
}

interface AttractionsCarouselProps {
  tours: AttractionTourItem[];
  className?: string;
}

export function AttractionsCarousel({ tours, className = "" }: AttractionsCarouselProps) {
  const { t } = useLanguage();
  const { openBookingModal } = useBookingModal();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Smooth continuous auto-scroll from right to left on small screens
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animFrame: number;
    let lastTime = performance.now();

    const step = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (isAutoScrolling && !isDragging && el) {
        el.scrollLeft += delta * 0.035;

        // Loop smoothly when reaching end
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
    setTimeout(() => setIsAutoScrolling(true), 2500);
  };

  // Touch drag handlers
  const handleTouchStart = () => {
    setIsAutoScrolling(false);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsAutoScrolling(true), 2500);
  };

  // Double array for seamless loop on small screen auto-drag
  const displayTours = tours;

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsAutoScrolling(false)}
      onMouseLeave={() => {
        if (!isDragging) setIsAutoScrolling(true);
      }}
    >
      {/* 
        SMALL SCREENS: Single Horizontal Line with Auto-Drag from right to left & touch swiping
        LARGE SCREENS (lg:): 3-Column Grid 
      */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex lg:grid lg:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto lg:overflow-x-visible scrollbar-none cursor-grab active:cursor-grabbing pb-4 px-1"
        style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
      >
        {displayTours.map((tour, idx) => {
          const tourSlug =
            tour.slug ||
            (idx % 3 === 0
              ? "sharing-dubai-city-tour"
              : idx % 3 === 1
                ? "sharing-abu-dhabi-city-tour"
                : "thrilling-hatta-tour");

          return (
            <div
              key={idx}
              className="w-[290px] xs:w-[320px] sm:w-[350px] lg:w-auto shrink-0 tour-card group flex flex-col justify-between p-7 sm:p-8 text-white relative overflow-hidden rounded-2xl min-h-[500px]"
            >
              {/* Background Image */}
              <img
                src={tour.image}
                alt={tour.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 z-0 pointer-events-none"
                loading="lazy"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/30 z-1" />

              {/* Top Category Tag */}
              <div className="relative z-10">
                <span className="text-[9px] tracking-[0.2em] font-bold uppercase text-[#E4B564] bg-black/50 px-3 py-1 rounded-xs backdrop-blur-xs">
                  {tour.tag}
                </span>
              </div>

              {/* Bottom Card Content Overlay */}
              <div className="relative z-10 flex flex-col justify-end mt-auto">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                  {tour.title}
                </h3>

                {/* Price Tag */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xs uppercase text-white/70">
                    {t("startingFrom", "starting from")}
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#E4B564]">
                    {tour.price}
                  </span>
                  <span className="text-xs text-white/80">AED / pax</span>
                </div>

                {/* Bullet Inclusions List */}
                <ul className="space-y-1.5 mb-6 border-t border-white/20 pt-3">
                  {tour.inclusions.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-white/90">
                      <Check className="w-3.5 h-3.5 text-[#E4B564] shrink-0" />
                      <span className="line-clamp-1">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Buttons: BOOK NOW (Popup Form) + VIEW TOUR */}
                <div className="flex flex-col gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() =>
                      openBookingModal({
                        tourTitle: tour.title,
                        tourPrice: tour.price,
                      })
                    }
                    className="btn-gold w-full text-center justify-center py-3 text-xs font-bold uppercase tracking-wider block cursor-pointer"
                  >
                    {t("bookNow", "BOOK NOW")} &nbsp; →
                  </button>

                  <Link
                    to="/city-tours/$slug"
                    params={{ slug: tourSlug }}
                    className="w-full text-center py-1.5 text-[11px] font-semibold text-white/80 hover:text-[#E4B564] transition-colors"
                  >
                    {t("viewTourDetails", "View Tour Details →")}
                  </Link>
                </div>

                {/* Footer Tag */}
                <p className="text-[8px] tracking-[0.2em] uppercase text-center text-white/60 font-semibold border-t border-white/10 pt-2">
                  {tour.footerTag}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Swipe/Drag Hint on Small Screens */}
      <div className="flex lg:hidden items-center justify-between text-[11px] text-[#E4B564]/80 mt-2 px-1">
        <span>⟷ {t("swipeDragHint", "Swipe or drag to explore attractions")}</span>
        <span className="text-[10px] text-white/50">{t("autoScrolling", "Auto-scrolling")}</span>
      </div>
    </div>
  );
}
