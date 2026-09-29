import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import {
  MapPin,
  Users,
  Car,
  User,
  Camera,
  Clock,
  Calendar,
  Send,
  Check,
  X,
  Play,
  Flame,
  Award,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { TextReveal } from "../../components/TextReveal";
import { TourSectionTabs } from "../../components/TourSectionTabs";
import { TourHeroIntroDemo } from "../../components/TourHeroIntroDemo";
import { AutoDragTourImages } from "../../components/AutoDragTourImages";
import { CITY_TOURS, type CityTour } from "../../data/cityTours";
import { useLanguage } from "../../lib/i18n";

export const Route = createFileRoute("/city-tours/$slug")({
  head: ({ params }) => {
    const tour = CITY_TOURS.find((t) => t.slug === params.slug) || (CITY_TOURS[0] as CityTour);
    return {
      meta: [
        { title: `${tour?.title || "City Tour"} | Desert Journey DXB` },
        { name: "description", content: tour?.description || "" },
      ],
    };
  },
  component: CityTourDetailPage,
});

const ICON_MAP: Record<string, typeof Car> = {
  car: Car,
  user: User,
  camera: Camera,
  clock: Clock,
};

function CityTourDetailPage() {
  const { slug } = useParams({ from: "/city-tours/$slug" });
  const { t, getLocalizedTourData } = useLanguage();

  const baseTour: CityTour = (CITY_TOURS.find((t) => t.slug === slug) || CITY_TOURS[0])!;
  const tour: CityTour = getLocalizedTourData(baseTour.slug, baseTour) as CityTour;

  const [adults, setAdults] = useState(1);
  const [infants, setInfants] = useState(0);
  const [selectedPkg, setSelectedPkg] = useState<string>(tour.type);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hotel, setHotel] = useState("");
  const [day, setDay] = useState("28");
  const [month, setMonth] = useState("09");
  const [year, setYear] = useState("2026");

  const otherTours = CITY_TOURS.filter((t) => t.id !== baseTour.id).slice(0, 4);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => setBookingSubmitted(false), 5000);
  };

  return (
    <div
      style={{ animation: "globalPageFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      className="min-h-screen bg-[#FBF9F4] text-[#1D2523] flex flex-col font-sans selection:bg-[#C68A36] selection:text-white page-fade-in"
    >
      {/* Website Navigation Header */}
      <SiteHeader activeNav="City Tours" />

      {/* =========================================================
          HERO BANNER MATCHING IMAGE 3
      ========================================================= */}
      <section className="relative min-h-[480px] sm:min-h-[540px] flex items-center overflow-hidden text-white pt-28 pb-12 sm:pt-36 sm:pb-16">
        {/* Background Dubai Skyline */}
        <img
          src={tour.image}
          alt={tour.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 z-0" />

        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Content (8 cols) */}
          <div className="lg:col-span-8 flex flex-col items-start">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#C68A36] text-white text-[11px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-md mb-4 shadow-md">
              <MapPin className="w-3.5 h-3.5" />
              <span>{tour.tag}</span>
            </div>

            {/* Tour Title with Text Reveal Animation */}
            <TextReveal
              text={tour.title}
              as="h1"
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-4 drop-shadow-md"
              delay={0.1}
              stagger={0.08}
            />

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed mb-8 font-sans">
              Discover the iconic landmarks, modern attractions and rich culture of Dubai on a
              private city tour with complete comfort and flexibility.
            </p>

            {/* Meta Tags Row */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
              <div className="flex items-center gap-1.5 bg-[#C68A36]/90 text-white px-3.5 py-1.5 rounded-md backdrop-blur-xs">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>{t("bestseller")}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-600/90 text-white px-3.5 py-1.5 rounded-md backdrop-blur-xs">
                <Award className="w-3.5 h-3.5 fill-current" />
                <span>{t("travellerChoice")}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/50 text-white/90 px-3.5 py-1.5 rounded-md border border-white/20">
                <MapPin className="w-3.5 h-3.5 text-[#F3C472]" />
                <span>{tour.city}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/50 text-white/90 px-3.5 py-1.5 rounded-md border border-white/20">
                <Users className="w-3.5 h-3.5 text-[#F3C472]" />
                <span>{tour.type}</span>
              </div>
            </div>
          </div>

          {/* Right Tilted Polaroid Photo Collage (Responsive & visible on mobile and desktop) */}
          <div className="lg:col-span-4 w-full flex relative justify-center items-center h-48 xs:h-56 sm:h-64 my-6 lg:my-0">
            {/* Top Right Polaroid */}
            <div className="polaroid-card w-28 xs:w-36 sm:w-44 absolute -top-2 xs:-top-4 sm:-top-6 right-2 sm:right-0 rotate-6 shadow-2xl z-10 hover:rotate-0 hover:scale-105 transition-all duration-300">
              <img
                src="/about_suv.jpg"
                alt="Burj Al Arab & SUV"
                className="w-full h-16 xs:h-20 sm:h-28 object-cover rounded-xs"
              />
            </div>
            {/* Center Left Polaroid */}
            <div className="polaroid-card w-32 xs:w-40 sm:w-48 relative -left-2 sm:-left-4 -rotate-6 shadow-2xl z-20 hover:rotate-0 hover:scale-105 transition-all duration-300">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-20 xs:h-24 sm:h-32 object-cover rounded-xs"
              />
              <p className="font-script text-center text-stone-800 text-xs sm:text-base mt-1 font-bold">
                Explore Dubai
              </p>
            </div>
            {/* Bottom Right Polaroid */}
            <div className="polaroid-card w-28 xs:w-36 sm:w-44 absolute -bottom-2 xs:-bottom-4 sm:-bottom-6 right-4 rotate-3 shadow-2xl z-30 hover:rotate-0 hover:scale-105 transition-all duration-300">
              <img
                src="/dubai-tour-bg.jpg"
                alt="Dubai Skyline"
                className="w-full h-16 xs:h-20 sm:h-28 object-cover rounded-xs"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO HIGHLIGHT STORY & DEMO CONTENT (BELOW TOP CTA)
      ========================================================= */}
      <TourHeroIntroDemo
        tag="AUTHENTIC UAE CITY & HERITAGE EXPERIENCE"
        title={`Explore the Landmarks & Grandeur of ${tour.title}`}
        description1={tour.description}
        description2="Experience world-renowned architectural landmarks, scenic photo stops, vibrant heritage markets, and air-conditioned luxury transport with experienced multilingual city guides."
        demoImage={tour.image || "/dubai-tour-bg.jpg"}
        demoImageAlt={`${tour.title} City Exploration Demo`}
        isCityTour={true}
      />

      {/* =========================================================
          MAIN 2-COLUMN LAYOUT (LEFT DETAILS + RIGHT BOOKING FORM)
      ========================================================= */}
      <main className="flex-1 max-w-[1360px] mx-auto px-4 sm:px-8 py-12 sm:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT COLUMN: TOUR DETAILS & ITINERARY (8 COLS) */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Interactive 7 Tags Section (About, Overview, Itenary, Highlights, Know Before You Go, Age Policy, Cancellation Policy) */}
            <TourSectionTabs tour={tour} isCityTour={true} />

            {/* 1. Tour Overview */}
            <section className="bg-white rounded-3xl p-8 border border-[#EDE7D9] shadow-xs">
              <h2 className="font-serif text-3xl font-bold text-[#1F2421] mb-4">
                {t("tourOverview")}
              </h2>
              <p className="text-sm sm:text-base text-[#524E46] leading-relaxed mb-8">
                {tour.description}
              </p>

              {/* 4 Feature Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {tour.overviewFeatures.map((feat, idx) => {
                  const Icon = ICON_MAP[feat.icon] || Car;
                  return (
                    <div
                      key={idx}
                      className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE7D9] text-center flex flex-col items-center justify-center group hover:border-[#C68A36] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#C68A36]/10 text-[#C68A36] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif text-sm font-bold text-[#1F2421]">{feat.title}</h4>
                      <p className="text-[11px] text-[#8C877D] mt-0.5">{feat.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 2. Top Attractions */}
            <section>
              <h3 className="font-serif text-3xl font-bold text-[#1F2421] mb-6">
                {t("topAttractions")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {tour.attractions.map((attr, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl overflow-hidden border border-[#EDE7D9] shadow-xs group hover:shadow-md transition-all flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={attr.image}
                        alt={attr.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif text-base font-bold text-[#1F2421] leading-snug">
                        {attr.name}
                      </h4>
                      <p className="text-xs text-[#8C877D] mt-1">{attr.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Top Itinerary Timeline */}
            <section className="bg-white rounded-3xl p-8 border border-[#EDE7D9] shadow-xs">
              <h3 className="font-serif text-3xl font-bold text-[#1F2421] mb-8">
                {t("topItinerary")}
              </h3>

              {/* Timeline Horizontal / Stepper */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 relative">
                {tour.itinerary.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center relative">
                    {/* Circle Icon Badge */}
                    <div className="w-12 h-12 rounded-full bg-[#C68A36] text-white flex items-center justify-center font-bold text-sm shadow-md mb-3 z-10">
                      <Car className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-bold text-[#C68A36] uppercase tracking-wider mb-1">
                      {step.time}
                    </span>
                    <h5 className="font-serif text-sm font-bold text-[#1F2421] leading-tight mb-1">
                      {step.title}
                    </h5>
                    <p className="text-[11px] text-[#8C877D] leading-snug">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Watch Tour Video Banner */}
            <section className="relative rounded-3xl overflow-hidden shadow-lg border border-[#EDE7D9] min-h-[220px] flex items-center justify-center text-center p-6 group">
              <img
                src="/dubai-tour-bg.jpg"
                alt="Dubai City Tour Video Banner"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/50" />

              <div className="relative z-10 flex flex-col items-center text-white">
                <button
                  type="button"
                  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white text-white flex items-center justify-center hover:scale-110 transition-transform mb-3 shadow-xl cursor-pointer"
                  aria-label="Play video"
                >
                  <Play className="w-6 h-6 fill-white translate-x-0.5" />
                </button>
                <h4 className="font-serif text-2xl font-bold text-white mb-1">
                  Watch Our Dubai City Tour Video
                </h4>
                <p className="text-xs text-white/80">Experience the highlights before you book</p>
              </div>
            </section>

            {/* 5. Inclusions & Exclusions */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="bg-white rounded-3xl p-7 border border-[#EDE7D9] shadow-xs">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#1F2421]">{t("inclusions")}</h4>
                </div>
                <ul className="space-y-3">
                  {tour.inclusions.map((inc, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-xs sm:text-sm text-[#4A463F]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-white rounded-3xl p-7 border border-[#EDE7D9] shadow-xs">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center">
                    <X className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#1F2421]">{t("exclusions")}</h4>
                </div>
                <ul className="space-y-3">
                  {tour.exclusions.map((exc, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-xs sm:text-sm text-[#4A463F]"
                    >
                      <div className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                        ✕
                      </div>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: BOOKING FORM & SIDEBAR (4 COLS) */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            {/* Price Badge Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#EDE7D9] shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#C68A36] text-white flex items-center justify-center font-bold text-xl shadow-md">
                  ♦
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8A857B]">{t("from")}</span>
                  <div className="font-serif text-3xl font-bold text-[#C68A36] leading-none">
                    {tour.price}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#8A857B] line-through block">
                  {tour.originalPrice}
                </span>
                <span className="text-[11px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">
                  {tour.saveTag}
                </span>
              </div>
            </div>

            {/* Book Your Tour Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE7D9] shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-[#C68A36]" />
                <h3 className="font-serif text-2xl font-bold text-[#1F2421]">{t("bookYourTour")}</h3>
              </div>
              <p className="text-xs text-[#7A746B] mb-6">
                {t("enterDetails")}
              </p>

              {bookingSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center animate-fade-in-up">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-serif text-lg font-bold text-emerald-900 mb-1">
                    {t("bookingSubmitted")}
                  </h4>
                  <p className="text-xs text-emerald-700">
                    {t("bookingSuccessMsg")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  {/* Name */}
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={`${t("yourName")} *`}
                      className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-none px-4 py-3 pl-10 text-xs sm:text-sm text-[#2D2A26] placeholder-[#8C877D] focus:outline-none focus:border-[#C68A36] transition-all"
                    />
                    <User className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={`${t("yourEmail")} *`}
                      className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-none px-4 py-3 pl-10 text-xs sm:text-sm text-[#2D2A26] placeholder-[#8C877D] focus:outline-none focus:border-[#C68A36] transition-all"
                    />
                    <Send className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={`${t("yourPhone")} *`}
                      className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-none px-4 py-3 pl-10 text-xs sm:text-sm text-[#2D2A26] placeholder-[#8C877D] focus:outline-none focus:border-[#C68A36] transition-all"
                    />
                    <Car className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Select Package */}
                  <div className="relative">
                    <select
                      value={selectedPkg}
                      onChange={(e) => setSelectedPkg(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-none px-4 py-3 text-xs sm:text-sm text-[#2D2A26] focus:outline-none focus:border-[#C68A36] transition-all appearance-none cursor-pointer"
                    >
                      <option value="Private Tour">Private Tour ({tour.price})</option>
                      <option value="Sharing Tour">Sharing Tour (AED 99)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#8C877D] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Counters: Adults & Infants */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#FAF7F2] border border-[#E5DFD3] rounded-none p-2.5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#1F2421] block">{t("adults")} *</span>
                        <span className="text-[10px] text-[#8C877D]">10+ Yrs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-6 h-6 rounded-none bg-white border border-stone-200 font-bold flex items-center justify-center text-stone-700 hover:bg-gray-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-bold text-sm">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="w-6 h-6 rounded-none bg-white border border-stone-200 font-bold flex items-center justify-center text-stone-700 hover:bg-gray-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#FAF7F2] border border-[#E5DFD3] rounded-none p-2.5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#1F2421] block">{t("infants")}</span>
                        <span className="text-[10px] text-[#8C877D]">0-9 Yrs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setInfants(Math.max(0, infants - 1))}
                          className="w-6 h-6 rounded-none bg-white border border-stone-200 font-bold flex items-center justify-center text-stone-700 hover:bg-gray-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-bold text-sm">{infants}</span>
                        <button
                          type="button"
                          onClick={() => setInfants(infants + 1)}
                          className="w-6 h-6 rounded-none bg-white border border-stone-200 font-bold flex items-center justify-center text-stone-700 hover:bg-gray-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Street Address / Hotel */}
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={hotel}
                      onChange={(e) => setHotel(e.target.value)}
                      placeholder={`${t("streetAddress")} *`}
                      className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-none px-4 py-3 pl-10 text-xs sm:text-sm text-[#2D2A26] placeholder-[#8C877D] focus:outline-none focus:border-[#C68A36] transition-all"
                    />
                    <MapPin className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Date Picker Row (DD / MM / YYYY) */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="relative">
                      <select
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-none px-2 py-2.5 text-xs text-[#2D2A26] focus:outline-none focus:border-[#C68A36] appearance-none"
                      >
                        {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")).map(
                          (d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ),
                        )}
                      </select>
                      <ChevronDown className="w-3 h-3 text-[#8C877D] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <div className="relative">
                      <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-none px-2 py-2.5 text-xs text-[#2D2A26] focus:outline-none focus:border-[#C68A36] appearance-none"
                      >
                        {[
                          "01",
                          "02",
                          "03",
                          "04",
                          "05",
                          "06",
                          "07",
                          "08",
                          "09",
                          "10",
                          "11",
                          "12",
                        ].map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3 h-3 text-[#8C877D] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <div className="relative">
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-none px-2 py-2.5 text-xs text-[#2D2A26] focus:outline-none focus:border-[#C68A36] appearance-none"
                      >
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                      </select>
                      <ChevronDown className="w-3 h-3 text-[#8C877D] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#C68A36] hover:bg-[#B3792A] text-white font-bold text-xs sm:text-sm py-4 px-6 rounded-none flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 uppercase tracking-wider cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t("bookNow")}</span>
                  </button>

                  <p className="text-[11px] text-center text-[#8C877D] flex items-center justify-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Your information is 100% secure with us.</span>
                  </p>
                </form>
              )}
            </div>

            {/* Need a Customized Tour Banner */}
            <div className="bg-[#F8EFE3] rounded-3xl p-6 border border-[#E8DFC8] flex items-center gap-4">
              <img
                src="/about_suv.jpg"
                alt="Customized Tour SUV"
                className="w-20 h-16 rounded-xl object-cover shadow-sm shrink-0"
              />
              <div>
                <h4 className="font-serif text-base font-bold text-[#1F2421] leading-tight">
                  {t("needCustomizedTour")}
                </h4>
                <p className="text-xs text-[#7A746B] mt-0.5 mb-2">
                  Contact us for special requests or group bookings.
                </p>
                <Link
                  to="/contact"
                  className="text-xs font-bold text-[#C68A36] hover:underline inline-flex items-center gap-1"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* FAQs Widget */}
            <div className="bg-white rounded-3xl p-6 border border-[#EDE7D9] shadow-sm">
              <h4 className="font-serif text-xl font-bold text-[#1F2421] pb-3 mb-4 border-b border-stone-100">
                {t("frequentlyAskedQuestions")}
              </h4>
              <div className="space-y-2.5">
                {tour.faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={index} className="border border-stone-100 rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full text-left p-3 flex items-center justify-between text-xs font-semibold text-[#2D2A26] hover:text-[#C68A36] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-[#8C877D] shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-[#C68A36]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-3 pb-3 text-xs text-[#6B655B] leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* =========================================================
          BOTTOM: EXPLORE MORE UAE TOURS (4 CARDS)
      ========================================================= */}
      <section className="bg-white border-t border-[#EDE7D9] py-14">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2421]">
              {t("exploreMoreTours")}
            </h3>
            <p className="text-xs sm:text-sm text-[#7A746B] mt-1">
              Discover our other popular tours and experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherTours.map((t) => (
              <Link
                key={t.id}
                to="/city-tours/$slug"
                params={{ slug: t.slug }}
                className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all aspect-[16/10] flex flex-col justify-end p-4 text-white"
              >
                <img
                  src={t.image}
                  alt={t.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative z-10 flex items-center justify-between">
                  <h5 className="font-serif text-base font-bold text-white leading-snug">
                    {t.title}
                  </h5>
                  <div className="w-8 h-8 rounded-full bg-[#C68A36] text-white flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Same Website Footer */}
      <SiteFooter />
    </div>
  );
}
