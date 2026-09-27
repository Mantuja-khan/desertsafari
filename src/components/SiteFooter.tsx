import { Link } from "@tanstack/react-router";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  Palmtree,
  Facebook,
  Instagram,
  Youtube,
  Globe,
} from "lucide-react";

export function SiteFooterLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* Circle D Logo Emblem */}
      <div className="w-14 h-14 rounded-full border border-[#E4B564]/50 bg-[#0D3B33] flex items-center justify-center relative overflow-hidden shadow-lg shrink-0">
        <Palmtree className="w-6 h-6 text-[#E4B564] absolute top-2 left-3" />
        <span className="font-serif text-3xl font-bold text-[#E4B564] pl-1">D</span>
      </div>
      <div>
        <h3 className="font-serif text-xl font-bold text-white tracking-wide uppercase leading-tight">
          DESERT <br />
          <span className="text-[#E4B564]">JOURNEY DXB</span>
        </h3>
        <p className="text-[8px] tracking-[0.25em] text-[#E4B564] uppercase font-semibold mt-0.5 border-t border-[#E4B564]/30 pt-0.5">
          MORE THAN A TRIP • A STORY TO TELL
        </p>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="relative text-white overflow-hidden footer-mockup-bg">
      {/* Background Image */}
      <img
        src="/footer_bg.png"
        alt="Dubai desert sunset camel caravan background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-40 mix-blend-luminosity"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#051E1A] via-[#072B25]/90 to-[#0A332C]/80 z-1" />

      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-6 pt-16 pb-8">
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#E4B564]/20">
          {/* Column 1: Brand & Social (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-start pr-4 border-r-0 lg:border-r border-[#E4B564]/20">
            <SiteFooterLogo />

            <p className="text-xs text-white/70 leading-relaxed mt-6 mb-6">
              Experience the magic of Dubai with unforgettable desert safaris, city tours and
              authentic Arabian hospitality.
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3">
              <a href="#top" className="social-icon-btn" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#top" className="social-icon-btn" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#top" className="social-icon-btn" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#top" className="social-icon-btn" aria-label="TripAdvisor">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#top" className="social-icon-btn font-bold text-xs" aria-label="Google">
                G
              </a>
            </div>
          </div>

          {/* Column 2: Useful Links (3 cols) */}
          <div className="lg:col-span-3 pl-0 lg:pl-6 border-r-0 lg:border-r border-[#E4B564]/20">
            <h4 className="font-serif text-xl font-bold text-white mb-6">Useful Links</h4>
            <ul className="space-y-3 text-xs text-white/80 font-sans">
              <li>
                <Link
                  to="/desert-safari"
                  className="hover:text-[#E4B564] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#E4B564] font-bold">›</span> Desert Safari Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/city-tours"
                  className="hover:text-[#E4B564] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#E4B564] font-bold">›</span> City Tour Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-[#E4B564] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#E4B564] font-bold">›</span> Desert Safari Blog & Guides
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#E4B564] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#E4B564] font-bold">›</span> About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#E4B564] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#E4B564] font-bold">›</span> Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="/#map"
                  className="hover:text-[#E4B564] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#E4B564] font-bold">›</span> Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/#map"
                  className="hover:text-[#E4B564] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#E4B564] font-bold">›</span> Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Get In Touch (3 cols) */}
          <div className="lg:col-span-3 pl-0 lg:pl-6 border-r-0 lg:border-r border-[#E4B564]/20">
            <h4 className="font-serif text-xl font-bold text-white mb-6">Get In Touch</h4>
            <ul className="space-y-4 text-xs text-white/80 font-sans">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full border border-[#E4B564]/40 flex items-center justify-center text-[#E4B564] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="leading-snug">324, Nextcare Building, Al Karama, Dubai</span>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-[#E4B564]/40 flex items-center justify-center text-[#E4B564] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <a
                  href="mailto:desertjourneydxb@gmail.com"
                  className="hover:text-[#E4B564] transition-colors"
                >
                  desertjourneydxb@gmail.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-[#E4B564]/40 flex items-center justify-center text-[#E4B564] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:+971582639173" className="hover:text-[#E4B564] transition-colors">
                  +971 582639173
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-[#E4B564]/40 flex items-center justify-center text-[#E4B564] shrink-0">
                  <Send className="w-4 h-4 rotate-45" />
                </div>
                <Link to="/contact" className="hover:text-[#E4B564] transition-colors font-medium">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Visit DUBAI Banner (3 cols) */}
          <div className="lg:col-span-3 pl-0 lg:pl-6 flex flex-col justify-between relative">
            <div>
              <span className="font-script text-4xl text-[#E4B564] block mb-[-10px] pl-1">
                Visit
              </span>
              <h2 className="font-serif text-6xl lg:text-7xl font-bold text-white tracking-widest leading-none mb-3">
                DUBAI
              </h2>
              <p className="text-[8px] tracking-[0.25em] text-[#E4B564] uppercase font-semibold border-y border-[#E4B564]/30 py-2 mb-3">
                DESERTS &nbsp;|&nbsp; CITY TOURS &nbsp;|&nbsp; CULTURE &nbsp;|&nbsp; MEMORIES
              </p>
              <span className="font-script text-2xl text-white/80 block italic">
                Adventure Awaits...
              </span>
            </div>

            {/* Bottom Right Dune Emblem */}
            <div className="self-end mt-6">
              <svg className="w-20 h-10 text-[#E4B564]" viewBox="0 0 60 30" fill="none">
                <path d="M30 4L45 22H15L30 4Z" fill="#E4B564" opacity="0.8" />
                <path d="M30 10L52 28H8L30 10Z" fill="#D4A353" opacity="0.5" />
                <path d="M2 28H58" stroke="#E4B564" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 text-[10px] text-white/60 tracking-wider">
          <div>© 2025 NextTrip Travel LLC | All Rights Reserved</div>

          <div className="flex items-center gap-2 text-[#E4B564] my-3 md:my-0">
            <Palmtree className="w-4 h-4" />
            <span className="text-white/80 font-semibold tracking-[0.2em]">
              EXPLORE &nbsp;|&nbsp; DISCOVER &nbsp;|&nbsp; EXPERIENCE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-8 h-[1px] bg-white/30 inline-block" />
            <span>DUBAI BEYOND ORDINARY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
