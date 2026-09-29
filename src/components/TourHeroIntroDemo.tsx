import { ShieldCheck, Compass, Users, Sparkles, Check, ArrowRight, MessageCircle, Star } from "lucide-react";
import { TextReveal } from "./TextReveal";
import { useLanguage } from "../lib/i18n";

interface TourHeroIntroDemoProps {
  tag?: string;
  title?: string;
  description1?: string;
  description2?: string;
  features?: string[];
  demoImage?: string;
  demoImageAlt?: string;
  badgeText?: string;
  experienceRating?: string;
  isCityTour?: boolean;
  className?: string;
}

export function TourHeroIntroDemo({
  tag,
  title,
  description1,
  description2,
  features,
  demoImage,
  demoImageAlt,
  badgeText,
  experienceRating = "4.9/5",
  isCityTour = false,
  className = "",
}: TourHeroIntroDemoProps) {
  const { t } = useLanguage();

  const defaultTag = isCityTour
    ? t("exploreBeyondDesert", "AUTHENTIC UAE CITY & HERITAGE EXPERIENCE")
    : t("guestsSayTag", "AUTHENTIC ARABIAN LUXURY & ADVENTURE");

  const defaultTitle = isCityTour
    ? t("cityIntroTitle", "Discover Iconic Landmarks & Cultural Treasures of the Emirates")
    : t("safariIntroTitle", "Experience the Pure Thrill & Royal Luxury of Dubai Dunes");

  const defaultDesc1 = isCityTour
    ? t(
        "cityIntroDesc1",
        "Step beyond the ordinary with our meticulously crafted UAE city excursions. From the soaring modern heights of the Burj Khalifa and Dubai Marina to the historic heritage of Old Dubai and Abu Dhabi's majestic Sheikh Zayed Grand Mosque, explore with ultimate elegance.",
      )
    : t(
        "safariIntroDesc1",
        "Indulge in an unforgettable desert expedition where raw golden sands meet 5-star Arabian hospitality. Feel the heart-pounding rush of 4x4 dune bashing, glide across silky dunes on a sandboard, and unwind under the starlit sky at our luxury Bedouin majlis camp.",
      );

  const defaultDesc2 = isCityTour
    ? t(
        "cityIntroDesc2",
        "Travel in total comfort with our private luxury SUV fleet, certified multilingual guides, and seamless doorstep pickup and drop-off tailored to your schedule.",
      )
    : t(
        "safariIntroDesc2",
        "Enjoy live cultural shows including enchanting Tanoura, fiery spectacles, and traditional music while feasting on a five-star international BBQ banquet with vegetarian and non-vegetarian delicacies.",
      );

  const defaultFeatures = isCityTour
    ? [
        t("cityFeat1", "Door-to-door luxury air-conditioned hotel transfers"),
        t("cityFeat2", "Professional DTCM-certified local tour guides"),
        t("cityFeat3", "Flexible customizable itineraries with photo stops"),
        t("cityFeat4", "Guaranteed best pricing with zero hidden charges"),
      ]
    : [
        t("safariFeat1", "Thrilling 4x4 Land Cruiser high dune bashing & sandboarding"),
        t("safariFeat2", "VIP Bedouin desert camp with 5 live cultural entertainment shows"),
        t("safariFeat3", "Deluxe international BBQ buffet dinner with vegetarian options"),
        t("safariFeat4", "Sunset photo stops, camel riding, and Arabic hospitality coffee"),
      ];

  const defaultImage = isCityTour ? "/dubai-tour-bg.jpg" : "/polaroid_camp.jpg";

  return (
    <section className={`w-full bg-[#FAF7F2] border-b border-[#EDE7D9] py-12 sm:py-16 ${className}`}>
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT SIDE: STORYTELLING CONTENT & HIGHLIGHTS (7 COLS) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#C68A36]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#C68A36] font-bold">
                {tag || defaultTag}
              </span>
            </div>

            {/* Main Title with TextReveal */}
            <TextReveal
              text={title || defaultTitle}
              as="h2"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D3B33] leading-tight mb-5"
            />

            {/* Primary Paragraph */}
            <p className="text-sm sm:text-base text-[#524E46] leading-relaxed mb-4">
              {description1 || defaultDesc1}
            </p>

            {/* Secondary Paragraph */}
            <p className="text-xs sm:text-sm text-[#736E65] leading-relaxed mb-6">
              {description2 || defaultDesc2}
            </p>

            {/* Key Feature Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 pt-4 border-t border-[#EAE3D2]">
              {(features || defaultFeatures).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#C68A36]/15 text-[#C68A36] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs font-medium text-[#2D2A26] leading-snug">{feat}</span>
                </div>
              ))}
            </div>

            {/* Actions Row */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#booking"
                className="bg-[#C68A36] hover:bg-[#B3792A] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-none inline-flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <span>{t("bookNow", "Book This Experience")}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/971582639173"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-stone-50 text-[#0D3B33] border border-[#EDE7D9] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-none inline-flex items-center gap-2 transition-all shadow-xs hover:border-[#C68A36]"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>{t("instantWhatsAppConcierge", "WhatsApp Inquiry")}</span>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: LUXURY DEMO IMAGE SHOWCASE (5 COLS) */}
          <div className="lg:col-span-5 relative">
            {/* Main Visual Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[4/3] group bg-stone-200">
              <img
                src={demoImage || defaultImage}
                alt={demoImageAlt || "Dubai Safari Demo Experience"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Bottom Image Overlay Label */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#F3C472] block mb-1">
                  {badgeText || t("dubaiBeyondOrdinary", "DUBAI BEYOND ORDINARY")}
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-bold leading-tight drop-shadow-sm">
                  {isCityTour ? "Unmatched City Wonders" : "Golden Dunes & Starlit Nights"}
                </h4>
              </div>
            </div>

            {/* Floating Top Badge */}
            <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-xl border border-[#EDE7D9] flex items-center gap-2 z-20">
              <div className="w-8 h-8 rounded-full bg-[#C68A36]/15 text-[#C68A36] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-[#8C877D] font-bold uppercase block leading-none">
                  {t("travellerChoice", "Award Winner")}
                </span>
                <span className="text-xs font-bold text-[#0D3B33]">{experienceRating} ★★★★★</span>
              </div>
            </div>

            {/* Floating Bottom Left Badge */}
            <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-[#0D3B33] text-white rounded-2xl px-4 py-2.5 shadow-xl border border-[#E4B564]/40 flex items-center gap-2.5 z-20">
              <ShieldCheck className="w-5 h-5 text-[#E4B564]" />
              <div>
                <span className="text-[10px] text-[#E4B564] font-bold uppercase block leading-none">
                  100% {t("bestPriceGuarantee", "Best Price")}
                </span>
                <span className="text-xs font-bold text-white">Verified Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
