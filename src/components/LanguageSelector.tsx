import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage, LANGUAGES, LanguageCode } from "../lib/i18n";

// Pixel-perfect SVG Flags matching the dropdown UI
export function FlagIcon({
  code,
  className = "w-6 h-4",
}: {
  code: LanguageCode;
  className?: string;
}) {
  switch (code) {
    case "en":
      // UK Flag
      return (
        <svg
          viewBox="0 0 60 40"
          className={`${className} shadow-xs object-cover overflow-hidden shrink-0`}
        >
          <clipPath id="uk-clip">
            <rect width="60" height="40" />
          </clipPath>
          <g clipPath="url(#uk-clip)">
            <rect width="60" height="40" fill="#012169" />
            <path d="M0 0L60 40M60 0L0 40" stroke="#FFF" strokeWidth="8" />
            <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="4" />
            <path d="M30 0V40M0 20H60" stroke="#FFF" strokeWidth="12" />
            <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="7" />
          </g>
        </svg>
      );
    case "de":
      // Germany Flag (Black, Red, Gold)
      return (
        <svg
          viewBox="0 0 60 40"
          className={`${className} shadow-xs object-cover overflow-hidden shrink-0`}
        >
          <rect width="60" height="13.33" y="0" fill="#000000" />
          <rect width="60" height="13.33" y="13.33" fill="#DD0000" />
          <rect width="60" height="13.34" y="26.66" fill="#FFCE00" />
        </svg>
      );
    case "it":
      // Italy Flag (Green, White, Red)
      return (
        <svg
          viewBox="0 0 60 40"
          className={`${className} shadow-xs object-cover overflow-hidden shrink-0`}
        >
          <rect width="20" height="40" x="0" fill="#009246" />
          <rect width="20" height="40" x="20" fill="#FFFFFF" />
          <rect width="20" height="40" x="40" fill="#CE2B37" />
        </svg>
      );
    case "pt":
      // Portugal Flag (Green, Red with Sphere Emblem)
      return (
        <svg
          viewBox="0 0 60 40"
          className={`${className} shadow-xs object-cover overflow-hidden shrink-0`}
        >
          <rect width="24" height="40" x="0" fill="#046A38" />
          <rect width="36" height="40" x="24" fill="#DA291C" />
          <circle cx="24" cy="20" r="7" fill="#FFC400" stroke="#000000" strokeWidth="0.5" />
          <rect
            x="21"
            y="16"
            width="6"
            height="8"
            rx="0.5"
            fill="#FFFFFF"
            stroke="#046A38"
            strokeWidth="0.5"
          />
          <path d="M22 17h4M22 19h4M22 21h4" stroke="#002B7F" strokeWidth="0.8" />
        </svg>
      );
    case "ru":
      // Russia Flag (White, Blue, Red)
      return (
        <svg
          viewBox="0 0 60 40"
          className={`${className} shadow-xs object-cover overflow-hidden shrink-0`}
        >
          <rect width="60" height="13.33" y="0" fill="#FFFFFF" />
          <rect width="60" height="13.33" y="13.33" fill="#0039A6" />
          <rect width="60" height="13.34" y="26.66" fill="#D52B1E" />
        </svg>
      );
    case "es":
      // Spain Flag (Red, Yellow, Red)
      return (
        <svg
          viewBox="0 0 60 40"
          className={`${className} shadow-xs object-cover overflow-hidden shrink-0`}
        >
          <rect width="60" height="10" y="0" fill="#AA151B" />
          <rect width="60" height="20" y="10" fill="#F1BF00" />
          <rect width="60" height="10" y="30" fill="#AA151B" />
          <rect
            x="12"
            y="14"
            width="7"
            height="11"
            fill="#AA151B"
            stroke="#800000"
            strokeWidth="0.5"
          />
          <circle cx="15.5" cy="13" r="1.8" fill="#F1BF00" />
        </svg>
      );
    case "ar":
      // Saudi Arabia Flag
      return (
        <svg
          viewBox="0 0 60 40"
          className={`${className} shadow-xs object-cover overflow-hidden shrink-0`}
        >
          <rect width="60" height="40" fill="#006C35" />
          <circle cx="30" cy="18" r="7" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
          <path
            d="M18 28H42M22 26L30 30L38 26"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "fr":
      // France Flag
      return (
        <svg
          viewBox="0 0 60 40"
          className={`${className} shadow-xs object-cover overflow-hidden shrink-0`}
        >
          <rect width="20" height="40" x="0" fill="#002654" />
          <rect width="20" height="40" x="20" fill="#FFFFFF" />
          <rect width="20" height="40" x="40" fill="#ED2939" />
        </svg>
      );
    case "nl":
      // Netherlands Flag
      return (
        <svg
          viewBox="0 0 60 40"
          className={`${className} shadow-xs object-cover overflow-hidden shrink-0`}
        >
          <rect width="60" height="13.33" y="0" fill="#AE1C28" />
          <rect width="60" height="13.33" y="13.33" fill="#FFFFFF" />
          <rect width="60" height="13.34" y="26.66" fill="#21468B" />
        </svg>
      );
    case "zh":
      // China Flag
      return (
        <svg
          viewBox="0 0 60 40"
          className={`${className} shadow-xs object-cover overflow-hidden shrink-0`}
        >
          <rect width="60" height="40" fill="#EE1C25" />
          <polygon points="10,6 12,12 18,12 13,15 15,21 10,17 5,21 7,15 2,12 8,12" fill="#FFDE00" />
          <circle cx="20" cy="6" r="1.5" fill="#FFDE00" />
          <circle cx="24" cy="10" r="1.5" fill="#FFDE00" />
          <circle cx="24" cy="16" r="1.5" fill="#FFDE00" />
          <circle cx="20" cy="20" r="1.5" fill="#FFDE00" />
        </svg>
      );
    default:
      return <span className="text-base">🌐</span>;
  }
}

export function LanguageSelector({
  dropUp = false,
  className = "",
}: {
  dropUp?: boolean;
  className?: string;
}) {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button - Square border style as requested */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-none bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white transition-all cursor-pointer shadow-sm group"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FlagIcon code={currentLanguage.code} className="w-5 h-3.5 shadow-xs" />
        <span className="text-xs font-bold font-sans tracking-wide uppercase">
          {currentLanguage.code.toUpperCase()}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-white/80 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Language Dropdown List - Square borders (rounded-none) matching uploaded UI */}
      {isOpen && (
        <div
          className={`absolute right-0 ${
            dropUp ? "bottom-full mb-1.5" : "top-full mt-1.5"
          } w-52 bg-white rounded-none shadow-2xl border border-gray-200 py-1 z-[200] overflow-hidden animate-fade-in-up font-sans text-gray-800`}
        >
          <div className="flex flex-col max-h-80 overflow-y-auto">
            {LANGUAGES.map((lang) => {
              const isSelected = currentLanguage.code === lang.code;

              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3.5 px-4 py-2.5 text-left text-sm transition-colors cursor-pointer rounded-none border-b border-gray-100/70 last:border-b-0 ${
                    isSelected
                      ? "bg-[#0D3B33] text-white font-medium"
                      : "hover:bg-amber-50/70 text-gray-800 hover:text-[#C68A36]"
                  }`}
                >
                  <FlagIcon code={lang.code} className="w-6 h-4 shrink-0 shadow-xs" />
                  <span
                    className={`text-sm tracking-wide ${isSelected ? "text-white font-semibold" : "text-gray-900"}`}
                  >
                    {lang.nativeName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
