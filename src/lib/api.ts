// API Client for Desert Journey DXB Backend
import { BLOG_POSTS, type BlogPost } from "../data/blogs";

const API_BASE_URL = typeof window !== "undefined" && window.location.hostname === "localhost"
  ? "http://localhost:5000/api"
  : "/api";

// Helper for fetch with timeout and error handling
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<{ success: boolean; data?: T; message?: string; count?: number; likes?: number; token?: string; admin?: any }> {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("desert_admin_token") : null;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`API call to ${endpoint} failed, falling back to local handling:`, error);
    return { success: false, message: "Network connection error" };
  }
}

// ================= BLOGS API =================
export async function getBlogsApi(params?: { search?: string; category?: string; isPublished?: boolean }): Promise<BlogPost[]> {
  try {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.category && params.category !== "all") query.set("category", params.category);
    if (params?.isPublished !== undefined) query.set("isPublished", String(params.isPublished));

    const res = await fetchApi<BlogPost[]>(`/blogs?${query.toString()}`);
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
  } catch (e) {
    console.warn("Using fallback blog posts:", e);
  }
  
  // Fallback to local static blogs
  let list = [...BLOG_POSTS];
  if (params?.search) {
    const q = params.search.toLowerCase();
    list = list.filter(b => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q));
  }
  if (params?.category && params.category !== "all") {
    list = list.filter(b => b.categorySlug === params.category || b.category === params.category);
  }
  return list;
}

export async function getBlogByIdOrSlugApi(idOrSlug: string): Promise<BlogPost | null> {
  try {
    const res = await fetchApi<BlogPost>(`/blogs/${idOrSlug}`);
    if (res.success && res.data) {
      return res.data;
    }
  } catch (e) {
    console.warn("Using fallback single blog:", e);
  }

  return BLOG_POSTS.find(b => b.id === idOrSlug || b.slug === idOrSlug) || null;
}

export async function createBlogApi(blogData: Partial<BlogPost>): Promise<{ success: boolean; data?: BlogPost; message?: string }> {
  return await fetchApi<BlogPost>("/blogs", {
    method: "POST",
    body: JSON.stringify(blogData),
  });
}

export async function updateBlogApi(id: string, blogData: Partial<BlogPost>): Promise<{ success: boolean; data?: BlogPost; message?: string }> {
  return await fetchApi<BlogPost>(`/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(blogData),
  });
}

export async function deleteBlogApi(id: string): Promise<{ success: boolean; message?: string }> {
  return await fetchApi(`/blogs/${id}`, {
    method: "DELETE",
  });
}

export async function likeBlogApi(id: string): Promise<number | null> {
  const res = await fetchApi(`/blogs/${id}/like`, { method: "POST" });
  return res.likes ?? null;
}

export async function uploadImageApi(file: File): Promise<{ success: boolean; url?: string; message?: string }> {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const token = typeof window !== "undefined" ? localStorage.getItem("desert_admin_token") : null;
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      headers,
      body: formData,
    });

    return await res.json();
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, message: "Upload failed" };
  }
}

// ================= BOOKINGS API =================
export interface BookingItem {
  id: string;
  type: "safari" | "city-tour" | "general";
  name: string;
  email: string;
  phone: string;
  date?: string | undefined;
  guests?: number | undefined;
  package?: string | undefined;
  tourTitle?: string | undefined;
  tourPrice?: string | undefined;
  safariType?: string | undefined;
  tourName?: string | undefined;
  pickupLocation?: string | undefined;
  specialRequests?: string | undefined;
  message?: string | undefined;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  source?: string | undefined;
  createdAt?: string | undefined;
}

export async function getBookingsApi(params?: { type?: string; status?: string; search?: string }): Promise<BookingItem[]> {
  const query = new URLSearchParams();
  if (params?.type) query.set("type", params.type);
  if (params?.status) query.set("status", params.status);
  if (params?.search) query.set("search", params.search);

  const res = await fetchApi<BookingItem[]>(`/bookings?${query.toString()}`);
  return res.success && Array.isArray(res.data) ? res.data : [];
}

export async function submitSafariBookingApi(data: Partial<BookingItem>): Promise<{ success: boolean; message?: string; data?: BookingItem }> {
  return await fetchApi<BookingItem>("/bookings/safari", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function submitCityTourBookingApi(data: Partial<BookingItem>): Promise<{ success: boolean; message?: string; data?: BookingItem }> {
  return await fetchApi<BookingItem>("/bookings/city-tour", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function submitGeneralBookingApi(data: Partial<BookingItem>): Promise<{ success: boolean; message?: string; data?: BookingItem }> {
  return await fetchApi<BookingItem>("/bookings/general", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateBookingStatusApi(id: string, status: string): Promise<{ success: boolean; message?: string }> {
  return await fetchApi(`/bookings/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function deleteBookingApi(id: string): Promise<{ success: boolean; message?: string }> {
  return await fetchApi(`/bookings/${id}`, {
    method: "DELETE",
  });
}

// ================= CONTACT API =================
export interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  phone?: string | undefined;
  tourType?: string | undefined;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

export async function submitContactFormApi(data: { name: string; email: string; phone?: string; tourType?: string; message: string }): Promise<{ success: boolean; message?: string }> {
  return await fetchApi("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getContactMessagesApi(params?: { status?: string; search?: string }): Promise<ContactMessageItem[]> {
  const query = new URLSearchParams();
  if (params?.status) query.set("status", params.status);
  if (params?.search) query.set("search", params.search);

  const res = await fetchApi<ContactMessageItem[]>(`/contact?${query.toString()}`);
  return res.success && Array.isArray(res.data) ? res.data : [];
}

export async function updateContactStatusApi(id: string, status: string): Promise<{ success: boolean; message?: string }> {
  return await fetchApi(`/contact/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function deleteContactMessageApi(id: string): Promise<{ success: boolean; message?: string }> {
  return await fetchApi(`/contact/${id}`, {
    method: "DELETE",
  });
}

// ================= ADMIN STATS & AUTH =================
export interface DashboardStats {
  totalBlogs: number;
  publishedBlogs: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  safariBookings: number;
  cityTourBookings: number;
  generalBookings: number;
  totalContacts: number;
  newContacts: number;
  recentBookings: BookingItem[];
  recentContacts: ContactMessageItem[];
}

export async function getDashboardStatsApi(): Promise<DashboardStats | null> {
  const res = await fetchApi<DashboardStats>("/stats");
  return res.success && res.data ? res.data : null;
}

export async function adminLoginApi(credentials: { username: string; password: string }): Promise<{ success: boolean; token?: string; message?: string }> {
  return await fetchApi("/admin/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function checkBackendHealthApi(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { method: "GET" });
    const data = await res.json();
    return data.status === "ok";
  } catch {
    return false;
  }
}
