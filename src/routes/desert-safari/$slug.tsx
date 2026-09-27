import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  MapPin,
  Users,
  Flame,
  Star,
  Check,
  ChevronDown,
  Car,
  Sparkles,
  Utensils,
  Compass,
  Crown,
  Zap,
  Moon,
  Sun,
  Shield,
  Clock,
  Play,
  ArrowRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import { DESERT_SAFARIS, type DesertSafariTour } from "../../data/desertSafaris";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { TextReveal } from "../../components/TextReveal";

export const Route = createFileRoute("/desert-safari/$slug")({
  loader: ({ params }) => {
    const tour = DESERT_SAFARIS.find((t) => t.slug === params.slug);
    if (!tour) {
      throw notFound();
    }
    return { tour };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.tour
      ? `${loaderData.tour.title} | Desert Journey DXB`
      : "Dubai Desert Safari | Desert Journey DXB";
    const desc = loaderData?.tour
      ? loaderData.tour.description
      : "Book your unforgettable Dubai desert safari experience with best price guarantee.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: DesertSafariDetailPage,
});

function getFeatureIcon(iconName: string) {
  switch (iconName) {
    case "car":
      return <Car className="w-5 h-5 text-[#C68A36]" />;
    case "crown":
      return <Crown className="w-5 h-5 text-[#C68A36]" />;
    case "sparkles":
      return <Sparkles className="w-5 h-5 text-[#C68A36]" />;
    case "utensils":
      return <Utensils className="w-5 h-5 text-[#C68A36]" />;
    case "compass":
      return <Compass className="w-5 h-5 text-[#C68A36]" />;
    case "zap":
      return <Zap className="w-5 h-5 text-[#C68A36]" />;
    case "shield":
      return <Shield className="w-5 h-5 text-[#C68A36]" />;
    case "moon":
      return <Moon className="w-5 h-5 text-[#C68A36]" />;
    case "sun":
      return <Sun className="w-5 h-5 text-[#C68A36]" />;
    case "clock":
      return <Clock className="w-5 h-5 text-[#C68A36]" />;
    default:
      return <Compass className="w-5 h-5 text-[#C68A36]" />;
  }
}

function DesertSafariDetailPage() {
  const { slug } = Route.useParams();
  const tour: DesertSafariTour = DESERT_SAFARIS.find((t) => t.slug === slug) || DESERT_SAFARIS[0];

  const [adults, setAdults] = useState(1);
  const [infants, setInfants] = useState(0);
  const [selectedPkg, setSelectedPkg] = useState(tour.type);
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

  const otherTours = DESERT_SAFARIS.filter((t) => t.id !== tour.id).slice(0, 4);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => setBookingSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1D2523] flex flex-col font-sans selection:bg-[#C68A36] selection:text-white">
      {/* Website Navigation Header */}
      <SiteHeader activeNav="Desert Safari" />

      {/* =========================================================
          HERO BANNER MATCHING IMAGE 3 WITH TEXT REVEAL
      ========================================================= */}
      <section className="relative min-h-[460px] sm:min-h-[520px] flex items-center overflow-hidden text-white py-12">
        {/* Background Skyline / Desert Image */}
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

            {/* Subtitle / Excerpt */}
            <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed mb-8">
              {tour.description}
            </p>

            {/* Badges Strip */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
              <div className="flex items-center gap-1.5 bg-black/50 text-[#F3C472] px-3.5 py-1.5 rounded-md border border-[#F3C472]/30 backdrop-blur-xs">
                <Crown className="w-3.5 h-3.5" />
                <span>BestSeller</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/50 text-white/90 px-3.5 py-1.5 rounded-md border border-white/20">
                <Star className="w-3.5 h-3.5 text-emerald-400" />
                <span>2025 Traveller's Choice</span>
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

          {/* Right Polaroid Photo Collage (4 cols) */}
          <div className="hidden lg:flex lg:col-span-4 relative justify-center items-center">
            {/* Top Right Polaroid */}
            <div className="polaroid-card w-44 absolute -top-12 right-0 rotate-6 shadow-2xl z-10">
              <img
                src="/about_suv.jpg"
                alt="4x4 SUV Bashing"
                className="w-full h-28 object-cover rounded-xs"
              />
            </div>
            {/* Center Left Polaroid */}
            <div className="polaroid-card w-48 relative -left-4 -rotate-6 shadow-2xl z-20">
              <img
                src="/hero_bg.jpg"
                alt="Dubai Desert Safari"
                className="w-full h-32 object-cover rounded-xs"
              />
              <p className="font-script text-center text-stone-800 text-lg mt-2 font-bold">
                Desert Adventure
              </p>
            </div>
            {/* Bottom Right Polaroid */}
            <div className="polaroid-card w-44 absolute -bottom-10 right-4 rotate-3 shadow-2xl z-30">
              <img
                src="/polaroid_camp.jpg"
                alt="Bedouin Camp"
                className="w-full h-28 object-cover rounded-xs"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN 2-COLUMN LAYOUT (LEFT DETAILS + RIGHT BOOKING FORM)
      ========================================================= */}
      <main className="flex-1 max-w-[1360px] mx-auto px-4 sm:px-8 py-12 sm:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT COLUMN: TOUR DETAILS & ITINERARY (8 COLS) */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            {/* 1. Tour Overview */}
            <section className="bg-white rounded-3xl p-8 border border-[#EDE7D9] shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B33]">
                  Tour
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C68A36] italic">
                  Overview
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed mb-8">
                {tour.description}
              </p>

              {/* 4 Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#F2EDE2]">
                {tour.overviewFeatures.map((feat, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#FAF7F2] border border-[#EFE9DC]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#E5DFD3] flex items-center justify-center mb-3 shadow-xs">
                      {getFeatureIcon(feat.icon)}
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#0D3B33] mb-1">
                      {feat.title}
                    </h4>
                    <p className="text-[11px] text-[#7A7469] leading-snug">{feat.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. Top Attractions & Activities */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B33]">
                  Top
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C68A36] italic">
                  Attractions & Activities
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {tour.attractions.map((attr, i) => (
                  <div
                    key={i}
                    className="group bg-white rounded-2xl overflow-hidden border border-[#EDE7D9] shadow-xs hover:shadow-md transition-all flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={attr.image}
                        alt={attr.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 text-center flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-xs sm:text-sm text-[#0D3B33] leading-snug">
                        {attr.title}
                      </h4>
                      <p className="text-[10px] text-[#7A7469] mt-0.5 line-clamp-1">
                        {attr.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Top Itinerary Stepper Timeline */}
            <section className="bg-white rounded-3xl p-8 border border-[#EDE7D9] shadow-xs">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B33]">
                  Top
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C68A36] italic">
                  Itinerary
                </span>
              </div>

              {/* Horizontal Stepper for Desktop / Vertical for Mobile */}
              <div className="relative">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
                  {tour.itinerary.map((step, i) => (
                    <div key={i} className="flex flex-col items-center text-center group">
                      {/* Step Circle */}
                      <div className="w-12 h-12 rounded-full bg-[#C68A36] text-white flex items-center justify-center font-bold text-sm shadow-md mb-3 group-hover:scale-110 transition-transform">
                        <span className="text-xs">{i + 1}</span>
                      </div>
                      <h4 className="font-bold text-xs text-[#0D3B33] leading-tight mb-1">
                        {step.title}
                      </h4>
                      {step.time && (
                        <span className="text-[10px] text-[#00AA6C] font-semibold mb-1 block">
                          {step.time}
                        </span>
                      )}
                      <p className="text-[10px] text-[#7A7469] leading-tight">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. Video Experience Banner */}
            <section className="relative rounded-3xl overflow-hidden border border-[#EDE7D9] shadow-md min-h-[220px] sm:min-h-[260px] flex items-center justify-center text-center text-white">
              <img
                src={tour.image}
                alt="Watch Video"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80 z-0" />

              <div className="relative z-10 p-6 flex flex-col items-center max-w-lg">
                <button
                  type="button"
                  className="w-16 h-16 rounded-full bg-white/20 border-2 border-white backdrop-blur-md flex items-center justify-center text-white hover:scale-110 transition-transform mb-4 shadow-xl cursor-pointer"
                  aria-label="Play video"
                >
                  <Play className="w-7 h-7 fill-white pl-1" />
                </button>
                <h3 className="font-serif text-xl sm:text-2xl font-bold mb-1">
                  Watch Our Desert Safari Video
                </h3>
                <p className="text-xs text-white/80">
                  Experience the thrills of high dune bashing and Bedouin hospitality
                </p>
              </div>
            </section>

            {/* 5. Inclusions & Exclusions */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE7D9] shadow-xs">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#F2EDE2]">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#0D3B33]">Inclusions</h3>
                </div>
                <ul className="space-y-2.5">
                  {tour.inclusions.map((inc, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-xs sm:text-sm text-[#4A463F]"
                    >
                      <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                        ✓
                      </div>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE7D9] shadow-xs">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#F2EDE2]">
                  <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-xs">
                    ✕
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#0D3B33]">Exclusions</h3>
                </div>
                <ul className="space-y-2.5">
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
                  <span className="text-[10px] uppercase font-bold text-[#8A857B]">FROM</span>
                  <div className="font-serif text-3xl font-bold text-[#C68A36] leading-none">
                    {tour.price}
                  </div>
                </div>
              </div>

              {tour.originalPrice && (
                <div className="text-right">
                  <span className="text-xs text-[#8A857B] line-through block">
                    {tour.originalPrice}
                  </span>
                  {tour.saveAmount && (
                    <span className="text-[10px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded">
                      {tour.saveAmount}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Interactive Booking Form Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE7D9] shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#C68A36]">📅</span>
                <h3 className="font-serif text-xl font-bold text-[#0D3B33]">Book Your Safari</h3>
              </div>
              <p className="text-xs text-[#7A7469] mb-6">
                Fill in the details and we'll get back to you shortly.
              </p>

              {bookingSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-6 text-center animate-fade-in-up">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                    ✓
                  </div>
                  <h4 className="font-serif text-lg font-bold mb-1">Booking Request Sent!</h4>
                  <p className="text-xs text-emerald-700">
                    Thank you, {name || "traveler"}. Our safari concierge will contact you on{" "}
                    {phone || "WhatsApp"} within 15 minutes to confirm your reservation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="flex flex-col gap-4">
                  {/* Name */}
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2D2A26] placeholder-[#9E988D] focus:outline-none focus:border-[#C68A36] transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Your Email *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2D2A26] placeholder-[#9E988D] focus:outline-none focus:border-[#C68A36] transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="Your Phone / WhatsApp Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2D2A26] placeholder-[#9E988D] focus:outline-none focus:border-[#C68A36] transition-all"
                    />
                  </div>

                  {/* Select Package */}
                  <div className="relative">
                    <select
                      value={selectedPkg}
                      onChange={(e) => setSelectedPkg(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2D2A26] focus:outline-none focus:border-[#C68A36] transition-all appearance-none cursor-pointer"
                    >
                      <option value="Sharing Tour">Standard Safari ({tour.price})</option>
                      <option value="VIP Tour">VIP Sofa Safari (AED 149)</option>
                      <option value="Private Tour">Private 4x4 Car (AED 699)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#8C877D] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Counters: Adults & Infants */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Adults Counter */}
                    <div className="bg-[#FAF7F2] border border-[#E5DFD3] rounded-xl p-2.5 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[11px] text-[#7A7469] font-medium">Adults *</span>
                        <span className="font-bold text-sm text-[#2D2A26]">{adults}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-7 h-7 rounded-lg bg-white border border-[#DDD5C7] flex items-center justify-center font-bold text-xs text-[#524D44] hover:bg-gray-100"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="w-7 h-7 rounded-lg bg-white border border-[#DDD5C7] flex items-center justify-center font-bold text-xs text-[#524D44] hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Infants Counter */}
                    <div className="bg-[#FAF7F2] border border-[#E5DFD3] rounded-xl p-2.5 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[#7A7469] font-medium">
                          Infants (0-3y)
                        </span>
                        <span className="font-bold text-sm text-[#2D2A26]">{infants}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setInfants(Math.max(0, infants - 1))}
                          className="w-7 h-7 rounded-lg bg-white border border-[#DDD5C7] flex items-center justify-center font-bold text-xs text-[#524D44] hover:bg-gray-100"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => setInfants(infants + 1)}
                          className="w-7 h-7 rounded-lg bg-white border border-[#DDD5C7] flex items-center justify-center font-bold text-xs text-[#524D44] hover:bg-gray-100"
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
                      placeholder="Street Address / Hotel Name *"
                      required
                      value={hotel}
                      onChange={(e) => setHotel(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2D2A26] placeholder-[#9E988D] focus:outline-none focus:border-[#C68A36] transition-all"
                    />
                  </div>

                  {/* Date Pickers (Day, Month, Year) */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="relative">
                      <select
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-xl px-2.5 py-3 text-xs text-[#2D2A26] focus:outline-none focus:border-[#C68A36] appearance-none"
                      >
                        {Array.from({ length: 31 }, (_, i) => {
                          const val = String(i + 1).padStart(2, "0");
                          return (
                            <option key={val} value={val}>
                              {val}
                            </option>
                          );
                        })}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-[#8C877D] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <div className="relative">
                      <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-xl px-2.5 py-3 text-xs text-[#2D2A26] focus:outline-none focus:border-[#C68A36] appearance-none"
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
                      <ChevronDown className="w-3.5 h-3.5 text-[#8C877D] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <div className="relative">
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-xl px-2.5 py-3 text-xs text-[#2D2A26] focus:outline-none focus:border-[#C68A36] appearance-none"
                      >
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-[#8C877D] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    className="bg-[#C68A36] hover:bg-[#B3792B] text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all mt-2 active:scale-98 cursor-pointer"
                  >
                    <span>🚀</span>
                    <span>Book Now</span>
                  </button>

                  <div className="flex items-center justify-center gap-1 text-[11px] text-[#7A7469] text-center mt-1">
                    <span>🔒</span>
                    <span>Your information is 100% secure with us.</span>
                  </div>
                </form>
              )}
            </div>

            {/* Need Customized Tour Card */}
            <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#E5DFD3] flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#0D3B33] mb-1">
                  Need a Customized Safari?
                </h4>
                <p className="text-[11px] text-[#7A7469] mb-3">
                  Contact us for private groups, corporate events or buggy rentals.
                </p>
                <a
                  href="https://wa.me/971582639173"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C68A36] hover:underline"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <img
                src="/pkg_vip.jpg"
                alt="Custom Safari"
                className="w-20 h-16 object-cover rounded-xl shadow-xs"
              />
            </div>

            {/* Frequently Asked Questions */}
            <div className="bg-white rounded-3xl p-6 border border-[#EDE7D9] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#C68A36]">💬</span>
                <h3 className="font-serif text-lg font-bold text-[#0D3B33]">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-3">
                {tour.faqs.map((faq, i) => (
                  <div key={i} className="border-b border-[#F2EDE2] pb-3 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#2D2A26] hover:text-[#C68A36] transition-colors py-1 cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#8C877D] shrink-0 transition-transform ${
                          openFaq === i ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === i && (
                      <p className="text-xs text-[#7A7469] leading-relaxed pt-2 animate-fade-in-up">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* =========================================================
          EXPLORE MORE DESERT TOURS CAROUSEL / GRID
      ========================================================= */}
      <section className="bg-white border-t border-[#EDE7D9] py-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B33] mb-2">
              Explore More <span className="text-[#C68A36] italic">Desert Safari Tours</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#7A7469]">
              Discover our other top-rated Arabian adventure experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherTours.map((t) => (
              <Link
                key={t.id}
                to="/desert-safari/$slug"
                params={{ slug: t.slug }}
                className="group relative rounded-2xl overflow-hidden aspect-[16/11] shadow-sm hover:shadow-lg transition-all"
              >
                <img
                  src={t.image}
                  alt={t.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <h4 className="font-serif font-bold text-sm group-hover:text-[#F3C472] transition-colors">
                      {t.title}
                    </h4>
                    <span className="text-xs text-[#F3C472] font-semibold">{t.price}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-[#C68A36] transition-colors">
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
