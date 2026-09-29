import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Compass,
  Check,
  Clock,
  Sun,
  Crown,
  Zap,
  Phone,
  ArrowUpRight,
  ShieldCheck,
  Gem,
  Award,
  Sparkles,
  Send,
  HelpCircle,
} from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { TextReveal } from "../../components/TextReveal";
import { useLanguage } from "../../lib/i18n";
import { useBookingModal } from "../../lib/BookingModalContext";
import { DESERT_SAFARIS } from "../../data/desertSafaris";

export const Route = createFileRoute("/packages/")({
  head: () => ({
    meta: [
      { title: "Dubai Desert Safari Packages & Full Benefits | Desert Journey DXB" },
      {
        name: "description",
        content:
          "Browse all Dubai Desert Safari packages with complete benefits and inclusions. VIP Luxury Majlis, Private Car, Quad Bike, Dune Buggy, and Overnight Safaris with best price guarantee.",
      },
    ],
  }),
  component: PackagesPage,
});

// All Comprehensive Safari Packages with Full Inclusions
const allPackagesData = [
  {
    id: "vip",
    slug: "premium-desert-safari",
    category: "vip",
    title: "VIP Desert Safari + Premium Camp",
    tag: "RIDE THE DUNES / FEEL THE THRILL",
    badge: "MOST POPULAR",
    badgeType: "green",
    image: "/pkg_vip.jpg",
    duration: "7 - 8 hours",
    price: "AED 149",
    inclusions: [
      "Pickup & Drop-off By Sharing 4x4 Car",
      "Dune Bashing 4x4 Land Cruiser SUV (30–35 minutes)",
      "Short Camel Ride Experience",
      "Sand Boarding on High Red Dunes",
      "Unlimited Water, Soft drinks, Tea & Arabic Coffee",
      "Hot Beverages & Fresh Dates",
      "Free Welcome Snacks & Starters at 6:45 PM",
      "BBQ Buffet Dinner suitable for Veg & Non-Veg",
      "VIP Sofa Sitting with Personal Table Service",
      "Henna Tattoo for Ladies & Kids",
      "Sunset and Free Arabic Dress Photography",
      "Front Row Live Show Viewing Seats",
    ],
    shows: "2 Belly Dance Shows • 2 Fire Shows • 1 Tanoura Show",
  },
  {
    id: "private",
    slug: "private-desert-safari",
    category: "private",
    title: "Desert Safari in Private Car",
    tag: "YOUR PRIVATE / DESERT ESCAPE",
    badge: "EXCLUSIVE EXPERIENCE",
    badgeType: "gold",
    image: "/pkg_private.jpg",
    duration: "7 - 8 hours",
    price: "AED 699",
    inclusions: [
      "Doorstep Pickup & Drop-off by Private Luxury 4x4 Land Cruiser",
      "Private Dune Bashing Session Tailored to Your Comfort (30 mins)",
      "Exclusive Sunset Photography Stop on Pristine Red Dunes",
      "Private Camel Ride Experience",
      "Sand Boarding Equipment & Guide Assistance",
      "Unlimited Mineral Water, Soft Drinks, Fresh Juices & Arabic Tea",
      "Complimentary Welcome Appetizers & Starter Snacks",
      "International 5-Star BBQ Buffet Dinner (Veg & Non-Veg)",
      "Reserved Family Majlis Area with Plush Cushions",
      "Henna Art & Arabic Costume Photo Booth",
      "Full Camp Live Cultural Entertainment",
    ],
    shows: "2 Belly Dance Shows • 2 Fire Shows • 1 Tanoura Show",
  },
  {
    id: "quad",
    slug: "quad-bike-desert-safari",
    category: "adventure",
    title: "Desert Safari with Quad Bike",
    tag: "MORE POWER / MORE ADVENTURE",
    badge: "THRILLING RIDE",
    badgeType: "teal",
    image: "/pkg_quad.jpg",
    duration: "7 - 8 hours",
    price: "AED 249",
    inclusions: [
      "Pickup & Drop-off by 4x4 Air-Conditioned SUV",
      "30 Minutes Self-Drive Quad Bike (ATV 250cc–350cc) in Open Dunes",
      "High-Octane 4x4 Dune Bashing on Lahbab Red Sand Dunes",
      "Full Safety Gear (Helmet & Goggles) with Safety Instructor",
      "Sandboarding Experience on Desert Slopes",
      "Camel Riding & Sunset Golden Hour Photo Opportunity",
      "Unlimited Soft Drinks, Water, Tea & Arabic Gahwa",
      "Free Snacks & Starters served at Bedouin Camp",
      "Lavish 5-Star BBQ Buffet Dinner with Live Grill Stations",
      "Henna Tattoo Artist for Ladies",
      "Traditional Arabic Costumes for Photos",
      "All 5 Cultural Stage Performances",
    ],
    shows: "2 Belly Dance Shows • 2 Fire Shows • 1 Tanoura Show",
  },
  {
    id: "dune-buggy",
    slug: "dune-buggy-desert-safari",
    category: "adventure",
    title: "Extreme Dune Buggy Safari (Can-Am 1000cc)",
    tag: "HIGH SPEED / MAXIMUM POWER",
    badge: "ULTIMATE ADRENALINE",
    badgeType: "teal",
    image: "/pkg_vip.jpg",
    duration: "6 - 7 hours",
    price: "AED 599",
    inclusions: [
      "Pickup & Drop-off by 4x4 SUV from Dubai/Sharjah",
      "30–60 Minutes Can-Am Maverick 1000cc Turbo Dune Buggy Self-Drive",
      "Custom Roll-Cage & 4-Point Harness with Professional Safety Guide",
      "Guided Desert Convoy through High Red Dunes",
      "Sand Surfing & Desert Dune Bashing",
      "Camel Ride at Bedouin Oasis",
      "Unlimited Refreshments, Cold Sodas, Coffee & Water",
      "Free Arabian Starters & Dates",
      "Deluxe BBQ Buffet Dinner (Vegetarian & Meat Barbecue)",
      "Traditional Henna Body Art",
      "Live Belly Dance, Fire Dance & Tanoura Performances",
    ],
    shows: "2 Belly Dance Shows • 2 Fire Shows • 1 Tanoura Show",
  },
  {
    id: "overnight",
    slug: "overnight-desert-safari",
    category: "overnight",
    title: "Overnight Desert Safari & Stargazing",
    tag: "SLEEP UNDER THE ARABIAN STARS",
    badge: "IMMERSIVE CAMPING",
    badgeType: "gold",
    image: "/polaroid_camp.jpg",
    duration: "18 hours (Overnight)",
    price: "AED 349",
    inclusions: [
      "Roundtrip Pickup & Drop-off in 4x4 Land Cruiser",
      "Evening Dune Bashing, Sandboarding & Sunset Views",
      "Full Bedouin Camp Evening with BBQ Dinner & 5 Live Shows",
      "Overnight Stay in Private Arabic Tent with Beds & Blankets",
      "Midnight Stargazing & Bonfire with Marshmallows & Karak Chai",
      "Quiet Desert Dawn & Sunrise Camel Trek",
      "Freshly Cooked Arabic & Continental Breakfast with Juice & Coffee",
      "Unlimited Mineral Water & Beverages throughout stay",
      "Shisha Lounge Area Access",
      "Dedicated Overnight Camp Host & Concierge",
    ],
    shows: "Full Evening Shows + Midnight Acoustic Fire Experience",
  },
  {
    id: "morning",
    slug: "morning-desert-safari",
    category: "adventure",
    title: "Morning Desert Safari & Camel Trek",
    tag: "FRESH BREEZE / CRISP SUNRISE",
    badge: "EARLY BIRD SPECIAL",
    badgeType: "green",
    image: "/polaroid_camel.jpg",
    duration: "4 - 5 hours",
    price: "AED 119",
    inclusions: [
      "Morning Hotel Pickup (07:30 AM - 08:00 AM) in 4x4 SUV",
      "45 Minutes Exhilarating Red Dune Bashing",
      "Sandboarding Down High Pristine Sand Dunes",
      "Extended Desert Camel Trekking Session",
      "Photostop in the Middle of Virgin Desert Dunes",
      "Chilled Mineral Water & Soft Drinks Provided",
      "Light Arabian Breakfast / Refreshments",
      "Doorstep Drop-off by 12:30 PM",
    ],
    shows: "Morning Sunrise Exploration & Camel Trek",
  },
];

