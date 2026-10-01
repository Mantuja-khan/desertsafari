import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import {
  Sparkles,
  LayoutDashboard,
  FileText,
  CalendarCheck,
  Mail,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  Search,
  ExternalLink,
  LogOut,
  Lock,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Tag,
  MessageSquare,
  Phone,
  Compass,
  Building,
  Check,
  X,
  AlertCircle,
  RefreshCw,
  Server,
  Upload,
} from "lucide-react";
import {
  getBlogsApi,
  createBlogApi,
  updateBlogApi,
  deleteBlogApi,
  getBookingsApi,
  updateBookingStatusApi,
  deleteBookingApi,
  getContactMessagesApi,
  updateContactStatusApi,
  deleteContactMessageApi,
  getDashboardStatsApi,
  adminLoginApi,
  checkBackendHealthApi,
  uploadImageApi,
  type BookingItem,
  type ContactMessageItem,
  type DashboardStats,
} from "../../lib/api";
import { type BlogPost } from "../../data/blogs";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Portal | Desert Journey DXB Management" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  // Login Form State
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("desertadmin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<"dashboard" | "blogs" | "bookings" | "contacts" | "settings">("dashboard");
  const [isServerOnline, setIsServerOnline] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Data States
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [contacts, setContacts] = useState<ContactMessageItem[]>([]);

  // Blog Management State
  const [blogSearch, setBlogSearch] = useState("");
  const [blogCategoryFilter, setBlogCategoryFilter] = useState("all");
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isSavingBlog, setIsSavingBlog] = useState(false);
  const [blogFormTab, setBlogFormTab] = useState<"edit" | "preview">("edit");

  // Blog Form Fields
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSlug, setBlogSlug] = useState("");
  const [blogCategory, setBlogCategory] = useState("Travel Tips");
  const [blogAuthor, setBlogAuthor] = useState("Desert Journey Team");
  const [blogReadTime, setBlogReadTime] = useState("5 min read");
  const [blogImage, setBlogImage] = useState("/about_suv.jpg");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogTags, setBlogTags] = useState("Desert Safari, Travel Tips, Adventure");
  const [blogIsPublished, setBlogIsPublished] = useState(true);
  const [blogFeatured, setBlogFeatured] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Bookings Filter
  const [bookingTypeFilter, setBookingTypeFilter] = useState<string>("all");
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>("all");
  const [bookingSearch, setBookingSearch] = useState("");

  // Contacts Filter
  const [contactStatusFilter, setContactStatusFilter] = useState<string>("all");
  const [contactSearch, setContactSearch] = useState("");

  // Selected Item Modal View
  const [viewingBooking, setViewingBooking] = useState<BookingItem | null>(null);

  // Notification Banner
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Check existing session
  useEffect(() => {
    const token = localStorage.getItem("desert_admin_token");
    if (token) {
      setIsAuthenticated(true);
    }
    setAuthChecking(false);
  }, []);

  // Load backend health and data
  const loadAllData = async () => {
    setIsLoadingData(true);
    try {
      const serverStatus = await checkBackendHealthApi();
      setIsServerOnline(serverStatus);

      const [blogsData, bookingsData, contactsData, statsData] = await Promise.all([
        getBlogsApi(),
        getBookingsApi(),
        getContactMessagesApi(),
        getDashboardStatsApi(),
      ]);

      setBlogs(blogsData);
      setBookings(bookingsData);
      setContacts(contactsData);
      if (statsData) setStats(statsData);
    } catch (error) {
      console.error("Error loading admin data:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  // Handle Admin Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await adminLoginApi({ username, password });
      if (res.success && res.token) {
        localStorage.setItem("desert_admin_token", res.token);
        setIsAuthenticated(true);
        showToast("Welcome back, Administrator!");
      } else {
        // Fallback local verification
        if (username === "admin" && password === "desertadmin123") {
          localStorage.setItem("desert_admin_token", "local_admin_session_token");
          setIsAuthenticated(true);
          showToast("Logged in via local authentication");
        } else {
          setLoginError(res.message || "Invalid username or password");
        }
      }
    } catch {
      if (username === "admin" && password === "desertadmin123") {
        localStorage.setItem("desert_admin_token", "local_admin_session_token");
        setIsAuthenticated(true);
      } else {
        setLoginError("Invalid credentials");
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("desert_admin_token");
    setIsAuthenticated(false);
    showToast("You have been logged out");
  };

  // Open Blog Modal for Create or Edit
  const handleOpenBlogModal = (blogToEdit?: BlogPost) => {
    if (blogToEdit) {
      setEditingBlog(blogToEdit);
      setBlogTitle(blogToEdit.title || "");
      setBlogSlug(blogToEdit.slug || "");
      setBlogCategory(blogToEdit.category || "Travel Tips");
      setBlogAuthor((blogToEdit as any).author || "Desert Journey Team");
      setBlogReadTime(blogToEdit.readTime || "5 min read");
      setBlogImage(blogToEdit.image || "/about_suv.jpg");
      setBlogExcerpt(blogToEdit.excerpt || "");
      setBlogContent((blogToEdit as any).content || blogToEdit.intro || "");
      setBlogTags(Array.isArray(blogToEdit.tags) ? blogToEdit.tags.join(", ") : "Desert Safari, Travel Tips");
      setBlogIsPublished((blogToEdit as any).isPublished !== false);
      setBlogFeatured(Boolean((blogToEdit as any).featured));
    } else {
      setEditingBlog(null);
      setBlogTitle("");
      setBlogSlug("");
      setBlogCategory("Travel Tips");
      setBlogAuthor("Desert Journey Team");
      setBlogReadTime("5 min read");
      setBlogImage("/about_suv.jpg");
      setBlogExcerpt("");
      setBlogContent("");
      setBlogTags("Desert Safari, Travel Tips, Dubai");
      setBlogIsPublished(true);
      setBlogFeatured(false);
    }
    setBlogFormTab("edit");
    setIsBlogModalOpen(true);
  };

  // Auto generate slug from title
  const handleTitleChange = (val: string) => {
    setBlogTitle(val);
    if (!editingBlog) {
      const genSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setBlogSlug(genSlug);
    }
  };

  // Save Blog Post
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim()) {
      showToast("Please provide a blog title", "error");
      return;
    }

    setIsSavingBlog(true);
    const blogData: Partial<BlogPost> = {
      title: blogTitle.trim(),
      slug: blogSlug.trim() || blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: blogCategory,
      categorySlug: blogCategory.toLowerCase().replace(/\s+/g, "-"),
      categoryBadge: blogCategory.toUpperCase(),
      author: blogAuthor,
      readTime: blogReadTime,
      image: blogImage,
      excerpt: blogExcerpt,
      intro: blogExcerpt,
      content: blogContent,
      tags: blogTags.split(",").map((t) => t.trim()).filter(Boolean),
      isPublished: blogIsPublished,
      featured: blogFeatured,
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    } as any;

    try {
      if (editingBlog) {
        const res = await updateBlogApi(editingBlog.id, blogData);
        if (res.success && res.data) {
          setBlogs((prev) => prev.map((b) => (b.id === editingBlog.id ? res.data! : b)));
          showToast("Blog post updated successfully!");
        } else {
          // Local fallback
          setBlogs((prev) => prev.map((b) => (b.id === editingBlog.id ? { ...b, ...blogData } as BlogPost : b)));
          showToast("Blog post updated!");
        }
      } else {
        const res = await createBlogApi(blogData);
        if (res.success && res.data) {
          setBlogs((prev) => [res.data!, ...prev]);
          showToast("New blog post published successfully!");
        } else {
          const newLocalBlog: BlogPost = {
            id: String(Date.now()),
            ...blogData,
            views: "10 views",
            likes: 0,
          } as BlogPost;
          setBlogs((prev) => [newLocalBlog, ...prev]);
          showToast("New blog post created!");
        }
      }
      setIsBlogModalOpen(false);
    } catch (err) {
      console.error(err);
      showToast("Failed to save blog post", "error");
    } finally {
      setIsSavingBlog(false);
    }
  };

  // Delete Blog Post
  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await deleteBlogApi(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      showToast("Blog post deleted");
    } catch {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      showToast("Blog post removed");
    }
  };

  // Handle Image File Upload
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await uploadImageApi(file);
      if (res.success && res.url) {
        setBlogImage(res.url);
        showToast("Image uploaded successfully!");
      } else {
        // Fallback: convert to Object URL or placeholder
        const localUrl = URL.createObjectURL(file);
        setBlogImage(localUrl);
        showToast("Image selected (local preview)");
      }
    } catch {
      showToast("Image upload error", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle Booking Status Change
  const handleUpdateBookingStatus = async (id: string, newStatus: string) => {
    try {
      await updateBookingStatusApi(id, newStatus);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus as any } : b))
      );
      if (viewingBooking && viewingBooking.id === id) {
        setViewingBooking((prev) => (prev ? { ...prev, status: newStatus as any } : null));
      }
      showToast(`Booking marked as ${newStatus}`);
    } catch {
      showToast("Failed to update status", "error");
    }
  };

  // Delete Booking
  const handleDeleteBooking = async (id: string) => {
    if (!window.confirm("Delete this booking entry?")) return;
    try {
      await deleteBookingApi(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      if (viewingBooking && viewingBooking.id === id) setViewingBooking(null);
      showToast("Booking deleted");
    } catch {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      showToast("Booking deleted");
    }
  };

  // Handle Contact Message Status Change
  const handleUpdateContactStatus = async (id: string, newStatus: string) => {
    try {
      await updateContactStatusApi(id, newStatus);
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus as any } : c))
      );
      showToast(`Message marked as ${newStatus}`);
    } catch {
      showToast("Failed to update status", "error");
    }
  };

  // Delete Contact Message
  const handleDeleteContact = async (id: string) => {
    if (!window.confirm("Delete this contact message?")) return;
    try {
      await deleteContactMessageApi(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      showToast("Message deleted");
    } catch {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      showToast("Message deleted");
    }
  };

  // Filtered Blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchSearch =
        !blogSearch ||
        b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(blogSearch.toLowerCase());
      const matchCategory =
        blogCategoryFilter === "all" ||
        b.categorySlug === blogCategoryFilter ||
        b.category.toLowerCase() === blogCategoryFilter.toLowerCase();
      return matchSearch && matchCategory;
    });
  }, [blogs, blogSearch, blogCategoryFilter]);

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchType = bookingTypeFilter === "all" || b.type === bookingTypeFilter;
      const matchStatus = bookingStatusFilter === "all" || b.status === bookingStatusFilter;
      const matchSearch =
        !bookingSearch ||
        b.name.toLowerCase().includes(bookingSearch.toLowerCase()) ||
        b.email.toLowerCase().includes(bookingSearch.toLowerCase()) ||
        b.phone.includes(bookingSearch) ||
        (b.package && b.package.toLowerCase().includes(bookingSearch.toLowerCase()));
      return matchType && matchStatus && matchSearch;
    });
  }, [bookings, bookingTypeFilter, bookingStatusFilter, bookingSearch]);

  // Filtered Contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const matchStatus = contactStatusFilter === "all" || c.status === contactStatusFilter;
      const matchSearch =
        !contactSearch ||
        c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
        c.email.toLowerCase().includes(contactSearch.toLowerCase()) ||
        c.message.toLowerCase().includes(contactSearch.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [contacts, contactStatusFilter, contactSearch]);

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#072520] flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-[#E4B564]" />
          <span>Loading Admin Console...</span>
        </div>
      </div>
    );
  }

  // ================= LOGIN SCREEN =================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#072520] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans selection:bg-[#E4B564] selection:text-[#072520]">
        {/* Background Ambient Glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#E4B564]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#145248]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">
          {/* Brand Logo Banner */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E4B564] to-[#B3792A] text-[#072520] shadow-2xl mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-white tracking-wide">Desert Journey DXB</h1>
            <p className="text-xs text-[#E4B564] uppercase tracking-[0.25em] font-semibold mt-1">
              Admin & Content Control Center
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-[#0D3B33]/80 backdrop-blur-xl border border-[#E4B564]/30 rounded-3xl p-7 sm:p-8 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-1.5 flex items-center gap-2">
              <span>Sign In to Dashboard</span>
            </h2>
            <p className="text-xs text-white/70 mb-6 leading-relaxed">
              Manage desert safari tour bookings, blog guides, customer inquiries and live reservations.
            </p>

            {loginError && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#E4B564] mb-1.5">
                  Admin Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#E4B564] transition-colors"
                  placeholder="admin"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#E4B564] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#E4B564] transition-colors pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[11px] text-white/70">
                <p className="font-semibold text-[#E4B564] mb-0.5">Default Credentials:</p>
                <p>Username: <code className="text-white font-mono">admin</code> | Password: <code className="text-white font-mono">desertadmin123</code></p>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-gradient-to-r from-[#E4B564] to-[#C68A36] hover:from-[#F0C57A] hover:to-[#D4A353] text-[#072520] font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {loginLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Access Admin Portal</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-white/10 text-center">
              <Link to="/" className="text-xs text-white/60 hover:text-[#E4B564] transition-colors inline-flex items-center gap-1.5">
                <span>← Back to Public Website</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= ADMIN DASHBOARD =================
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1D2523] flex flex-col font-sans selection:bg-[#C68A36] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-[9999] px-5 py-3.5 rounded-2xl shadow-2xl text-white text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-200 ${
            toastMessage.type === "error" ? "bg-red-600" : "bg-[#0D3B33] border border-[#E4B564]"
          }`}
        >
          {toastMessage.type === "error" ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4 text-[#E4B564]" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top Admin Navigation Bar */}
      <header className="bg-[#072520] text-white border-b border-[#E4B564]/30 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E4B564] to-[#B3792A] text-[#072520] flex items-center justify-center font-bold font-serif text-lg shadow-md">
                D
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white tracking-tight block leading-none">
                  Desert Journey <span className="text-[#E4B564]">Admin</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-white/60 font-mono">Control Center</span>
              </div>
            </Link>

            {/* Server Status Badge */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
              <span className={`w-2 h-2 rounded-full ${isServerOnline ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              <span className="text-white/80 font-mono text-[11px]">
                {isServerOnline ? "Backend: Connected (Port 5000)" : "Backend: Standalone Mode"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllData}
              disabled={isLoadingData}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1.5"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingData ? "animate-spin text-[#E4B564]" : ""}`} />
              <span className="hidden md:inline">Refresh</span>
            </button>

            <Link
              to="/"
              target="_blank"
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-[#E4B564] transition-colors text-xs flex items-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">View Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 transition-colors text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-3 rounded-t-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "dashboard"
                ? "text-[#E4B564] border-[#E4B564] bg-white/5"
                : "text-white/60 border-transparent hover:text-white hover:bg-white/5"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`px-4 py-3 rounded-t-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "blogs"
                ? "text-[#E4B564] border-[#E4B564] bg-white/5"
                : "text-white/60 border-transparent hover:text-white hover:bg-white/5"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Blog Manager ({blogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-3 rounded-t-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "bookings"
                ? "text-[#E4B564] border-[#E4B564] bg-white/5"
                : "text-white/60 border-transparent hover:text-white hover:bg-white/5"
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Bookings ({bookings.length})</span>
            {bookings.filter((b) => b.status === "pending").length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#E4B564] text-[#072520] text-[10px] font-bold">
                {bookings.filter((b) => b.status === "pending").length} new
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-4 py-3 rounded-t-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "contacts"
                ? "text-[#E4B564] border-[#E4B564] bg-white/5"
                : "text-white/60 border-transparent hover:text-white hover:bg-white/5"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Messages ({contacts.length})</span>
            {contacts.filter((c) => c.status === "new").length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-400 text-[#072520] text-[10px] font-bold">
                {contacts.filter((c) => c.status === "new").length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Body Content */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* ================= TAB 1: DASHBOARD OVERVIEW ================= */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fade-in">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-[#E5E0D6] shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#6B7672]">Total Blogs</span>
                  <div className="w-10 h-10 rounded-2xl bg-[#0D3B33]/10 text-[#0D3B33] flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-serif font-bold text-[#0D3B33]">{blogs.length}</div>
                <div className="text-xs text-[#6B7672] mt-1">
                  {blogs.filter((b) => (b as any).isPublished !== false).length} published • 0 drafts
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#E5E0D6] shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#6B7672]">Safari Bookings</span>
                  <div className="w-10 h-10 rounded-2xl bg-[#C68A36]/15 text-[#C68A36] flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-serif font-bold text-[#C68A36]">
                  {bookings.filter((b) => b.type === "safari").length}
                </div>
                <div className="text-xs text-[#6B7672] mt-1">
                  {bookings.filter((b) => b.type === "safari" && b.status === "confirmed").length} confirmed reservations
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#E5E0D6] shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#6B7672]">City Tour Bookings</span>
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Building className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-serif font-bold text-blue-900">
                  {bookings.filter((b) => b.type === "city-tour").length}
                </div>
                <div className="text-xs text-[#6B7672] mt-1">
                  Dubai, Abu Dhabi & Hatta tours
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#E5E0D6] shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#6B7672]">Contact Inquiries</span>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-serif font-bold text-emerald-800">{contacts.length}</div>
                <div className="text-xs text-[#6B7672] mt-1">
                  {contacts.filter((c) => c.status === "new").length} unread messages
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Bookings */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left 2 Cols: Recent Bookings Table */}
              <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E5E0D6] p-6 shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0D3B33]">Recent Booking Requests</h3>
                    <p className="text-xs text-[#6B7672]">Real-time submissions from website forms</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className="text-xs font-bold text-[#C68A36] hover:underline cursor-pointer"
                  >
                    View All ({bookings.length}) →
                  </button>
                </div>

                {bookings.length === 0 ? (
                  <div className="text-center py-12 text-[#6B7672] text-sm">No bookings received yet.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#E5E0D6] text-[#6B7672] uppercase tracking-wider font-bold">
                          <th className="pb-3">Customer</th>
                          <th className="pb-3">Tour Package</th>
                          <th className="pb-3">Date / Guests</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {bookings.slice(0, 5).map((b) => (
                          <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="py-3.5 pr-3">
                              <div className="font-bold text-[#0D3B33]">{b.name}</div>
                              <div className="text-[11px] text-[#6B7672]">{b.phone}</div>
                            </td>
                            <td className="py-3.5 pr-3">
                              <span className="font-medium text-[#1D2523] block max-w-xs truncate">{b.package}</span>
                              <span className="text-[10px] text-[#C68A36] font-mono uppercase">{b.type}</span>
                            </td>
                            <td className="py-3.5 pr-3 text-[#5A5449]">
                              <div>{b.date}</div>
                              <div className="text-[10px] text-[#6B7672]">{b.guests} Guests</div>
                            </td>
                            <td className="py-3.5 pr-3">
                              <span
                                className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  b.status === "confirmed"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : b.status === "completed"
                                    ? "bg-blue-100 text-blue-800"
                                    : b.status === "cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {b.status}
                              </span>
                            </td>
                            <td className="py-3.5 text-right">
                              <button
                                onClick={() => setViewingBooking(b)}
                                className="px-3 py-1.5 rounded-lg bg-[#0D3B33]/5 hover:bg-[#0D3B33] hover:text-white text-[#0D3B33] font-bold text-[11px] transition-colors cursor-pointer"
                              >
                                Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Right 1 Col: Quick Actions & Recent Messages */}
              <div className="space-y-6">
                {/* Action Card */}
                <div className="bg-gradient-to-br from-[#0D3B33] to-[#072520] text-white rounded-3xl p-6 shadow-md">
                  <div className="flex items-center gap-2 text-[#E4B564] text-xs font-bold uppercase tracking-widest mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Quick Management</span>
                  </div>
                  <h4 className="font-serif text-xl font-bold mb-4">Content & Publishing</h4>
                  <div className="space-y-2.5">
                    <button
                      onClick={() => handleOpenBlogModal()}
                      className="w-full bg-[#E4B564] hover:bg-[#F0C57A] text-[#072520] font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create New Blog Post</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("bookings")}
                      className="w-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      <span>Review Safari Bookings</span>
                    </button>
                  </div>
                </div>

                {/* Recent Inquiries */}
                <div className="bg-white rounded-3xl border border-[#E5E0D6] p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-serif text-base font-bold text-[#0D3B33]">Recent Inquiries</h4>
                    <button
                      onClick={() => setActiveTab("contacts")}
                      className="text-xs font-bold text-[#C68A36] hover:underline cursor-pointer"
                    >
                      View All →
                    </button>
                  </div>
                  {contacts.length === 0 ? (
                    <p className="text-xs text-[#6B7672]">No messages received yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {contacts.slice(0, 3).map((c) => (
                        <div key={c.id} className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EFECE6]">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs text-[#0D3B33]">{c.name}</span>
                            <span className="text-[10px] text-[#6B7672]">{c.tourType}</span>
                          </div>
                          <p className="text-xs text-[#5A5449] line-clamp-2">{c.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: BLOG MANAGEMENT (CMS) ================= */}
        {activeTab === "blogs" && (
          <div className="space-y-6 animate-fade-in">
            {/* Header controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E5E0D6] shadow-xs">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0D3B33]">Blog Post CMS</h2>
                <p className="text-xs text-[#6B7672] mt-0.5">
                  Create, edit, and publish rich travel guides and safari articles
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleOpenBlogModal()}
                  className="bg-[#C68A36] hover:bg-[#B3792A] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write New Blog Post</span>
                </button>
              </div>
            </div>

            {/* Filter & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blogs by title or keyword..."
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  className="w-full bg-white border border-[#E5E0D6] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1D2523] placeholder-gray-400 focus:outline-none focus:border-[#C68A36]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1">
                {["all", "travel-tips", "safari-experiences", "desert-culture", "tour-packages", "food-tradition"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setBlogCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                      blogCategoryFilter === cat
                        ? "bg-[#0D3B33] text-white"
                        : "bg-white text-[#6B7672] border border-[#E5E0D6] hover:text-[#0D3B33]"
                    }`}
                  >
                    {cat.replace(/-/g, " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Blogs List */}
            {filteredBlogs.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#E5E0D6] p-12 text-center text-[#6B7672]">
                <FileText className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <h4 className="font-serif text-lg font-bold text-[#0D3B33] mb-1">No blogs found</h4>
                <p className="text-xs">Try adjusting your search query or category filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-white rounded-3xl border border-[#E5E0D6] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
                  >
                    {/* Cover Thumbnail */}
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                      <img
                        src={blog.image || "/about_suv.jpg"}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-bold uppercase tracking-widest text-[#E4B564]">
                        {blog.category}
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                        Published
                      </div>
                    </div>

                    {/* Blog Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-[11px] text-[#6B7672] mb-2 font-mono">
                          <span>{blog.date}</span>
                          <span>•</span>
                          <span>{blog.readTime}</span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-[#0D3B33] mb-2 line-clamp-2 leading-snug">
                          {blog.title}
                        </h3>
                        <p className="text-xs text-[#5A5449] line-clamp-3 leading-relaxed mb-4">{blog.excerpt}</p>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <Link
                          to="/blog/$slug"
                          params={{ slug: blog.slug }}
                          target="_blank"
                          className="text-xs font-bold text-[#0D3B33] hover:text-[#C68A36] flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Post</span>
                        </Link>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenBlogModal(blog)}
                            className="p-2 rounded-xl bg-[#0D3B33]/5 hover:bg-[#0D3B33] hover:text-white text-[#0D3B33] transition-colors cursor-pointer"
                            title="Edit Blog"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="p-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors cursor-pointer"
                            title="Delete Blog"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: BOOKINGS MANAGEMENT ================= */}
        {activeTab === "bookings" && (
          <div className="space-y-6 animate-fade-in">
            {/* Header controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E5E0D6] shadow-xs">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0D3B33]">Bookings & Tour Reservations</h2>
                <p className="text-xs text-[#6B7672] mt-0.5">
                  View and manage submissions from Safari, City Tour, and Book Now modal forms
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#6B7672] font-semibold">Filter Type:</span>
                <select
                  value={bookingTypeFilter}
                  onChange={(e) => setBookingTypeFilter(e.target.value)}
                  className="bg-gray-50 border border-[#E5E0D6] rounded-xl px-3 py-2 text-xs text-[#0D3B33] font-bold focus:outline-none focus:border-[#C68A36]"
                >
                  <option value="all">All Forms</option>
                  <option value="safari">Desert Safari Form</option>
                  <option value="city-tour">City Tour Form</option>
                  <option value="general">Book Now Modal</option>
                </select>
              </div>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by customer, email, phone, or package..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  className="w-full bg-white border border-[#E5E0D6] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1D2523] placeholder-gray-400 focus:outline-none focus:border-[#C68A36]"
                />
              </div>

              <div className="flex items-center gap-2">
                {["all", "pending", "confirmed", "completed", "cancelled"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setBookingStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer capitalize ${
                      bookingStatusFilter === st
                        ? "bg-[#0D3B33] text-white"
                        : "bg-white text-[#6B7672] border border-[#E5E0D6] hover:text-[#0D3B33]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Table Card */}
            <div className="bg-white rounded-3xl border border-[#E5E0D6] overflow-hidden shadow-xs">
              {filteredBookings.length === 0 ? (
                <div className="p-12 text-center text-[#6B7672]">
                  <CalendarCheck className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <h4 className="font-serif text-lg font-bold text-[#0D3B33] mb-1">No Bookings Found</h4>
                  <p className="text-xs">No booking records match the selected filters.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F5] border-b border-[#E5E0D6] text-[#6B7672] uppercase tracking-wider font-bold">
                      <tr>
                        <th className="py-3.5 px-6">ID & Date</th>
                        <th className="py-3.5 px-4">Customer Details</th>
                        <th className="py-3.5 px-4">Package & Guests</th>
                        <th className="py-3.5 px-4">Pickup Location</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <span className="font-mono text-[11px] font-bold text-[#0D3B33] block">{b.id}</span>
                            <span className="text-[10px] text-[#6B7672]">
                              {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "-"}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-bold text-[#0D3B33] text-sm">{b.name}</div>
                            <div className="text-[#6B7672]">{b.email}</div>
                            <div className="text-[11px] font-mono text-[#C68A36] mt-0.5">{b.phone}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-semibold text-[#1D2523]">{b.package}</div>
                            <div className="text-[11px] text-[#6B7672]">
                              📅 Tour Date: <strong className="text-[#0D3B33]">{b.date}</strong> ({b.guests} Guests)
                            </div>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-gray-100 text-[#5A5449] text-[10px] font-mono">
                              {b.source}
                            </span>
                          </td>
                          <td className="py-4 px-4 max-w-xs truncate text-[#5A5449]">
                            {b.pickupLocation || "Not specified (Hotel pickup requested)"}
                          </td>
                          <td className="py-4 px-4">
                            <select
                              value={b.status}
                              onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                                b.status === "confirmed"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                  : b.status === "completed"
                                  ? "bg-blue-50 text-blue-800 border-blue-300"
                                  : b.status === "cancelled"
                                  ? "bg-red-50 text-red-800 border-red-300"
                                  : "bg-amber-50 text-amber-800 border-amber-300"
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                  `Hello ${b.name}, this is Desert Journey DXB regarding your booking for ${b.package}.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 transition-colors"
                                title="Chat on WhatsApp"
                              >
                                <Phone className="w-4 h-4" />
                              </a>
                              <button
                                onClick={() => setViewingBooking(b)}
                                className="p-2 rounded-xl bg-[#0D3B33]/5 hover:bg-[#0D3B33] hover:text-white text-[#0D3B33] transition-colors cursor-pointer"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteBooking(b.id)}
                                className="p-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors cursor-pointer"
                                title="Delete Record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 4: CONTACT INQUIRIES ================= */}
        {activeTab === "contacts" && (
          <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E5E0D6] shadow-xs">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0D3B33]">Contact Form Inquiries</h2>
                <p className="text-xs text-[#6B7672] mt-0.5">Customer messages submitted from the contact page</p>
              </div>

              <div className="flex items-center gap-2">
                {["all", "new", "replied"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setContactStatusFilter(st)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer capitalize ${
                      contactStatusFilter === st
                        ? "bg-[#0D3B33] text-white"
                        : "bg-white text-[#6B7672] border border-[#E5E0D6] hover:text-[#0D3B33]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Contacts Cards */}
            {filteredContacts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#E5E0D6] p-12 text-center text-[#6B7672]">
                <Mail className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <h4 className="font-serif text-lg font-bold text-[#0D3B33] mb-1">No Messages Found</h4>
                <p className="text-xs">No contact requests match your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredContacts.map((c) => (
                  <div key={c.id} className="bg-white rounded-3xl border border-[#E5E0D6] p-6 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 rounded-full bg-[#E4B564]/20 text-[#0D3B33] text-[10px] font-bold uppercase tracking-wider">
                          {c.tourType || "General Inquiry"}
                        </span>
                        <select
                          value={c.status}
                          onChange={(e) => handleUpdateContactStatus(c.id, e.target.value)}
                          className="text-[11px] font-bold bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1"
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                      </div>

                      <h4 className="font-serif text-lg font-bold text-[#0D3B33] mb-1">{c.name}</h4>
                      <div className="flex items-center gap-3 text-xs text-[#6B7672] mb-3">
                        <span>{c.email}</span>
                        {c.phone && <span>• {c.phone}</span>}
                      </div>

                      <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EFECE6] text-xs text-[#4A443B] leading-relaxed mb-4">
                        {c.message}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-[10px] text-[#6B7672] font-mono">
                        {new Date(c.createdAt).toLocaleString()}
                      </span>
                      <div className="flex items-center gap-2">
                        {c.phone && (
                          <a
                            href={`https://wa.me/${c.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        )}
                        <a
                          href={`mailto:${c.email}`}
                          className="px-3 py-1.5 rounded-xl bg-[#0D3B33]/5 text-[#0D3B33] hover:bg-[#0D3B33] hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply</span>
                        </a>
                        <button
                          onClick={() => handleDeleteContact(c.id)}
                          className="p-1.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ================= BLOG CREATE / EDIT MODAL ================= */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-[#E5E0D6] overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in duration-200">
            {/* Modal Header */}
            <div className="bg-[#072520] text-white p-5 sm:p-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E4B564] block mb-0.5">
                  Content Management
                </span>
                <h3 className="font-serif text-2xl font-bold">
                  {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex bg-white/10 rounded-xl p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setBlogFormTab("edit")}
                    className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                      blogFormTab === "edit" ? "bg-[#E4B564] text-[#072520]" : "text-white/80 hover:text-white"
                    }`}
                  >
                    Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlogFormTab("preview")}
                    className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                      blogFormTab === "preview" ? "bg-[#E4B564] text-[#072520]" : "text-white/80 hover:text-white"
                    }`}
                  >
                    Preview
                  </button>
                </div>

                <button
                  onClick={() => setIsBlogModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Form / Preview Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {blogFormTab === "edit" ? (
                <form onSubmit={handleSaveBlog} id="blogForm" className="space-y-5">
                  {/* Title & Slug */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5449] mb-1.5">
                        Post Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={blogTitle}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. 10 Best Desert Safari Tips for First Timers"
                        className="w-full bg-[#FAF8F5] border border-[#E5E0D6] rounded-xl px-4 py-3 text-sm text-[#1D2523] font-semibold focus:outline-none focus:border-[#C68A36]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5449] mb-1.5">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        value={blogSlug}
                        onChange={(e) => setBlogSlug(e.target.value)}
                        placeholder="top-desert-safari-tips"
                        className="w-full bg-[#FAF8F5] border border-[#E5E0D6] rounded-xl px-4 py-3 text-sm text-[#1D2523] font-mono text-xs focus:outline-none focus:border-[#C68A36]"
                      />
                    </div>
                  </div>

                  {/* Category, Author, ReadTime */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5449] mb-1.5">
                        Category
                      </label>
                      <select
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#E5E0D6] rounded-xl px-4 py-3 text-sm text-[#1D2523] font-medium focus:outline-none focus:border-[#C68A36]"
                      >
                        <option value="Travel Tips">Travel Tips</option>
                        <option value="Safari Experiences">Safari Experiences</option>
                        <option value="Desert Culture">Desert Culture</option>
                        <option value="Tour Packages">Tour Packages</option>
                        <option value="Food & Tradition">Food & Tradition</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5449] mb-1.5">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={blogAuthor}
                        onChange={(e) => setBlogAuthor(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#E5E0D6] rounded-xl px-4 py-3 text-sm text-[#1D2523] focus:outline-none focus:border-[#C68A36]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5449] mb-1.5">
                        Read Time
                      </label>
                      <input
                        type="text"
                        value={blogReadTime}
                        onChange={(e) => setBlogReadTime(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#E5E0D6] rounded-xl px-4 py-3 text-sm text-[#1D2523] focus:outline-none focus:border-[#C68A36]"
                      />
                    </div>
                  </div>

                  {/* Cover Image URL + Upload */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5449] mb-1.5">
                      Cover Image (URL or Upload)
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={blogImage}
                        onChange={(e) => setBlogImage(e.target.value)}
                        placeholder="/about_suv.jpg or https://..."
                        className="flex-1 bg-[#FAF8F5] border border-[#E5E0D6] rounded-xl px-4 py-3 text-sm text-[#1D2523] focus:outline-none focus:border-[#C68A36]"
                      />
                      <label className="bg-[#0D3B33] hover:bg-[#145248] text-white px-4 py-3 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5 transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>{uploadingImage ? "Uploading..." : "Upload File"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Excerpt / Summary */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5449] mb-1.5">
                      Short Excerpt / Summary *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={blogExcerpt}
                      onChange={(e) => setBlogExcerpt(e.target.value)}
                      placeholder="Brief 2-line summary for cards and search engines..."
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D6] rounded-xl px-4 py-3 text-sm text-[#1D2523] focus:outline-none focus:border-[#C68A36]"
                    />
                  </div>

                  {/* Full Article Content */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#5A5449]">
                        Full Article Content
                      </label>
                      <span className="text-[11px] text-[#6B7672]">Supports paragraphs and descriptions</span>
                    </div>
                    <textarea
                      rows={8}
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      placeholder="Write your article details, story, cultural guides, and recommendations here..."
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D6] rounded-xl p-4 text-sm text-[#1D2523] leading-relaxed focus:outline-none focus:border-[#C68A36] font-sans"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5449] mb-1.5">
                      Tags (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={blogTags}
                      onChange={(e) => setBlogTags(e.target.value)}
                      placeholder="Desert Safari, Travel Tips, Dune Bashing, Dubai"
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D6] rounded-xl px-4 py-3 text-sm text-[#1D2523] focus:outline-none focus:border-[#C68A36]"
                    />
                  </div>

                  {/* Visibility Toggles */}
                  <div className="flex items-center gap-6 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D6]">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={blogIsPublished}
                        onChange={(e) => setBlogIsPublished(e.target.checked)}
                        className="w-4 h-4 rounded text-[#C68A36] focus:ring-[#C68A36]"
                      />
                      <span className="text-xs font-bold text-[#0D3B33]">Publish Post Live Immediately</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={blogFeatured}
                        onChange={(e) => setBlogFeatured(e.target.checked)}
                        className="w-4 h-4 rounded text-[#C68A36] focus:ring-[#C68A36]"
                      />
                      <span className="text-xs font-bold text-[#0D3B33]">Feature on Home Page</span>
                    </label>
                  </div>
                </form>
              ) : (
                /* Live Preview Tab */
                <div className="space-y-6">
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 relative">
                    <img src={blogImage || "/about_suv.jpg"} alt={blogTitle} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0D3B33] text-[#E4B564] text-xs font-bold">
                      {blogCategory}
                    </div>
                  </div>
                  <div>
                    <h1 className="font-serif text-3xl font-bold text-[#0D3B33] mb-2">{blogTitle || "Untitled Article"}</h1>
                    <div className="text-xs text-[#6B7672] mb-4">
                      By {blogAuthor} • {blogReadTime}
                    </div>
                    <p className="text-base text-[#5A5449] font-medium leading-relaxed mb-6 italic">{blogExcerpt}</p>
                    <div className="prose max-w-none text-sm text-[#2C3E3A] whitespace-pre-line leading-relaxed">
                      {blogContent || "No detailed content written yet."}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsBlogModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="blogForm"
                disabled={isSavingBlog}
                className="bg-[#C68A36] hover:bg-[#B3792A] text-white font-bold text-xs uppercase tracking-wider px-7 py-3 rounded-xl flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                {isSavingBlog ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{editingBlog ? "Update Blog Post" : "Publish Blog Post"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW BOOKING DETAILS MODAL ================= */}
      {viewingBooking && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-[#E5E0D6] overflow-hidden my-auto animate-in fade-in duration-200">
            <div className="bg-[#072520] text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E4B564] block mb-0.5">
                  Reservation Details
                </span>
                <h3 className="font-serif text-2xl font-bold">{viewingBooking.name}</h3>
              </div>
              <button
                onClick={() => setViewingBooking(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D6] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#6B7672]">Tour Package:</span>
                  <strong className="text-[#0D3B33]">{viewingBooking.package}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7672]">Scheduled Date:</span>
                  <strong className="text-[#0D3B33]">{viewingBooking.date}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7672]">Number of Guests:</span>
                  <strong className="text-[#0D3B33]">{viewingBooking.guests} Person(s)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7672]">Booking Source:</span>
                  <span className="font-mono text-[#C68A36]">{viewingBooking.source}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-[#0D3B33] block mb-1">Customer Contact:</span>
                <p className="text-gray-700">Email: {viewingBooking.email}</p>
                <p className="text-gray-700">Phone: {viewingBooking.phone}</p>
                <p className="text-gray-700 mt-1">
                  Pickup Location: {viewingBooking.pickupLocation || "Standard hotel pickup"}
                </p>
              </div>

              {viewingBooking.specialRequests && (
                <div>
                  <span className="font-bold text-[#0D3B33] block mb-1">Special Requests / Notes:</span>
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900">
                    {viewingBooking.specialRequests}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <span className="font-bold text-[#0D3B33] block mb-1.5">Change Status:</span>
                <div className="flex gap-2">
                  {["pending", "confirmed", "completed", "cancelled"].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateBookingStatus(viewingBooking.id, st)}
                      className={`flex-1 py-2 rounded-xl text-[11px] font-bold uppercase transition-colors cursor-pointer ${
                        viewingBooking.status === st
                          ? "bg-[#0D3B33] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <a
                  href={`https://wa.me/${viewingBooking.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hello ${viewingBooking.name}, this is Desert Journey DXB regarding your booking for ${viewingBooking.package}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>Instant WhatsApp Confirmation</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
