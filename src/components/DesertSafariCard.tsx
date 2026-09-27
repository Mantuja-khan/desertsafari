import { Link } from "@tanstack/react-router";
import { MapPin, Users, Flame, Star, Sparkles, Check } from "lucide-react";
import type { DesertSafariTour } from "../data/desertSafaris";

export function DesertSafariCard({ tour }: { tour: DesertSafariTour }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#EDE7D9] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Dual Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          {tour.isBestSeller ? (
            <span className="inline-flex items-center gap-1 bg-[#D48B28] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md">
              <Flame className="w-3 h-3 fill-white" />
              BestSeller
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-[#0D3B33] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md">
              <Sparkles className="w-3 h-3 text-[#E4B564]" />
              Popular
            </span>
          )}

          {tour.isTravellerChoice && (
            <span className="inline-flex items-center gap-1 bg-[#00AA6C] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md">
              <Star className="w-3 h-3 fill-white" />
              2025 Traveller's Choice
            </span>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B33] leading-snug mb-2 group-hover:text-[#C68A36] transition-colors">
            {tour.title}
          </h3>

          {/* Description (2 lines clamp) */}
          <p className="text-xs sm:text-sm text-[#635E54] line-clamp-2 leading-relaxed mb-4">
            {tour.description}
          </p>

          {/* Key Inclusions Preview */}
          <div className="space-y-1.5 mb-4 border-t border-[#F2EDE2] pt-3">
            {tour.inclusions.slice(0, 3).map((inc, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-[#524D44]">
                <Check className="w-3.5 h-3.5 text-[#C68A36] shrink-0" />
                <span className="line-clamp-1">{inc}</span>
              </div>
            ))}
          </div>

          {/* Location & Tour Type Tags */}
          <div className="flex items-center gap-4 text-xs text-[#787267] font-medium pt-2">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C68A36]" />
              <span>{tour.city}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#C68A36]" />
              <span>{tour.type}</span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="mt-6 pt-4 border-t border-[#F2EDE2] flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[11px] uppercase font-bold text-[#8C877D]">FROM</span>
            <span className="font-serif text-2xl font-bold text-[#C68A36]">{tour.price}</span>
            {tour.originalPrice && (
              <span className="text-xs text-gray-400 line-through">{tour.originalPrice}</span>
            )}
            {tour.saveAmount && (
              <span className="ml-auto text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {tour.saveAmount}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/desert-safari/$slug"
              params={{ slug: tour.slug }}
              className="bg-[#C68A36] hover:bg-[#B3792B] text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-all text-center"
            >
              BOOK NOW
            </Link>

            <Link
              to="/desert-safari/$slug"
              params={{ slug: tour.slug }}
              className="border border-[#D4CEBF] hover:border-[#C68A36] text-[#4A463F] hover:text-[#C68A36] text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg flex items-center justify-center gap-1 transition-all text-center"
            >
              VIEW MORE →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
