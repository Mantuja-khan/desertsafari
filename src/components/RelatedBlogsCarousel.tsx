import { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Calendar, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogPost } from "../data/blogs";
import { useBlogStats } from "../hooks/useBlogStats";
import { useLanguage } from "../lib/i18n";

function MiniRelatedCard({ post }: { post: BlogPost }) {
  const { getLocalizedBlog } = useLanguage();
  const localized = getLocalizedBlog(post);
  const { views } = useBlogStats(post.slug, post.likes, post.views);

  return (
    <div className="w-[280px] sm:w-[320px] shrink-0 bg-white rounded-2xl overflow-hidden border border-[#EDE7D9] shadow-xs hover:shadow-lg transition-all flex flex-col select-none group">
      <Link to="/blog/$slug" params={{ slug: localized.slug }} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
          <img
            src={localized.image}
            alt={localized.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-[#C68A36] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
              {localized.categoryBadge}
            </span>
          </div>
        </div>

        <div className="p-4 flex flex-col justify-between">
          <h4 className="font-serif text-base font-bold text-[#1F2421] group-hover:text-[#C68A36] transition-colors line-clamp-2 leading-snug mb-3">
            {localized.title}
          </h4>

          <div className="flex items-center justify-between text-[11px] text-[#8A857B] font-sans pt-2 border-t border-stone-100">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-[#C68A36]" />
              <span>{localized.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-3 h-3 text-[#C68A36]" />
              <span>{views}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function RelatedBlogsCarousel({ posts }: { posts: BlogPost[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Auto-scroll loop from right to left smoothly on small screens / mobile
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animFrame: number;
    let lastTime = performance.now();

    const step = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (isAutoScrolling && !isDragging && el) {
        el.scrollLeft += delta * 0.04;

        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
          el.scrollLeft = 0;
        }
      }
      animFrame = requestAnimationFrame(step);
    };

    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [isAutoScrolling, isDragging]);

  // Mouse Drag Event Handlers
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

  // Touch Event Handlers for Mobile
  const handleTouchStart = () => {
    setIsAutoScrolling(false);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsAutoScrolling(true), 2500);
  };

  const scrollBy = (offset: number) => {
    if (!containerRef.current) return;
    setIsAutoScrolling(false);
    containerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    setTimeout(() => setIsAutoScrolling(true), 3000);
  };

  return (
    <div className="relative group/carousel">
      {/* Navigation Arrows for desktop / tablet */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-[#8A857B] font-sans flex items-center gap-1">
          Swipe or drag to explore more related stories
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-300)}
            className="w-8 h-8 rounded-full bg-white border border-[#EDE7D9] text-[#2B1A08] hover:bg-[#C68A36] hover:text-white flex items-center justify-center transition-colors shadow-xs"
            aria-label="Previous blogs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(300)}
            className="w-8 h-8 rounded-full bg-white border border-[#EDE7D9] text-[#2B1A08] hover:bg-[#C68A36] hover:text-white flex items-center justify-center transition-colors shadow-xs"
            aria-label="Next blogs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Draggable & Auto-scrolling Track */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`flex items-stretch gap-5 overflow-x-auto pb-4 scrollbar-none cursor-grab active:cursor-grabbing ${
          isDragging ? "select-none" : ""
        }`}
        style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
      >
        {posts.concat(posts).map((post, idx) => (
          <MiniRelatedCard key={`${post.id}-${idx}`} post={post} />
        ))}
      </div>
    </div>
  );
}
