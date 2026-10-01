import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowLeft, Camera, Video, Compass, Star } from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { GallerySection } from "../../components/GallerySection";
import { TextReveal } from "../../components/TextReveal";
import { useLanguage } from "../../lib/i18n";

export const Route = createFileRoute("/gallery/")({
  head: () => ({
    meta: [
      { title: "Photo & Video Gallery | Desert Safari Dubai" },
      {
        name: "description",
        content:
          "Explore authentic moments, stunning high-resolution photography, and thrill-packed tour videos from our luxury Dubai desert safaris, camel rides, quad biking, and VIP Bedouin camps.",
      },
    ],
  }),
  component: GalleryPage,
});
function GalleryPage() {
  const { t } = useLanguage();

  return (
    <div
      style={{ animation: "globalPageFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      className="min-h-screen bg-[#FBF9F4] text-[#1D2523] flex flex-col font-sans selection:bg-[#C68A36] selection:text-white page-fade-in"
    >
      {/* Navigation Header */}
      <SiteHeader activeNav="Gallery" />

      {/* Hero Banner */}
      <section className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center text-center overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-18">
        <img
          src="/guest_reviews_bg.jpg"
          alt="Dubai Desert Safari Gallery"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-[#0D3B33]/60 to-black/85 z-0" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#E4B564]/40 text-[#E4B564] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("galleryBadge", "EXPERIENCES IN PICTURES & CLIPS")}</span>
          </div>
          <TextReveal
            as="h1"
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-bold tracking-tight mb-4"
          >
            {t("officialGallery", "Official Photo & Video")} <em className="gold-italic">{t("gallery", "Gallery")}</em>
          </TextReveal>

          <p className="text-white/90 text-sm sm:text-base max-w-2xl font-light leading-relaxed mb-6">
            {t(
              "galleryHeroSub",
              "Take a glimpse into the thrilling adventures, picturesque desert sunsets, and rich Arabian hospitality waiting for you.",
            )}
          </p>

          <div className="flex items-center gap-3 text-xs text-white/70">
            <Link to="/" className="hover:text-[#E4B564] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="text-[#E4B564] font-semibold">Gallery</span>
          </div>
        </div>
      </section>

      {/* Main Gallery Content */}
      <section className="py-16 sm:py-20 bg-[#F8F5EF] flex-1">
        <div className="section-shell">
          <GallerySection showTitle={false} />
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
