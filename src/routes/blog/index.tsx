import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Search,
  FileText,
  Lightbulb,
  Compass,
  Tent,
  Map,
  Utensils,
  Filter,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Check,
  Layers,
} from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { BlogCard } from "../../components/BlogCard";
import { BlogSidebar } from "../../components/BlogSidebar";
import { BLOG_CATEGORIES, BLOG_POSTS } from "../../data/blogs";
import { useAllBlogsWithStats } from "../../hooks/useBlogStats";
import { TextReveal } from "../../components/TextReveal";
import { useLanguage } from "../../lib/i18n";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Desert Safari Blog | Travel Tips, Guides & Experiences" },
      {
        name: "description",
        content:
          "Travel tips, guides, experiences and everything you need to know about exploring the magical deserts.",
      },
    ],
  }),
  component: BlogPage,
});

const ICON_MAP: Record<string, typeof FileText> = {
  "file-text": FileText,
  lightbulb: Lightbulb,
  compass: Compass,
  tent: Tent,
  map: Map,
  utensils: Utensils,
};

function BlogPage() {
  const { t, getLocalizedBlog, getLocalizedCategories } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState<boolean>(false);

  // Localized Categories list
  const localizedCategories = useMemo(() => {
    return getLocalizedCategories(BLOG_CATEGORIES);
  }, [getLocalizedCategories]);

  // Fetch blogs with actual live views & likes from backend API
  const allBlogs = useAllBlogsWithStats(BLOG_POSTS);

  const localizedBlogs = useMemo(() => {
    return allBlogs.map((b) => getLocalizedBlog(b));
  }, [allBlogs, getLocalizedBlog]);

  const filteredPosts = useMemo(() => {
    return localizedBlogs.filter((post) => {
      const matchesCategory = selectedCategory === "all" || post.categorySlug === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [localizedBlogs, selectedCategory, searchQuery]);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const currentCategoryObj =
    localizedCategories.find((c) => c.slug === selectedCategory) ||
    localizedCategories[0] || {
      id: "all",
      name: t("allCategories", "All Posts"),
      slug: "all",
      icon: "file-text",
      count: 0,
    };
  const CurrentIcon = (currentCategoryObj && ICON_MAP[currentCategoryObj.icon]) || FileText;

  const handleSelectCategory = (slug: string) => {
    setSelectedCategory(slug);
    setIsMobileCategoryOpen(false);
  };

  return (
    <div
      style={{ animation: "globalPageFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      className="min-h-screen bg-[#FBF9F4] text-[#1D2523] flex flex-col font-sans selection:bg-[#C68A36] selection:text-white page-fade-in"
    >
      {/* Header Navigation matching actual website navbar */}
      <SiteHeader activeNav="Blogs" />

      {/* =========================================================
          HERO BANNER (Desert Sunrise with Jeep & Camels Silhouette)
      ========================================================= */}
      <section className="relative min-h-[380px] sm:min-h-[460px] md:min-h-[500px] flex items-center justify-center text-center overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16 px-4">
        {/* Background Image with Zoom Animation */}
        <img
          src="/hero_bg.jpg"
          alt="Desert Safari Sunrise with Jeep Dune Bashing"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />

        {/* Warm Golden / Amber Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-amber-950/45 to-black/80 z-0" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#7C4A15]/30 to-black/85 z-0" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center">
          {/* Tag */}
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#F3C472] font-bold mb-2.5 sm:mb-3 animate-fade-in-up">
            {t("navBlogs", "Blogs")}
          </span>

          {/* Heading with word-by-word reveal */}
          <TextReveal
            text={t("latestTravelInsights", "Latest Travel Insights & Stories")}
            as="h1"
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-3 sm:mb-4 drop-shadow-md leading-tight"
            delay={0.1}
            stagger={0.08}
          />

          {/* Subtitle */}
          <p className="text-xs sm:text-base md:text-lg text-white/90 max-w-2xl leading-relaxed mb-6 sm:mb-8 font-sans drop-shadow-sm animate-fade-in-up delay-200 px-2">
            {t(
              "blogDescription",
              "Travel tips, guides, experiences and everything you need to know about exploring the magical deserts."
            )}
          </p>

          {/* Central Hero Search Bar with Pill Design Matching Mockup */}
          <form
            onSubmit={handleHeroSearch}
            className="w-full max-w-xl bg-white rounded-full p-1.5 shadow-2xl flex items-center justify-between border border-white/60 animate-fade-in-up delay-300 transition-all focus-within:ring-2 focus-within:ring-[#C68A36]/60 pl-5 sm:pl-6 pr-1.5"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPosts", "Search...")}
              className="w-full bg-transparent border-none py-2.5 sm:py-3 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none font-sans"
            />
            <button
              type="submit"
              aria-label="Search"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1F2421] hover:bg-[#C68A36] text-white flex items-center justify-center transition-all duration-300 shadow-md active:scale-95 shrink-0 cursor-pointer group"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform group-hover:scale-110" />
            </button>
          </form>
        </div>
      </section>

      {/* =========================================================
          MOBILE CATEGORIES TOGGLE BAR (Sticky on Mobile & Tablet < lg)
      ========================================================= */}
      <section className="lg:hidden sticky top-0 z-40 bg-[#0B2E27] text-white border-b border-[#E4B564]/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Main Toggle Bar Header Button */}
          <button
            type="button"
            onClick={() => setIsMobileCategoryOpen((prev) => !prev)}
            aria-expanded={isMobileCategoryOpen}
            className="w-full flex items-center justify-between gap-3 bg-[#07211C] hover:bg-[#0D3B33] border border-[#E4B564]/40 p-3 rounded-xl transition-all active:scale-[0.99] shadow-inner cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#C68A36]/20 border border-[#C68A36]/40 flex items-center justify-center text-[#F3C472] shrink-0">
                <CurrentIcon className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#F3C472]">
                  {t("toggleCategories", "Browse Categories")}
                </div>
                <div className="font-serif text-sm font-bold text-white truncate flex items-center gap-2">
                  <span>{currentCategoryObj.name}</span>
                  <span className="text-[10px] font-sans font-medium px-2 py-0.5 rounded-full bg-[#E4B564]/20 text-[#F3C472] border border-[#E4B564]/30">
                    {filteredPosts.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#F3C472] shrink-0 bg-[#C68A36]/15 px-3 py-1.5 rounded-lg border border-[#C68A36]/30">
              <span className="hidden xs:inline">
                {isMobileCategoryOpen ? t("close", "Close") : t("filterByCategory", "Filter")}
              </span>
              {isMobileCategoryOpen ? (
                <ChevronUp className="w-4 h-4 text-[#F3C472] transition-transform duration-200" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#F3C472] transition-transform duration-200" />
              )}
            </div>
          </button>

          {/* Expandable Categories Drawer Menu */}
          {isMobileCategoryOpen && (
            <div className="mt-3 pt-3 border-t border-white/10 animate-fade-in-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[65vh] overflow-y-auto pr-1 pb-2">
                {localizedCategories.map((cat) => {
                  const Icon = ICON_MAP[cat.icon] || FileText;
                  const isSelected = selectedCategory === cat.slug;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSelectCategory(cat.slug)}
                      className={`flex items-center justify-between p-3 rounded-xl text-left transition-all border cursor-pointer ${
                        isSelected
                          ? "bg-gradient-to-r from-[#C68A36] to-[#E4B564] text-[#0A2621] font-bold border-[#F3C472] shadow-md scale-[1.01]"
                          : "bg-white/5 hover:bg-white/10 text-white/90 border-white/10 font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isSelected ? "text-[#0A2621]" : "text-[#F3C472]"
                          }`}
                        />
                        <span className="text-xs sm:text-sm truncate">{cat.name}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#0A2621]" />}
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-full ${
                            isSelected
                              ? "bg-[#0A2621] text-[#F3C472] font-bold"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          {cat.count}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quick Reset Button if not 'all' */}
              {selectedCategory !== "all" && (
                <div className="mt-2 pt-2 border-t border-white/10 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleSelectCategory("all")}
                    className="text-xs text-[#F3C472] hover:underline font-semibold py-1 px-2 cursor-pointer"
                  >
                    ↺ {t("resetFilter", "Reset to All Posts")}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          DESKTOP CATEGORY PILLS BAR (Visible on Large Screens >= lg)
      ========================================================= */}
      <section className="hidden lg:block bg-white border-b border-[#EBE3D3] sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2.5 min-w-max">
            {localizedCategories.map((cat) => {
              const Icon = ICON_MAP[cat.icon] || FileText;
              const isSelected = selectedCategory === cat.slug;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-none text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-[#C68A36] text-white shadow-md shadow-[#C68A36]/25 scale-105"
                      : "bg-[#FAF7F2] text-[#555047] hover:bg-[#F2ECE0] hover:text-[#C68A36] border border-[#E8DFC8] hover:scale-102"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-[#8C877D]"}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN CONTENT + SIDEBAR LAYOUT
      ========================================================= */}
      <main className="flex-1 max-w-[1360px] mx-auto px-4 sm:px-8 py-8 sm:py-12 w-full">
        {/* Header with Title and Category Toggle Button */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#EDE7D9]">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2421]">
              {selectedCategory === "all" ? t("allArticles", "All Articles") : currentCategoryObj.name}
            </h2>
            <p className="text-xs text-[#8C877D] mt-0.5">
              {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"} {t("available", "available")}
            </p>
          </div>

          {/* Right-side Category Toggle Button (Opens Categories on Click) */}
          <button
            type="button"
            onClick={() => setIsMobileCategoryOpen((prev) => !prev)}
            className="lg:hidden flex items-center gap-2 bg-white hover:bg-[#FAF7F2] border border-[#C68A36]/40 text-[#1F2421] px-4 py-2 rounded-full text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <Layers className="w-3.5 h-3.5 text-[#C68A36]" />
            <span>{t("categories", "Categories")}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#C68A36] transition-transform ${isMobileCategoryOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Content Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Active Filter Notice if searching or filtering */}
            {(selectedCategory !== "all" || searchQuery) && (
              <div className="flex items-center justify-between bg-white border border-[#EDE7D9] rounded-xl sm:rounded-none px-4 sm:px-5 py-3 mb-6 sm:mb-8 text-xs sm:text-sm text-[#555047] animate-fade-in-up">
                <div className="flex items-center gap-2 min-w-0">
                  <Filter className="w-4 h-4 text-[#C68A36] shrink-0" />
                  <span className="truncate">
                    {t("showingResultsFor", "Showing results for")}{" "}
                    <strong>{currentCategoryObj.name}</strong>
                    {searchQuery && (
                      <>
                        {" "}
                        {t("matching", "matching")} &ldquo;{searchQuery}&rdquo;
                      </>
                    )}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="text-[#C68A36] font-bold hover:underline cursor-pointer shrink-0 ml-3 text-xs sm:text-sm"
                >
                  {t("resetFilter", "Reset")}
                </button>
              </div>
            )}

            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl sm:rounded-none p-8 sm:p-12 text-center border border-[#EDE7D9] my-6 sm:my-8 animate-fade-in-up">
                <p className="text-lg font-serif text-[#333] mb-2 font-bold">
                  {t("noPostsFound", "No blog posts found")}
                </p>
                <p className="text-xs sm:text-sm text-[#777] mb-6 max-w-md mx-auto">
                  {t(
                    "noPostsFoundDesc",
                    "Try adjusting your search query or choosing a different category."
                  )}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="bg-[#C68A36] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg sm:rounded-none hover:bg-[#B3792A] transition-all cursor-pointer shadow-md"
                >
                  {t("resetFilter", "Reset Filter")}
                </button>
              </div>
            ) : (
              /* Blog Posts Grid with Staggered Entrance */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {filteredPosts.map((post, idx) => (
                  <div
                    key={post.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${0.05 + (idx % 6) * 0.08}s` }}
                  >
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 animate-fade-in-up delay-300">
            <BlogSidebar
              activeCategory={selectedCategory}
              onSelectCategory={(slug) => setSelectedCategory(slug)}
              showCategories={true}
              showNewsletter={true}
              showSearch={false}
              showRecentPosts={false}
              showPromo={false}
              showTags={false}
            />
          </div>
        </div>
      </main>

      {/* Same Website Footer */}
      <SiteFooter />
    </div>
  );
}
