import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "../lib/i18n";

export interface TestimonialItem {
  name: string;
  time: string;
  avatarBg: string;
  initial: string;
  photo?: string;
  text: string;
  rating?: number;
}
interface GuestReviewsCarouselProps {
  testimonials: TestimonialItem[];
  className?: string;
}

export function GuestReviewsCarousel({
  testimonials,
  className = "",
}: GuestReviewsCarouselProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll to specific card index
  const scrollToCard = useCallback((index: number, smooth = true) => {
    const el = containerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>(".guest-review-card");
    if (!cards || cards.length === 0) return;

    const targetIdx = (index + testimonials.length) % testimonials.length;
    const targetCard = cards[targetIdx];
    if (targetCard) {
      const elRect = el.getBoundingClientRect();
      const cardRect = targetCard.getBoundingClientRect();
      const offset = cardRect.left - elRect.left + el.scrollLeft - (elRect.width - cardRect.width) / 2;

      el.scrollTo({
        left: Math.max(0, offset),
        behavior: smooth ? "smooth" : "auto",
      });
      setActiveIndex(targetIdx);
    }
  }, [testimonials.length]);

  // Handle automatic one-by-one dragging/advancing
  useEffect(() => {
    if (!isAutoPlaying || isDragging || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % testimonials.length;
        scrollToCard(next, true);
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isDragging, testimonials.length, scrollToCard]);

  // Track active item during scroll
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el || isDragging) return;
    const cards = el.querySelectorAll<HTMLElement>(".guest-review-card");
    if (!cards || cards.length === 0) return;

    const elRect = el.getBoundingClientRect();
    const centerX = elRect.left + elRect.width / 2;

    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      if (idx >= testimonials.length) return;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(centerX - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setActiveIndex(closestIdx);
  };

  // Mouse Drag Event Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setIsAutoPlaying(false);
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
    if (!isDragging) return;
    setIsDragging(false);
    handleScroll();
    setTimeout(() => setIsAutoPlaying(true), 3500);
  };

  // Touch Drag Event Handlers
  const handleTouchStart = () => {
    setIsAutoPlaying(false);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      handleScroll();
      setIsAutoPlaying(true);
    }, 3500);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    const prev = activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;
    scrollToCard(prev);
    setTimeout(() => setIsAutoPlaying(true), 4000);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    const next = (activeIndex + 1) % testimonials.length;
    scrollToCard(next);
    setTimeout(() => setIsAutoPlaying(true), 4000);
  };

  return (
    <div
      className={`relative w-full select-none ${className}`}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => {
        if (!isDragging) setIsAutoPlaying(true);
      }}
    >
      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-[-8px] sm:left-[-16px] lg:left-[-24px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#E4B564] hover:text-[#0D3B33] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-2xl cursor-pointer"
        aria-label="Previous Review"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-[-8px] sm:right-[-16px] lg:right-[-24px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#E4B564] hover:text-[#0D3B33] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-2xl cursor-pointer"
        aria-label="Next Review"
      >
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* 
        SINGLE HORIZONTAL LINE ON ALL SCREENS:
        - Small Screens (< md): Shows only 1 review card at a time with auto-drag / snap
        - Tablet / Desktop (md+): Shows continuous single horizontal line of cards with drag & arrow navigation
      */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex flex-nowrap items-stretch gap-4 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing py-4 px-1"
        style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
      >
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="guest-review-card w-[calc(100vw-3.5rem)] min-w-[calc(100vw-3.5rem)] max-w-[360px] xs:w-[320px] xs:min-w-[320px] sm:w-[340px] sm:min-w-[340px] md:w-[350px] md:min-w-[350px] lg:w-[370px] lg:min-w-[370px] shrink-0 snap-center bg-[#FFFDF9] text-[#1D2523] rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between border border-white/40 group hover:-translate-y-1.5 transition-all duration-300"
          >
            {/* Reviewer Meta Row */}
            <div className="flex-1 flex flex-col justify-between relative">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${item.avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-md shrink-0`}
                    >
                      {item.initial}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm leading-tight text-[#0D3B33] line-clamp-1">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-[#6B7672]">{item.time}</span>
                    </div>
                  </div>

                  {/* Google Verified Icon */}
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>

                {/* Stars & Verified Check */}
                <div className="flex items-center gap-1 text-[#FFD700] text-sm mb-3">
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                  <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center ml-1 font-bold">
                    ✓
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs text-[#4A5550] leading-relaxed italic line-clamp-4">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Bottom Quote Mark */}
              <div className="self-end text-3xl font-serif text-[#D4A353]/40 mt-3 leading-none">
                ”
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Auto-drag status & swipe helper banner */}
      <div className="flex items-center justify-between text-[11px] text-[#E4B564]/90 mt-2 px-2">
        <span className="flex items-center gap-1.5">
          <span>⟷</span>
          <span>{t("swipeDragHint", "Swipe or drag to explore guest reviews")}</span>
        </span>
        <span className="text-[10px] text-white/60">
          {activeIndex + 1} / {testimonials.length}
        </span>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center items-center gap-2 mt-4 mb-4">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setIsAutoPlaying(false);
              scrollToCard(idx);
              setTimeout(() => setIsAutoPlaying(true), 4000);
            }}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === idx
                ? "w-7 bg-[#E4B564]"
                : "w-2.5 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to review ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
