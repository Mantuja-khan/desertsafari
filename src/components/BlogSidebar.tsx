import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  Calendar,
  ChevronRight,
  FileText,
  Lightbulb,
  Compass,
  Tent,
  Map,
  Utensils,
  Mail,
  Ticket,
} from "lucide-react";
import { BLOG_CATEGORIES, BLOG_TAGS, BLOG_POSTS } from "../data/blogs";
import { useLanguage } from "../lib/i18n";

const ICON_MAP: Record<string, typeof FileText> = {
  "file-text": FileText,
  lightbulb: Lightbulb,
  compass: Compass,
  tent: Tent,
  map: Map,
  utensils: Utensils,
};

export function BlogSidebar({
  activeCategory = "all",
  onSelectCategory,
  showSearch = false,
  showRecentPosts = false,
  showCategories = true,
  showPromo = false,
  showNewsletter = true,
  showTags = false,
  onSearch,
}: {
  activeCategory?: string;
  onSelectCategory?: (slug: string) => void;
  showSearch?: boolean;
  showRecentPosts?: boolean;
  showCategories?: boolean;
  showPromo?: boolean;
  showNewsletter?: boolean;
  showTags?: boolean;
  onSearch?: (query: string) => void;
}) {
  const { t, getLocalizedBlog, getLocalizedCategories } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const localizedCategories = getLocalizedCategories(BLOG_CATEGORIES);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmailInput("");
    }
  };

  const recentPosts = BLOG_POSTS.slice(0, 3);

  return (
    <aside className="w-full flex flex-col gap-8">
      {/* 1. Search Box Widget */}
      {showSearch && (
        <div className="bg-white rounded-2xl p-4 border border-[#EDE7D9] shadow-sm">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchBlog", "Search blog posts...")}
                className="w-full bg-[#FAF7F2] border border-[#E5DFD3] rounded-xl px-4 py-3 pl-10 text-xs sm:text-sm text-[#2D2A26] placeholder-[#8C877D] focus:outline-none focus:border-[#C68A36] transition-colors"
              />
              <Search className="w-4 h-4 text-[#8C877D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="bg-[#C68A36] hover:bg-[#B3792A] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-sm shrink-0"
            >
              {t("search", "Search")}
            </button>
          </form>
        </div>
      )}

      {/* 2. Recent Posts Widget */}
      {showRecentPosts && (
        <div className="bg-white rounded-2xl p-6 border border-[#EDE7D9] shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
            <h4 className="font-serif text-xl font-bold text-[#1F2421]">
              {t("recentPosts", "Recent Posts")}
            </h4>
            <Link
              to="/blog"
              className="text-xs font-semibold text-[#C68A36] hover:text-[#9F671E] flex items-center gap-1"
            >
              {t("viewMore", "View All")} →
            </Link>
          </div>

          <div className="space-y-4">
            {recentPosts.map((post) => {
              const localized = getLocalizedBlog(post);
              return (
                <Link
                  key={post.id}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group flex items-center gap-4 hover:bg-[#FAF7F2] p-2 rounded-xl transition-colors"
                >
                  <img
                    src={localized.image}
                    alt={localized.title}
                    className="w-20 h-16 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif text-sm font-bold text-[#1F2421] group-hover:text-[#C68A36] transition-colors line-clamp-2 leading-snug">
                      {localized.title}
                    </h5>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#8A857B] mt-1.5 font-sans">
                      <Calendar className="w-3 h-3 text-[#C68A36]" />
                      <span>{localized.date}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Blog Categories Widget */}
      {showCategories && (
        <div className="bg-white rounded-2xl p-6 border border-[#EDE7D9] shadow-sm">
          <h4 className="font-serif text-xl font-bold text-[#1F2421] pb-4 mb-4 border-b border-stone-100">
            {t("blogCategories", "Blog Categories")}
          </h4>

          <ul className="space-y-2">
            {localizedCategories.map((cat) => {
              const Icon = ICON_MAP[cat.icon] || FileText;
              const isSelected = activeCategory === cat.slug;

              return (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory && onSelectCategory(cat.slug)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                      isSelected
                        ? "bg-[#C68A36]/10 text-[#C68A36] font-bold"
                        : "text-[#4A463F] hover:bg-[#FAF7F2] hover:text-[#C68A36] font-medium"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 ${isSelected ? "text-[#C68A36]" : "text-[#8C877D]"}`}
                      />
                      <span className="text-xs sm:text-sm">{cat.name}</span>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-[#C68A36] text-white font-bold"
                          : "bg-stone-100 text-[#8C877D]"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* 4. Plan Your Desert Safari Promo Box */}
      {showPromo && (
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#C68A36]/30 text-white p-6 flex flex-col justify-between min-h-[260px] group">
          {/* Background image */}
          <img
            src="/polaroid_camp.jpg"
            alt="Desert safari package promotion"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 z-0" />

          <div className="relative z-10">
            <h4 className="font-serif text-2xl font-bold text-white mb-2 leading-tight">
              {t("bookYourSafari", "Plan Your Desert Safari Today!")}
            </h4>
            <p className="text-xs text-white/80 leading-relaxed">
              {t("chooseExpSubtitle", "Explore our exciting packages and create unforgettable memories.")}
            </p>
          </div>

          <div className="relative z-10 mt-6">
            <a
              href="/#packages"
              className="w-full bg-[#C68A36] hover:bg-[#B3792A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Ticket className="w-4 h-4" />
              {t("packages", "View Packages")}
            </a>
          </div>
        </div>
      )}

      {/* 5. Newsletter Subscription Box */}
      {showNewsletter && (
        <div className="relative rounded-2xl overflow-hidden shadow-md text-white p-6 border border-[#C68A36]/30">
          {/* Background warm dunes image */}
          <img
            src="/reviews_bg.jpg"
            alt="Desert sunset newsletter background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#221508]/95 via-[#3D250C]/85 to-[#543310]/80 z-0" />

          <div className="relative z-10">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
              {t("subscribeNewsletter", "Subscribe to Our Newsletter")}
            </h4>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              {t("welcomeVip", "Get the latest travel tips, offers and desert safari updates directly in your inbox.")}
            </p>

            {subscribed ? (
              <div className="bg-emerald-600/90 text-white text-xs p-3 rounded-xl text-center font-medium">
                🎉 {t("welcomeVip", "Thank you for subscribing!")}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder={t("enterEmail", "Your email address")}
                    className="w-full bg-white/90 focus:bg-white text-stone-900 placeholder-stone-500 rounded-xl px-4 py-3 pl-10 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C68A36] transition-all"
                  />
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#C68A36] hover:bg-[#B3792A] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 uppercase tracking-wider"
                >
                  {t("subscribe", "Subscribe")}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 6. Tags Cloud Widget */}
      {showTags && (
        <div className="bg-white rounded-2xl p-6 border border-[#EDE7D9] shadow-sm">
          <h4 className="font-serif text-xl font-bold text-[#1F2421] pb-4 mb-4 border-b border-stone-100">
            Tags
          </h4>

          <div className="flex flex-wrap gap-2">
            {BLOG_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onSearch && onSearch(tag)}
                className="bg-[#FAF7F2] hover:bg-[#C68A36] text-[#615C52] hover:text-white text-xs px-3 py-1.5 rounded-lg border border-[#E8DFC8] transition-all font-sans"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
