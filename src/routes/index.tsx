import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, type ReactNode } from "react";
import heroVideo from "../assets/Untitledvideo.mp4";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Flame,
  Globe,
  Heart,
  HelpCircle,
  MapPin,
  Menu,
  MessageCircle,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Utensils,
  X,
  Compass,
  Car,
  FlameKindling,
  Crown,
  Zap,
  Sun,
  Camera,
  Coffee,
  Building,
  Palmtree,
  Mountain,
  Mail,
  Phone,
  Send,
  ExternalLink,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Desert Journey DXB | Premium Dubai Desert Safari" },
      {
        name: "description",
        content:
          "Discover unforgettable Dubai desert safari experiences with premium adventure, Arabian hospitality and breathtaking views.",
      },
      { property: "og:title", content: "Desert Journey DXB | Dubai Desert Safari" },
      {
        property: "og:description",
        content: "Dare the Dunes. Experience the Magic. Book your desert safari & city tours.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// Logo component matching mockup
function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-3 text-white no-underline group ${className}`}>
      <div className="flex flex-col items-center">
        {/* Dune Emblem */}
        <svg className="w-8 h-6 text-[#E4B564]" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2L28 14H12L20 2Z" fill="#E4B564" opacity="0.9" />
          <path d="M20 6L34 22H6L20 6Z" fill="#D4A353" opacity="0.6" />
          <path d="M2 22H38" stroke="#E4B564" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="text-[10px] tracking-[0.25em] text-[#E4B564] uppercase font-serif font-semibold mt-0.5">
          Desert Journey
        </span>
        <span className="text-[8px] tracking-[0.4em] text-white/70 uppercase">DXB</span>
      </div>
    </a>
  );
}

// Logo component matching Footer Image 1
function FooterLogo() {
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

// Packages Data
const packagesData = [
  {
    id: "vip",
    title: "VIP Desert Safari + Premium Camp",
    tag: "RIDE THE DUNES / FEEL THE THRILL",
    badge: "MOST POPULAR",
    badgeType: "green", // green with sun icon
    image: "/pkg_vip.jpg",
    duration: "7 - 8 hours",
    price: "AED 149",
    buttonColor: "bg-[#0D3B33] text-white hover:bg-[#145248]",
    buttonIcon: "camel",
    inclusions: [
      { text: "Pickup & Drop-off By Sharing Car", icon: "car" },
      { text: "Dune Bashing 4x4 Land Cruiser SUV ( 30 minutes )", icon: "suv" },
      { text: "Short Camel Ride", icon: "camel" },
      { text: "Sand Boarding", icon: "sandboard" },
      { text: "Unlimited Water, Soft drinks, Tea & Coffee", icon: "drink" },
      { text: "Hot Beverages", icon: "coffee" },
      { text: "Free Snacks", icon: "snack" },
      { text: "Starter serves at 6:45 pm", icon: "clock" },
      { text: "BBQ Buffet Dinner suitable for both Veg & Non-Veg", icon: "food" },
      { text: "VIP Sofa sitting", icon: "sofa" },
      { text: "Henna Tattoo for Ladies", icon: "henna" },
      { text: "Sunset and Free Arabic Dress Photography", icon: "camera" },
    ],
    shows: "2 Belly Dance Shows  •  2 Fire Show  •  1 Tanoura Show",
  },
  {
    id: "private",
    title: "Desert Safari in Private Car",
    tag: "YOUR PRIVATE / DESERT ESCAPE",
    badge: "EXCLUSIVE EXPERIENCE",
    badgeType: "gold", // gold with crown icon
    image: "/pkg_private.jpg",
    duration: "7 - 8 hours",
    price: "AED 699",
    buttonColor: "bg-[#E4B564] text-[#0D3B33] hover:bg-[#E8C88B]",
    buttonIcon: "mountain",
    inclusions: [
      { text: "Pickup & Drop-off By Private Car", icon: "car" },
      { text: "Dune Bashing 4x4 Land Cruiser SUV ( 30 minutes )", icon: "suv" },
      { text: "Short Camel Ride", icon: "camel" },
      { text: "Sand Boarding", icon: "sandboard" },
      { text: "Unlimited Water, Soft drinks, Tea & Coffee", icon: "drink" },
      { text: "Hot Beverages", icon: "coffee" },
      { text: "Free Snacks", icon: "snack" },
      { text: "Starter serves at 6:45 pm", icon: "clock" },
      { text: "BBQ Buffet Dinner suitable for both Veg & Non-Veg", icon: "food" },
      { text: "Henna Tattoo for Ladies", icon: "henna" },
      { text: "Sunset and Free Arabic Dress Photography", icon: "camera" },
    ],
    shows: "2 Belly Dance Shows  •  2 Fire Show  •  1 Tanoura Show",
  },
  {
    id: "quad",
    title: "Desert Safari with Quad Bike",
    tag: "MORE POWER / MORE ADVENTURE",
    badge: "THRILLING RIDE",
    badgeType: "teal", // teal with zap icon
    image: "/pkg_quad.jpg",
    duration: "7 - 8 hours",
    price: "AED 249",
    buttonColor: "bg-[#0D3B33] text-white hover:bg-[#145248]",
    buttonIcon: "palm",
    inclusions: [
      { text: "Pickup & Drop-off By Sharing Car", icon: "car" },
      { text: "Dune Bashing 4x4 Land Cruiser SUV ( 30 minutes )", icon: "suv" },
      { text: "Short Camel Ride", icon: "camel" },
      { text: "Sand Boarding", icon: "sandboard" },
      { text: "Unlimited Water, Soft drinks, Tea & Coffee", icon: "drink" },
      { text: "Hot Beverages", icon: "coffee" },
      { text: "Free Snacks", icon: "snack" },
      { text: "Starter serves at 6:45 pm", icon: "clock" },
      { text: "BBQ Buffet Dinner suitable for both Veg & Non-Veg", icon: "food" },
      { text: "Henna Tattoo for Ladies", icon: "henna" },
      { text: "Sunset and Free Arabic Dress Photography", icon: "camera" },
      { text: "Quad Bike Ride (30 minutes)", icon: "bike" },
    ],
    shows: "2 Belly Dance Shows  •  2 Fire Show  •  1 Tanoura Show",
  },
];

// Testimonials Data
const testimonialsData = [
  {
    name: "Zohair Ali",
    time: "1 year ago",
    avatarBg: "bg-orange-500",
    initial: "Z",
    photo: "/pkg_vip.jpg",
    text: "I had a great time on the desert safari! The dune bashing was exciting and the sunset views were beautiful. I enjoyed the camel ride...",
  },
  {
    name: "Janjua Rajpoot",
    time: "1 year ago",
    avatarBg: "bg-pink-500",
    initial: "🌸",
    photo: "/polaroid_camp.jpg",
    text: "The desert safari was amazing! The ride through the sand dunes was thrilling, and the camel ride was a fun experience. The evening show...",
  },
  {
    name: "Zain ul Abideen",
    time: "1 year ago",
    avatarBg: "bg-emerald-600",
    initial: "Z",
    photo: "/polaroid_camel.jpg",
    text: "Good products❤️✨ Excellent arrangements and very polite guide. Highly recommended for families!",
  },
  {
    name: "Vaneeza Thomas",
    time: "1 year ago",
    avatarBg: "bg-gray-600",
    initial: "V",
    photo: "/review_card_4.jpg",
    text: "Next Trip Travel LLC made our Dubai desert safari absolutely unforgettable. The dune bashing was thrilling but safe, and our guide was top notch...",
  },
];

// Attraction Tours Data
const toursData = [
  {
    title: "Dubai Tour",
    tag: "MODERN CITY / TIMELESS EXPERIENCES",
    price: "99",
    image: "/dubai-tour-bg.jpg",
    inclusions: [
      "Pickup & Drop",
      "Blue Mosque",
      "Snaps at Jumeirah Beach Burj Al Arab",
      "Photo Stop : The Palm Jumeirah",
      "Dubai Marina Skyline View",
      "Mall of The Emirates (Drive-through)",
      "The Dubai Mall (Drive through)",
      "Burj Khalifa (Drive-through)",
    ],
    footerTag: "ICONIC LANDMARKS  |  STUNNING VIEWS  |  UNFORGETTABLE MOMENTS",
  },
  {
    title: "Abu Dhabi Tour",
    tag: "CULTURE / HERITAGE / GRANDEUR",
    price: "149",
    image: "/abudhabi-tour-bg.jpg",
    inclusions: [
      "Pickup & Drop",
      "Sheikh Zayed Grand Mosque (stop)",
      "Art Gallery Museum",
      "Al Bateen Presidential Palace",
      "Emirates Palace Hotel (drive thru)",
      "Saadiyat Island (drive Thru)",
      "BAPS Temple",
      "Yas Island (drive Thru)",
    ],
    footerTag: "RICH CULTURE  |  ICONIC ARCHITECTURE  |  EXTRAORDINARY EXPERIENCES",
  },
  {
    title: "Thrilling Hatta Tour",
    tag: "MOUNTAINS / ADVENTURE / NATURAL BEAUTY",
    price: "799",
    image: "/hatta-tour-bg.jpg",
    inclusions: [
      "Pick & Drop",
      "Hatta Mountains Tour",
      "Picture Points at Al Hajar Mountains",
      "Heritage Village",
      "Hill Park",
      "Hatta Dam – Hatta Reservoir",
      "Wadi Hub Center",
      "Hatta Kayaking",
      "Experience In Dam",
    ],
    footerTag: "BREATHTAKING MOUNTAINS  |  OUTDOOR ADVENTURE  |  NATURE AT ITS BEST",
  },
];

// Word-by-word hero title text reveal words
const heroHeadlinePart1 = ["Dare", "the", "Dunes."];
const heroHeadlinePart2 = ["Experience", "the", "Magic!"];

const googleMapsUrl =
  "https://www.google.com/maps/dir/28.2036569,76.8400441/Micron+Technical+Services,+Karama+Zabeel+Street,+Montana+Building,304+-+Dubai+-+United+Arab+Emirates/@25.7002877,54.9813683,217541m/data=!3m1!1e3!4m10!4m9!1m1!4e1!1m5!1m1!1s0x3e5f439b006db4eb:0x1e44c164c9e8c2b1!2m2!1d55.3094818!2d25.2491884!3e0?entry=ttu&g_ep=EgoyMDI2MDkwOS4wIKXMDSoASAFQAw%3D%3D";

// Submenu Data for Dropdowns
const desertSafariSubmenu = [
  "Evening Desert Safari",
  "Private Desert Safari",
  "Premium Desert Safari",
  "Morning Desert Safari",
  "Desert Safari with Quad Bikes",
  "Desert Safari with Dune Buggy",
  "Overnight Desert Safari",
];

const cityToursSubmenu = [
  "Abu Dhabi City Tour",
  "Dubai City Tour",
  "Thrilling Hatta Tour",
  "Khor Fakkan Tour",
];

// Decorative Dark Dotted Matrix Square Component
function DottedSquare({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-28 h-28 text-[#0D3B33] opacity-65 pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      fill="currentColor"
    >
      <pattern id="dot-matrix-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="3" />
      </pattern>
      <rect width="100" height="100" fill="url(#dot-matrix-pattern)" />
    </svg>
  );
}

// User-Uploaded Hero Desert Video Background (Camel Riding, Safari Riding & Bike Riding)
function HeroVideoBackground() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      poster="/hero_bg.jpg"
      className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-105 transition-transform duration-1000"
    >
      <source src={heroVideo} type="video/mp4" />
      <source src="https://assets.mixkit.co/videos/preview/mixkit-riding-a-quad-bike-in-the-desert-41584-large.mp4" type="video/mp4" />
      <img
        src="/hero_bg.jpg"
        alt="Dubai Desert Sunset background"
        className="w-full h-full object-cover"
      />
    </video>
  );
}

// Directional Scroll Reveal Wrapper Component
function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
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
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const dirClass =
    direction === "left"
      ? "scroll-reveal-left"
      : direction === "right"
        ? "scroll-reveal-right"
        : "scroll-reveal-up";

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${dirClass} ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [reviewIndex, setReviewIndex] = useState(0);

  const navItems = ["Home", "Desert Safari", "City Tours", "Packages", "Gallery", "Blogs", "About Us", "Contact"];

  return (
    <main id="top" className="min-h-screen bg-[#F8F5EF] text-[#1D2523] selection:bg-[#E4B564] selection:text-[#0D3B33]">
      {/* Pure Floating WhatsApp Icon Button */}
      <a
        href="https://wa.me/971582639173"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full" />
      </a>

      {/* ==========================================
          SECTION 1: HERO SECTION WITH VIDEO BACKGROUND
      ========================================== */}
      <section className="relative min-h-[100vh] max-h-[1080px] flex flex-col justify-between text-white overflow-hidden">
        {/* Background Video showing Desert Activities (Camel Riding, Safari Dune Bashing, Quad Bike) */}
        <HeroVideoBackground />

        {/* Decorative Dotted Matrix Square */}
        <DottedSquare className="absolute top-32 right-12 z-1 hidden lg:block opacity-40" />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D3B33]/85 via-[#0D3B33]/45 to-black/35 z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/55 z-1" />

        {/* Header Navigation */}
        <header className="relative z-10 w-full max-w-[1340px] mx-auto px-6 h-24 flex items-center justify-between border-b border-white/20 animate-fade-in-up delay-100">
          <Logo />

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 font-sans text-xs tracking-wider">
            {navItems.map((item) => (
              <div key={item} className="relative group py-6 flex items-center">
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                  onClick={() => setActiveTab(item)}
                  className={`relative transition-colors flex items-center gap-1 ${activeTab === item ? "text-[#E4B564] font-semibold" : "text-white/80 hover:text-[#E4B564]"
                    }`}
                >
                  {item}
                  {(item === "Desert Safari" || item === "City Tours") && (
                    <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180 text-[#E4B564]" />
                  )}
                  {activeTab === item && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E4B564]" />
                  )}
                </a>

                {/* Desert Safari Hover Dropdown */}
                {item === "Desert Safari" && (
                  <div className="absolute top-[85%] left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[240px]">
                    <div className="bg-[#051E1A] border border-[#E4B564]/40 rounded-lg shadow-2xl py-2 overflow-hidden opacity-100">
                      {desertSafariSubmenu.map((sub, i) => (
                        <a
                          key={i}
                          href="#packages"
                          className="block px-4 py-2.5 text-xs font-semibold text-white hover:text-[#E4B564] hover:bg-[#0D3B33] transition-colors border-b border-[#E4B564]/10 last:border-b-0 font-sans"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* City Tours Hover Dropdown */}
                {item === "City Tours" && (
                  <div className="absolute top-[85%] left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[210px]">
                    <div className="bg-[#051E1A] border border-[#E4B564]/40 rounded-lg shadow-2xl py-2 overflow-hidden opacity-100">
                      {cityToursSubmenu.map((sub, i) => (
                        <a
                          key={i}
                          href="#attractions"
                          className="block px-4 py-2.5 text-xs font-semibold text-white hover:text-[#E4B564] hover:bg-[#0D3B33] transition-colors border-b border-[#E4B564]/10 last:border-b-0 font-sans"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Header Action Controls */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="p-2 text-white/80 hover:text-[#E4B564] transition-colors" aria-label="Search">
              <Search className="w-4 h-4" />
            </button>
            <a
              href="#packages"
              className="bg-[#E4B564] text-[#0D3B33] font-sans font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xs flex items-center gap-2 hover:bg-[#E8C88B] transition-all shadow-md"
            >
              <Calendar className="w-4 h-4" />
              Book Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-24 inset-x-0 bg-[#0D3B33] border-b border-[#E4B564]/30 z-50 p-6 flex flex-col gap-4 text-white animate-fade-in-up max-h-[80vh] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item} className="flex flex-col">
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-serif tracking-wide hover:text-[#E4B564] flex items-center justify-between"
                >
                  {item}
                  {(item === "Desert Safari" || item === "City Tours") && <ChevronDown className="w-4 h-4 text-[#E4B564]" />}
                </a>

                {/* Mobile Submenu for Desert Safari */}
                {item === "Desert Safari" && (
                  <div className="pl-4 pt-2 flex flex-col gap-2 border-l border-[#E4B564]/30 my-2">
                    {desertSafariSubmenu.map((sub, i) => (
                      <a
                        key={i}
                        href="#packages"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm text-white/80 hover:text-[#E4B564]"
                      >
                        • {sub}
                      </a>
                    ))}
                  </div>
                )}

                {/* Mobile Submenu for City Tours */}
                {item === "City Tours" && (
                  <div className="pl-4 pt-2 flex flex-col gap-2 border-l border-[#E4B564]/30 my-2">
                    {cityToursSubmenu.map((sub, i) => (
                      <a
                        key={i}
                        href="#attractions"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm text-white/80 hover:text-[#E4B564]"
                      >
                        • {sub}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[#E4B564] text-[#0D3B33] font-bold uppercase text-center py-3 rounded mt-2"
            >
              Book Now
            </a>
          </div>
        )}

        {/* Top Floating Side Annotations */}
        <div className="relative z-10 hidden xl:flex justify-between w-full max-w-[1340px] mx-auto px-6 pt-4 text-[10px] tracking-[0.25em] text-white/60 uppercase animate-fade-in-up delay-200">
          <span>EXPLORE • DISCOVER • EXPERIENCE</span>
          <span className="flex items-center gap-2">
            DUBAI BEYOND ORDINARY
            <span className="w-8 h-[1px] bg-white/40 inline-block" />
          </span>
        </div>

        {/* Hero Central Content */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 py-12 flex-1 flex flex-col justify-center items-center text-center">
          {/* Subtitle */}
          <span className="text-xs uppercase tracking-[0.35em] text-[#E4B564] font-semibold mb-4 animate-fade-in-up delay-200">
            A D V E N T U R E &nbsp; A W A I T S
          </span>

          {/* Animated Headline: Word-by-Word Reveal */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight max-w-5xl mb-4 drop-shadow-lg">
            <span className="inline-block">
              {heroHeadlinePart1.map((word, i) => (
                <span
                  key={i}
                  className="reveal-word font-bold inline-block mr-3 text-white"
                  style={{ animationDelay: `${0.3 + i * 0.15}s` }}
                >
                  {word}
                </span>
              ))}
            </span>{" "}
            <br />
            <em className="gold-italic font-bold not-italic inline-block text-[#E4B564]">
              {heroHeadlinePart2.map((word, i) => (
                <span
                  key={i}
                  className="reveal-word font-bold inline-block mr-3 text-[#E4B564]"
                  style={{ animationDelay: `${0.8 + i * 0.18}s` }}
                >
                  {word}
                </span>
              ))}
            </em>
          </h1>

          {/* Camel Divider Motif */}
          <div className="flex items-center justify-center gap-4 my-3 text-[#E4B564]/80 animate-fade-in-up delay-600">
            <span className="w-12 h-[1px] bg-[#E4B564]/50" />
            <svg className="w-6 h-6 fill-current animate-pulse" viewBox="0 0 24 24">
              <path d="M19 13c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2v-2c0-1.1-.9-2-2-2zM4 11c0-1.1.9-2 2-2h3.58l.71-2.13C10.59 6.28 11.23 6 11.92 6H15c.55 0 1 .45 1 1s-.45 1-1 1h-2.58l-1 3H16c1.1 0 2 .9 2 2v1c0 .55.45 1 1 1h1c.55 0 1 .45 1 1s-.45 1-1 1h-1.5c-1.38 0-2.5-1.12-2.5-2.5V13h-4v4c0 .55-.45 1-1 1s-1-.45-1-1v-4H8v4c0 .55-.45 1-1 1s-1-.45-1-1v-5.08C4.82 12.63 4 11.9 4 11z" />
            </svg>
            <span className="w-12 h-[1px] bg-[#E4B564]/50" />
          </div>

          {/* Subtext */}
          <p className="font-sans text-sm md:text-base text-white/95 max-w-3xl font-medium leading-relaxed mt-3 mb-8 animate-fade-in-up delay-700 drop-shadow-md">
            Indulge in the untamed beauty of the desert with our exclusive safaris where opulence meets adventure. Glide over the dunes in a private 4×4, sip champagne under a fiery sunset, and unwind in a royal-style camp with gourmet dining. The desert isn’t just wild; it’s wonderfully lavish
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-5 animate-fade-in-up delay-800">
            <a href="#packages" className="btn-gold text-xs px-8 py-4">
              BOOK YOUR SAFARI NOW &nbsp; →
            </a>
            <button
              onClick={() => alert("Playing Virtual Experience Trailer...")}
              className="flex items-center gap-3 text-xs tracking-wider uppercase font-semibold text-white/90 hover:text-[#E4B564] transition-colors group"
            >
              <span className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center group-hover:border-[#E4B564] group-hover:scale-105 transition-all">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </span>
              WATCH THE EXPERIENCE
            </button>
          </div>
        </div>

        {/* Left Side Number Indicator */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 text-xs font-mono text-white/50 z-10 animate-fade-in-up delay-500">
          <span className="text-[#E4B564] font-bold text-sm border-b border-[#E4B564] pb-1">01</span>
          <span>02</span>
          <span>03</span>
          <span>04</span>
        </div>

        {/* Bottom Left Scroll Indicator */}
        <div className="absolute left-8 bottom-6 hidden xl:flex items-center gap-2 text-[9px] tracking-[0.25em] text-white/70 uppercase z-10 animate-fade-in-up delay-700">
          <ArrowRight className="w-3 h-3 rotate-90" />
          SCROLL TO EXPLORE
        </div>

        {/* Hero Bottom Bar Service Highlights (Desert Dune Wave Curve Style) */}
        <div className="relative z-10 w-full py-8 bg-gradient-to-t from-black/85 via-black/50 to-transparent border-t border-white/15 animate-fade-in-up delay-800">
          {/* Desert Dune Wave Line Background Graphic */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
            <svg
              className="w-full h-full text-[#E4B564] opacity-40"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M 0 35 C 300 110, 600 110, 900 35 C 1050 5, 1200 35, 1200 35"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
            </svg>
          </div>

          <div className="w-full max-w-[1340px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center relative z-10">
            {/* Feature 1 (Left - Top Curve) */}
            <div className="flex items-center gap-4 bg-[#0D3B33]/85 backdrop-blur-md border border-[#E4B564]/30 p-4 rounded-xl shadow-xl hover:border-[#E4B564] hover:scale-105 transition-all duration-300 group cursor-pointer lg:-translate-y-5">
              <div className="w-11 h-11 rounded-full bg-[#E4B564]/20 border border-[#E4B564]/50 flex items-center justify-center text-[#E4B564] group-hover:bg-[#E4B564] group-hover:text-[#0D3B33] transition-colors shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-serif text-base font-semibold text-white leading-tight">Thrilling Desert Safari</h4>
                <p className="text-[10px] text-white/70 tracking-wider">4x4 Dune Bashing & Sandboarding</p>
              </div>
            </div>

            {/* Feature 2 (Center Left - Down Trough) */}
            <div className="flex items-center gap-4 bg-[#0D3B33]/85 backdrop-blur-md border border-[#E4B564]/30 p-4 rounded-xl shadow-xl hover:border-[#E4B564] hover:scale-105 transition-all duration-300 group cursor-pointer lg:translate-y-5">
              <div className="w-11 h-11 rounded-full bg-[#E4B564]/20 border border-[#E4B564]/50 flex items-center justify-center text-[#E4B564] group-hover:bg-[#E4B564] group-hover:text-[#0D3B33] transition-colors shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-serif text-base font-semibold text-white leading-tight">Authentic Camel Rides</h4>
                <p className="text-[10px] text-white/70 tracking-wider">Sunset Caravan Trails</p>
              </div>
            </div>

            {/* Feature 3 (Center Right - Down Trough) */}
            <div className="flex items-center gap-4 bg-[#0D3B33]/85 backdrop-blur-md border border-[#E4B564]/30 p-4 rounded-xl shadow-xl hover:border-[#E4B564] hover:scale-105 transition-all duration-300 group cursor-pointer lg:translate-y-5">
              <div className="w-11 h-11 rounded-full bg-[#E4B564]/20 border border-[#E4B564]/50 flex items-center justify-center text-[#E4B564] group-hover:bg-[#E4B564] group-hover:text-[#0D3B33] transition-colors shrink-0">
                <FlameKindling className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-serif text-base font-semibold text-white leading-tight">Traditional Bedouin Camp</h4>
                <p className="text-[10px] text-white/70 tracking-wider">BBQ Dinner & Live Shows</p>
              </div>
            </div>

            {/* Feature 4 (Right - Top Curve) */}
            <div className="flex items-center gap-4 bg-[#0D3B33]/85 backdrop-blur-md border border-[#E4B564]/30 p-4 rounded-xl shadow-xl hover:border-[#E4B564] hover:scale-105 transition-all duration-300 group cursor-pointer lg:-translate-y-5">
              <div className="w-11 h-11 rounded-full bg-[#E4B564]/20 border border-[#E4B564]/50 flex items-center justify-center text-[#E4B564] group-hover:bg-[#E4B564] group-hover:text-[#0D3B33] transition-colors shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-serif text-base font-semibold text-white leading-tight">Explore Dubai City Tours</h4>
                <p className="text-[10px] text-white/70 tracking-wider">Iconic Landmarks & Heritage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: SHORT ABOUT SECTION
      ========================================== */}
      <section id="aboutus" className="py-24 bg-[#F8F5EF] relative overflow-hidden">
        {/* Background Dotted Matrix Squares */}
        <DottedSquare className="absolute top-12 left-8 z-0 opacity-50" />
        <DottedSquare className="absolute bottom-12 right-12 z-0 opacity-40" />

        <div className="section-shell grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

          {/* Left Column: Visuals & Tilted Polaroids (Scrolls from Left) */}
          <ScrollReveal direction="left" className="lg:col-span-6 relative flex flex-col items-center">

            {/* Top Tag Annotations */}
            <div className="w-full flex justify-between text-[10px] tracking-[0.25em] text-[#6B7672] uppercase mb-4">
              <span>MORE THAN A TRIP</span>
              <span>A STORY TO TELL</span>
            </div>

            {/* Main Land Cruiser Visual with Dark Overlay Block */}
            <div className="relative w-full rounded-xs overflow-hidden shadow-2xl group">
              <img
                src="/about_suv.jpg"
                alt="Land Cruiser dune bashing in sunset"
                className="w-full h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Overlay Handwritten Script */}
              <div className="absolute bottom-6 left-6 text-white font-script text-4xl text-[#E4B564] drop-shadow-md">
                Feel the Desert
              </div>

              {/* Slider Arrows */}
              <div className="absolute bottom-6 right-6 flex items-center gap-3 text-white/70">
                <button className="hover:text-[#E4B564] transition-colors"><ArrowLeft className="w-4 h-4" /></button>
                <span className="w-8 h-[1px] bg-white/40" />
                <button className="hover:text-[#E4B564] transition-colors"><ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Overlapping Dark Teal Block with 2 Tilted Polaroids */}
            <div className="absolute right-[-20px] md:right-[-40px] top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-6 z-20">

              {/* Polaroid 1 (Top Tilted Left) */}
              <div className="polaroid-card w-48 -rotate-6 shadow-2xl border border-white">
                <img src="/polaroid_camel.jpg" alt="Camel caravan ride sunset" className="w-full h-36 object-cover rounded-xs" />
                <p className="font-script text-lg text-center text-[#1D2523] mt-2 font-semibold">Authentic Experiences</p>
              </div>

              {/* Polaroid 2 (Bottom Tilted Right) */}
              <div className="polaroid-card w-48 rotate-6 shadow-2xl border border-white mt-[-20px]">
                <img src="/polaroid_camp.jpg" alt="Bedouin luxury camp night" className="w-full h-36 object-cover rounded-xs" />
                <p className="font-script text-lg text-center text-[#1D2523] mt-2 font-semibold">Arabian Hospitality</p>
              </div>

            </div>

            {/* Bottom Subtitle Tag */}
            <div className="w-full flex justify-between text-[10px] tracking-[0.25em] text-[#6B7672] uppercase mt-4">
              <span>DUBAI BEYOND ORDINARY</span>
            </div>
          </ScrollReveal>

          {/* Right Column: About Content (Scrolls from Right) */}
          <ScrollReveal direction="right" className="lg:col-span-6 flex flex-col items-start pl-0 lg:pl-6">

            {/* Arch Stamp Badge Top Right */}
            <div className="self-end mb-4">
              <div className="stamp-badge">
                <Palmtree className="w-6 h-6 text-[#D4A353]" />
                <span className="text-[8px] tracking-[0.2em] uppercase text-[#0D3B33] font-bold">EXPLORE</span>
                <span className="text-[7px] tracking-[0.15em] uppercase text-[#6B7672]">EXPERIENCE</span>
                <span className="text-[7px] tracking-[0.15em] uppercase text-[#6B7672]">BELONG</span>
              </div>
            </div>

            {/* Subtitle */}
            <div className="section-subtitle mb-3">
              <span>ABOUT DESERTJOURNEYDXB</span>
              <span className="w-12 h-[1px] bg-[#D4A353]" />
            </div>

            {/* Heading */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0D3B33] leading-[1.1] mb-6">
              Your Gateway to an <br />
              Extraordinary <em className="gold-italic">Dubai Adventure</em>
            </h2>

            {/* Body Text */}
            <p className="font-sans text-sm text-[#4A5550] leading-relaxed mb-4">
              At DesertJourneyDXB, we believe travel is more than just a destination — it’s an experience that stays with you forever. From thrilling desert safaris and breathtaking city tours to authentic Arabian hospitality, we create unforgettable moments that let you discover the real beauty of Dubai.
            </p>
            <p className="font-sans text-sm text-[#4A5550] leading-relaxed mb-8">
              Join us for a journey where adventure, culture and luxury come together in the most extraordinary way.
            </p>

            {/* Discover Story Button */}
            <a href="#packages" className="btn-gold text-xs px-8 py-4">
              DISCOVER OUR STORY &nbsp; →
            </a>
          </ScrollReveal>

        </div>
      </section>

      {/* ==========================================
          SECTION 3: CHOOSE YOUR DESERT EXPERIENCE
      ========================================== */}
      <section id="packages" className="py-24 bg-[#FAF7F2] relative overflow-hidden">
        {/* Background Dotted Matrix Square */}
        <DottedSquare className="absolute top-10 right-10 z-0 opacity-40" />

        <div className="section-shell relative z-10">

          {/* Top Header Row (Scrolls from Left) */}
          <ScrollReveal direction="left" className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="font-script text-2xl text-[#D4A353] block mb-1">Adventure Awaits</span>
              <div className="section-subtitle mb-2">
                <span>POPULAR PACKAGES</span>
                <span className="w-8 h-[1px] bg-[#D4A353]" />
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0D3B33]">
                Choose Your <em className="gold-italic">Desert Experience</em>
              </h2>
              <p className="text-sm text-[#6B7672] mt-2">
                Thrilling adventures, authentic culture and unforgettable memories.
              </p>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-full border border-[#D4A353]/40 flex items-center justify-center text-[#0D3B33] hover:bg-[#D4A353] hover:text-white transition-all">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full border border-[#D4A353]/40 flex items-center justify-center text-[#0D3B33] hover:bg-[#D4A353] hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <a href="#attractions" className="text-xs font-bold uppercase tracking-wider text-[#0D3B33] hover:text-[#D4A353] flex items-center gap-1 transition-colors">
                View All Packages →
              </a>
            </div>
          </ScrollReveal>

          {/* 3 Detailed Package Cards Grid (Scrolls from Right) */}
          <ScrollReveal direction="right">

            {/* 3 Detailed Package Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {packagesData.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-md overflow-hidden shadow-lg border border-[#E5E0D6] flex flex-col hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Package Image & Badges Header */}
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Top Left Tag */}
                    <span className="absolute top-4 left-4 text-[9px] tracking-[0.2em] font-bold text-white uppercase bg-black/40 px-3 py-1 rounded-xs backdrop-blur-xs">
                      {pkg.tag}
                    </span>

                    {/* Top Right Badge */}
                    <span
                      className={`absolute top-4 right-4 text-[9px] tracking-wider font-bold uppercase px-3 py-1 rounded-xs flex items-center gap-1.5 shadow-md ${pkg.badgeType === "green"
                        ? "bg-[#145248] text-white"
                        : pkg.badgeType === "gold"
                          ? "bg-[#E4B564] text-[#0D3B33]"
                          : "bg-[#0D3B33] text-white"
                        }`}
                    >
                      {pkg.badgeType === "green" && <Sun className="w-3 h-3 text-[#E4B564]" />}
                      {pkg.badgeType === "gold" && <Crown className="w-3 h-3 text-[#0D3B33]" />}
                      {pkg.badgeType === "teal" && <Zap className="w-3 h-3 text-[#E4B564]" />}
                      {pkg.badge}
                    </span>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <h3 className="font-serif text-2xl font-bold text-[#0D3B33] mb-3 leading-snug">
                        {pkg.title}
                      </h3>

                      {/* Duration & Price Row */}
                      <div className="flex items-center gap-4 py-3 border-y border-[#E5E0D6] mb-4 text-xs font-semibold text-[#0D3B33]">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-[#D4A353]" />
                          {pkg.duration}
                        </span>
                        <span className="text-[#E5E0D6]">|</span>
                        <span className="flex items-center gap-1.5 text-base font-serif font-bold text-[#D4A353]">
                          {pkg.price}
                        </span>
                      </div>

                      {/* Inclusion Bullets List */}
                      <ul className="space-y-2 mb-6">
                        {pkg.inclusions.map((item, index) => (
                          <li key={index} className="inclusion-item">
                            <Check className="w-4 h-4 text-[#D4A353] shrink-0" />
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Entertainment Shows Highlight Box */}
                    <div>
                      <div className="bg-[#F8F5EF] p-3 rounded-xs border border-[#E5E0D6] text-center mb-6">
                        <span className="text-[10px] font-bold text-[#6B7672] uppercase tracking-wider block mb-1">
                          ENTERTAINMENT SHOWS:
                        </span>
                        <span className="text-xs font-semibold text-[#0D3B33]">
                          {pkg.shows}
                        </span>
                      </div>

                      {/* Action Button */}
                      <a
                        href="#map"
                        className={`w-full py-4 px-6 rounded-xs text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all ${pkg.buttonColor}`}
                      >
                        <span>VIEW MORE &nbsp; →</span>
                        {pkg.buttonIcon === "camel" && (
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 13c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2v-2c0-1.1-.9-2-2-2zM4 11c0-1.1.9-2 2-2h3.58l.71-2.13C10.59 6.28 11.23 6 11.92 6H15c.55 0 1 .45 1 1s-.45 1-1 1h-2.58l-1 3H16c1.1 0 2 .9 2 2v1c0 .55.45 1 1 1h1c.55 0 1 .45 1 1s-.45 1-1 1h-1.5c-1.38 0-2.5-1.12-2.5-2.5V13h-4v4c0 .55-.45 1-1 1s-1-.45-1-1v-4H8v4c0 .55-.45 1-1 1s-1-.45-1-1v-5.08C4.82 12.63 4 11.9 4 11z" />
                          </svg>
                        )}
                        {pkg.buttonIcon === "mountain" && <Mountain className="w-5 h-5" />}
                        {pkg.buttonIcon === "palm" && <Palmtree className="w-5 h-5" />}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Indicators */}
            <div className="flex justify-center items-center gap-2 mt-12">
              <span className="nav-dot active" />
              <span className="nav-dot" />
              <span className="nav-dot" />
            </div>

            {/* Bottom Watermarks */}
            <div className="flex justify-between items-center text-[10px] tracking-[0.25em] text-[#6B7672] uppercase mt-8 border-t border-[#E5E0D6] pt-4">
              <span className="flex items-center gap-2">
                DUBAI BEYOND ORDINARY
              </span>
              <span className="font-script text-xl text-[#D4A353] capitalize tracking-normal">
                Explore Dream Discover
              </span>
            </div>

          </ScrollReveal>
        </div>
      </section>

      {/* ==========================================
          SECTION 4: WHAT OUR GUESTS SAY (TESTIMONIALS)
      ========================================== */}
      <section id="reviews" className="py-16 relative min-h-[620px] flex flex-col justify-between text-white overflow-hidden">
        {/* Background Image (User Uploaded Desert Sunset Image) */}
        <img
          src="/guest_reviews_bg.jpg"
          alt="Dubai desert sunset with camels and Burj Khalifa skyline"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />

        {/* Soft Warm Wash Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/65 z-1" />

        {/* Background Dotted Matrix Square */}
        <DottedSquare className="absolute top-12 left-10 z-1 opacity-30 text-white" />

        <div className="relative z-10 section-shell h-full flex flex-col justify-between">

          {/* Top Row Titles & Badges (Scrolls from Left) */}
          <ScrollReveal direction="left" className="w-full flex flex-col items-center text-center mb-8">
            <div className="w-full flex justify-between text-[10px] tracking-[0.25em] text-white/60 uppercase mb-2">
              <span className="font-script text-2xl text-[#E4B564] capitalize tracking-normal">More Than a Trip A Story to Tell</span>
              <span>T E S T I M O N I A L S ———</span>
            </div>

            {/* Arch Stamp Badge Right */}
            <div className="self-end hidden md:block -mt-8 mb-4">
              <div className="stamp-badge border-white/30 text-white">
                <Palmtree className="w-5 h-5 text-[#E4B564]" />
                <span className="text-[7px] tracking-[0.2em] uppercase font-bold">DUBAI EXPERIENCES</span>
                <span className="text-[6px] tracking-[0.15em] uppercase opacity-70">UNFORGETTABLE JOURNEYS</span>
              </div>
            </div>

            {/* Main Title */}
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white font-normal mb-2">
              What Our <em className="gold-italic font-normal">Guests Say</em>
            </h2>
            <p className="text-xs uppercase tracking-[0.3em] text-[#E4B564] font-semibold mb-6">
              REAL EXPERIENCES. REAL ADVENTURES. REAL MEMORIES.
            </p>

            {/* Google Rating Score Banner */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span className="font-bold text-white text-sm">Excellent</span>
              <div className="flex text-[#FFD700] text-sm">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <span className="text-xs text-white/80">Based on <strong>628 reviews</strong></span>
            </div>
          </ScrollReveal>

          {/* 4 Testimonial Cards Carousel Row (Scrolls from Right) */}
          <ScrollReveal direction="right" className="relative my-8">
            {/* Slider Navigation Arrows */}
            <button
              onClick={() => setReviewIndex((reviewIndex - 1 + testimonialsData.length) % testimonialsData.length)}
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-[#E4B564] hover:text-[#0D3B33] text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg"
              aria-label="Previous Review"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setReviewIndex((reviewIndex + 1) % testimonialsData.length)}
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-[#E4B564] hover:text-[#0D3B33] text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg"
              aria-label="Next Review"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonialsData.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFFDF9] text-[#1D2523] rounded-xl p-6 shadow-xl flex flex-col justify-between border border-white/40 group hover:-translate-y-2 transition-transform duration-300"
                >
                  {/* Reviewer Meta Row */}
                  <div className="flex-1 flex flex-col justify-between relative">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${item.avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-md shrink-0`}>
                            {item.initial}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm leading-tight text-[#0D3B33]">{item.name}</h4>
                            <span className="text-[10px] text-[#6B7672]">{item.time}</span>
                          </div>
                        </div>

                        {/* Google Verified Icon */}
                        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
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
                      <p className="text-xs text-[#4A5550] leading-relaxed italic">
                        "{item.text}"
                      </p>
                    </div>

                    {/* Bottom Quote Mark */}
                    <div className="self-end text-3xl font-serif text-[#D4A353]/40 mt-4 leading-none">
                      ”
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Pagination Indicators */}
          <div className="flex justify-center items-center gap-2 mb-8">
            <span className="nav-dot active" />
            <span className="nav-dot" />
            <span className="nav-dot" />
          </div>

          {/* Bottom 4 Stats Bar */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-white/20 text-center">
            <div>
              <span className="font-serif text-2xl font-bold text-white block">1000+</span>
              <span className="text-[9px] tracking-widest text-[#E4B564] uppercase font-semibold">HAPPY TRAVELERS</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-white block">4.9/5</span>
              <span className="text-[9px] tracking-widest text-[#E4B564] uppercase font-semibold">GOOGLE RATING</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-white block">TRUSTED</span>
              <span className="text-[9px] tracking-widest text-[#E4B564] uppercase font-semibold">TRAVEL PARTNER</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-white block">MEMORABLE</span>
              <span className="text-[9px] tracking-widest text-[#E4B564] uppercase font-semibold">EXPERIENCES</span>
            </div>
          </div>

          <div className="text-right text-[10px] tracking-[0.2em] text-white/50 uppercase">
            DUBAI BEYOND ORDINARY
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 5: EXCLUSIVE ATTRACTION OFFER
      ========================================== */}
      <section id="attractions" className="py-24 bg-[#F8F5EF] relative overflow-hidden">
        {/* Background Dotted Matrix Square */}
        <DottedSquare className="absolute top-12 left-12 z-0 opacity-40" />

        <div className="section-shell relative z-10">

          {/* Header Row (Scrolls from Left) */}
          <ScrollReveal direction="left" className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="w-full flex justify-between text-[10px] tracking-[0.25em] text-[#6B7672] uppercase mb-2">
                <span>DUBAI • ABU DHABI • HATTA AND BEYOND</span>
              </div>
              <div className="section-subtitle mb-2">
                <span>EXPLORE BEYOND THE DESERT</span>
                <span className="w-8 h-[1px] bg-[#D4A353]" />
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0D3B33]">
                Exclusive <em className="gold-italic">Attraction Packages</em>
              </h2>
              <p className="text-sm text-[#6B7672] mt-2">
                Discover iconic destinations, cultural experiences and breathtaking landscapes with our handpicked tour packages.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-script text-2xl text-[#D4A353] hidden md:block">
                More Than a Trip A Story to Tell
              </span>
              <a
                href="#map"
                className="bg-white border border-[#D4A353]/50 text-[#0D3B33] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full hover:bg-[#D4A353] hover:text-white transition-all shadow-xs"
              >
                View All Tours →
              </a>
            </div>
          </ScrollReveal>

          {/* 3 Tall Attraction Cards Grid (Scrolls from Right) */}
          <ScrollReveal direction="right">

            {/* 3 Tall Attraction Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {toursData.map((tour, idx) => (
                <div key={idx} className="tour-card group flex flex-col justify-between p-8 text-white">
                  {/* Background Image */}
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 z-0"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 z-1" />

                  {/* Top Category Tag */}
                  <div className="relative z-10">
                    <span className="text-[9px] tracking-[0.2em] font-bold uppercase text-[#E4B564] bg-black/50 px-3 py-1 rounded-xs backdrop-blur-xs">
                      {tour.tag}
                    </span>
                  </div>

                  {/* Bottom Card Content Overlay */}
                  <div className="relative z-10 flex flex-col justify-end mt-auto">
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
                      {tour.title}
                    </h3>

                    {/* Price Tag */}
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-xs uppercase text-white/70">starting from</span>
                      <span className="font-serif text-4xl font-bold text-[#E4B564]">{tour.price}</span>
                      <span className="text-xs text-white/80">AED / pax</span>
                    </div>

                    {/* Bullet Inclusions List */}
                    <ul className="space-y-2 mb-8 border-t border-white/20 pt-4">
                      {tour.inclusions.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-white/90">
                          <Check className="w-4 h-4 text-[#E4B564] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Gold CTA Button */}
                    <a href="#map" className="btn-gold w-full text-center justify-center py-4 text-xs font-bold uppercase tracking-wider mb-4">
                      BOOK NOW &nbsp; →
                    </a>

                    {/* Footer Tag */}
                    <p className="text-[8px] tracking-[0.2em] uppercase text-center text-white/60 font-semibold border-t border-white/10 pt-3">
                      {tour.footerTag}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Script Watermark */}
            <div className="text-left text-xs text-[#6B7672] font-script text-2xl text-[#D4A353] mt-8">
              Explore Discover Experience
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==========================================
          GOOGLE MAP LOCATION SECTION (REPLACING OLD FOOTER CTA)
      ========================================== */}
      <section id="map" className="py-20 bg-[#FAF7F2] border-t border-[#E5E0D6] relative overflow-hidden">
        {/* Background Dotted Matrix Square */}
        <DottedSquare className="absolute top-6 left-6 z-0 opacity-40" />

        <ScrollReveal direction="left" className="section-shell relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4A353] font-bold block mb-2">
              OUR DUBAI LOCATION
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#0D3B33] mb-4">
              Visit Our <em className="gold-italic">Dubai Office</em>
            </h2>
            <p className="text-sm text-[#4A5550] leading-relaxed">
              Micron Technical Services, Karama Zabeel Street, Montana Building, 304 - Dubai - United Arab Emirates
            </p>
          </div>

          {/* Map Container & Address Card Overlay */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#E5E0D6] h-[480px]">
            {/* Embedded Google Maps iFrame centered at Karama Zabeel Street */}
            <iframe
              title="Desert Journey DXB Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.685237752184!2d55.30690687637841!3d25.249188477678544!2m3!1f0!0f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f439b006db4eb%3A0x1e44c164c9e8c2b1!2sMontana%20Building%2C%20Al%20Karama%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1726270000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter contrast-105"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* ==========================================
          NEW FOOTER REDESIGN MATCHING MOCKUP IMAGE 1 & 2
      ========================================== */}
      <footer id="contact" className="relative text-white overflow-hidden footer-mockup-bg">
        {/* Background Image (User Uploaded Image 2) */}
        <img
          src="/footer_bg.png"
          alt="Dubai desert sunset camel caravan background"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-40 mix-blend-luminosity"
        />

        {/* Gradient Overlay Matching Image 1 Dark Styling */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#051E1A] via-[#072B25]/90 to-[#0A332C]/80 z-1" />

        <ScrollReveal direction="up" className="relative z-10 w-full max-w-[1340px] mx-auto px-6 pt-16 pb-8">

          {/* Main 4 Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#E4B564]/20">

            {/* Column 1: Brand & Social (3 cols) */}
            <div className="lg:col-span-3 flex flex-col items-start pr-4 border-r-0 lg:border-r border-[#E4B564]/20">
              <FooterLogo />

              <p className="text-xs text-white/70 leading-relaxed mt-6 mb-6">
                Experience the magic of Dubai with unforgettable desert safaris, city tours and authentic Arabian hospitality.
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
                  <a href="#packages" className="hover:text-[#E4B564] transition-colors flex items-center gap-2">
                    <span className="text-[#E4B564] font-bold">›</span> Desert Safari Packages
                  </a>
                </li>
                <li>
                  <a href="#attractions" className="hover:text-[#E4B564] transition-colors flex items-center gap-2">
                    <span className="text-[#E4B564] font-bold">›</span> City Tour Packages
                  </a>
                </li>
                <li>
                  <a href="#aboutus" className="hover:text-[#E4B564] transition-colors flex items-center gap-2">
                    <span className="text-[#E4B564] font-bold">›</span> About Us
                  </a>
                </li>
                <li>
                  <a href="#map" className="hover:text-[#E4B564] transition-colors flex items-center gap-2">
                    <span className="text-[#E4B564] font-bold">›</span> Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#map" className="hover:text-[#E4B564] transition-colors flex items-center gap-2">
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
                  <span className="leading-snug">
                    324, Nextcare Building, Al Karama, Dubai
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#E4B564]/40 flex items-center justify-center text-[#E4B564] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a href="mailto:desertjourneydxb@gmail.com" className="hover:text-[#E4B564] transition-colors">
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
                  <a href="#contact" className="hover:text-[#E4B564] transition-colors font-medium">
                    Contact Us
                  </a>
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
            <div>
              © 2025 NextTrip Travel LLC | All Rights Reserved
            </div>

            <div className="flex items-center gap-2 text-[#E4B564] my-3 md:my-0">
              <Palmtree className="w-4 h-4" />
              <span className="text-white/80 font-semibold tracking-[0.2em]">EXPLORE &nbsp;|&nbsp; DISCOVER &nbsp;|&nbsp; EXPERIENCE</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-white/30 inline-block" />
              <span>DUBAI BEYOND ORDINARY</span>
            </div>
          </div>

        </ScrollReveal>
      </footer>
    </main>
  );
}