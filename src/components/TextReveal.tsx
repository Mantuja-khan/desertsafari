import { useRef, useEffect, useState, type ReactNode } from "react";

export function TextReveal({
  text,
  children,
  className = "",
  as: Component = "h2",
  delay = 0,
  stagger = 0.06,
}: {
  text?: string;
  children?: ReactNode;
  className?: string;
  as?: React.ElementType;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const contentText = text || (typeof children === "string" ? children : undefined);

  if (contentText) {
    const words = contentText.split(" ");

    return (
      <Component ref={ref} className={className}>
        {words.map((word, index) => (
          <span
            key={index}
            className={`inline-block mr-[0.25em] last:mr-0 ${
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