function PackagesPage() {
  const { t } = useLanguage();
  const { openBookingModal } = useBookingModal();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredPackages =
    selectedFilter === "all"
      ? allPackagesData
      : allPackagesData.filter((pkg) => pkg.category === selectedFilter);

  return (
    <div
      style={{ animation: "globalPageFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      className="min-h-screen bg-[#FAF7F2] text-[#1D2523] flex flex-col font-sans selection:bg-[#C68A36] selection:text-white page-fade-in"
    >
      <SiteHeader activeNav="Packages" />

      {/* =========================================================
          HERO BANNER
      ========================================================= */}
      <section className="relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center text-center overflow-hidden text-white pt-28 pb-14 sm:pt-36 sm:pb-18">
        <img
          src="/hero_bg.jpg"
          alt="Dubai Desert Safari Packages"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/75 z-0" />

        <div className="relative z-10 max-w-[1000px] mx-auto px-4 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-[#C68A36] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] px-4 py-1.5 mb-6 shadow-lg">
            <Compass className="w-3.5 h-3.5" />
            <span>{t("allPackagesTitle", "COMPLETE DUBAI DESERT PACKAGES")}</span>
          </div>

          <TextReveal
            text={t("chooseDesertExp", "All Desert Safari Packages & Complete Inclusions")}
            as="h1"
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-md"
            delay={0.1}
            stagger={0.07}
          />

          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl leading-relaxed mb-8">
            {t(
              "packagesPageSubtitle",
              "Discover every single benefit, inclusion, and luxury service included in our tour packages with 100% price transparency and zero hidden fees."
            )}
          </p>

          {/* Quick Filter Badges */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
              { key: "all", label: t("filterAll", "All Packages (6)") },
              { key: "vip", label: t("filterVIP", "VIP & Luxury") },
              { key: "private", label: t("filterPrivate", "Private Car") },
              { key: "adventure", label: t("filterAdventure", "Quad & Buggy") },
              { key: "overnight", label: t("filterOvernight", "Overnight Camping") },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedFilter(tab.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${selectedFilter === tab.key
                    ? "bg-[#E4B564] text-[#0D3B33] shadow-lg scale-105"
                    : "bg-white/15 text-white hover:bg-white/30 backdrop-blur-md"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          ALL PACKAGES FULL INCLUSIONS GRID
      ========================================================= */}
      <section className="max-w-[1340px] mx-auto px-4 sm:px-8 py-16 sm:py-20 w-full flex-1">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C68A36] font-bold block mb-1">
              {t("unmatchedValue", "UNMATCHED VALUE & TRANSPARENCY")}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0D3B33]">
              {t("packageBenefitsHeading", "Every Package Benefit Included in Full")}
            </h2>
          </div>
          <span className="text-xs font-semibold text-[#8C877D] bg-white px-4 py-2 rounded-xl border border-[#E5E0D6] shadow-xs">
            ✨ Showing {filteredPackages.length} Handcrafted Packages
          </span>
        </div>

        {/* Packages Grid: Every card shows ALL benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#E5E0D6] flex flex-col hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Package Image & Badges */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                <span className="absolute top-4 left-4 text-[9px] tracking-[0.2em] font-bold text-white uppercase bg-black/50 px-3 py-1 rounded-sm backdrop-blur-xs">
                  {pkg.tag}
                </span>

                <span
                  className={`absolute top-4 right-4 text-[9px] tracking-wider font-bold uppercase px-3 py-1 rounded-sm flex items-center gap-1.5 shadow-md ${pkg.badgeType === "green"
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

              {/* Package Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0D3B33] mb-3 leading-snug">
                    {pkg.title}
                  </h3>

                  {/* Duration & Price Bar */}
                  <div className="flex items-center justify-between py-3 px-4 bg-[#F8F5EF] rounded-xl border border-[#E5E0D6] mb-5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#0D3B33]">
                      <Clock className="w-4 h-4 text-[#D4A353]" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#8C877D] uppercase font-bold block leading-tight">PRICE</span>
                      <span className="font-serif text-xl font-bold text-[#C68A36] leading-none">
                        {pkg.price}
                      </span>
                    </div>
                  </div>

                  {/* Complete Benefits Inclusions List (SHOWS ALL BENEFITS) */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0D3B33] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#C68A36]" />
                        <span>All {pkg.inclusions.length} Benefits Included:</span>
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        100% Guaranteed
                      </span>
                    </div>

                    <ul className="space-y-2.5">
                      {pkg.inclusions.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-[#4A463E] leading-relaxed">
                          <Check className="w-4 h-4 text-[#C68A36] shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Live Shows & Action Row */}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          FAQ & WHY CHOOSE US
      ========================================================= */}
      <section className="bg-white border-t border-[#EDE7D9] py-16">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C68A36] font-bold block mb-1">
              {t("frequentlyAsked", "FREQUENTLY ASKED QUESTIONS")}
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0D3B33]">
              {t("gotQuestions", "Have Questions About Our Packages?")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#EDE7D9]">
              <h3 className="font-bold text-[#0D3B33] text-sm mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C68A36]" />
                Are there any hidden fees or extra taxes?
              </h3>
              <p className="text-xs text-[#635E54] leading-relaxed">
                No, our prices are completely transparent and include VAT, pickup/drop-off, dune bashing, BBQ dinner, and all live entertainment shows.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#EDE7D9]">
              <h3 className="font-bold text-[#0D3B33] text-sm mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C68A36]" />
                What is the cancellation policy?
              </h3>
              <p className="text-xs text-[#635E54] leading-relaxed">
                We offer free cancellation up to 24 hours prior to tour departure with full refund or flexible date rescheduling.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#EDE7D9]">
              <h3 className="font-bold text-[#0D3B33] text-sm mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C68A36]" />
                What is the difference between Sharing and VIP?
              </h3>
              <p className="text-xs text-[#635E54] leading-relaxed">
                VIP packages include dedicated sofa sitting in an elevated pavilion, table service for dinner and starters, priority camel rides, and front-row stage views.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#EDE7D9]">
              <h3 className="font-bold text-[#0D3B33] text-sm mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C68A36]" />
                Can I customize a package for a group or corporate event?
              </h3>
              <p className="text-xs text-[#635E54] leading-relaxed">
                Yes! We offer customized private desert camps, corporate team building, and wedding/birthday celebrations with tailored catering and entertainment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
