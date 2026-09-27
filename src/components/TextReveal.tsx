import { useRef, useEffect, useState, type ReactNode } from "react";

export function TextReveal({
  text,
  children,
  className = "",
  as: Component = "h2",
  delay = 0,
  stagger = 0.08,
}: {
  text?: string;
  children?: ReactNode;
  className?: string;
  as?: React.ElementType;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  if (text) {
    const words = text.split(" ");

    return (
      <Component ref={ref} className={className}>
        {words.map((word, index) => (
          <span
            key={index}
            className={`inline-block mr-[0.25em] last:mr-0 transition-all ${
              isVisible ? "reveal-word" : "opacity-0"
            }`}
            style={{
              animationDelay: isVisible ? `${delay + index * stagger}s` : "0s",
            }}
          >
            {word}
          </span>
        ))}
      </Component>
    );
  }

  return (
    <Component
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Component>
  );
}
