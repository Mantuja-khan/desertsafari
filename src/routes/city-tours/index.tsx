import { createFileRoute, Link } from "@tanstack/react-router";
import { Gem, Compass, ShieldCheck, Camera, Layers, MapPin, UserCheck, Award } from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { CityTourCard } from "../../components/CityTourCard";
import { TextReveal } from "../../components/TextReveal";
import { CITY_TOURS } from "../../data/cityTours";
import { useLanguage } from "../../lib/i18n";

export const Route = createFileRoute("/city-tours/")({
  head: () => ({
    meta: [
      { title: "Explore the Beauty of UAE | City Tours & Packages" },
      {
        name: "description",
        content:
          "From iconic cities to stunning mountains and coastal gems, our handpicked city tours offer unforgettable experiences for every traveler.",
      },
    ],
  }),
  component: CityToursPage,
});

function CityToursPage() {
  const { t } = useLanguage();

  return (
    <div
      style={{ animation: "globalPageFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      className="min-h-screen bg-[#FBF9F4] text-[#1D2523] flex flex-col font-sans selection:bg-[#C68A36] selection:text-white page-fade-in"
    >
      {/* Website Navigation Header */}
      <SiteHeader activeNav="City Tours" />

      {/* =========================================================
          HERO BANNER (Explore the Beauty of UAE)
      ========================================================= */}
      <section className="relative min-h-[440px] sm:min-h-[500px] flex items-center justify-center text-center overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-18">
        {/* Dubai Skyline Sunset Background */}
        <img
          src="/dubai-tour-bg.jpg"
          alt="Dubai and UAE City Skyline"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Warm Golden / Amber Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-amber-950/45 to-black/80 z-0" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#7C4A15]/30 to-black/80 z-0" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-[#C68A36]/80 backdrop-blur-xs text-white text-[11px] font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-none mb-4 shadow-md">
            <Compass className="w-3.5 h-3.5" />
            <span>{t("allCityTours", "ALL CITY TOURS PACKAGES")}</span>
          </div>

          {/* Title with Word-by-Word Text Reveal */}
          <TextReveal
            text={t("exploreCityTours", "Explore the Beauty of UAE")}
            as="h1"
            className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight mb-4 drop-shadow-md"
            delay={0.1}
            stagger={0.08}
          />

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl leading-relaxed mb-8 font-sans drop-shadow-sm animate-fade-in-up delay-200">
            {t(
              "attractionsSub",
              "From iconic cities to stunning mountains and coastal gems, our handpicked city tours offer unforgettable experiences for every traveler.",
            )}
          </p>

          {/* Hero Trust Badges Strip (4 Features) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-3xl pt-4 border-t border-white/20">
            <div className="flex items-center gap-2.5 text-left text-white">
              <div className="w-9 h-9 rounded-none bg-[#C68A36]/90 flex items-center justify-center shrink-0">
                <Gem className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">{t("bestPriceGuarantee", "Best Price")}</p>
                <p className="text-[10px] text-white/70">Guaranteed</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-left text-white">
              <div className="w-9 h-9 rounded-none bg-[#C68A36]/90 flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">{t("trustedPartner", "Experienced")}</p>
                <p className="text-[10px] text-white/70">Local Guides</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-left text-white">
              <div className="w-9 h-9 rounded-none bg-[#C68A36]/90 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">{t("freeCancellation24h", "Safe & Comfortable")}</p>
                <p className="text-[10px] text-white/70">Travel</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-left text-white">
              <div className="w-9 h-9 rounded-none bg-[#C68A36]/90 flex items-center justify-center shrink-0">
                <Camera className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">{t("memorableExp", "Unforgettable")}</p>
                <p className="text-[10px] text-white/70">Experiences</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN TOURS GRID
      ========================================================= */}
      <main className="flex-1 max-w-[1360px] mx-auto px-4 sm:px-8 py-14 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {CITY_TOURS.map((tour) => (
            <CityTourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </main>

      {/* =========================================================
          BOTTOM VALUE FEATURES STRIP (4 ITEMS)
      ========================================================= */}
      <section className="bg-white border-y border-[#EDE7D9] py-10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-none bg-[#C68A36]/10 text-[#C68A36] flex items-center justify-center shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#1F2421]">
                  Flexible Tour Options
                </h4>
                <p className="text-xs text-[#7A746B] mt-1">Private & Sharing Tours available</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-none bg-[#C68A36]/10 text-[#C68A36] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#1F2421]">{t("topAttractions", "Top Attractions")}</h4>
                <p className="text-xs text-[#7A746B] mt-1">
                  Explore iconic landmarks and hidden gems
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-none bg-[#C68A36]/10 text-[#C68A36] flex items-center justify-center shrink-0">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#1F2421]">
                  Professional Guides
                </h4>
                <p className="text-xs text-[#7A746B] mt-1">
                  Friendly, knowledgeable and experienced
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-none bg-[#C68A36]/10 text-[#C68A36] flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#1F2421]">{t("bestPriceGuarantee", "Safe & Reliable")}</h4>
                <p className="text-xs text-[#7A746B] mt-1">Your safety is always our priority</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Same Website Footer */}
      <SiteFooter />
    </div>
  );
}
