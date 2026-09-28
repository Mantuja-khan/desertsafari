import { Link } from "@tanstack/react-router";
import { MapPin, Users, Calendar, ArrowRight, Award, Flame } from "lucide-react";
import type { CityTour } from "../data/cityTours";
import { useLanguage } from "../lib/i18n";

export function CityTourCard({ tour }: { tour: CityTour }) {
  const { t, getLocalizedTourData } = useLanguage();
  const localized = getLocalizedTourData(tour.slug, tour);

  return (
    <article className="bg-white rounded-3xl overflow-hidden border border-[#EDE7D9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Thumbnail with Dual Badges (BestSeller & 2025 Traveller's Choice) */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={tour.image}
          alt={localized.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />

        {/* Top-Left: BestSeller Badge (Orange/Gold) */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-[#C68A36] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-md">
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>{t("bestseller", "BestSeller")}</span>
        </div>

        {/* Top-Right: 2025 Traveller's Choice Badge (Emerald Green) */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-[#10B981] text-white text-[10px] font-bold tracking-wide px-3 py-1.5 rounded-full shadow-md backdrop-blur-xs">
          <Award className="w-3.5 h-3.5 fill-current" />
          <span>{t("travellerChoice", "2025 Traveller's Choice")}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-serif text-2xl font-bold text-[#1F2421] leading-snug mb-3 group-hover:text-[#C68A36] transition-colors">
            <Link to="/city-tours/$slug" params={{ slug: tour.slug }}>
              {localized.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-[#68645D] text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 font-sans">
            {localized.description || tour.description}
          </p>

          {/* Location & Tour Type Tags */}
          <div className="flex items-center gap-6 text-xs text-[#524E46] mb-6 font-sans">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#C68A36]" />
              {tour.city}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#C68A36]" />
              {localized.type || tour.type}
            </span>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase text-[#8A857B] font-bold block">{t("from", "FROM")}</span>
            <span className="font-serif text-2xl font-bold text-[#C68A36]">{tour.price}</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/city-tours/$slug"
              params={{ slug: tour.slug }}
              className="bg-[#C68A36] hover:bg-[#B3792A] text-white font-sans font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-none flex items-center gap-2 transition-all shadow-sm active:scale-95 shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t("bookNow", "BOOK NOW")}</span>
            </Link>

            <Link
              to="/city-tours/$slug"
              params={{ slug: tour.slug }}
              className="bg-white hover:bg-stone-50 text-[#C68A36] border border-[#E5DFD3] hover:border-[#C68A36] font-sans font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-none flex items-center gap-1.5 transition-all shadow-xs shrink-0"
            >
              <span>{t("viewMore", "VIEW MORE")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
