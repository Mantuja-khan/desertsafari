import { Link } from "@tanstack/react-router";
import { Calendar, Eye, ArrowRight } from "lucide-react";
import type { BlogPost } from "../data/blogs";
import { useBlogStats } from "../hooks/useBlogStats";

export function BlogCard({ post, className = "" }: { post: BlogPost; className?: string }) {
  const { views } = useBlogStats(post.slug, post.likes, post.views);

  return (
    <article
      className={`bg-white rounded-2xl overflow-hidden border border-[#EDE7D9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group ${className}`}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category Badge overlay */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block bg-[#C68A36] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-md">
            {post.categoryBadge}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Date & Views Meta Row (removed min read and likes button) */}
          <div className="flex items-center gap-4 text-xs text-[#8A857B] mb-3 font-sans">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C68A36]" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#C68A36]" />
              {views}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1F2421] leading-snug mb-3 group-hover:text-[#C68A36] transition-colors line-clamp-2">
            <Link to="/blog/$slug" params={{ slug: post.slug }}>
              {post.title}
            </Link>
          </h3>

          {/* Excerpt - Exactly 2 lines */}
          <p className="text-[#68645D] text-xs sm:text-sm leading-relaxed mb-6 line-clamp-2 font-sans">
            {post.excerpt}
          </p>
        </div>

        {/* Read More Link */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C68A36] hover:text-[#9F671E] group/link transition-colors"
          >
            <span>Read More</span>
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform duration-200" />
          </Link>
          <span className="text-[11px] text-[#8A857B] font-medium">{views}</span>
        </div>
      </div>
    </article>
  );
}
