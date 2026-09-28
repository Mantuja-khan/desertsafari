import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  Calendar,
  Clock,
  Eye,
  ChevronRight,
  Lightbulb,
  Heart,
  Facebook,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { BlogSidebar } from "../../components/BlogSidebar";
import { RelatedBlogsCarousel } from "../../components/RelatedBlogsCarousel";
import { TextReveal } from "../../components/TextReveal";
import { BLOG_POSTS } from "../../data/blogs";
import { useBlogStats } from "../../hooks/useBlogStats";
import { useLanguage } from "../../lib/i18n";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post =
      BLOG_POSTS.find((p) => p.slug === params.slug) || (BLOG_POSTS[0] as (typeof BLOG_POSTS)[0]);
    return {
      meta: [
        { title: `${post?.title || "Blog Post"} | Desert Safari Blog` },
        { name: "description", content: post?.excerpt || "" },
      ],
    };
  },
  component: BlogPostDetailPage,
});

function BlogPostDetailPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const { t, getLocalizedBlog } = useLanguage();

  // Find matching blog post, default to the first post if not found
  const basePost = (BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0])!;
  const post = getLocalizedBlog(basePost);

  // Actual dynamic backend-synced likes and views
  const { views, likes, hasLiked, toggleLike } = useBlogStats(post.slug, post.likes, post.views);

  // Related posts (all other posts)
  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== basePost.id);

  return (
    <div
      style={{ animation: "globalPageFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      className="min-h-screen bg-[#FBF9F4] text-[#1D2523] flex flex-col font-sans selection:bg-[#C68A36] selection:text-white page-fade-in"
    >
      {/* Blog Navigation Header (matching actual website navbar) */}
      <SiteHeader activeNav="Blogs" />

      {/* =========================================================
          HERO BANNER WITH BREADCRUMB, TITLE, META & DESERT SUNSET BG
      ========================================================= */}
      <section className="relative min-h-[360px] sm:min-h-[420px] flex flex-col justify-end text-white overflow-hidden pb-10 pt-28 sm:pt-36 sm:pb-14">
        {/* Desert Sunset / Jeep Caravan Background Image */}
        <img
          src="/hero_bg.jpg"
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Golden / Amber / Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#150E06] via-[#1E1206]/80 to-[#2A1807]/60 z-0" />

        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8 w-full">
          {/* Breadcrumbs Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-white/80 mb-4 font-medium flex-wrap">
            <Link to="/" className="hover:text-[#F3C472] transition-colors">
              {t("navHome")}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <Link to="/blog" className="hover:text-[#F3C472] transition-colors">
              {t("navBlogs")}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <span className="text-[#F3C472] truncate max-w-[280px] sm:max-w-md">{post.title}</span>
          </nav>

          {/* Category Tag Badge */}
          <div className="mb-3">
            <span className="inline-block bg-[#C68A36] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-md shadow-md">
              {post.categoryBadge}
            </span>
          </div>

          {/* Blog Title with word-by-word reveal */}
          <TextReveal
            text={post.title}
            as="h1"
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl mb-4 drop-shadow-md"
          />

          {/* Meta Information Bar with Actual Dynamic Views & Read Time */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/85 font-sans flex-wrap">
            <span className="flex items-center gap-1.5 sm:gap-2">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F3C472]" />
              {post.date}
            </span>
            {post.readTime && (
              <span className="flex items-center gap-1.5 sm:gap-2">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F3C472]" />
                {post.readTime}
              </span>
            )}
            <span className="flex items-center gap-1.5 sm:gap-2">
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F3C472]" />
              {views}
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN ARTICLE CONTENT + SIDEBAR LAYOUT
      ========================================================= */}
      <main className="flex-1 max-w-[1360px] mx-auto px-4 sm:px-8 py-8 sm:py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left / Article Main Column (8 cols) */}
          <article className="lg:col-span-8 flex flex-col">
            {/* Intro Paragraph */}
            {post.intro && (
              <p className="text-sm sm:text-base md:text-lg text-[#3E3A33] leading-relaxed mb-6 sm:mb-8 font-sans">
                {post.intro}
              </p>
            )}

            {/* Featured Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-md mb-8 sm:mb-10 border border-[#EDE7D9] aspect-[16/9]">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>

            {/* 10 Tips Numbered Content List */}
            {post.tips && post.tips.length > 0 && (
              <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-12">
                {post.tips.map((tip) => (
                  <div
                    key={tip.number}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-white border border-[#EDE7D9] shadow-xs"
                  >
                    {/* Left: Number circle & text */}
                    <div className="flex-1 flex items-start gap-3 sm:gap-4">
                      {/* Orange Number Badge */}
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#C68A36] text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-sm mt-0.5">
                        {tip.number}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#1F2421] mb-2 leading-snug">
                          {tip.title}
                        </h3>
                        <p className="text-xs sm:text-sm md:text-base text-[#524E46] leading-relaxed font-sans">
                          {tip.description}
                        </p>
                      </div>
                    </div>

                    {/* Right side preview image if present */}
                    {tip.image && (
                      <div className="w-full sm:w-48 md:w-56 aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden shrink-0 border border-[#E5DFD3] shadow-xs">
                        <img
                          src={tip.image}
                          alt={tip.imageAlt || tip.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* =========================================================
                FINAL THOUGHTS HIGHLIGHT BOX
            ========================================================= */}
            {post.finalThoughts && (
              <div className="bg-[#FCF5E8] border-l-4 border-[#C68A36] rounded-2xl p-5 sm:p-8 mb-8 sm:mb-10 flex items-start gap-3 sm:gap-4 shadow-xs">
                <div className="p-2.5 sm:p-3 bg-[#C68A36]/15 text-[#C68A36] rounded-full shrink-0">
                  <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#C68A36] mb-1.5 sm:mb-2">
                    {t("finalThoughts", "Final Thoughts")}
                  </h4>
                  <p className="text-xs sm:text-sm md:text-base text-[#5A5449] leading-relaxed font-sans">
                    {post.finalThoughts}
                  </p>
                </div>
              </div>
            )}

            {/* =========================================================
                SOCIAL SHARE BAR & ACTUAL LIKE BUTTON
            ========================================================= */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5 sm:py-6 border-y border-[#EDE7D9] mb-10 sm:mb-12">
              {/* Social Share Icons */}
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-bold text-[#3E3A33] font-sans">
                  {t("shareThisPost", "Share This Post:")}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      typeof window !== "undefined" ? window.location.href : ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4 fill-current" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity font-bold text-xs"
                    aria-label="Share on X"
                  >
                    𝕏
                  </a>
                  <a
                    href="https://whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                    aria-label="Share on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#E60023] text-white flex items-center justify-center hover:opacity-90 transition-opacity font-bold text-xs"
                    aria-label="Share on Pinterest"
                  >
                    P
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>

              {/* Dynamic Actual Like Button */}
              <button
                onClick={toggleLike}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all text-xs sm:text-sm font-semibold cursor-pointer active:scale-95 ${
                  hasLiked
                    ? "bg-red-50 border-red-200 text-red-600 shadow-sm"
                    : "bg-white border-[#E5DFD3] text-[#524E46] hover:bg-stone-50"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${hasLiked ? "fill-red-500 text-red-500" : "text-[#C68A36]"}`}
                />
                <span>
                  {t("like", "Like")} ({likes})
                </span>
              </button>
            </div>

            {/* =========================================================
                RELATED POSTS SECTION WITH DRAGGABLE AUTO-SCROLL CAROUSEL
            ========================================================= */}
            <div className="w-full overflow-hidden">
              <TextReveal
                text={t("relatedPosts", "Related Posts")}
                as="h3"
                className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2421] mb-4"
              />

              {/* Draggable and Auto-scrolling from Right to Left on Small Screens */}
              <RelatedBlogsCarousel posts={relatedPosts} />
            </div>
          </article>

          {/* Right / Sidebar Column (4 cols) */}
          <div className="lg:col-span-4">
            <BlogSidebar
              showSearch={true}
              showRecentPosts={true}
              showCategories={true}
              showPromo={true}
              showNewsletter={false}
              showTags={true}
            />
          </div>
        </div>
      </main>

      {/* Same Website Footer */}
      <SiteFooter />
    </div>
  );
}

