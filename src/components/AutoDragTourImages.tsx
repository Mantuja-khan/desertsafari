import { useRef, useState, useEffect } from "react";

interface AutoDragTourImagesProps {
  images: string[];
  title?: string;
  className?: string;
}

export function AutoDragTourImages({
  images,
  title = "Tour Highlights",
  className = "",
}: AutoDragTourImagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Ensure we have at least 3 images
  const displayImages = images.length >= 3 ? images.slice(0, 3) : [...images, "/about_suv.jpg", "/polaroid_camp.jpg"].slice(0, 3);

  // Smooth continuous auto-scroll animation
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

  return (
    <div
      className={`relative w-full overflow-hidden select-none group/autodrag ${className}`}
      onMouseEnter={() => setIsAutoScrolling(false)}
      onMouseLeave={() => {
        if (!isDragging) setIsAutoScrolling(true);
      }}
    >
      {/* Draggable Track with 3 Images + Clones for Infinite Loop */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex items-center gap-4 overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing py-2 px-1"
        style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
      >
        {/* Double array so it loops seamlessly */}
        {[...displayImages, ...displayImages].map((imgSrc, idx) => (
          <div
            key={idx}
            className="w-[200px] sm:w-[240px] md:w-[260px] aspect-[4/3] shrink-0 rounded-2xl overflow-hidden shadow-xl border-2 border-[#E4B564]/40 relative group transition-all duration-300 hover:scale-105 hover:border-[#E4B564]"
          >
            <img
              src={imgSrc}
              alt={`${title} - image ${(idx % 3) + 1}`}
              className="w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Subtle Gradient & Badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute bottom-2.5 left-3 text-[10px] uppercase font-bold tracking-wider text-[#F3C472] bg-black/60 px-2.5 py-0.5 rounded-md backdrop-blur-xs">
              0{(idx % 3) + 1} / 03
            </div>
          </div>
        ))}
      </div>

      {/* Auto-scroll Hint on Mobile / Small Screens */}
      <div className="flex items-center justify-between text-[11px] text-[#F3C472]/80 mt-1 px-1">
        <span>⟷ Swipe or drag images</span>
        <span className="text-[10px] text-white/50">Auto-scrolling</span>
      </div>
    </div>
  );
}
