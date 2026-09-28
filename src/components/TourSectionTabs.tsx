import { useState } from "react";
import {
  Check,
  AlertCircle,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  Car,
  Users,
  ShieldCheck,
  Compass,
  Crown,
  HeartHandshake,
  Utensils,
  Sun,
  Camera,
} from "lucide-react";
import { useLanguage } from "../lib/i18n";

export type TourTabKey =
  | "about"
  | "overview"
  | "itinerary"
  | "highlights"
  | "know-before-you-go"
  | "age-policy"
  | "cancellation-policy";

export interface TourSectionData {
  title: string;
  description: string;
  type?: string;
  duration?: string;
  price?: string;
  image?: string;
  aboutText?: string;
  overviewFeatures?: {
    title: string;
    description?: string;
    desc?: string;
    icon?: string;
  }[];
  attractions?: {
    title?: string;
    name?: string;
    subtitle?: string;
    image: string;
  }[];
  itinerary?: {
    title: string;
    time?: string;
    description?: string;
    desc?: string;
  }[];
  inclusions?: string[];
  exclusions?: string[];
  knowBeforeYouGo?: string[];
  agePolicy?: {
    infant: string;
    child: string;
    adult: string;
    advisory: string;
  };
  cancellationPolicy?: {
    freeCancellation: string;
    weatherGuarantee: string;
    refundProcess: string;
    terms: string[];
  };
}

