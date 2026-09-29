import { createFileRoute, Link } from "@tanstack/react-router";
import { Gem, Compass, ShieldCheck, Camera, Layers, MapPin, UserCheck, Award } from "lucide-react";
import { DESERT_SAFARIS } from "../../data/desertSafaris";
import { DesertSafariCard } from "../../components/DesertSafariCard";
import { TourHeroIntroDemo } from "../../components/TourHeroIntroDemo";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { TextReveal } from "../../components/TextReveal";
import { useLanguage } from "../../lib/i18n";

export const Route = createFileRoute("/desert-safari/")({
  head: () => ({
    meta: [
      { title: "Dubai Desert Safari Packages | Desert Journey DXB" },
      {
        name: "description",
        content:
          "Explore the best Dubai desert safari packages. Evening, Premium, Private, Quad Bike, Dune Buggy, Overnight and Morning Safaris with 4x4 dune bashing, BBQ dinner and live shows.",
      },
    ],
  }),
  component: DesertSafariListPage,
});

function DesertSafariListPage() {
  const { t } = useLanguage();

  return (
    <div
      style={{ animation: "globalPageFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      className="min-h-screen bg-[#FBF9F4] text-[#1D2523] flex flex-col font-sans selection:bg-[#C68A36] selection:text-white page-fade-in"
    >
      {/* Same Website Header */}
      <SiteHeader activeNav="Desert Safari" />

      {/* =========================================================
          HERO SECTION MATCHING LUXURY DESIGN WITH TEXT REVEAL
      ========================================================= */}
      <section className="relative min-h-[440px] sm:min-h-[500px] flex items-center justify-center text-center overflow-hidden text-white pt-28 pb-14 sm:pt-36 sm:pb-18">
        {/* Background Desert Image */}
        <img
          src="/hero_bg.jpg"
          alt="Dubai Desert Safari Dunes"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/70 z-0" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0D3B33]/30 to-black/75 z-0" />

        <div className="relative z-10 max-w-[1000px] mx-auto px-4 flex flex-col items-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-[#C68A36] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-none mb-6 shadow-lg">
            <Compass className="w-3.5 h-3.5" />
            <span>{t("allDesertSafari", "ALL DESERT SAFARI PACKAGES")}</span>
          </div>

          {/* Heading with One-by-One Text Reveal Animation */}
          <TextReveal
            text={t("heroHeadline1", "Experience the Magic of Dubai Desert")}
            as="h1"
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-md"
            delay={0.1}
            stagger={0.08}
          />

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl leading-relaxed mb-10 font-normal">
            {t(
              "heroSubtitle",
              "From heart-pounding 4x4 dune bashing and thrilling quad bikes to tranquil camel treks and 5-star Bedouin camp banquets under starry skies.",
            )}
          </p>

          {/* 4 Feature Badges Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl">
            <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-none py-3 px-3 flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-none bg-[#C68A36] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Gem className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-white/90 leading-tight">
                {t("bestPriceGuarantee", "Best Price Guaranteed")}
              </span>
            </div>

            <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-none py-3 px-3 flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-none bg-[#C68A36] text-white flex items-center justify-center shrink-0 shadow-sm">
                <UserCheck className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-white/90 leading-tight">
                {t("trustedPartner", "Licensed Safari Drivers")}
              </span>
            </div>

            <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-none py-3 px-3 flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-none bg-[#C68A36] text-white flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-white/90 leading-tight">
                {t("freeCancellation24h", "Safe & Insured 4x4 Vehicles")}
              </span>
            </div>

            <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-none py-3 px-3 flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-none bg-[#C68A36] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Camera className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-white/90 leading-tight">
                {t("memorableExp", "5 Live Cultural Shows")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO STORY & DEMO CONTENT SECTION (BELOW TOP CTA)
      ========================================================= */}
      <TourHeroIntroDemo
        tag="AUTHENTIC ARABIAN LUXURY & ADVENTURE"
        title="Experience the Pure Thrill & Royal Comfort of Dubai Dunes"
        description1="Immerse yourself in an unforgettable desert expedition where golden dunes meet 5-star Arabian hospitality. Feel the heart-pounding rush of 4x4 dune bashing, glide across silky dunes on a sandboard, and unwind under the starlit sky at our luxury Bedouin majlis camp."
        description2="Our experienced DTCM-licensed safari drivers, luxury air-conditioned SUV fleet, and private concierge ensure top-tier comfort, safety, and personalized hospitality from doorstep pickup to drop-off."
        demoImage="/polaroid_camp.jpg"
        demoImageAlt="Dubai Desert Safari Luxury Camp Demo"
        isCityTour={false}
      />

      {/* =========================================================
          PACKAGES GRID SECTION (7 DESERT SAFARI PACKAGES)
      ========================================================= */}
      <section className="max-w-[1340px] mx-auto px-4 sm:px-8 py-16 sm:py-20 w-full flex-1">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C68A36] font-bold block mb-2">
            {t("popularPackages", "CHOOSE YOUR ADVENTURE")}
          </span>
          <TextReveal
            text={t("chooseDesertExp", "Handcrafted Desert Safari Packages")}
            as="h2"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D3B33] mb-4"
          />
          <p className="text-sm text-[#6B7672]">
            {t(
              "chooseExpSubtitle",
              "Select your preferred desert safari style, from shared family adventures to VIP luxury sofas, self-drive quad bikes, dune buggies, and overnight stays.",
            )}
          </p>
        </div>

        {/* 7 Safari Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {DESERT_SAFARIS.map((tour) => (
            <DesertSafariCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>

      {/* =========================================================
          BOTTOM TRUST FEATURES STRIP
      ========================================================= */}
      <section className="bg-white border-y border-[#EDE7D9] py-12">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-none bg-amber-50 border border-[#C68A36]/30 flex items-center justify-center text-[#C68A36] shrink-0 shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-[#0D3B33] text-base mb-1">
                Flexible Tour Options
              </h3>
              <p className="text-xs text-[#6B7672]">
                Sharing, Private, VIP & Adventure buggies available
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-none bg-amber-50 border border-[#C68A36]/30 flex items-center justify-center text-[#C68A36] shrink-0 shadow-xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-[#0D3B33] text-base mb-1">
                Lahbab Red Dunes
              </h3>
              <p className="text-xs text-[#6B7672]">
                Explore high crimson dunes & iconic desert terrain
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-none bg-amber-50 border border-[#C68A36]/30 flex items-center justify-center text-[#C68A36] shrink-0 shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-[#0D3B33] text-base mb-1">
                5-Star Entertainment
              </h3>
              <p className="text-xs text-[#6B7672]">
                Fire shows, Tanoura, Belly dance & BBQ banquet
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-none bg-amber-50 border border-[#C68A36]/30 flex items-center justify-center text-[#C68A36] shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-[#0D3B33] text-base mb-1">
                Safe & Reliable
              </h3>
              <p className="text-xs text-[#6B7672]">
                Certified roll-caged 4x4s with comprehensive insurance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Same Website Footer */}
      <SiteFooter />
    </div>
  );
}
