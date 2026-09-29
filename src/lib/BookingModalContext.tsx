import { createContext, useContext, useState, ReactNode } from "react";
import { X, CheckCircle2, Phone, Mail, User, MessageSquare, Calendar, Sparkles, Send } from "lucide-react";
import { useLanguage } from "./i18n";

export interface BookingModalData {
  isOpen: boolean;
  tourTitle?: string;
  tourPrice?: string;
  packageId?: string;
}

interface BookingModalContextType {
  modalData: BookingModalData;
  openBookingModal: (data?: Partial<BookingModalData>) => void;
  closeBookingModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [modalData, setModalData] = useState<BookingModalData>({
    isOpen: false,
    tourTitle: "Dubai Desert Safari",
    tourPrice: "",
    packageId: "",
  });

  const openBookingModal = (data?: Partial<BookingModalData>) => {
    setModalData({
      isOpen: true,
      tourTitle: data?.tourTitle || "Dubai Desert Safari",
      tourPrice: data?.tourPrice || "",
      packageId: data?.packageId || "",
    });
  };

  const closeBookingModal = () => {
    setModalData((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <BookingModalContext.Provider value={{ modalData, openBookingModal, closeBookingModal }}>
      {children}
      {modalData.isOpen && <BookingModal modalData={modalData} onClose={closeBookingModal} />}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return context;
}

function BookingModal({
  modalData,
  onClose,
}: {
  modalData: BookingModalData;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [tourName, setTourName] = useState(modalData.tourTitle || "VIP Desert Safari");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    // Simulate fast booking dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Desert Journey DXB, I want to book: ${tourName}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nNotes: ${message}`
  );

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/75 backdrop-blur-md transition-all animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#FAF8F5] text-[#1D2523] rounded-3xl shadow-2xl border border-[#E5E0D6] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-[#0D3B33] text-white p-6 sm:p-7 relative">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#E4B564] text-xs uppercase tracking-widest font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("instantBooking", "RESERVATION REQUEST")}</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
            {isSubmitted ? t("bookingConfirmedTitle", "Booking Request Sent!") : t("bookYourExperience", "Book Your Experience")}
          </h3>

          {!isSubmitted && (
            <div className="mt-2 inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs text-[#E4B564]">
              <span>📍 {tourName}</span>
              {modalData.tourPrice && <span className="font-bold text-white">• {modalData.tourPrice}</span>}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7">
          {isSubmitted ? (
            /* Success confirmation screen */
            <div className="text-center py-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="font-serif text-2xl font-bold text-[#0D3B33] mb-2">
                {t("thankYou", "Thank You,")} {name || "Traveler"}!
              </h4>

              <div className="bg-[#F0EBE1] p-4 rounded-2xl border border-[#E0D8C8] text-sm text-[#4A443B] leading-relaxed mb-6 max-w-sm">
                <p className="font-semibold text-[#0D3B33] mb-1">
                  🎉 {t("teamWillInform", "Our team will inform and contact you shortly!")}
                </p>
                <p className="text-xs text-[#6B655B]">
                  {t(
                    "teamWillInformDetail",
                    "We have received your booking request. Our tour concierge will verify availability and send full confirmation details to your email and phone."
                  )}
                </p>
              </div>

              <div className="w-full flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/971582639173?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t("chatWhatsApp", "Instant WhatsApp Confirmation")}</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#0D3B33] hover:bg-[#145248] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  {t("close", "Close")}
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tour / Package Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C564C] mb-1.5">
                  {t("selectedTourPackage", "Selected Tour / Package")}
                </label>
                <input
                  type="text"
                  value={tourName}
                  onChange={(e) => setTourName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#D9D3C7] bg-white text-sm font-semibold text-[#0D3B33] focus:outline-none focus:ring-2 focus:ring-[#D4A353]"
                  placeholder="e.g. VIP Desert Safari, Private Safari..."
                  required
                />
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C564C] mb-1.5">
                  {t("yourFullName", "Full Name")} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D9D3C7] bg-white text-sm text-[#1D2523] placeholder-[#A39E93] focus:outline-none focus:ring-2 focus:ring-[#D4A353]"
                    placeholder={t("enterYourName", "Enter your full name")}
                  />
                </div>
              </div>

              {/* Mail ID & Contact Number Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Mail ID */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C564C] mb-1.5">
                    {t("emailAddress", "Mail ID")} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D9D3C7] bg-white text-sm text-[#1D2523] placeholder-[#A39E93] focus:outline-none focus:ring-2 focus:ring-[#D4A353]"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C564C] mb-1.5">
                    {t("contactNumber", "Contact Number")} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D9D3C7] bg-white text-sm text-[#1D2523] placeholder-[#A39E93] focus:outline-none focus:ring-2 focus:ring-[#D4A353]"
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                </div>
              </div>

              {/* Message Part */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C564C] mb-1.5">
                  {t("messageNotes", "Message & Preferences")}
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-3.5 pointer-events-none" />
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D9D3C7] bg-white text-sm text-[#1D2523] placeholder-[#A39E93] focus:outline-none focus:ring-2 focus:ring-[#D4A353] resize-none"
                    placeholder={t(
                      "bookingMessagePlaceholder",
                      "Preferred travel date, number of adults/kids, hotel pickup address or special requests..."
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0D3B33] hover:bg-[#145248] text-white font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all cursor-pointer mt-2 active:scale-98 disabled:opacity-75"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#E4B564]" />
                    <span>{t("bookNow", "Book Now")}</span>
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-[#8C877D] mt-2">
                🔒 {t("freeCancellationNote", "Free cancellation up to 24 hours prior • No hidden charges")}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
