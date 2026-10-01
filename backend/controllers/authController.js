import Blog from "../models/Blog.js";
import Booking from "../models/Booking.js";
import Contact from "../models/Contact.js";

const DEFAULT_ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
const DEFAULT_ADMIN_PASS = process.env.ADMIN_PASSWORD || "desertadmin123";

// POST /api/admin/login
export async function adminLogin(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    if (username.trim() === DEFAULT_ADMIN_USER && password.trim() === DEFAULT_ADMIN_PASS) {
      const token = `token_${Date.now()}_${Buffer.from(username).toString("base64")}`;
      return res.json({
        success: true,
        message: "Admin login successful",
        token,
        admin: {
          username: DEFAULT_ADMIN_USER,
          role: "Super Admin",
          name: "Desert Journey Manager",
        },
      });
    }

    return res.status(401).json({ success: false, message: "Invalid username or password" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error during authentication" });
  }
}

// GET /api/admin/verify
export async function verifyAdmin(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (token && token.startsWith("token_")) {
    return res.json({
      success: true,
      admin: {
        username: DEFAULT_ADMIN_USER,
        role: "Super Admin",
        name: "Desert Journey Manager",
      },
    });
  }

  return res.status(401).json({ success: false, message: "Invalid or expired token" });
}

// GET /api/stats (Dashboard Overview via MongoDB)
export async function getStats(req, res) {
  try {
    const [
      totalBlogs,
      publishedBlogs,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      safariBookings,
      cityTourBookings,
      generalBookings,
      totalContacts,
      newContacts,
      recentBookings,
      recentContacts,
    ] = await Promise.all([
      Blog.countDocuments(),
      Blog.countDocuments({ isPublished: true }),
      Booking.countDocuments(),
      Booking.countDocuments({ status: "pending" }),
      Booking.countDocuments({ status: "confirmed" }),
      Booking.countDocuments({ bookingType: "safari" }),
      Booking.countDocuments({ bookingType: "city-tour" }),
      Booking.countDocuments({ bookingType: "general" }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: "new" }),
      Booking.find().sort({ createdAt: -1 }).limit(6),
      Contact.find().sort({ createdAt: -1 }).limit(6),
    ]);

    return res.json({
      success: true,
      data: {
        totalBlogs,
        publishedBlogs,
        totalBookings,
        pendingBookings,
        confirmedBookings,
        safariBookings,
        cityTourBookings,
        generalBookings,
        totalContacts,
        newContacts,
        recentBookings,
        recentContacts,
      },
    });
  } catch (error) {
    console.error("Stats error in MongoDB:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch dashboard stats" });
  }
}