export function TourSectionTabs({
  tour,
  isCityTour = false,
}: {
  tour: TourSectionData;
  isCityTour?: boolean;
}) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TourTabKey>("know-before-you-go");

  const tabs: { key: TourTabKey; label: string }[] = [
    { key: "about", label: t("tabAbout", "About") },
    { key: "overview", label: t("tabOverview", "Overview") },
    { key: "itinerary", label: t("tabItinerary", "Itenary") },
    { key: "highlights", label: t("tabHighlights", "Highlights") },
    { key: "know-before-you-go", label: t("tabKnowBeforeYouGo", "Know Before You Go") },
    { key: "age-policy", label: t("tabAgePolicy", "Age Policy") },
    { key: "cancellation-policy", label: t("tabCancellationPolicy", "Cancellation Policy") },
  ];

  // Fallback defaults if not provided in individual tour objects
  const defaultKnowBeforeYouGo = [
    "Dress Code: Casual, comfortable lightweight cotton clothing is recommended during the day. In winter months (Nov - Mar), please bring a light jacket or shawl for cool desert evenings.",
    "Footwear: Open sandals, sneakers, or slip-on shoes are recommended for walking on sand dunes.",
    "Sun Protection: We strongly recommend bringing sunglasses, sunscreen, a hat, and a camera or smartphone for capturing stunning photos.",
    "Health Advisory: Dune bashing is an exhilarating roller-coaster ride over high dunes. It is not recommended for pregnant women, infants under 3 years, or guests with serious heart conditions or back/neck ailments (gentle desert drive options are available upon request).",
    "Meals & Diets: Vegetarian, Vegan, Jain, and Non-Vegetarian food options are available during the BBQ buffet dinner.",
    "Ramadan & UAE Holidays: During Islamic holidays and the Holy Month of Ramadan, live stage dance performances and alcohol service will be modified according to UAE government DTCM regulations.",
    "Cash & Valuables: While all major items are included, we suggest carrying a small amount of cash or card for optional souvenirs, quad bikes, or photography prints.",
  ];

  const defaultAgePolicy = tour.agePolicy || {
    infant:
      "Infants (0 - 3 Years): Free of charge. Infant car seats are provided free of charge on private tours upon advance request.",
    child:
      "Children (3 - 10 Years): Eligible for special discounted child rates with full access to all activities, rides, and dinner buffet.",
    adult: "Adults (10+ Years): Standard adult ticket pricing applies.",
    advisory:
      "Senior Citizens & Guests with Physical Conditions: Soft dune drive routes and front-seat accommodations are gladly arranged by our drivers.",
  };

  const defaultCancellation = tour.cancellationPolicy || {
    freeCancellation:
      "100% Full Refund if cancelled up to 24 hours prior to the scheduled tour pickup time.",
    weatherGuarantee:
      "In the rare event of extreme sandstorms or severe weather conditions, you can reschedule for free or receive a 100% instant refund.",
    refundProcess:
      "Refunds are processed promptly via the original payment method or instant bank transfer within 24 - 48 hours.",
    terms: [
      "Cancellations made 24+ hours before departure: 100% full refund with no cancellation fee.",
      "Cancellations made within 12 - 24 hours of departure: 50% refund or free date change.",
      "No-shows or cancellations within 6 hours of departure: Non-refundable.",
      "Flight delays / Cruise ship schedule changes: Contact our 24/7 concierge for complimentary rescheduling.",
    ],
  };

  return (
    <div className="bg-white border border-[#EDE7D9] shadow-sm overflow-hidden my-8">
      {/* 2-Column Responsive Layout: Left Tabs Sidebar + Right Content Viewer */}
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* =========================================================
            LEFT COLUMN: THE 7 TAGS
        ========================================================= */}
        <div className="md:col-span-5 lg:col-span-4 bg-[#FBF9F4] border-b md:border-b-0 md:border-r border-[#EFE9DC] flex flex-col p-4 sm:p-6 lg:p-8">
          <div className="mb-4 pb-2 border-b border-[#E8DFC9]">
            <span className="text-[10px] tracking-[0.25em] text-[#C68A36] uppercase font-bold">
              {t("tourDetailsPolicies", "TOUR DETAILS & POLICIES")}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1D2523] mt-0.5">
              {t("exploreInfo", "Explore Information")}
            </h3>
          </div>

          {/* Vertical list of 7 tags with horizontal dividers */}
          <nav className="flex flex-col" aria-label="Tour sections">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full text-left py-3.5 sm:py-4 px-2 sm:px-3 font-serif text-lg sm:text-xl md:text-2xl font-semibold border-b border-[#EDE6D8] last:border-b-0 transition-all cursor-pointer flex items-center justify-between group rounded-none ${
                    isActive
                      ? "text-[#E69A38] bg-amber-50/60 font-bold pl-4 border-l-4 border-l-[#E69A38]"
                      : "text-[#3D1E16] hover:text-[#E69A38] hover:bg-black/5"
                  }`}
                >
                  <span className="leading-snug">{tab.label}</span>
                  <span
                    className={`text-xs transition-transform duration-200 ${
                      isActive
                        ? "text-[#E69A38] font-bold translate-x-1"
                        : "text-[#C2B7A3] group-hover:text-[#E69A38]"
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* =========================================================
            RIGHT COLUMN: DYNAMIC CONTENT OF SELECTED TAG
        ========================================================= */}
        <div className="md:col-span-7 lg:col-span-8 p-6 sm:p-8 lg:p-10 flex flex-col justify-start bg-white min-h-[420px]">
          {/* TAB 1: ABOUT */}
          {activeTab === "about" && (
            <div className="animate-fade-in-up space-y-6">
              <div className="border-b border-[#F2EDE2] pb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C68A36]">
                  {tour.type || (isCityTour ? "City Tour Experience" : "Desert Safari Experience")}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B33] mt-1">
                  {t("tabAbout", "About")} {tour.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#4A463F] leading-relaxed">
                {tour.aboutText || tour.description}
              </p>

              <div className="bg-[#FAF7F2] p-5 border border-[#EDE7D9] space-y-3">
                <h4 className="font-serif text-base font-bold text-[#0D3B33] flex items-center gap-2">
                  <Crown className="w-4 h-4 text-[#C68A36]" />
                  <span>The Desert Journey Signature Experience</span>
                </h4>
                <p className="text-xs text-[#6A6459] leading-relaxed">
                  Every journey with Desert Journey DXB is handled by professional, licensed guides
                  with years of expertise. We provide high-end, clean vehicles, cold refreshments,
                  VIP comfort, and an unforgettable immersion into Arabian heritage.
                </p>
              </div>

              {tour.inclusions && (
                <div>
                  <h4 className="font-serif text-base font-bold text-[#0D3B33] mb-3">
                    What Makes This Tour Special:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {tour.inclusions.slice(0, 6).map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#524E46]">
                        <div className="w-4 h-4 bg-[#C68A36] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                          ✓
                        </div>
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="animate-fade-in-up space-y-6">
              <div className="border-b border-[#F2EDE2] pb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C68A36]">
                  KEY TOUR METRICS
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B33] mt-1">
                  {t("tabOverview", "Tour Overview")}
                </h3>
              </div>

              {/* Summary Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#FAF7F2] p-3.5 border border-[#EDE7D9] text-center">
                  <Clock className="w-5 h-5 text-[#C68A36] mx-auto mb-1.5" />
                  <span className="text-[10px] text-[#8A857B] uppercase block">Duration</span>
                  <span className="font-bold text-xs sm:text-sm text-[#0D3B33]">
                    {tour.duration || (isCityTour ? "4 - 8 Hours" : "6 - 7 Hours")}
                  </span>
                </div>

                <div className="bg-[#FAF7F2] p-3.5 border border-[#EDE7D9] text-center">
                  <Car className="w-5 h-5 text-[#C68A36] mx-auto mb-1.5" />
                  <span className="text-[10px] text-[#8A857B] uppercase block">Transport</span>
                  <span className="font-bold text-xs sm:text-sm text-[#0D3B33]">
                    {tour.type || "4x4 Luxury AC"}
                  </span>
                </div>

                <div className="bg-[#FAF7F2] p-3.5 border border-[#EDE7D9] text-center">
                  <MapPin className="w-5 h-5 text-[#C68A36] mx-auto mb-1.5" />
                  <span className="text-[10px] text-[#8A857B] uppercase block">Pickup / Drop</span>
                  <span className="font-bold text-xs sm:text-sm text-[#0D3B33]">
                    Hotel / Residence
                  </span>
                </div>

                <div className="bg-[#FAF7F2] p-3.5 border border-[#EDE7D9] text-center">
                  <Users className="w-5 h-5 text-[#C68A36] mx-auto mb-1.5" />
                  <span className="text-[10px] text-[#8A857B] uppercase block">Languages</span>
                  <span className="font-bold text-xs sm:text-sm text-[#0D3B33]">
                    English / Arabic
                  </span>
                </div>
              </div>

              {/* Features List */}
              {tour.overviewFeatures && tour.overviewFeatures.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {tour.overviewFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#FAF7F2] border border-[#EDE7D9] flex items-start gap-3"
                    >
                      <div className="w-8 h-8 bg-white border border-[#DDD5C7] flex items-center justify-center text-[#C68A36] font-bold shrink-0">
                        ★
                      </div>
                      <div>
                        <h5 className="font-bold text-xs sm:text-sm text-[#0D3B33]">
                          {feat.title}
                        </h5>
                        <p className="text-[11px] text-[#7A7469] mt-0.5 leading-snug">
                          {feat.description || feat.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ITENARY (ITINERARY) */}
          {activeTab === "itinerary" && (
            <div className="animate-fade-in-up space-y-6">
              <div className="border-b border-[#F2EDE2] pb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C68A36]">
                  CHRONOLOGICAL TIMELINE
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B33] mt-1">
                  {t("tabItinerary", "Tour Itinerary")}
                </h3>
              </div>

              {tour.itinerary && tour.itinerary.length > 0 ? (
                <div className="relative border-l-2 border-[#E4B564] ml-3 pl-6 space-y-6">
                  {tour.itinerary.map((step, i) => (
                    <div key={i} className="relative group">
                      {/* Timeline Marker */}
                      <div className="absolute -left-[31px] top-0 w-6 h-6 bg-[#C68A36] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                        {i + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-base font-bold text-[#0D3B33]">
                            {step.title}
                          </h4>
                          {step.time && (
                            <span className="text-[11px] font-bold text-[#C68A36] bg-amber-50 px-2 py-0.5 border border-[#E4B564]/30">
                              {step.time}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#6A6459] mt-1 leading-relaxed">
                          {step.description || step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-[#FAF7F2] border border-[#EDE7D9]">
                    <span className="text-xs font-bold text-[#C68A36]">Step 1: Pick Up</span>
                    <p className="text-xs text-[#5A554C] mt-1">
                      Pick up from your Dubai hotel or residence in a fully air-conditioned vehicle.
                    </p>
                  </div>
                  <div className="p-4 bg-[#FAF7F2] border border-[#EDE7D9]">
                    <span className="text-xs font-bold text-[#C68A36]">
                      Step 2: Exploration & Activities
                    </span>
                    <p className="text-xs text-[#5A554C] mt-1">
                      Enjoy guided excursions, photo stops, dune bashing or landmark tours.
                    </p>
                  </div>
                  <div className="p-4 bg-[#FAF7F2] border border-[#EDE7D9]">
                    <span className="text-xs font-bold text-[#C68A36]">Step 3: Drop Off</span>
                    <p className="text-xs text-[#5A554C] mt-1">
                      Comfortable and safe return transfer back to your original pickup location.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: HIGHLIGHTS */}
          {activeTab === "highlights" && (
            <div className="animate-fade-in-up space-y-6">
              <div className="border-b border-[#F2EDE2] pb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C68A36]">
                  TOP SIGHTS & ACTIVITIES
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B33] mt-1">
                  {t("tabHighlights", "Tour Highlights")}
                </h3>
              </div>

              {tour.attractions && tour.attractions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tour.attractions.map((attr, i) => (
                    <div
                      key={i}
                      className="group bg-[#FAF7F2] border border-[#EDE7D9] overflow-hidden flex flex-col"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={attr.image}
                          alt={attr.title || attr.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-center">
                        <h4 className="font-serif text-base font-bold text-[#0D3B33]">
                          {attr.title || attr.name}
                        </h4>
                        <p className="text-xs text-[#7A7469] mt-0.5">{attr.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#FAF7F2] border border-[#EDE7D9]">
                    <h5 className="font-bold text-sm text-[#0D3B33]">Scenic Photo Stops</h5>
                    <p className="text-xs text-[#7A7469] mt-1">
                      Capture stunning panoramic photographs at iconic locations.
                    </p>
                  </div>
                  <div className="p-4 bg-[#FAF7F2] border border-[#EDE7D9]">
                    <h5 className="font-bold text-sm text-[#0D3B33]">
                      Authentic Arabian Hospitality
                    </h5>
                    <p className="text-xs text-[#7A7469] mt-1">
                      Enjoy complimentary dates, fresh Arabic coffee, and refreshments.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: KNOW BEFORE YOU GO */}
          {activeTab === "know-before-you-go" && (
            <div className="animate-fade-in-up space-y-6">
              <div className="border-b border-[#F2EDE2] pb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#E69A38]">
                  ESSENTIAL TRAVEL INFORMATION
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B33] mt-1">
                  {t("tabKnowBeforeYouGo", "Know Before You Go")}
                </h3>
              </div>

              <div className="space-y-3.5">
                {(tour.knowBeforeYouGo || defaultKnowBeforeYouGo).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3.5 bg-[#FAF7F2] border border-[#EDE7D9]"
                  >
                    <div className="w-5 h-5 bg-[#E69A38] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      !
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A463F] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-amber-50/70 border border-[#E69A38]/30 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#E69A38] shrink-0" />
                <span className="text-xs text-[#6A4B1A]">
                  {t("instantWhatsAppConcierge", "Need personalized assistance or special dietary arrangements? Our concierge is available 24/7 on WhatsApp (+971 582639173).")}
                </span>
              </div>
            </div>
          )}

          {/* TAB 6: AGE POLICY */}
          {activeTab === "age-policy" && (
            <div className="animate-fade-in-up space-y-6">
              <div className="border-b border-[#F2EDE2] pb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C68A36]">
                  GUIDELINES & TICKETING
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B33] mt-1">
                  {t("tabAgePolicy", "Age Policy")}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Infant Card */}
                <div className="p-4 bg-[#FAF7F2] border border-[#EDE7D9] text-center">
                  <div className="w-10 h-10 bg-[#0D3B33] text-white flex items-center justify-center font-bold text-xs mx-auto mb-2">
                    0-3y
                  </div>
                  <h4 className="font-bold text-sm text-[#0D3B33]">Infants (0 - 3)</h4>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">Free Admission</p>
                  <p className="text-[11px] text-[#7A7469] mt-2 leading-relaxed">
                    {defaultAgePolicy.infant}
                  </p>
                </div>

                {/* Child Card */}
                <div className="p-4 bg-[#FAF7F2] border border-[#EDE7D9] text-center">
                  <div className="w-10 h-10 bg-[#C68A36] text-white flex items-center justify-center font-bold text-xs mx-auto mb-2">
                    3-10y
                  </div>
                  <h4 className="font-bold text-sm text-[#0D3B33]">Children (3 - 10)</h4>
                  <p className="text-xs text-[#C68A36] font-semibold mt-1">Child Discount</p>
                  <p className="text-[11px] text-[#7A7469] mt-2 leading-relaxed">
                    {defaultAgePolicy.child}
                  </p>
                </div>

                {/* Adult Card */}
                <div className="p-4 bg-[#FAF7F2] border border-[#EDE7D9] text-center">
                  <div className="w-10 h-10 bg-[#0D3B33] text-white flex items-center justify-center font-bold text-xs mx-auto mb-2">
                    10+y
                  </div>
                  <h4 className="font-bold text-sm text-[#0D3B33]">Adults (10+)</h4>
                  <p className="text-xs text-[#0D3B33] font-semibold mt-1">Standard Rate</p>
                  <p className="text-[11px] text-[#7A7469] mt-2 leading-relaxed">
                    {defaultAgePolicy.adult}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#FAF7F2] border border-[#EDE7D9]">
                <h4 className="font-serif text-base font-bold text-[#0D3B33] mb-1">
                  Senior Citizens & Medical Advisory
                </h4>
                <p className="text-xs text-[#6A6459] leading-relaxed">
                  {defaultAgePolicy.advisory}
                </p>
              </div>
            </div>
          )}

          {/* TAB 7: CANCELLATION POLICY */}
          {activeTab === "cancellation-policy" && (
            <div className="animate-fade-in-up space-y-6">
              <div className="border-b border-[#F2EDE2] pb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C68A36]">
                  PEACE OF MIND GUARANTEE
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B33] mt-1">
                  {t("tabCancellationPolicy", "Cancellation Policy")}
                </h3>
              </div>

              {/* Big Highlight Alert */}
              <div className="bg-emerald-50 border border-emerald-300 p-5 flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-sm text-emerald-900">
                    {t("freeCancellation24h", "Free Cancellation Up To 24 Hours")}
                  </h4>
                  <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                    {defaultCancellation.freeCancellation}
                  </p>
                </div>
              </div>

              {/* Policy Terms List */}
              <div className="space-y-2.5">
                {defaultCancellation.terms.map((term, i) => (
                  <div
                    key={i}
                    className="p-3 bg-[#FAF7F2] border border-[#EDE7D9] flex items-center gap-3 text-xs text-[#4A463F]"
                  >
                    <span className="text-[#C68A36] font-bold">●</span>
                    <span>{term}</span>
                  </div>
                ))}
              </div>

              {/* Weather Guarantee */}
              <div className="bg-[#FAF7F2] p-4 border border-[#EDE7D9] space-y-1">
                <h4 className="font-serif text-sm font-bold text-[#0D3B33] flex items-center gap-2">
                  <Sun className="w-4 h-4 text-[#C68A36]" />
                  <span>Weather & Sandstorm Guarantee</span>
                </h4>
                <p className="text-xs text-[#6A6459] leading-relaxed">
                  {defaultCancellation.weatherGuarantee}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
