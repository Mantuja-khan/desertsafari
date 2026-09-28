import { Link } from "@tanstack/react-router";
import { useState } from "react";
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
  Star,
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../lib/i18n";

export function SiteFooterLogo() {
  return (
    <Link to="/" className="flex items-center gap-3 group no-underline">
      {/* Circle D Luxury Logo Emblem */}
      <div className="w-14 h-14 rounded-full border-2 border-[#E4B564] bg-gradient-to-br from-[#0D3B33] to-[#06201B] flex items-center justify-center relative overflow-hidden shadow-xl shrink-0 group-hover:border-[#F3C472] transition-colors">
        <Palmtree className="w-5 h-5 text-[#E4B564] absolute top-2 left-2.5 opacity-80" />
        <span className="font-serif text-3xl font-bold text-[#E4B564] pl-1 drop-shadow-md">D</span>
      </div>
      <div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide uppercase leading-none">
          DESERT <br />
          <span className="text-[#E4B564] tracking-wider">JOURNEY DXB</span>
        </h3>
        <p className="text-[8px] tracking-[0.28em] text-[#E4B564] uppercase font-semibold mt-1 border-t border-[#E4B564]/30 pt-0.5">
          MORE THAN A TRIP • A STORY TO TELL
        </p>
      </div>
    </Link>
  );
}

