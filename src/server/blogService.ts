import { BLOG_POSTS, BLOG_CATEGORIES, type BlogPost } from "../data/blogs";

// In-memory store for views and likes with seed values
interface BlogStats {
  views: number;
  likes: number;
}

const statsStore: Record<string, BlogStats> = {};

// Initialize store with baseline data from initial dataset
BLOG_POSTS.forEach((post) => {
  const numericViews =
    parseInt(post.views.replace(/[^0-9]/g, ""), 10) * (post.views.includes("K") ? 1000 : 1);
  statsStore[post.slug] = {
    views: numericViews || 1200,
    likes: post.likes || 42,
  };
});

export function formatViewCount(views: number): string {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + "M views";
  }
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + "K views";
  }
  return `${views} views`;
}

export function getAllBlogs(): (BlogPost & { viewsCount: number; likesCount: number })[] {
  return BLOG_POSTS.map((post) => {
    const stats = statsStore[post.slug] || { views: 1200, likes: 42 };
    return {
      ...post,
      views: formatViewCount(stats.views),
      viewsCount: stats.views,
      likes: stats.likes,
      likesCount: stats.likes,
    };
  });
}

export function getBlogBySlug(
  slug: string,
): (BlogPost & { viewsCount: number; likesCount: number }) | null {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return null;

  const stats = statsStore[slug] || { views: 1200, likes: 42 };
  return {
    ...post,
    views: formatViewCount(stats.views),
    viewsCount: stats.views,
    likes: stats.likes,
    likesCount: stats.likes,
  };
}

export function incrementBlogView(slug: string): {
  slug: string;
  views: string;
  viewsCount: number;
} {
  if (!statsStore[slug]) {
    statsStore[slug] = { views: 1200, likes: 42 };
  }
  statsStore[slug].views += 1;

  return {
    slug,
    views: formatViewCount(statsStore[slug].views),
    viewsCount: statsStore[slug].views,
  };
}

export function toggleBlogLike(
  slug: string,
  action: "like" | "unlike",
): { slug: string; likes: number } {
  if (!statsStore[slug]) {
    statsStore[slug] = { views: 1200, likes: 42 };
  }

  if (action === "like") {
    statsStore[slug].likes += 1;
  } else if (action === "unlike" && statsStore[slug].likes > 0) {
    statsStore[slug].likes -= 1;
  }

  return {
    slug,
    likes: statsStore[slug].likes,
  };
}

export function getBlogCategories() {
  const blogs = getAllBlogs();
  return BLOG_CATEGORIES.map((cat) => {
    if (cat.slug === "all") {
      return { ...cat, count: blogs.length };
    }
    const count = blogs.filter((b) => b.categorySlug === cat.slug).length;
    return { ...cat, count };
  });
}
