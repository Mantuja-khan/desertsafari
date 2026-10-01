import { useState, useEffect, useCallback } from "react";
import { BLOG_POSTS, type BlogPost } from "../data/blogs";
import { getBlogsApi } from "../lib/api";

interface BlogStatsState {
  views: string;
  viewsCount: number;
  likes: number;
  hasLiked: boolean;
}

export function useBlogStats(slug: string, initialLikes = 42, initialViews = "1.2K views") {
  const [stats, setStats] = useState<BlogStatsState>(() => {
    const isBrowser = typeof window !== "undefined";
    const likedKey = `blog_liked_${slug}`;
    const storedLiked = isBrowser ? localStorage.getItem(likedKey) === "true" : false;

    // Parse initial views
    const initialNumericViews =
      parseInt(initialViews.replace(/[^0-9]/g, ""), 10) * (initialViews.includes("K") ? 1000 : 1);

    return {
      views: initialViews,
      viewsCount: initialNumericViews || 1200,
      likes: initialLikes,
      hasLiked: storedLiked,
    };
  });

  // Fetch actual stats & record view on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    let isMounted = true;

    async function fetchStatsAndIncrementView() {
      try {
        // Increment view only once per session
        const sessionViewKey = `blog_viewed_${slug}`;
        const alreadyViewed = sessionStorage.getItem(sessionViewKey);

        if (!alreadyViewed) {
          sessionStorage.setItem(sessionViewKey, "true");
          const viewRes = await fetch(`/api/blogs/${slug}/view`, { method: "POST" });
          if (viewRes.ok) {
            const viewData = await viewRes.json();
            if (isMounted && viewData.views) {
              setStats((prev) => ({
                ...prev,
                views: viewData.views,
                viewsCount: viewData.viewsCount,
              }));
            }
          }
        }

        // Fetch current blog state
        const res = await fetch(`/api/blogs/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            const likedKey = `blog_liked_${slug}`;
            const storedLiked = localStorage.getItem(likedKey) === "true";

            setStats({
              views: data.views || initialViews,
              viewsCount: data.viewsCount || 1200,
              likes: data.likes || initialLikes,
              hasLiked: storedLiked,
            });
          }
        }
      } catch (err) {
        console.error("Failed to sync blog stats with backend:", err);
      }
    }

    fetchStatsAndIncrementView();

    return () => {
      isMounted = false;
    };
  }, [slug, initialViews, initialLikes]);

  // Toggle Like handler
  const toggleLike = useCallback(async () => {
    const nextLikedState = !stats.hasLiked;
    const action = nextLikedState ? "like" : "unlike";

    // Optimistic UI update
    setStats((prev) => ({
      ...prev,
      hasLiked: nextLikedState,
      likes: nextLikedState ? prev.likes + 1 : Math.max(0, prev.likes - 1),
    }));

    if (typeof window !== "undefined") {
      localStorage.setItem(`blog_liked_${slug}`, String(nextLikedState));
    }

    try {
      const res = await fetch(`/api/blogs/${slug}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        const data = await res.json();
        setStats((prev) => ({
          ...prev,
          likes: data.likes,
        }));
      }
    } catch (err) {
      console.error("Failed to update like on backend:", err);
    }
  }, [slug, stats.hasLiked]);

  return {
    views: stats.views,
    viewsCount: stats.viewsCount,
    likes: stats.likes,
    hasLiked: stats.hasLiked,
    toggleLike,
  };
}

// Hook to fetch all blogs with live stats for listing/home pages
export function useAllBlogsWithStats(initialBlogs: BlogPost[] = BLOG_POSTS) {
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);

  useEffect(() => {
    if (typeof window === "undefined") return;

    async function fetchBlogs() {
      try {
        const data = await getBlogsApi();
        if (Array.isArray(data) && data.length > 0) {
          setBlogs(data);
        }
      } catch (err) {
        console.error("Failed to load blogs from backend API:", err);
      }
    }

    fetchBlogs();
  }, []);

  return blogs;
}