export function SiteFooter() {
  const { t, getLocalizedTourData } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterSubscribed(false);
      setNewsletterEmail("");
    }, 4000);
  };

  return (
    <footer
      id="contact"
      className="relative text-white overflow-hidden footer-mockup-bg border-t border-[#E4B564]/30"
    >
      {/* Rich Desert Background Image */}
      <img
        src="/footer_bg.png"
        alt="Dubai desert sunset camel caravan background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
      />

      {/* Multi-tier Dark Emerald Gradient Overlay with Golden Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#061E1A]/95 via-[#082923]/92 to-[#041512]/98 z-1" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-48 bg-[#E4B564]/10 blur-[120px] rounded-full pointer-events-none z-1" />

      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 sm:px-8 pt-16 pb-8">
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pb-12 mb-12 border-b border-[#E4B564]/20">
          <div className="flex items-center gap-3.5 bg-black/30 backdrop-blur-md p-4 border border-[#E4B564]/20">
            <div className="w-10 h-10 bg-[#E4B564]/15 border border-[#E4B564]/40 flex items-center justify-center text-[#E4B564] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-bold text-white leading-tight">
                {t("dtcmLicensed", "DTCM Licensed")}
              </h5>
              <p className="text-[10px] text-white/70">
                {t("dtcmDesc", "Official Dubai Tourism Operator")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-black/30 backdrop-blur-md p-4 border border-[#E4B564]/20">
            <div className="w-10 h-10 bg-[#E4B564]/15 border border-[#E4B564]/40 flex items-center justify-center text-[#E4B564] shrink-0">
              <Star className="w-5 h-5 fill-[#E4B564]" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-bold text-white leading-tight">
                {t("googleRatingBadge", "GOOGLE RATING")}
              </h5>
              <p className="text-[10px] text-white/70">
                {t("verifiedReviews", "628+ Verified Traveler Reviews")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-black/30 backdrop-blur-md p-4 border border-[#E4B564]/20">
            <div className="w-10 h-10 bg-[#E4B564]/15 border border-[#E4B564]/40 flex items-center justify-center text-[#E4B564] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-bold text-white leading-tight">
                {t("bestPriceGuarantee", "Best Price Guarantee")}
              </h5>
              <p className="text-[10px] text-white/70">
                {t("bestPriceDesc", "100% Transparent, No Hidden Fees")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-black/30 backdrop-blur-md p-4 border border-[#E4B564]/20">
            <div className="w-10 h-10 bg-[#E4B564]/15 border border-[#E4B564]/40 flex items-center justify-center text-[#E4B564] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-bold text-white leading-tight">
                {t("freeCancellation24h", "Free Cancellation")}
              </h5>
              <p className="text-[10px] text-white/70">
                {t("freeCancellationDesc", "Full refund & instant reschedule")}
              </p>
            </div>
          </div>
        </div>

        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#E4B564]/20">
          {/* Column 1: Brand, Mission & Social (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6 border-r-0 lg:border-r border-[#E4B564]/20">
            <SiteFooterLogo />

            <p className="text-xs text-white/75 leading-relaxed mt-5 mb-6 font-sans">
              {t(
                "aboutBody1",
                "Discover the enchantment of the Arabian sands and iconic cityscapes. From thrilling high-dune bashings to VIP royal Bedouin feasts, we curate extraordinary Dubai moments.",
              )}
            </p>

            {/* Newsletter VIP Signup */}
            <div className="w-full mb-6">
              <span className="text-[11px] font-bold text-[#E4B564] uppercase tracking-wider block mb-2 font-serif flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t("joinVipClub", "Join Our VIP Travelers Club")}</span>
              </span>
              {newsletterSubscribed ? (
                <div className="bg-emerald-900/60 border border-emerald-500/50 text-emerald-200 text-xs px-3.5 py-2.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t("welcomeVip", "Welcome! Check your email for exclusive discounts.")}</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex items-center gap-1 w-full">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={t("enterEmail", "Enter your email address")}
                    className="flex-1 bg-black/40 border border-white/20 px-3.5 py-2.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#E4B564] transition-colors rounded-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#E4B564] hover:bg-[#F3C472] text-[#0D3B33] font-bold text-xs uppercase tracking-wider px-4 py-2.5 transition-colors cursor-pointer rounded-none"
                  >
                    {t("joinBtn", "Join")}
                  </button>
                </form>
              )}
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://tripadvisor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="TripAdvisor"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn font-bold text-xs"
                aria-label="Google"
              >
                G
              </a>
            </div>
          </div>

          {/* Column 2: Popular Safaris & City Tours (3 cols) */}
          <div className="lg:col-span-3 pl-0 lg:pl-4 border-r-0 lg:border-r border-[#E4B564]/20">
            <h4 className="font-serif text-lg font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E4B564]" />
              <span>{t("topExperiences", "Top Experiences")}</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80 font-sans">
              <li>
                <Link
                  to="/desert-safari/$slug"
                  params={{ slug: "evening-desert-safari" }}
                  className="hover:text-[#E4B564] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#E4B564] font-bold">›</span>{" "}
                  {getLocalizedTourData("evening-desert-safari", {}).title || "Evening Desert Safari"}
                </Link>
              </li>
              <li>
                <Link
                  to="/desert-safari/$slug"
                  params={{ slug: "vip-desert-safari" }}
                  className="hover:text-[#E4B564] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#E4B564] font-bold">›</span>{" "}
                  {getLocalizedTourData("vip-desert-safari", {}).title || "VIP Desert Safari (Sofa Seating)"}
                </Link>
              </li>
              <li>
                <Link
                  to="/desert-safari/$slug"
                  params={{ slug: "quad-bike-desert-safari" }}
                  className="hover:text-[#E4B564] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#E4B564] font-bold">›</span>{" "}
                  {getLocalizedTourData("quad-bike-desert-safari", {}).title || "Quad Bike Desert Safari"}
                </Link>
              </li>
              <li>
                <Link
                  to="/desert-safari/$slug"
                  params={{ slug: "morning-desert-safari" }}
                  className="hover:text-[#E4B564] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#E4B564] font-bold">›</span>{" "}
                  {getLocalizedTourData("morning-desert-safari", {}).title || "Morning Desert Safari"}
                </Link>
              </li>
              <li>
                <Link
                  to="/city-tours/$slug"
                  params={{ slug: "private-dubai-city-tour" }}
                  className="hover:text-[#E4B564] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#E4B564] font-bold">›</span>{" "}
                  {getLocalizedTourData("private-dubai-city-tour", {}).title || "Private Dubai City Tour"}
                </Link>
              </li>
              <li>
                <Link
                  to="/city-tours/$slug"
                  params={{ slug: "abu-dhabi-city-tour" }}
                  className="hover:text-[#E4B564] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#E4B564] font-bold">›</span>{" "}
                  {getLocalizedTourData("abu-dhabi-city-tour", {}).title || "Abu Dhabi Grand Mosque Tour"}
                </Link>
              </li>
              <li>
                <Link
                  to="/city-tours"
                  className="text-[#E4B564] font-semibold hover:underline flex items-center gap-2 mt-2"
                >
                  <span>{t("allCityTours", "View All City Tours →")}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links & Guides (2 cols) */}
          <div className="lg:col-span-2 pl-0 lg:pl-2 border-r-0 lg:border-r border-[#E4B564]/20">
            <h4 className="font-serif text-lg font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E4B564]" />
              <span>{t("quickLinks", "Quick Links")}</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80 font-sans">
              <li>
                <Link
                  to="/"
                  className="hover:text-[#E4B564] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#E4B564] font-bold">›</span> {t("home", "Home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#E4B564] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#E4B564] font-bold">›</span> {t("aboutUs", "About Us")}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-[#E4B564] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#E4B564] font-bold">›</span> {t("blogs", "Travel Guides")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#E4B564] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#E4B564] font-bold">›</span> {t("contact", "Contact Us")}
                </Link>
              </li>
              <li>
                <a
                  href="/#packages"
                  className="hover:text-[#E4B564] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#E4B564] font-bold">›</span> {t("packages", "Packages")}
                </a>
              </li>
              <li>
                <a
                  href="/#gallery"
                  className="hover:text-[#E4B564] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#E4B564] font-bold">›</span>{" "}
                  {t("gallery", "Photo Gallery")}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: 24/7 Concierge & Contact (3 cols) */}
          <div className="lg:col-span-3 pl-0 lg:pl-4 flex flex-col justify-between">
            <div>
              <h4 className="font-serif text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#E4B564]" />
                <span>{t("dubaiOfficeConcierge", "Dubai Office & Concierge")}</span>
              </h4>

              <ul className="space-y-3.5 text-xs text-white/80 font-sans">
                <li className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-[#E4B564]/20 border border-[#E4B564]/40 flex items-center justify-center text-[#E4B564] shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug">
                    324, Nextcare Building, Al Karama, Dubai, UAE
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-[#E4B564]/20 border border-[#E4B564]/40 flex items-center justify-center text-[#E4B564] shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <a
                    href="mailto:desertjourneydxb@gmail.com"
                    className="hover:text-[#E4B564] transition-colors"
                  >
                    desertjourneydxb@gmail.com
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-[#E4B564]/20 border border-[#E4B564]/40 flex items-center justify-center text-[#E4B564] shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <a
                    href="tel:+971582639173"
                    className="hover:text-[#E4B564] transition-colors font-bold text-white"
                  >
                    +971 582639173
                  </a>
                </li>
              </ul>
            </div>

            {/* Instant WhatsApp Concierge Button */}
            <div className="mt-6">
              <a
                href="https://wa.me/971582639173"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#1EBE5D] hover:to-[#0D7A6D] text-white font-bold text-xs uppercase tracking-wider py-3 px-4 flex items-center justify-center gap-2 shadow-lg transition-all rounded-none"
              >
                <Send className="w-3.5 h-3.5 rotate-45" />
                <span>{t("instantWhatsAppConcierge", "Instant WhatsApp Concierge")}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Trust Strip */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-[11px] text-white/60 tracking-wider font-sans gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Desert Journey DXB (NextTrip Travel LLC).</span>
            <span className="hidden sm:inline">{t("rightsReserved", "All Rights Reserved")}.</span>
          </div>

          <div className="flex items-center gap-2 text-[#E4B564]">
            <Palmtree className="w-4 h-4" />
            <span className="text-white/80 font-semibold tracking-[0.2em] uppercase text-[10px]">
              {t("exploreDiscoverExperience", "EXPLORE • DISCOVER • EXPERIENCE")}
            </span>
          </div>

          {/* Secure Badges & Payment */}
          <div className="flex items-center gap-4 text-white/50 text-[10px]">
            <span>🔒 256-Bit SSL Encrypted</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>Apple Pay • Visa • MC</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
