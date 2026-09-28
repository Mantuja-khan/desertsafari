import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  ShieldCheck,
  Compass,
  Headphones,
  Leaf,
  Heart,
  Gem,
  Award,
  ArrowRight,
  Sparkles,
  Tent,
  Star,
  CheckCircle2,
} from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { TextReveal } from "../../components/TextReveal";
import { useLanguage } from "../../lib/i18n";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About Us | Desert Journey DXB" },
      {
        name: "description",
        content:
          "At Desert Safari, we believe that travel is more than just visiting a place – it's about experiencing a culture, connecting with nature, and creating memories that last a lifetime.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1D2523] flex flex-col font-sans selection:bg-[#C68A36] selection:text-white page-fade-in">
      {/* Website Navigation Header */}
      <SiteHeader activeNav="About Us" />

      {/* =========================================================
          HERO BANNER (Our Story - Desert Sunset with 4x4 Jeep)
      ========================================================= */}
      <section className="relative min-h-[420px] sm:min-h-[480px] flex items-center justify-center text-center overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-18">
        {/* Background Image with Zoom Animation */}
        <img
          src="/hero_bg.jpg"
          alt="Our Story Desert Safari"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />

        {/* Warm Golden & Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-amber-950/45 to-black/80 z-0" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#7C4A15]/30 to-black/80 z-0" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
          {/* Small Top Tag */}
          <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#F3C472] font-bold mb-3 animate-fade-in-up">
            {t("aboutUs", "ABOUT US")}
          </span>

          {/* Heading with Word-by-Word Text Reveal */}
          <TextReveal
            text={t("aboutTag", "Our Story")}
            as="h1"
            className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight mb-4 drop-shadow-md"
            delay={0.1}
            stagger={0.08}
          />

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl leading-relaxed font-sans drop-shadow-sm animate-fade-in-up delay-200">
            {t(
              "aboutBody1",
              "At Desert Safari, we believe that travel is more than just visiting a place – it's about experiencing a culture, connecting with nature, and creating memories that last a lifetime.",
            )}
          </p>
        </div>
      </section>

      {/* =========================================================
          SECTION 1: WHO WE ARE (3-COLUMN LAYOUT)
      ========================================================= */}
      <main className="max-w-[1360px] mx-auto px-4 sm:px-8 py-14 sm:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left: Text & CTA (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start animate-fade-in-up delay-100">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C68A36] font-bold mb-2">
              {t("aboutTag", "WHO WE ARE")}
            </span>
            <TextReveal
              as="h2"
              className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2421] leading-tight mb-6"
            >
              {t("authenticExperiences", "Authentic Desert Experiences")},{" "}
              <em className="gold-italic">{t("memorableExp", "Unforgettable Memories")}</em>
            </TextReveal>

            <p className="text-xs sm:text-sm text-[#524E46] leading-relaxed mb-4">
              {t(
                "aboutBody1",
                "We are a passionate team of travel enthusiasts dedicated to showcasing the beauty, culture and traditions of the desert. With years of experience in organizing desert safari tours, we offer unique and authentic experiences that let you explore the golden sands and local heritage.",
              )}
            </p>

            <p className="text-xs sm:text-sm text-[#524E46] leading-relaxed mb-8">
              {t(
                "aboutBody2",
                "From thrilling jeep safaris to peaceful camel rides, from traditional music and dance to delicious local cuisine – we take care of every detail to make your journey safe, enjoyable and truly memorable.",
              )}
            </p>

            <a
              href="/#packages"
              className="bg-[#C68A36] hover:bg-[#B3792A] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-none inline-flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95 hover:translate-y-[-2px]"
            >
              <Compass className="w-4 h-4 animate-spin-slow" />
              <span>{t("packages", "Our Safari Tours")}</span>
            </a>
          </div>

          {/* Center: Desert Camp Image (4 cols) */}
          <div className="lg:col-span-4 relative rounded-none overflow-hidden shadow-xl border border-[#EDE7D9] aspect-[4/5] group animate-fade-in-up delay-200">
            <img
              src="/polaroid_camp.jpg"
              alt="Desert Safari Majlis Camp"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white text-center">
              <span className="font-script text-2xl text-[#F3C472] block">
                {t("arabianHospitality", "Arabian Nights")}
              </span>
              <p className="text-xs text-white/90">
                {t("bedouinCamp", "Authentic Bedouin Desert Camp")}
              </p>
            </div>
          </div>

          {/* Right: 4 Feature Boxes + 4 Stats Grid (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 animate-fade-in-up delay-300">
            {/* 4 Feature Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
              <div className="bg-white rounded-none p-4 border border-[#EDE7D9] shadow-xs flex items-center gap-3.5 hover:shadow-md hover:border-[#C68A36]/40 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-none bg-[#C68A36]/10 text-[#C68A36] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#1F2421]">
                    {t("trustedPartner", "Experienced Team")}
                  </h4>
                  <p className="text-[11px] text-[#8C877D]">Local experts with deep knowledge</p>
                </div>
              </div>

              <div className="bg-white rounded-none p-4 border border-[#EDE7D9] shadow-xs flex items-center gap-3.5 hover:shadow-md hover:border-[#C68A36]/40 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-none bg-[#C68A36]/10 text-[#C68A36] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#1F2421]">
                    {t("bestPriceGuarantee", "Safe & Secure Travel")}
                  </h4>
                  <p className="text-[11px] text-[#8C877D]">Your safety is always our priority</p>
                </div>
              </div>

              <div className="bg-white rounded-none p-4 border border-[#EDE7D9] shadow-xs flex items-center gap-3.5 hover:shadow-md hover:border-[#C68A36]/40 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-none bg-[#C68A36]/10 text-[#C68A36] flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#1F2421]">
                    {t("authenticExperiences", "Authentic Experiences")}
                  </h4>
                  <p className="text-[11px] text-[#8C877D]">
                    Real culture, real people, real heritage
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-none p-4 border border-[#EDE7D9] shadow-xs flex items-center gap-3.5 hover:shadow-md hover:border-[#C68A36]/40 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-none bg-[#C68A36]/10 text-[#C68A36] flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#1F2421]">24/7 Support</h4>
                  <p className="text-[11px] text-[#8C877D]">We&apos;re always here to help you</p>
                </div>
              </div>
            </div>

            {/* 4 Stats Counters */}
            <div className="grid grid-cols-4 gap-2 bg-white rounded-none p-4 border border-[#EDE7D9] text-center shadow-xs">
              <div className="hover:scale-105 transition-transform duration-200">
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#C68A36] block">
                  10K+
                </span>
                <span className="text-[10px] text-[#8C877D] leading-tight block">
                  {t("happyTravelers", "Happy Travelers")}
                </span>
              </div>
              <div className="hover:scale-105 transition-transform duration-200">
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#C68A36] block">
                  50+
                </span>
                <span className="text-[10px] text-[#8C877D] leading-tight block">
                  {t("packages", "Safari Tours")}
                </span>
              </div>
              <div className="hover:scale-105 transition-transform duration-200">
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#C68A36] block">
                  5+
                </span>
                <span className="text-[10px] text-[#8C877D] leading-tight block">
                  Years Experience
                </span>
              </div>
              <div className="hover:scale-105 transition-transform duration-200">
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#C68A36] block">
                  100%
                </span>
                <span className="text-[10px] text-[#8C877D] leading-tight block">
                  {t("excellent", "Satisfaction")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* =========================================================
          SECTION 2: OUR VALUES & WHAT MAKES US DIFFERENT
      ========================================================= */}
      <section className="bg-white border-y border-[#EDE7D9] py-14 sm:py-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          <div className="mb-10">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C68A36] font-bold block mb-2">
              OUR VALUES
            </span>
            <TextReveal
              as="h2"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2421]"
            >
              What Makes Us Different
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 4 Value Cards (8 cols) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-[#FAF7F2] rounded-none p-6 border border-[#EDE7D9] flex items-start gap-4 hover:shadow-md hover:border-[#C68A36]/40 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-none bg-[#C68A36]/15 text-[#C68A36] flex items-center justify-center shrink-0">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#1F2421] mb-1">
                    Sustainable Tourism
                  </h4>
                  <p className="text-xs text-[#6B655B] leading-relaxed">
                    We promote responsible travel and care for the desert environment.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#FAF7F2] rounded-none p-6 border border-[#EDE7D9] flex items-start gap-4 hover:shadow-md hover:border-[#C68A36]/40 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-none bg-[#C68A36]/15 text-[#C68A36] flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#1F2421] mb-1">
                    Local Community
                  </h4>
                  <p className="text-xs text-[#6B655B] leading-relaxed">
                    We support local people and showcase their traditions and culture.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#FAF7F2] rounded-none p-6 border border-[#EDE7D9] flex items-start gap-4 hover:shadow-md hover:border-[#C68A36]/40 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-none bg-[#C68A36]/15 text-[#C68A36] flex items-center justify-center shrink-0">
                  <Gem className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#1F2421] mb-1">
                    Unique Itineraries
                  </h4>
                  <p className="text-xs text-[#6B655B] leading-relaxed">
                    Customized tours for a truly unforgettable experience.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-[#FAF7F2] rounded-none p-6 border border-[#EDE7D9] flex items-start gap-4 hover:shadow-md hover:border-[#C68A36]/40 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-none bg-[#C68A36]/15 text-[#C68A36] flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#1F2421] mb-1">
                    Passion for Travel
                  </h4>
                  <p className="text-xs text-[#6B655B] leading-relaxed">
                    We love what we do, and it shows in every journey we create.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Banner Card (4 cols) */}
            <div className="lg:col-span-4 relative rounded-none overflow-hidden shadow-lg border border-[#EDE7D9] min-h-[260px] flex items-center justify-center p-8 text-center bg-gradient-to-br from-[#FAF7F2] to-[#E8DFC8]">
              <div className="relative z-10">
                <span className="font-script text-3xl sm:text-4xl text-[#C68A36] font-bold block mb-4 leading-tight">
                  &ldquo;Explore the Desert Like Never Before&rdquo;
                </span>
                <p className="text-xs text-[#5A5449] max-w-xs mx-auto">
                  {t(
                    "heroSubtitle",
                    "Join thousands of happy explorers creating lifelong memories under Arabian skies.",
                  )}
                </p>
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
