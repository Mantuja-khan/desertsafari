import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Calendar, ChevronDown } from "lucide-react";
import { CITY_TOURS } from "../data/cityTours";
import { DESERT_SAFARIS } from "../data/desertSafaris";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "../lib/i18n";

// Unified Logo Component matching header aesthetics
export function AppLogo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-3 text-white no-underline group ${className}`}>
      <div className="flex flex-col items-center">
        {/* Dune Emblem */}
        <svg
          className="w-8 h-6 text-[#E4B564]"
          viewBox="0 0 40 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 2L28 14H12L20 2Z" fill="#E4B564" opacity="0.9" />
          <path d="M20 6L34 22H6L20 6Z" fill="#D4A353" opacity="0.6" />
          <path d="M2 22H38" stroke="#E4B564" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="text-[10px] tracking-[0.25em] text-[#E4B564] uppercase font-serif font-semibold mt-0.5">
          Desert Journey
        </span>
        <span className="text-[8px] tracking-[0.4em] text-white/70 uppercase">DXB</span>
      </div>
    </Link>
  );
}

export function SiteHeader({ activeNav = "Home" }: { activeNav?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSafariOpen, setMobileSafariOpen] = useState(false);
  const [mobileCityToursOpen, setMobileCityToursOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { name: t("home", "Home"), href: "/", isRoute: true, key: "home" },
    { name: t("aboutUs", "About Us"), href: "/about", isRoute: true, key: "about" },
    {
      name: t("desertSafari", "Desert Safari"),
      href: "/desert-safari",
      isRoute: true,
      hasSafariDropdown: true,
      key: "desert-safari",
    },
    {
      name: t("cityTours", "City Tours"),
      href: "/city-tours",
      isRoute: true,
      hasCityDropdown: true,
      key: "city-tours",
    },
    { name: t("packages", "Packages"), href: "/#packages", isRoute: false, key: "packages" },
    { name: t("blogs", "Blogs"), href: "/blog", isRoute: true, key: "blogs" },
    { name: t("gallery", "Gallery"), href: "/#gallery", isRoute: false, key: "gallery" },
    { name: t("contact", "Contact"), href: "/contact", isRoute: true, key: "contact" },
  ];

  return (
    <header className="absolute top-0 inset-x-0 z-50 w-full bg-transparent border-b border-white/20 text-white transition-all">
      <div className="max-w-[1340px] mx-auto px-6 h-24 flex items-center justify-between">
        {/* Brand Logo */}
        <AppLogo />

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 font-sans text-xs tracking-wider">
          {navItems.map((item) => {
            const isItemActive =
              activeNav.toLowerCase() === item.key.toLowerCase() ||
              activeNav.toLowerCase() === item.name.toLowerCase() ||
              (item.key === "blogs" && activeNav.toLowerCase() === "blog") ||
              (item.key === "about" && activeNav.toLowerCase() === "about us");

            return (
              <div key={item.key} className="relative group py-6 flex items-center">
                {item.isRoute ? (
                  <Link
                    to={item.href}
                    className={`relative transition-colors flex items-center gap-1.5 ${
                      isItemActive
                        ? "text-[#E4B564] font-semibold"
                        : "text-white/85 hover:text-[#E4B564]"
                    }`}
                  >
                    <span>{item.name}</span>
                    {(item.hasSafariDropdown || item.hasCityDropdown) && (
                      <ChevronDown className="w-3.5 h-3.5 text-[#E4B564] transition-transform duration-200 group-hover:rotate-180" />
                    )}
                    {isItemActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E4B564]" />
                    )}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`relative transition-colors flex items-center gap-1.5 ${
                      isItemActive
                        ? "text-[#E4B564] font-semibold"
                        : "text-white/85 hover:text-[#E4B564]"
                    }`}
                  >
                    <span>{item.name}</span>
                    {isItemActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E4B564]" />
                    )}
                  </a>
                )}

                {/* Desert Safari Simple White Background Dropdown */}
                {item.hasSafariDropdown && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] min-w-[310px]">
                    <div className="bg-white rounded-none shadow-2xl py-3 px-1 overflow-hidden border border-gray-200">
                      <div className="px-4 py-2 border-b border-gray-100 mb-1 flex items-center justify-between">
                        <Link
                          to="/desert-safari"
                          className="text-[11px] font-bold text-[#C68A36] uppercase tracking-wider hover:underline"
                        >
                          {t("allDesertSafari", "All Desert Safari Packages →")}
                        </Link>
                      </div>
                      {DESERT_SAFARIS.map((safari) => (
                        <Link
                          key={safari.id}
                          to="/desert-safari/$slug"
                          params={{ slug: safari.slug }}
                          className="block px-4 py-2.5 text-xs text-gray-800 hover:text-[#C68A36] hover:bg-amber-50/60 rounded-none transition-colors font-sans"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{safari.title}</span>
                            <span className="text-[11px] font-bold text-[#C68A36]">
                              {safari.price}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* City Tours Simple White Background Dropdown */}
                {item.hasCityDropdown && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] min-w-[310px]">
                    <div className="bg-white rounded-none shadow-2xl py-3 px-1 overflow-hidden border border-gray-200">
                      <div className="px-4 py-2 border-b border-gray-100 mb-1 flex items-center justify-between">
                        <Link
                          to="/city-tours"
                          className="text-[11px] font-bold text-[#C68A36] uppercase tracking-wider hover:underline"
                        >
                          {t("allCityTours", "All City Tours Packages →")}
                        </Link>
                      </div>
                      {CITY_TOURS.map((tour) => (
                        <Link
                          key={tour.id}
                          to="/city-tours/$slug"
                          params={{ slug: tour.slug }}
                          className="block px-4 py-2.5 text-xs text-gray-800 hover:text-[#C68A36] hover:bg-amber-50/60 rounded-none transition-colors font-sans"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{tour.title}</span>
                            <span className="text-[11px] font-bold text-[#C68A36]">
                              {tour.price}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Header Action Controls: Language Selector + Book Now */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Selector matching uploaded UI */}
          <LanguageSelector />

          <a
            href="/#packages"
            className="bg-[#E4B564] hover:bg-[#E8C88B] text-[#0D3B33] font-sans font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-none flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            {t("bookNow", "Book Now")}
          </a>
        </div>

        {/* Mobile Header Controls */}
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSelector />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#E4B564]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-24 inset-x-0 bg-[#0D3B33] border-b border-[#E4B564]/30 z-50 p-6 flex flex-col gap-3 text-white animate-fade-in-up max-h-[80vh] overflow-y-auto shadow-2xl">
          {navItems.map((item) => {
            const isItemActive = activeNav.toLowerCase() === item.name.toLowerCase();

            return (
              <div key={item.name} className="flex flex-col border-b border-white/10 pb-2">
                <div className="flex items-center justify-between">
                  {item.isRoute ? (
                    <Link
                      to={item.href}
                      onClick={() => {
                        if (!item.hasSafariDropdown && !item.hasCityDropdown) {
                          setMobileMenuOpen(false);
                        }
                      }}
                      className={`text-base font-serif tracking-wide hover:text-[#E4B564] py-1 ${
                        isItemActive ? "text-[#E4B564] font-bold" : "text-white/90"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-serif tracking-wide hover:text-[#E4B564] py-1 text-white/90"
                    >
                      {item.name}
                    </a>
                  )}

                  {item.hasSafariDropdown && (
                    <button
                      type="button"
                      onClick={() => setMobileSafariOpen(!mobileSafariOpen)}
                      className="p-2 text-[#E4B564]"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          mobileSafariOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}

                  {item.hasCityDropdown && (
                    <button
                      type="button"
                      onClick={() => setMobileCityToursOpen(!mobileCityToursOpen)}
                      className="p-2 text-[#E4B564]"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          mobileCityToursOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Mobile Submenu for Desert Safari */}
                {item.hasSafariDropdown && mobileSafariOpen && (
                  <div className="pl-4 pt-2 flex flex-col gap-2 border-l border-[#E4B564]/30 my-2">
                    <Link
                      to="/desert-safari"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs text-[#E4B564] font-bold mb-1"
                    >
                      • View All Desert Safari Packages →
                    </Link>
                    {DESERT_SAFARIS.map((safari) => (
                      <Link
                        key={safari.id}
                        to="/desert-safari/$slug"
                        params={{ slug: safari.slug }}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xs text-white/80 hover:text-[#E4B564] flex items-center justify-between py-1"
                      >
                        <span>• {safari.title}</span>
                        <span className="text-[10px] text-[#E4B564]">{safari.price}</span>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Mobile Submenu for City Tours */}
                {item.hasCityDropdown && mobileCityToursOpen && (
                  <div className="pl-4 pt-2 flex flex-col gap-2 border-l border-[#E4B564]/30 my-2">
                    <Link
                      to="/city-tours"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs text-[#E4B564] font-bold mb-1"
                    >
                      • View All City Tours →
                    </Link>
                    {CITY_TOURS.map((tour) => (
                      <Link
                        key={tour.id}
                        to="/city-tours/$slug"
                        params={{ slug: tour.slug }}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xs text-white/80 hover:text-[#E4B564] flex items-center justify-between py-1"
                      >
                        <span>• {tour.title}</span>
                        <span className="text-[10px] text-[#E4B564]">{tour.price}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <a
            href="/#packages"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-[#E4B564] text-[#0D3B33] font-bold uppercase text-center py-3 rounded-none mt-2 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Book Now
          </a>
        </div>
      )}
    </header>
  );
}
