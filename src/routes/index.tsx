import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, type ReactNode } from "react";
import heroVideo from "../assets/untitledvideo.mp4";
import { BLOG_POSTS } from "../data/blogs";

import { CITY_TOURS } from "../data/cityTours";
import { DESERT_SAFARIS } from "../data/desertSafaris";
import { BlogCard } from "../components/BlogCard";
import { TextReveal } from "../components/TextReveal";
import { LanguageSelector } from "../components/LanguageSelector";
import { SiteFooter } from "../components/SiteFooter";
import { GuestReviewsCarousel } from "../components/GuestReviewsCarousel";
import { ChooseExperienceCarousel } from "../components/ChooseExperienceCarousel";
import { AttractionsCarousel } from "../components/AttractionsCarousel";
import { GallerySection } from "../components/GallerySection";
import { HERO_GALLERY_PREVIEW } from "../data/galleryData";
import { useLanguage, getLocalizedPackage } from "../lib/i18n";
import { useBookingModal } from "../lib/BookingModalContext";
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
        content: "Conquer the Dunes. Experience the Magic. Book your desert safari & city tours.",
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
  {
    name: "Marcus & Sarah Jenkins",
    time: "6 months ago",
    avatarBg: "bg-amber-600",
    initial: "M",
    photo: "/pkg_private.jpg",
    text: "Outstanding private desert safari! The sunset photography over the red dunes was breathtaking, and the VIP majlis dinner with fire shows exceeded all expectations.",
  },
  {
    name: "Elena Rostova",
    time: "8 months ago",
    avatarBg: "bg-purple-600",
    initial: "E",
    photo: "/pkg_quad.jpg",
    text: "The quad bike adventure was super fun and safe. Professional instructors, clean camp, delicious BBQ and very polite staff. 10/10 recommended in Dubai!",
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
const heroHeadlinePart1 = ["Habibi, ", "Come to ", "Dubai."];
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

// User-Uploaded Hero Desert Video Background (Camel Riding, Safari Riding & Bike Riding)
function HeroVideoBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      <video
        autoPlay
        loop
        muted
        playsInline
        // @ts-ignore
        webkit-playsinline="true"
        poster="/hero_bg.jpg"
        className="w-full h-full object-cover object-[center_35%] sm:object-center scale-100 sm:scale-105 transition-transform duration-1000"
      >
        <source src={heroVideo} type="video/mp4" />
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-riding-a-quad-bike-in-the-desert-41584-large.mp4"
          type="video/mp4"
        />
        <img
          src="/hero_bg.jpg"
          alt="Dubai Desert Sunset background"
          className="w-full h-full object-cover object-[center_35%] sm:object-center"
        />
      </video>
    </div>
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
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
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
  const { t, currentLanguage, getLocalizedTourData, getLocalizedAttractionPackages } = useLanguage();
  const { openBookingModal } = useBookingModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCityToursOpen, setMobileCityToursOpen] = useState(false);
  const [mobileSafariOpen, setMobileSafariOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [reviewIndex, setReviewIndex] = useState(0);

  const heroFeatures = [
    {
      title: t("thrillingSafari", "Thrilling Desert Safari"),
      subtitle: t("thrillingSafariSub", "4x4 Dune Bashing & Sandboarding"),
      icon: Car,
      offset: "translate-y-0",
    },
    {
      title: t("authenticCamel", "Authentic Camel Rides"),
      subtitle: t("authenticCamelSub", "Sunset Caravan Trails"),
      icon: Compass,
      offset: "translate-y-0 sm:translate-y-2",
    },
    {
      title: t("bedouinCamp", "Traditional Bedouin Camp"),
      subtitle: t("bedouinCampSub", "BBQ Dinner & Live Shows"),
      icon: FlameKindling,
      offset: "translate-y-0 sm:translate-y-4",
    },
    {
      title: t("exploreCityTours", "Explore Dubai City Tours"),
      subtitle: t("exploreCityToursSub", "Iconic Landmarks & Heritage"),
      icon: Building,
      offset: "translate-y-0 sm:translate-y-6",
    },
  ];

  const navItems = [
    { name: t("home", "Home"), href: "/", isRoute: true },
    { name: t("aboutUs", "About Us"), href: "/about", isRoute: true },
    {
      name: t("desertSafari", "Desert Safari"),
      href: "/desert-safari",
      isRoute: true,
      hasSafariDropdown: true,
    },
    {
      name: t("cityTours", "City Tours"),
      href: "/city-tours",
      isRoute: true,
      hasCityDropdown: true,
    },
    { name: t("packages", "Packages"), href: "/packages", isRoute: true },
    { name: t("blogs", "Blogs"), href: "/blog", isRoute: true },
    { name: t("gallery", "Gallery"), href: "/gallery", isRoute: true },
    { name: t("contact", "Contact"), href: "/contact", isRoute: true },
  ];

  return (
    <main
      id="top"
      style={{ animation: "globalPageFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      className="min-h-screen bg-[#F8F5EF] text-[#1D2523] selection:bg-[#E4B564] selection:text-[#0D3B33]"
    >
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
      <section className="relative min-h-[100svh] min-h-[100dvh] sm:min-h-screen max-h-none sm:max-h-[1080px] flex flex-col justify-between text-white overflow-hidden">
        {/* Background Video showing Desert Activities (Camel Riding, Safari Dune Bashing, Quad Bike) */}
        <HeroVideoBackground />

        {/* Responsive Overlay with Balanced Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D3B33]/80 via-[#0D3B33]/40 to-black/30 sm:from-[#0D3B33]/85 sm:via-[#0D3B33]/45 sm:to-black/35 z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 sm:via-transparent sm:to-black/55 z-1" />

        {/* Header Navigation */}
        <header className="relative z-50 w-full max-w-[1340px] mx-auto px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-between border-b border-white/20 animate-fade-in-up delay-100">
          <Logo />

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 font-sans text-xs tracking-wider">
            {navItems.map((item) => {
              const isActive = activeTab === item.name;

              return (
                <div key={item.name} className="relative group py-6 flex items-center">
                  {item.isRoute ? (
                    <Link
                      to={item.href}
                      onClick={() => setActiveTab(item.name)}
                      className={`relative transition-colors flex items-center gap-1 ${isActive
                        ? "text-[#E4B564] font-semibold"
                        : "text-white/80 hover:text-[#E4B564]"
                        }`}
                    >
                      <span>{item.name}</span>
                      {(item.hasSafariDropdown || item.hasCityDropdown) && (
                        <ChevronDown className="w-3.5 h-3.5 text-[#E4B564] transition-transform duration-200 group-hover:rotate-180" />
                      )}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E4B564]" />
                      )}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setActiveTab(item.name)}
                      className={`relative transition-colors flex items-center gap-1 ${isActive
                        ? "text-[#E4B564] font-semibold"
                        : "text-white/80 hover:text-[#E4B564]"
                        }`}
                    >
                      <span>{item.name}</span>
                      {isActive && (
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
                        {DESERT_SAFARIS.map((safari) => {
                          const locSafari = getLocalizedTourData(safari.slug, safari);
                          return (
                            <Link
                              key={safari.id}
                              to="/desert-safari/$slug"
                              params={{ slug: safari.slug }}
                              className="block px-4 py-2.5 text-xs text-gray-800 hover:text-[#C68A36] hover:bg-amber-50/60 rounded-none transition-colors font-sans"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{locSafari.title}</span>
                                <span className="text-[11px] font-bold text-[#C68A36]">
                                  {safari.price}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
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
                        {CITY_TOURS.map((tour) => {
                          const locTour = getLocalizedTourData(tour.slug, tour);
                          return (
                            <Link
                              key={tour.id}
                              to="/city-tours/$slug"
                              params={{ slug: tour.slug }}
                              className="block px-4 py-2.5 text-xs text-gray-800 hover:text-[#C68A36] hover:bg-amber-50/60 rounded-none transition-colors font-sans"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{locTour.title}</span>
                                <span className="text-[11px] font-bold text-[#C68A36]">
                                  {tour.price}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Header Action Controls: Language Selector + Book Now */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSelector />
            <button
              type="button"
              onClick={() => openBookingModal({ tourTitle: "VIP Desert Safari" })}
              className="bg-[#E4B564] text-[#0D3B33] font-sans font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-none flex items-center gap-2 hover:bg-[#E8C88B] transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              {t("bookNow", "Book Now")}
            </button>
          </div>

          {/* Mobile Menu Toggle & Language Selector */}
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
        </header>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-24 inset-x-0 bg-[#0D3B33] border-b border-[#E4B564]/30 z-50 p-6 flex flex-col gap-3 text-white animate-fade-in-up max-h-[80vh] overflow-y-auto shadow-2xl">
            {navItems.map((item) => (
              <div key={item.name} className="flex flex-col border-b border-white/10 pb-2">
                <div className="flex items-center justify-between">
                  {item.isRoute ? (
                    <Link
                      to={item.href}
                      onClick={() => {
                        if (!item.hasCityDropdown && !item.hasSafariDropdown) {
                          setMobileMenuOpen(false);
                        }
                      }}
                      className="text-base font-serif tracking-wide hover:text-[#E4B564] py-1"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-serif tracking-wide hover:text-[#E4B564] py-1"
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
                        className={`w-4 h-4 transition-transform ${mobileSafariOpen ? "rotate-180" : ""
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
                        className={`w-4 h-4 transition-transform ${mobileCityToursOpen ? "rotate-180" : ""
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
                      {t("allDesertSafari", "• View All Desert Safari Packages →")}
                    </Link>
                    {DESERT_SAFARIS.map((safari) => {
                      const locSafari = getLocalizedTourData(safari.slug, safari);
                      return (
                        <Link
                          key={safari.id}
                          to="/desert-safari/$slug"
                          params={{ slug: safari.slug }}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs text-white/80 hover:text-[#E4B564] flex items-center justify-between py-1"
                        >
                          <span>• {locSafari.title}</span>
                          <span className="text-[10px] text-[#E4B564]">{safari.price}</span>
                        </Link>
                      );
                    })}
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
                      {t("allCityTours", "• View All City Tours →")}
                    </Link>
                    {CITY_TOURS.map((t) => {
                      const locTour = getLocalizedTourData(t.slug, t);
                      return (
                        <Link
                          key={t.id}
                          to="/city-tours/$slug"
                          params={{ slug: t.slug }}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs text-white/80 hover:text-[#E4B564] flex items-center justify-between py-1"
                        >
                          <span>• {locTour.title}</span>
                          <span className="text-[10px] text-[#E4B564]">{t.price}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal({ tourTitle: "VIP Desert Safari" });
              }}
              className="bg-[#E4B564] text-[#0D3B33] font-bold uppercase text-center py-3 rounded mt-2 flex items-center justify-center gap-2 shadow-md cursor-pointer w-full"
            >
              <Calendar className="w-4 h-4" />
              {t("bookNow", "Book Now")}
            </button>
          </div>
        )}

        {/* Top Floating Side Annotations */}
        <div className="relative z-10 hidden xl:flex justify-between w-full max-w-[1340px] mx-auto px-6 pt-4 text-[10px] tracking-[0.25em] text-white/60 uppercase animate-fade-in-up delay-200">
          <span>{t("exploreDiscoverExperience", "EXPLORE • DISCOVER • EXPERIENCE")}</span>
          <span className="flex items-center gap-2">
            {t("dubaiBeyondOrdinary", "DUBAI BEYOND ORDINARY")}
            <span className="w-8 h-[1px] bg-white/40 inline-block" />
          </span>
        </div>

        {/* Hero Central Content */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-6 sm:py-12 flex-1 flex flex-col justify-center items-center text-center">
          {/* Subtitle */}
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#E4B564] font-semibold mb-2 sm:mb-4 animate-fade-in-up delay-200">
            {t("adventureAwaits", "A D V E N T U R E   A W A I T S")}
          </span>

          {/* Animated Headline: Word-by-Word Reveal */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] sm:leading-[1.05] tracking-tight max-w-5xl mb-3 sm:mb-4 drop-shadow-lg">
            <span className="inline-block">
              {heroHeadlinePart1.map((word, i) => (
                <span
                  key={i}
                  className="reveal-word font-bold inline-block mr-2 sm:mr-3 text-white"
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
                  className="reveal-word font-bold inline-block mr-2 sm:mr-3 text-[#E4B564]"
                  style={{ animationDelay: `${0.8 + i * 0.18}s` }}
                >
                  {word}
                </span>
              ))}
            </em>
          </h1>

          {/* Camel Divider Motif */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 my-2 sm:my-3 text-[#E4B564]/80 animate-fade-in-up delay-600">
            <span className="w-8 sm:w-12 h-[1px] bg-[#E4B564]/50" />
            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current animate-pulse" viewBox="0 0 24 24">
              <path d="M19 13c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2v-2c0-1.1-.9-2-2-2zM4 11c0-1.1.9-2 2-2h3.58l.71-2.13C10.59 6.28 11.23 6 11.92 6H15c.55 0 1 .45 1 1s-.45 1-1 1h-2.58l-1 3H16c1.1 0 2 .9 2 2v1c0 .55.45 1 1 1h1c.55 0 1 .45 1 1s-.45 1-1 1h-1.5c-1.38 0-2.5-1.12-2.5-2.5V13h-4v4c0 .55-.45 1-1 1s-1-.45-1-1v-4H8v4c0 .55-.45 1-1 1s-1-.45-1-1v-5.08C4.82 12.63 4 11.9 4 11z" />
            </svg>
            <span className="w-8 sm:w-12 h-[1px] bg-[#E4B564]/50" />
          </div>

          {/* Subtext */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-white/95 max-w-3xl font-medium leading-relaxed mt-2 sm:mt-3 mb-6 sm:mb-8 animate-fade-in-up delay-700 drop-shadow-md">
            {t(
              "heroSubtitle",
              "Indulge in the untamed beauty of the desert with our exclusive safaris where opulence meets adventure. Glide over the dunes in a private 4×4, sip champagne under a fiery sunset, and unwind in a royal-style camp with gourmet dining.",
            )}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 animate-fade-in-up delay-800">
            <a href="#packages" className="btn-gold text-xs px-6 sm:px-8 py-3.5 sm:py-4">
              {t("bookSafariNow", "BOOK YOUR SAFARI NOW")} &nbsp; →
            </a>
            <button
              onClick={() => alert("Playing Virtual Experience Trailer...")}
              className="flex items-center gap-2.5 sm:gap-3 text-xs tracking-wider uppercase font-semibold text-white/90 hover:text-[#E4B564] transition-colors group cursor-pointer"
            >
              <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/40 flex items-center justify-center group-hover:border-[#E4B564] group-hover:scale-105 transition-all">
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
              </span>
              {t("watchExperience", "WATCH THE EXPERIENCE")}
            </button>
          </div>

        </div>

        {/* Left Side Number Indicator */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 text-xs font-mono text-white/50 z-10 animate-fade-in-up delay-500">
          <span className="text-[#E4B564] font-bold text-sm border-b border-[#E4B564] pb-1">
            01
          </span>
          <span>02</span>
          <span>03</span>
          <span>04</span>
        </div>

        {/* Bottom Left Scroll Indicator */}
        <div className="absolute left-8 bottom-6 hidden xl:flex items-center gap-2 text-[9px] tracking-[0.25em] text-white/70 uppercase z-10 animate-fade-in-up delay-700">
          <ArrowRight className="w-3 h-3 rotate-90" />
          {t("scrollToExplore", "SCROLL TO EXPLORE")}
        </div>

        {/* Hero Bottom Bar Service Highlights (Desert Dune Wave Curve Style) */}
        <div className="relative z-10 w-full py-4 sm:py-8 bg-gradient-to-t from-black/85 via-black/50 to-transparent border-t border-white/15 animate-fade-in-up delay-800">
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

          {/* 4 Tags Grid: Small screens show 4 icons without green background, and tooltip on hover */}
          <div className="w-full max-w-[1340px] mx-auto px-4 sm:px-6 grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 items-center relative z-10">
            {heroFeatures.map((feature, idx) => {
              const IconComp = feature.icon;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-4 bg-transparent sm:bg-[#0D3B33]/85 backdrop-blur-sm sm:backdrop-blur-md border border-white/25 sm:border-[#E4B564]/30 p-2 sm:p-4 rounded-xl shadow-lg hover:border-[#E4B564] hover:scale-105 transition-all duration-300 group cursor-pointer ${feature.offset}`}
                >
                  {/* Floating tooltip on small screens showing the name on hover */}
                  <div className="absolute -top-11 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-[#0D3B33] text-[#E4B564] border border-[#E4B564]/60 text-[11px] font-sans font-semibold rounded-md whitespace-nowrap shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-30 block sm:hidden">
                    {feature.title}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0D3B33]" />
                  </div>

                  {/* Icon circle: NO green background on small screen (crystal translucent), gold on hover */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 sm:bg-[#E4B564]/20 border border-white/30 sm:border-[#E4B564]/50 flex items-center justify-center text-[#E4B564] group-hover:bg-[#E4B564] group-hover:text-[#0D3B33] transition-colors shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <h4 className="font-serif text-base font-semibold text-white leading-tight">
                      {feature.title}
                    </h4>
                    <p className="text-[10px] text-white/70 tracking-wider">{feature.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: SHORT ABOUT SECTION (TIGHTENED GAP)
      ========================================== */}
      <section
        id="aboutus"
        className="pt-14 pb-4 sm:pt-16 sm:pb-6 bg-[#F8F5EF] relative overflow-hidden"
      >
        <div className="section-shell grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Visuals & Tilted Polaroids (Scrolls from Left) */}
          <ScrollReveal
            direction="left"
            className="lg:col-span-6 relative flex flex-col items-center"
          >
            {/* Top Tag Annotations */}
            <div className="w-full flex justify-between text-[10px] tracking-[0.25em] text-[#6B7672] uppercase mb-4">
              <span>{t("moreThanTrip", "MORE THAN A TRIP")}</span>
              <span>{t("aStoryToTell", "A STORY TO TELL")}</span>
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
                {t("feelTheDesert", "Feel the Desert")}
              </div>

              {/* Slider Arrows */}
              <div className="absolute bottom-6 right-6 flex items-center gap-3 text-white/70">
                <button className="hover:text-[#E4B564] transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="w-8 h-[1px] bg-white/40" />
                <button className="hover:text-[#E4B564] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Overlapping Dark Teal Block with 2 Tilted Polaroids */}
            <div className="absolute right-[-20px] md:right-[-40px] top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-6 z-20">
              {/* Polaroid 1 (Top Tilted Left) */}
              <div className="polaroid-card w-48 -rotate-6 shadow-2xl border border-white">
                <img
                  src="/polaroid_camel.jpg"
                  alt="Camel caravan ride sunset"
                  className="w-full h-36 object-cover rounded-xs"
                />
                <p className="font-script text-lg text-center text-[#1D2523] mt-2 font-semibold">
                  {t("authenticExperiences", "Authentic Experiences")}
                </p>
              </div>

              {/* Polaroid 2 (Bottom Tilted Right) */}
              <div className="polaroid-card w-48 rotate-6 shadow-2xl border border-white mt-[-20px]">
                <img
                  src="/polaroid_camp.jpg"
                  alt="Bedouin luxury camp night"
                  className="w-full h-36 object-cover rounded-xs"
                />
                <p className="font-script text-lg text-center text-[#1D2523] mt-2 font-semibold">
                  {t("arabianHospitality", "Arabian Hospitality")}
                </p>
              </div>
            </div>

            {/* Bottom Subtitle Tag */}
            <div className="w-full flex justify-between text-[10px] tracking-[0.25em] text-[#6B7672] uppercase mt-4">
              <span>{t("dubaiBeyondOrdinary", "DUBAI BEYOND ORDINARY")}</span>
            </div>
          </ScrollReveal>

          {/* Right Column: About Content (Scrolls from Right) */}
          <ScrollReveal
            direction="right"
            className="lg:col-span-6 flex flex-col items-start pl-0 lg:pl-6"
          >
            {/* Subtitle */}
            <div className="section-subtitle mb-3">
              <span>{t("aboutTag", "ABOUT DESERTJOURNEYDXB")}</span>
              <span className="w-12 h-[1px] bg-[#D4A353]" />
            </div>

            {/* Heading with Word-by-Word Text Reveal */}
            <TextReveal
              as="h2"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0D3B33] leading-[1.1] mb-6"
            >
              {t("aboutHeading1", "Your Gateway to an")} <br />
              {t("aboutHeading2", "Extraordinary")}{" "}
              <em className="gold-italic">{t("aboutHeading3", "Dubai Adventure")}</em>
            </TextReveal>

            {/* Body Text */}
            <p className="font-sans text-sm text-[#4A5550] leading-relaxed mb-4">
              {t(
                "aboutBody1",
                "At DesertJourneyDXB, we believe travel is more than just a destination — it’s an experience that stays with you forever. From thrilling desert safaris and breathtaking city tours to authentic Arabian hospitality, we create unforgettable moments that let you discover the real beauty of Dubai.",
              )}
            </p>
            <p className="font-sans text-sm text-[#4A5550] leading-relaxed mb-8">
              {t(
                "aboutBody2",
                "Join us for a journey where adventure, culture and luxury come together in the most extraordinary way.",
              )}
            </p>

            {/* Discover Story Button */}
            <a href="#packages" className="btn-gold text-xs px-8 py-4">
              {t("discoverStory", "DISCOVER OUR STORY")} &nbsp; →
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ==========================================
          SECTION 3: CHOOSE YOUR DESERT EXPERIENCE (TIGHTENED GAP)
      ========================================== */}
      <section
        id="packages"
        className="pt-4 pb-20 sm:pt-6 sm:pb-24 bg-[#FAF7F2] relative overflow-hidden"
      >
        <div className="section-shell relative z-10">
          {/* Top Header Row (Scrolls from Left) */}
          <ScrollReveal
            direction="left"
            className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6"
          >
            <div>
              <span className="font-script text-2xl text-[#D4A353] block mb-1">
                {t("adventureAwaits", "Adventure Awaits")}
              </span>
              <div className="section-subtitle mb-2">
                <span>{t("popularPackages", "POPULAR PACKAGES")}</span>
                <span className="w-8 h-[1px] bg-[#D4A353]" />
              </div>
              <TextReveal
                as="h2"
                className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0D3B33]"
              >
                {t("chooseDesertExp", "Choose Your")}{" "}
                <em className="gold-italic">{t("desertExperience", "Desert Experience")}</em>
              </TextReveal>
              <p className="text-sm text-[#6B7672] mt-2">
                {t(
                  "chooseExpSubtitle",
                  "Thrilling adventures, authentic culture and unforgettable memories.",
                )}
              </p>
            </div>
          </ScrollReveal>

          {/* Draggable Single Horizontal Line Carousel on Small Screens / 3 Grid on Desktop */}
          <ScrollReveal direction="right">
            <ChooseExperienceCarousel
              packages={packagesData.map((rawPkg) =>
                getLocalizedPackage(rawPkg, currentLanguage.code),
              )}
            />

            {/* Bottom Watermarks */}
            <div className="flex justify-between items-center text-[10px] tracking-[0.25em] text-[#6B7672] uppercase mt-8 border-t border-[#E5E0D6] pt-4">
              <span className="flex items-center gap-2">DUBAI BEYOND ORDINARY</span>
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
      <section
        id="reviews"
        className="py-16 relative min-h-[620px] flex flex-col justify-between text-white overflow-hidden"
      >
        {/* Background Image (User Uploaded Desert Sunset Image) */}
        <img
          src="/guest_reviews_bg.jpg"
          alt="Dubai desert sunset with camels and Burj Khalifa skyline"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />

        {/* Soft Warm Wash Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/65 z-1" />

        <div className="relative z-10 section-shell h-full flex flex-col justify-between">
          {/* Top Row Titles & Badges (Scrolls from Left) */}
          <ScrollReveal
            direction="left"
            className="w-full flex flex-col items-center text-center mb-8"
          >
            <div className="w-full flex justify-between text-[10px] tracking-[0.25em] text-white/60 uppercase mb-2">
              <span className="font-script text-2xl text-[#E4B564] capitalize tracking-normal">
                More Than a Trip A Story to Tell
              </span>
              <span>T E S T I M O N I A L S ———</span>
            </div>

            {/* Arch Stamp Badge Right */}
            <div className="self-end hidden md:block -mt-8 mb-4">
              <div className="stamp-badge border-white/30 text-white">
                <Palmtree className="w-5 h-5 text-[#E4B564]" />
                <span className="text-[7px] tracking-[0.2em] uppercase font-bold">
                  DUBAI EXPERIENCES
                </span>
                <span className="text-[6px] tracking-[0.15em] uppercase opacity-70">
                  UNFORGETTABLE JOURNEYS
                </span>
              </div>
            </div>

            {/* Main Title with Word-by-Word Reveal */}
            <TextReveal
              as="h2"
              className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white font-normal mb-2"
            >
              {t("whatOurGuestsSay", "What Our Guests Say")}
            </TextReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[#E4B564] font-semibold mb-6">
              {t("guestsSayTag", "REAL EXPERIENCES. REAL ADVENTURES. REAL MEMORIES.")}
            </p>

            {/* Google Rating Score Banner */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="font-bold text-white text-sm">{t("excellent", "Excellent")}</span>
              <div className="flex text-[#FFD700] text-sm">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <span className="text-xs text-white/80">
                {t("googleRating", "Based on 628 reviews")}
              </span>
            </div>
          </ScrollReveal>

          {/* Testimonial Cards Carousel Row (Draggable & Single Horizontal Line on Small Screens) */}
          <ScrollReveal direction="right" className="relative my-4">
            <GuestReviewsCarousel testimonials={testimonialsData} />
          </ScrollReveal>

          {/* Bottom 4 Stats Bar */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-white/20 text-center">
            <div>
              <span className="font-serif text-2xl font-bold text-white block">1000+</span>
              <span className="text-[9px] tracking-widest text-[#E4B564] uppercase font-semibold">
                {t("happyTravelers", "HAPPY TRAVELERS")}
              </span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-white block">4.9/5</span>
              <span className="text-[9px] tracking-widest text-[#E4B564] uppercase font-semibold">
                {t("googleRatingBadge", "GOOGLE RATING")}
              </span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-white block">TRUSTED</span>
              <span className="text-[9px] tracking-widest text-[#E4B564] uppercase font-semibold">
                {t("trustedPartner", "TRUSTED TRAVEL PARTNER")}
              </span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-white block">MEMORABLE</span>
              <span className="text-[9px] tracking-widest text-[#E4B564] uppercase font-semibold">
                {t("memorableExp", "MEMORABLE EXPERIENCES")}
              </span>
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
        <div className="section-shell relative z-10">
          {/* Header Row (Scrolls from Left) */}
          <ScrollReveal
            direction="left"
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
          >
            <div>
              <div className="w-full flex justify-between text-[10px] tracking-[0.25em] text-[#6B7672] uppercase mb-2">
                <span>DUBAI • ABU DHABI • HATTA AND BEYOND</span>
              </div>
              <div className="section-subtitle mb-2">
                <span>{t("exploreBeyondDesert", "EXPLORE BEYOND THE DESERT")}</span>
                <span className="w-8 h-[1px] bg-[#D4A353]" />
              </div>
              <TextReveal
                as="h2"
                className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0D3B33]"
              >
                {t("exclusiveAttractions", "Exclusive Attraction Packages")}
              </TextReveal>
              <p className="text-sm text-[#6B7672] mt-2">
                {t(
                  "attractionsSub",
                  "Discover iconic destinations, cultural experiences and breathtaking landscapes with our handpicked tour packages.",
                )}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-script text-2xl text-[#D4A353] hidden md:block">
                More Than a Trip A Story to Tell
              </span>
              <Link
                to="/city-tours"
                className="bg-white border border-[#D4A353]/50 text-[#0D3B33] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full hover:bg-[#D4A353] hover:text-white transition-all shadow-xs"
              >
                {t("viewAllTours", "View All Tours →")}
              </Link>
            </div>
          </ScrollReveal>

          {/* Draggable Attractions Carousel (Auto-Drag from right to left on Small Screens / 3 Grid on Desktop) */}
          <ScrollReveal direction="right">
            <AttractionsCarousel tours={getLocalizedAttractionPackages()} />

            {/* Bottom Script Watermark */}
            <div className="text-left text-xs text-[#6B7672] font-script text-2xl text-[#D4A353] mt-8">
              Explore Discover Experience
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==========================================
          SECTION: OFFICIAL PHOTO & VIDEO GALLERY (10 Photos + 10 Live Videos)
      ========================================== */}
      <section
        id="gallery"
        className="py-24 bg-[#FAF7F2] border-t border-[#E5E0D6] relative overflow-hidden"
      >
        <div className="section-shell relative z-10">
          <ScrollReveal direction="up">
            <GallerySection isHomePage={true} />
          </ScrollReveal>
        </div>
      </section>

      {/* ==========================================
          SECTION: LATEST BLOG POSTS & TRAVEL TIPS (SHOWS EXACTLY 3 POSTS)
      ========================================== */}
      <section
        id="blogs"
        className="py-24 bg-white border-t border-[#EDE7D9] relative overflow-hidden"
      >
        <div className="section-shell relative z-10">
          {/* Header row with Title & "View More Blogs" Button */}
          <ScrollReveal
            direction="up"
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#C68A36] font-bold block mb-2">
                {t("ourBlogGuides", "OUR BLOG & GUIDES")}
              </span>
              <TextReveal
                as="h2"
                className="font-serif text-4xl sm:text-5xl text-[#0D3B33] leading-tight"
              >
                {t("blogHeading", "Desert Safari Blog & Travel Tips")}
              </TextReveal>
              <p className="text-sm text-[#5A5449] mt-2 max-w-xl">
                {t(
                  "blogSub",
                  "Travel tips, guides, experiences and everything you need to know about exploring the magical deserts.",
                )}
              </p>
            </div>

            <Link
              to="/blog"
              className="bg-[#C68A36] hover:bg-[#B3792A] text-white font-sans font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95 shrink-0 self-start md:self-auto"
            >
              <span>{t("viewMoreBlogs", "View More Blogs")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          {/* 3 Blog Cards Grid (Responsive Grid + Mobile Touch Drag) */}
          <ScrollReveal direction="up" delay={200}>
            <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-4 md:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
              {BLOG_POSTS.slice(0, 3).map((post) => (
                <div key={post.id} className="min-w-[290px] sm:min-w-[320px] md:min-w-0 flex-1">
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==========================================
          GOOGLE MAP LOCATION SECTION (REPLACING OLD FOOTER CTA)
      ========================================== */}
      <section
        id="map"
        className="py-20 bg-[#FAF7F2] border-t border-[#E5E0D6] relative overflow-hidden"
      >
        <ScrollReveal direction="left" className="section-shell relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4A353] font-bold block mb-2">
              {t("ourDubaiLocation", "OUR DUBAI LOCATION")}
            </span>
            <TextReveal as="h2" className="font-serif text-4xl sm:text-5xl text-[#0D3B33] mb-4">
              {t("visitOurOffice", "Visit Our Dubai Office")}
            </TextReveal>
            <p className="text-sm text-[#4A5550] leading-relaxed">
              Micron Technical Services, Karama Zabeel Street, Montana Building, 304 - Dubai -
              United Arab Emirates
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
          FOOTER COMPONENT
      ========================================== */}
      <SiteFooter />
    </main>
  );
}
