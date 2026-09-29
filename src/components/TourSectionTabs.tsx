import { useState } from "react";
import {
  Check,
  AlertCircle,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  Crown,
  HeartHandshake,
  Utensils,
  Sun,
  Camera,
} from "lucide-react";
import { useLanguage } from "../lib/i18n";

export type TourTabKey =
  | "about"
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
  const [activeTab, setActiveTab] = useState<TourTabKey>("about");

  const tabs: { key: TourTabKey; label: string }[] = [
    { key: "about", label: t("tabAbout", "About") },
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
            LEFT COLUMN: THE TABS LIST
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

          {/* Vertical list of tags with horizontal dividers */}
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

          {/* TAB 2: KNOW BEFORE YOU GO */}
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
                <HeartHandshake className="w-5 h-5 text-[#E69A38] shrink-0" />
                <p className="text-xs text-[#593922] font-medium">
                  Have special dietary requirements, wheelchair assistance or private requests?
                  Contact our 24/7 concierge anytime.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: AGE POLICY */}
          {activeTab === "age-policy" && (
            <div className="animate-fade-in-up space-y-6">
              <div className="border-b border-[#F2EDE2] pb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C68A36]">
                  FAMILY & TICKET GUIDELINES
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B33] mt-1">
                  {t("tabAgePolicy", "Age Policy & Child Rates")}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-[#FAF7F2] border border-[#EDE7D9]">
                  <h4 className="font-serif text-base font-bold text-[#0D3B33] mb-1">
                    👶 Infant Policy (0 - 3 Years)
                  </h4>
                  <p className="text-xs text-[#6A6459] leading-relaxed">{defaultAgePolicy.infant}</p>
                </div>

                <div className="p-4 bg-[#FAF7F2] border border-[#EDE7D9]">
                  <h4 className="font-serif text-base font-bold text-[#0D3B33] mb-1">
                    🧒 Child Policy (3 - 10 Years)
                  </h4>
                  <p className="text-xs text-[#6A6459] leading-relaxed">{defaultAgePolicy.child}</p>
                </div>

                <div className="p-4 bg-[#FAF7F2] border border-[#EDE7D9]">
                  <h4 className="font-serif text-base font-bold text-[#0D3B33] mb-1">
                    🧑 Adult Policy (10+ Years)
                  </h4>
                  <p className="text-xs text-[#6A6459] leading-relaxed">{defaultAgePolicy.adult}</p>
                </div>

                <div className="p-4 bg-amber-50 border border-[#E4B564]/40">
                  <h4 className="font-serif text-sm font-bold text-[#C68A36] mb-1">
                    🛡️ Health & Safety Advisory
                  </h4>
                  <p className="text-xs text-[#6A6459] leading-relaxed">
                    {defaultAgePolicy.advisory}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CANCELLATION POLICY */}
          {activeTab === "cancellation-policy" && (
            <div className="animate-fade-in-up space-y-6">
              <div className="border-b border-[#F2EDE2] pb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C68A36]">
                  FLEXIBILITY & REFUND TERMS
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B33] mt-1">
                  {t("tabCancellationPolicy", "Cancellation & Refund Policy")}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200">
                  <h4 className="font-serif text-base font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Free Cancellation
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    {defaultCancellation.freeCancellation}
                  </p>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200">
                  <h4 className="font-serif text-base font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-amber-600" />
                    Weather Guarantee
                  </h4>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    {defaultCancellation.weatherGuarantee}
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF7F2] p-5 border border-[#EDE7D9]">
                <h4 className="font-serif text-base font-bold text-[#0D3B33] mb-3">
                  Cancellation Terms & Conditions:
                </h4>
                <ul className="space-y-2 text-xs text-[#6A6459]">
                  {defaultCancellation.terms.map((term, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C68A36] font-bold">•</span>
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
