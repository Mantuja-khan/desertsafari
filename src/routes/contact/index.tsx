import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  User,
  Tag,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Users,
  Star,
  Headphones,
  Navigation,
  CheckCircle2,
} from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { TextReveal } from "../../components/TextReveal";
import { useLanguage } from "../../lib/i18n";

export const Route = createFileRoute("/contact/")({
  head: () => ({
    meta: [
      { title: "Contact Us | Desert Safari Tours" },
      {
        name: "description",
        content:
          "Have questions about our desert safari tours or need help planning your trip? We're here to help!",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tourType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        tourType: "",
        message: "",
      });
    }, 4000);
  };

  const faqs = [
    {
      q: "What is the best time for a desert safari?",
      a: "The best time is between October and March when the weather is pleasant, daytime temperatures are moderate, and evenings are refreshingly cool.",
    },
    {
      q: "How can I book a tour?",
      a: "You can book directly via our website booking button, fill out this contact form, or reach out to our team instantly on WhatsApp or phone.",
    },
    {
      q: "What should I carry for the safari?",
      a: "Wear light breathable clothes, sunglasses, sunscreen, a hat, comfortable shoes, a light jacket for the evening, and your camera or smartphone.",
    },
    {
      q: "Are the tours safe for kids?",
      a: "Yes! Our safaris are very family-friendly. We provide child safety restraints and can customize the dune drive intensity for maximum comfort.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1D2523] flex flex-col font-sans selection:bg-[#C68A36] selection:text-white page-fade-in">
      {/* Actual Website Navbar */}
      <SiteHeader activeNav="Contact" />

      {/* =========================================================
          HERO BANNER MATCHING IMAGE
      ========================================================= */}
      <section className="relative min-h-[420px] sm:min-h-[460px] flex items-center justify-center text-center overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-18">
        {/* Background Desert Sunrise with 4x4 Jeep & Camels Silhouette */}
        <img
          src="/hero_bg.jpg"
          alt="Contact Desert Safari"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Golden Sun & Amber Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-amber-950/40 to-black/75 z-0" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#7C4A15]/30 to-black/80 z-0" />

        {/* Hero Central Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
          {/* Small Top Tag */}
          <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#F3C472] font-bold mb-3 animate-fade-in-up">
            {t("contactUs")}
          </span>

          {/* Heading with Word-by-Word Text Reveal */}
          <TextReveal
            text={t("contactUs")}
            as="h1"
            className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight mb-4 drop-shadow-md"
            delay={0.1}
            stagger={0.08}
          />

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl leading-relaxed font-sans drop-shadow-sm animate-fade-in-up delay-200">
            {t("enterDetails")}
          </p>
        </div>
      </section>

      {/* =========================================================
          MAIN CONTACT CONTENT GRID (2 COLUMNS)
      ========================================================= */}
      <main className="flex-1 max-w-[1360px] mx-auto px-4 sm:px-8 py-12 sm:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: SEND US A MESSAGE FORM (5 COLS) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-10 border border-[#EDE7D9] shadow-md">
            <div className="mb-8">
              <TextReveal
                text={t("contactUs")}
                as="h2"
                className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2421] mb-2"
              />
              <p className="text-xs sm:text-sm text-[#736E65] leading-relaxed">
                {t("enterDetails")}
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-none p-6 text-center animate-fade-in-up">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold text-emerald-900 mb-1">
                  {t("bookingSubmitted")}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-700">
                  {t("bookingSuccessMsg")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={`${t("yourName")} *`}
                      className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-none px-4 py-3.5 pl-11 text-xs sm:text-sm text-[#2D2A26] placeholder-[#8C877D] focus:outline-none focus:border-[#C68A36] focus:bg-white transition-all"
                    />
                    <User className="w-4 h-4 text-[#8C877D] absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={`${t("yourEmail")} *`}
                      className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-none px-4 py-3.5 pl-11 text-xs sm:text-sm text-[#2D2A26] placeholder-[#8C877D] focus:outline-none focus:border-[#C68A36] focus:bg-white transition-all"
                    />
                    <Mail className="w-4 h-4 text-[#8C877D] absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Row 2: Phone & Tour Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Input */}
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={`${t("yourPhone")} *`}
                      className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-none px-4 py-3.5 pl-11 text-xs sm:text-sm text-[#2D2A26] placeholder-[#8C877D] focus:outline-none focus:border-[#C68A36] focus:bg-white transition-all"
                    />
                    <Phone className="w-4 h-4 text-[#8C877D] absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Tour Type Select */}
                  <div className="relative">
                    <select
                      value={formData.tourType}
                      onChange={(e) => setFormData({ ...formData, tourType: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-none px-4 py-3.5 pl-11 pr-10 text-xs sm:text-sm text-[#2D2A26] focus:outline-none focus:border-[#C68A36] focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        Select Tour Type
                      </option>
                      <option value="evening-safari">VIP Desert Safari</option>
                      <option value="private-safari">Private Car Safari</option>
                      <option value="quad-biking">Quad Bike Adventure</option>
                      <option value="overnight-camp">Overnight Desert Camp</option>
                      <option value="camel-safari">Camel Trek Safari</option>
                      <option value="city-tour">Dubai City Tours</option>
                    </select>
                    <Tag className="w-4 h-4 text-[#8C877D] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <ChevronDown className="w-4 h-4 text-[#8C877D] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Row 3: Message Textarea */}
                <div className="relative">
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your Message *"
                    className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-none p-4 pl-11 text-xs sm:text-sm text-[#2D2A26] placeholder-[#8C877D] focus:outline-none focus:border-[#C68A36] focus:bg-white transition-all resize-none"
                  />
                  <MessageSquare className="w-4 h-4 text-[#8C877D] absolute left-4 top-4" />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#C68A36] hover:bg-[#B3792A] text-white font-bold text-xs sm:text-sm py-4 px-6 rounded-none flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-98 uppercase tracking-wider cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t("bookNow")}</span>
                </button>
              </form>
            )}
          </div>

          {/* RIGHT COLUMN: INFO CARDS, MAP, IMAGE & FAQS (7 COLS) */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8">
            {/* Top 3 Info Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Card 1: Call Us */}
              <div className="bg-white rounded-2xl p-5 border border-[#EDE7D9] shadow-xs flex items-center gap-4 group hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-full bg-[#C68A36] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#1F2421]">Call Us</h4>
                  <a
                    href="tel:+971501234567"
                    className="text-xs font-bold text-[#C68A36] hover:underline block"
                  >
                    +971 50 123 4567
                  </a>
                  <p className="text-[11px] text-[#8C877D] mt-0.5">Mon - Sun: 8:00 AM - 10:00 PM</p>
                </div>
              </div>

              {/* Card 2: Email Us */}
              <div className="bg-white rounded-2xl p-5 border border-[#EDE7D9] shadow-xs flex items-center gap-4 group hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-full bg-[#C68A36] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#1F2421]">Email Us</h4>
                  <a
                    href="mailto:info@desertjourneydxb.com"
                    className="text-xs font-bold text-[#C68A36] hover:underline block"
                  >
                    info@desertjourneydxb.com
                  </a>
                  <p className="text-[11px] text-[#8C877D] mt-0.5">
                    We&apos;ll respond within 24 hours
                  </p>
                </div>
              </div>

              {/* Card 3: Visit Us */}
              <div className="bg-white rounded-2xl p-5 border border-[#EDE7D9] shadow-xs flex items-center gap-4 group hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-full bg-[#C68A36] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#1F2421]">Visit Us</h4>
                  <p className="text-xs font-bold text-[#1F2421]">Dubai Marina, UAE</p>
                  <p className="text-[11px] text-[#8C877D] mt-0.5">Downtown Dubai</p>
                </div>
              </div>
            </div>

            {/* Interactive Map Box with Location Overlay Card */}
            <div className="relative rounded-3xl overflow-hidden border border-[#EDE7D9] shadow-md h-[340px] sm:h-[380px] bg-stone-200">
              {/* Google Map Embed */}
              <iframe
                title="Desert Safari Dubai Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115622.7844111303!2d55.195498!3d25.138804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20Desert%20Safari!5e0!3m2!1sen!2sae!4v1716000000000!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter contrast-105"
              />

              {/* Floating Location Info Overlay Card matching image */}
              <div className="absolute top-4 left-4 max-w-[280px] sm:max-w-xs bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-white/60">
                <div className="flex items-center gap-2 mb-1.5">
                  <MapPin className="w-4 h-4 text-[#C68A36]" />
                  <h5 className="font-serif text-base font-bold text-[#1F2421]">Our Location</h5>
                </div>
                <p className="text-xs font-semibold text-[#C68A36] mb-1.5">
                  Downtown Dubai, UAE
                </p>
                <p className="text-[11px] text-[#635E54] leading-relaxed mb-3">
                  Experience the pinnacle of luxury desert tours and bespoke city excursions in the UAE.
                </p>
                <a
                  href="https://maps.google.com/?q=Dubai+UAE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C68A36] hover:bg-[#B3792A] text-white text-xs font-bold px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-all shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Bottom Row: Camp Image + FAQs Widget (Side-by-side on tablet/desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
              {/* Left: Camp Sunset Glow Photo Card (5 cols) */}
              <div className="sm:col-span-5 relative rounded-3xl overflow-hidden border border-[#EDE7D9] shadow-md group min-h-[220px]">
                <img
                  src="/polaroid_camp.jpg"
                  alt="Desert Camp Majlis at sunset"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#F3C472]">
                    DUBAI DESERT OASIS
                  </span>
                  <p className="font-serif text-lg font-bold text-white leading-tight mt-0.5">
                    Magical Evening Campfire & Stargazing
                  </p>
                </div>
              </div>

              {/* Right: Frequently Asked Questions Widget (7 cols) */}
              <div className="sm:col-span-7 bg-white rounded-3xl p-6 border border-[#EDE7D9] shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
                    <TextReveal
                      text={t("frequentlyAskedQuestions")}
                      as="h4"
                      className="font-serif text-lg font-bold text-[#1F2421]"
                    />
                    <Link
                      to="/blog"
                      className="text-xs font-bold text-[#C68A36] hover:text-[#9F671E] flex items-center gap-1"
                    >
                      {t("viewMore")} →
                    </Link>
                  </div>

                  <div className="space-y-2.5">
                    {faqs.map((faq, index) => {
                      const isOpen = openFaq === index;
                      return (
                        <div
                          key={index}
                          className="border border-stone-100 rounded-xl overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() => setOpenFaq(isOpen ? null : index)}
                            className="w-full text-left p-3 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#2D2A26] hover:text-[#C68A36] transition-colors"
                          >
                            <span>{faq.q}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-[#8C877D] shrink-0 transition-transform duration-200 ${
                                isOpen ? "rotate-180 text-[#C68A36]" : ""
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-3 pb-3 text-xs text-[#6B655B] leading-relaxed animate-fade-in-up">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* =========================================================
          BOTTOM TRUST BADGES ROW (4 ITEMS)
      ========================================================= */}
      <section className="bg-white border-y border-[#EDE7D9] py-8 sm:py-10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {/* 1. Safe & Secure */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#C68A36]/10 text-[#C68A36] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-serif text-sm sm:text-base font-bold text-[#1F2421]">
                  Safe & Secure Travel
                </h5>
                <p className="text-[11px] text-[#8C877D]">Your safety is our priority</p>
              </div>
            </div>

            {/* 2. Experienced Guides */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#C68A36]/10 text-[#C68A36] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-serif text-sm sm:text-base font-bold text-[#1F2421]">
                  Experienced Guides
                </h5>
                <p className="text-[11px] text-[#8C877D]">Professional & friendly</p>
              </div>
            </div>

            {/* 3. Best Price Guarantee */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#C68A36]/10 text-[#C68A36] flex items-center justify-center shrink-0">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-serif text-sm sm:text-base font-bold text-[#1F2421]">
                  Best Price Guarantee
                </h5>
                <p className="text-[11px] text-[#8C877D]">Value for your money</p>
              </div>
            </div>

            {/* 4. 24/7 Support */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#C68A36]/10 text-[#C68A36] flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-serif text-sm sm:text-base font-bold text-[#1F2421]">
                  24/7 Customer Support
                </h5>
                <p className="text-[11px] text-[#8C877D]">Always here for you</p>
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

