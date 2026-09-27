import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Calendar, Search, ChevronDown } from "lucide-react";

// Exact Logo component matching actual navbar from homepage
export function ActualLogo({ className = "" }: { className?: string }) {
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

export function BlogHeader({ activeNav = "Blogs" }: { activeNav?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Desert Safari", href: "/#packages" },
    { name: "City Tours", href: "/#attractions" },
    { name: "Packages", href: "/#packages" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Blogs", href: "/blog" },
    { name: "About Us", href: "/#aboutus" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="relative z-50 w-full bg-[#0D3B33] border-b border-white/20 text-white shadow-xl transition-all">
      <div className="max-w-[1340px] mx-auto px-6 h-24 flex items-center justify-between">
        {/* Actual Brand Logo */}
        <ActualLogo />

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 font-sans text-xs tracking-wider">
          {navItems.map((item) => {
            const isBlogActive =
              item.name === "Blogs" &&
              (activeNav.toLowerCase() === "blogs" || activeNav.toLowerCase() === "blog");
            const isActive = isBlogActive || item.name.toLowerCase() === activeNav.toLowerCase();

            return (
              <div key={item.name} className="relative group py-6 flex items-center">
                <Link
                  to={item.href}
                  className={`relative transition-colors flex items-center gap-1 ${
                    isActive ? "text-[#E4B564] font-semibold" : "text-white/80 hover:text-[#E4B564]"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E4B564]" />
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Right Header Action Controls */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/blog"
            className="p-2 text-white/80 hover:text-[#E4B564] transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </Link>
          <Link
            to="/#packages"
            className="bg-[#E4B564] hover:bg-[#E8C88B] text-[#0D3B33] font-sans font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-[#E4B564]"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu matching actual homepage drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-24 inset-x-0 bg-[#0D3B33] border-b border-[#E4B564]/30 z-50 p-6 flex flex-col gap-4 text-white animate-fade-in-up max-h-[80vh] overflow-y-auto shadow-2xl">
          {navItems.map((item) => {
            const isBlogActive =
              item.name === "Blogs" &&
              (activeNav.toLowerCase() === "blogs" || activeNav.toLowerCase() === "blog");
            const isActive = isBlogActive || item.name.toLowerCase() === activeNav.toLowerCase();

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-serif tracking-wide hover:text-[#E4B564] flex items-center justify-between py-1 border-b border-white/10 ${
                  isActive ? "text-[#E4B564] font-bold" : "text-white/90"
                }`}
              >
                <span>{item.name}</span>
                {(item.name === "Desert Safari" || item.name === "City Tours") && (
                  <ChevronDown className="w-4 h-4 text-[#E4B564]" />
                )}
              </Link>
            );
          })}
          <Link
            to="/#packages"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-[#E4B564] text-[#0D3B33] font-bold uppercase text-center py-3 rounded mt-2 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
