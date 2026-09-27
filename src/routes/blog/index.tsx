import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, FileText, Lightbulb, Compass, Tent, Map, Utensils, Filter } from "lucide-react";
import { BlogHeader } from "../../components/BlogHeader";
import { BlogCard } from "../../components/BlogCard";
import { BlogSidebar } from "../../components/BlogSidebar";
import { BLOG_CATEGORIES, BLOG_POSTS } from "../../data/blogs";
import { useAllBlogsWithStats } from "../../hooks/useBlogStats";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch blogs with actual live views & likes from backend API
  const allBlogs = useAllBlogsWithStats(BLOG_POSTS);

  const filteredPosts = useMemo(() => {
    return allBlogs.filter((post) => {
      const matchesCategory = selectedCategory === "all" || post.categorySlug === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [allBlogs, selectedCategory, searchQuery]);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1D2523] flex flex-col font-sans selection:bg-[#C68A36] selection:text-white">
      {/* Header Navigation matching actual website navbar */}
      <BlogHeader activeNav="Blogs" />

      {/* =========================================================
          HERO BANNER (Desert Sunrise with Jeep & Camels Silhouette)
      ========================================================= */}
      <section className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <img
          src="/hero_bg.jpg"
          alt="Desert Safari Sunrise with Jeep Dune Bashing"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Warm Golden / Amber Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-amber-950/40 to-black/75 z-0" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#7C4A15]/30 to-black/80 z-0" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 flex flex-col items-center">
          {/* Tag */}
          <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#F3C472] font-bold mb-3">
            OUR BLOG
          </span>

          {/* Heading with word-by-word reveal */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight mb-4 drop-shadow-md">
            <span className="reveal-word font-bold text-white" style={{ animationDelay: "0.2s" }}>
              Desert Safari{" "}
            </span>
            <span
              className="reveal-word font-bold text-[#F3C472]"
              style={{ animationDelay: "0.4s" }}
            >
              Blog
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl leading-relaxed mb-8 font-sans drop-shadow-sm">
            Travel tips, guides, experiences and everything you need to know about exploring the
            magical deserts.
          </p>

          {/* Central Hero Search Bar */}
          <form
            onSubmit={handleHeroSearch}
            className="w-full max-w-2xl bg-white rounded-full p-1.5 sm:p-2 shadow-2xl flex items-center gap-2 border border-white/40"
          >
            <div className="relative flex-1 flex items-center pl-4 sm:pl-5">
              <Search className="w-5 h-5 text-stone-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blog posts..."
                className="w-full bg-transparent border-none py-2.5 sm:py-3 pl-3 pr-4 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-[#C68A36] hover:bg-[#B3792A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-6 sm:px-8 py-3 rounded-full transition-all shadow-md active:scale-95 shrink-0"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* =========================================================
          CATEGORY PILLS BAR
      ========================================================= */}
      <section className="bg-white border-b border-[#EBE3D3] sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2.5 min-w-max">
            {BLOG_CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.icon] || FileText;
              const isSelected = selectedCategory === cat.slug;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#C68A36] text-white shadow-md shadow-[#C68A36]/20"
                      : "bg-[#FAF7F2] text-[#555047] hover:bg-[#F2ECE0] hover:text-[#C68A36] border border-[#E8DFC8]"
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
      <main className="flex-1 max-w-[1360px] mx-auto px-4 sm:px-8 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Content Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Active Filter Notice if searching or filtering */}
            {(selectedCategory !== "all" || searchQuery) && (
              <div className="flex items-center justify-between bg-white border border-[#EDE7D9] rounded-xl px-5 py-3 mb-8 text-xs sm:text-sm text-[#555047]">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#C68A36]" />
                  <span>
                    Showing results for{" "}
                    <strong>
                      {selectedCategory !== "all"
                        ? BLOG_CATEGORIES.find((c) => c.slug === selectedCategory)?.name
                        : "All Posts"}
                    </strong>
                    {searchQuery && <> matching &ldquo;{searchQuery}&rdquo;</>}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="text-[#C68A36] font-bold hover:underline"
                >
                  Reset
                </button>
              </div>
            )}

            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#EDE7D9] my-8">
                <p className="text-lg font-serif text-[#333] mb-3">No blog posts found</p>
                <p className="text-sm text-[#777] mb-6">
                  Try adjusting your search query or choosing a different category.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="bg-[#C68A36] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg"
                >
                  View All Posts
                </button>
              </div>
            ) : (
              /* Blog Posts Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar Column (4 cols) */}
          <div className="lg:col-span-4">
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

      {/* =========================================================
          FOOTER MATCHING HOMEPAGE
      ========================================================= */}
      <footer className="bg-[#0D3B33] text-white border-t border-[#C68A36]/30 mt-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E4B564] flex items-center justify-center text-[#0D3B33] font-serif font-bold text-lg">
              D
            </div>
            <span className="font-serif text-lg text-white font-bold tracking-wider">
              DESERT JOURNEY DXB
            </span>
          </div>
          <div>© 2026 Desert Journey DXB. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-[#E4B564] transition-colors">
              Home
            </Link>
            <Link to="/#packages" className="hover:text-[#E4B564] transition-colors">
              Packages
            </Link>
            <Link
              to="/blog"
              className="hover:text-[#E4B564] transition-colors text-[#E4B564] font-semibold"
            >
              Blogs
            </Link>
            <Link to="/#contact" className="hover:text-[#E4B564] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
