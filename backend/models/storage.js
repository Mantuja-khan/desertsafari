import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, "..", "data", "db.json");

// Default Initial Seed Data
const DEFAULT_DATA = {
  blogs: [
    {
      id: "1",
      slug: "top-10-tips-for-an-unforgettable-desert-safari-experience",
      title: "Top 10 Tips for an Unforgettable Desert Safari Experience",
      category: "Travel Tips",
      categorySlug: "travel-tips",
      categoryBadge: "TRAVEL TIPS",
      date: "25 Sep 2026",
      readTime: "6 min read",
      author: "Desert Journey Team",
      views: "1.2K views",
      image: "/about_suv.jpg",
      excerpt: "Planning a desert safari? Here are the essential tips to make your experience safe, exciting and memorable.",
      intro: "A desert safari is more than just a trip – it's an adventure into a world of golden dunes, vibrant culture and unforgettable experiences. Whether you are planning your first safari or want to make your next one even better, here are the top 10 tips to help you enjoy the desert to the fullest.",
      content: "A desert safari is more than just a trip – it's an adventure into a world of golden dunes, vibrant culture and unforgettable experiences. Wear breathable clothes, stay hydrated, book with trusted operators, and savor authentic Bedouin hospitality under starry Arabian skies.",
      tips: [
        {
          number: 1,
          title: "Choose the Right Time to Visit",
          description: "The best time for a desert safari is between October and March when the weather is pleasant and ideal for outdoor activities.",
        },
        {
          number: 2,
          title: "Dress Comfortably",
          description: "Wear light, breathable clothes, sunglasses and comfortable shoes. In the evening, carry a light jacket.",
          image: "/pkg_quad.jpg",
        },
        {
          number: 3,
          title: "Stay Hydrated",
          description: "The desert climate can be dehydrating. Keep yourself well hydrated throughout the safari.",
          image: "/hero_bg.jpg",
        },
        {
          number: 4,
          title: "Don't Miss the Camel Safari",
          description: "A camel safari is a must-do experience across the golden sands.",
          image: "/polaroid_camel.jpg",
        }
      ],
      finalThoughts: "A desert safari is a unique and magical experience that stays with you forever.",
      tags: ["Desert Safari", "Travel Tips", "Rajasthan", "Adventure", "Sunset"],
      likes: 42,
      isPublished: true,
      featured: true,
      createdAt: new Date("2026-09-25").toISOString(),
      updatedAt: new Date("2026-09-25").toISOString()
    },
    {
      id: "2",
      slug: "camel-safari-journey-through-golden-sands",
      title: "Camel Safari: A Journey Through the Golden Sands",
      category: "Safari Experiences",
      categorySlug: "safari-experiences",
      categoryBadge: "SAFARI EXPERIENCES",
      date: "22 Sep 2026",
      readTime: "5 min read",
      author: "Desert Journey Team",
      views: "950 views",
      image: "/polaroid_camel.jpg",
      excerpt: "Experience the timeless beauty of the desert on a camel safari and connect with nature, culture and adventure.",
      intro: "Riding across shifting golden dunes on the back of a majestic camel is an unforgettable hallmark of desert travel. Discover the rich history and soul-stirring tranquility of this ancient mode of travel.",
      content: "Riding across shifting golden dunes on the back of a majestic camel is an unforgettable hallmark of desert travel. Experience serene golden hours, stunning sunset photography, and authentic Bedouin storytelling.",
      tips: [
        {
          number: 1,
          title: "Embrace the Rhythm of the Ship of the Desert",
          description: "Camels move with a gentle, swaying gait. Relax your posture and synchronize with the animal's natural stride.",
          image: "/polaroid_camel.jpg"
        },
        {
          number: 2,
          title: "Opt for Sunset or Sunrise Rides",
          description: "The golden hour illuminates desert ripples with breathtaking orange and crimson tones.",
          image: "/footer_bg.png"
        }
      ],
      finalThoughts: "A camel ride connects you to centuries of nomadic heritage while granting peaceful moments of reflection.",
      tags: ["Camel Safari", "Safari Experiences", "Sunset", "Rajasthan"],
      likes: 38,
      isPublished: true,
      featured: false,
      createdAt: new Date("2026-09-22").toISOString(),
      updatedAt: new Date("2026-09-22").toISOString()
    },
    {
      id: "3",
      slug: "desert-camp-experience-traditions-food-entertainment",
      title: "Desert Camp Experience: Traditions, Food & Entertainment",
      category: "Desert Culture",
      categorySlug: "desert-culture",
      categoryBadge: "DESERT CULTURE",
      date: "18 Sep 2026",
      readTime: "7 min read",
      author: "Desert Journey Team",
      views: "1.5K views",
      image: "/polaroid_camp.jpg",
      excerpt: "Discover the magic of a desert camp - from traditional music and dance to authentic Rajasthani cuisine.",
      intro: "As night blankets the desert and stars illuminate the Arabian sky, desert camps burst to life with the warmth of bonfires, hypnotic rhythms of folk music, and aromas of freshly roasted banquets.",
      content: "As night blankets the desert and stars illuminate the Arabian sky, desert camps burst to life with the warmth of bonfires, hypnotic rhythms of folk music, and aromas of freshly roasted banquets.",
      tips: [
        {
          number: 1,
          title: "Gather Around the Central Fire Pit",
          description: "The camp bonfire serves as the heart of evening entertainment on plush Arabian floor majlis cushions.",
          image: "/polaroid_camp.jpg"
        },
        {
          number: 2,
          title: "Savor Authentic Culinary Feasts",
          description: "Enjoy freshly baked flatbreads, live barbecue grills, and fragrant gravies.",
          image: "/pkg_private.jpg"
        }
      ],
      finalThoughts: "An evening at a desert camp offers the perfect harmony of authentic hospitality, cultural heritage, and celestial wonder.",
      tags: ["Desert Camp", "Desert Culture", "Cultural Experience", "Rajasthani Food"],
      likes: 56,
      isPublished: true,
      featured: true,
      createdAt: new Date("2026-09-18").toISOString(),
      updatedAt: new Date("2026-09-18").toISOString()
    },
    {
      id: "4",
      slug: "best-desert-safari-packages-how-to-choose",
      title: "Best Desert Safari Packages: How to Choose the Perfect One",
      category: "Tour Packages",
      categorySlug: "tour-packages",
      categoryBadge: "TOUR PACKAGES",
      date: "15 Sep 2026",
      readTime: "4 min read",
      author: "Desert Journey Team",
      views: "820 views",
      image: "/pkg_vip.jpg",
      excerpt: "From morning dune bashing to overnight luxury glamping, find the right desert safari tour for your budget and travel style.",
      intro: "With multiple safari tour options ranging from adrenaline-pumping sunrise adventures to VIP private desert glamping, selecting the package suited to your party ensures the ultimate getaway.",
      content: "With multiple safari tour options ranging from adrenaline-pumping sunrise adventures to VIP private desert glamping, selecting the package suited to your party ensures the ultimate getaway.",
      tips: [
        {
          number: 1,
          title: "Determine Your Adventure Level",
          description: "Choose between high-octane 4x4 dune bashing and quad biking or a gentle cultural evening.",
          image: "/about_suv.jpg"
        }
      ],
      finalThoughts: "Choose a package that aligns with your timeline and comfort preference.",
      tags: ["Tour Packages", "Desert Safari", "Adventure", "Travel Guide"],
      likes: 29,
      isPublished: true,
      featured: false,
      createdAt: new Date("2026-09-15").toISOString(),
      updatedAt: new Date("2026-09-15").toISOString()
    },
    {
      id: "5",
      slug: "flavors-of-the-desert-authentic-cuisine",
      title: "Flavors of the Desert: Authentic Arabian & Traditional Delicacies",
      category: "Food & Tradition",
      categorySlug: "food-tradition",
      categoryBadge: "FOOD & TRADITION",
      date: "12 Sep 2026",
      readTime: "5 min read",
      author: "Desert Journey Team",
      views: "1.1K views",
      image: "/pkg_private.jpg",
      excerpt: "Explore the rich culinary heritage of the desert from barbecue feasts to aromatic spiced teas and sweet treats.",
      intro: "Desert gastronomy reflects thousands of years of nomadic hospitality, featuring slow-cooked meats, fragrant basmati rice dishes, rich lentil delicacies, and warm honey-drizzled desserts.",
      content: "Desert gastronomy reflects thousands of years of nomadic hospitality, featuring slow-cooked meats, fragrant basmati rice dishes, rich lentil delicacies, and warm honey-drizzled desserts.",
      tips: [
        {
          number: 1,
          title: "Indulge in Live Barbecue Grills",
          description: "Savor tender skewers of spiced chicken shish tawook, juicy lamb kebabs, and chargrilled vegetables.",
          image: "/pkg_private.jpg"
        }
      ],
      finalThoughts: "Every meal in the desert is a celebration of rich culture and communal warmth.",
      tags: ["Rajasthani Food", "Food & Tradition", "Cultural Experience"],
      likes: 47,
      isPublished: true,
      featured: false,
      createdAt: new Date("2026-09-12").toISOString(),
      updatedAt: new Date("2026-09-12").toISOString()
    },
    {
      id: "6",
      slug: "best-time-to-visit-rajasthan-for-a-desert-safari",
      title: "Best Time to Visit Rajasthan for a Desert Safari",
      category: "Travel Tips",
      categorySlug: "travel-tips",
      categoryBadge: "TRAVEL TIPS",
      date: "15 Sep 2026",
      readTime: "4 min read",
      author: "Desert Journey Team",
      views: "740 views",
      image: "/reviews_bg.jpg",
      excerpt: "Everything you need to know about weather, temperatures, sunset timings and when to book your desert adventure.",
      intro: "Planning the timing of your desert trip is key to enjoying comfortable temperatures, clear starry skies, and prime conditions for outdoor adventures across the golden sand dunes.",
      content: "Planning the timing of your desert trip is key to enjoying comfortable temperatures, clear starry skies, and prime conditions for outdoor adventures across the golden sand dunes.",
      tips: [
        {
          number: 1,
          title: "Winter Season (October to March) is Ideal",
          description: "Daytime temperatures are mild and sunny, while cool evenings create the perfect ambiance for open-air campfires.",
          image: "/reviews_bg.jpg"
        }
      ],
      finalThoughts: "Plan between autumn and early spring to experience the majesty of the desert dunes.",
      tags: ["Travel Tips", "Rajasthan", "Travel Guide", "Sunset"],
      likes: 31,
      isPublished: true,
      featured: false,
      createdAt: new Date("2026-09-15").toISOString(),
      updatedAt: new Date("2026-09-15").toISOString()
    }
  ],
  bookings: [
    {
      id: "bkg-101",
      type: "safari",
      name: "Ahmed Al-Mansoor",
      email: "ahmed.m@example.com",
      phone: "+971 50 123 4567",
      date: "2026-10-05",
      guests: 4,
      package: "VIP Desert Safari with BBQ Dinner",
      safariType: "Evening Safari",
      pickupLocation: "Downtown Dubai, Address Hotel",
      specialRequests: "Vegetarian meal options for 2 guests please.",
      status: "confirmed",
      source: "Book Your Safari Form",
      createdAt: new Date("2026-09-28T14:30:00Z").toISOString()
    },
    {
      id: "bkg-102",
      type: "city-tour",
      name: "Sarah Jenkins",
      email: "sarah.j@example.co.uk",
      phone: "+44 7700 900123",
      date: "2026-10-08",
      guests: 2,
      package: "Dubai Full Day Modern & Historic Tour",
      tourName: "Dubai Modern & Historic Tour",
      pickupLocation: "Dubai Marina, Silverene Towers",
      specialRequests: "Need English speaking guide.",
      status: "pending",
      source: "City Tour Booking Form",
      createdAt: new Date("2026-09-29T09:15:00Z").toISOString()
    },
    {
      id: "bkg-103",
      type: "general",
      name: "Carlos Rossi",
      email: "carlos.rossi@example.it",
      phone: "+39 340 1234567",
      date: "2026-10-10",
      guests: 3,
      package: "Extreme 4x4 Dune Bashing & Quad Biking",
      tourPrice: "AED 350 / person",
      pickupLocation: "Al Barsha, Novotel Hotel",
      message: "Please let us know exact pickup timing.",
      status: "pending",
      source: "Book Now Button Form",
      createdAt: new Date("2026-09-30T11:45:00Z").toISOString()
    }
  ],
  contacts: [
    {
      id: "msg-201",
      name: "Michael Chang",
      email: "michael.c@example.com",
      phone: "+1 415 555 0199",
      tourType: "Private VIP Safari",
      message: "Hello! We are a group of 8 looking for a completely private desert camp setup for a birthday celebration on October 15. Can you provide custom pricing?",
      status: "new",
      createdAt: new Date("2026-09-30T16:20:00Z").toISOString()
    },
    {
      id: "msg-202",
      name: "Elena Rostova",
      email: "elena.r@example.ru",
      phone: "+7 916 555 4321",
      tourType: "Abu Dhabi Full Day Tour",
      message: "Does the Abu Dhabi tour include entry inside the Louvre Museum? Thank you!",
      status: "replied",
      createdAt: new Date("2026-09-28T10:05:00Z").toISOString()
    }
  ],
  admin: {
    username: "admin",
    role: "Super Admin",
    lastLogin: new Date().toISOString()
  }
};

// Helper to ensure database file exists
async function ensureDb() {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(DEFAULT_DATA, null, 2), "utf8");
  }
}

// Read whole DB
export async function readDb() {
  await ensureDb();
  try {
    const raw = await fs.readFile(DB_PATH, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading db.json, returning default data:", error);
    return DEFAULT_DATA;
  }
}

// Write whole DB safely
export async function writeDb(data) {
  await ensureDb();
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf8");
}

// ================= BLOGS OPERATIONS =================
export async function getAllBlogs({ search = "", category = "", isPublished } = {}) {
  const db = await readDb();
  let list = db.blogs || [];

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(b => 
      b.title.toLowerCase().includes(q) || 
      b.excerpt.toLowerCase().includes(q) ||
      (b.tags && b.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  if (category && category !== "all") {
    const cat = category.toLowerCase();
    list = list.filter(b => (b.categorySlug && b.categorySlug.toLowerCase() === cat) || (b.category && b.category.toLowerCase() === cat));
  }

  if (typeof isPublished === "boolean") {
    list = list.filter(b => b.isPublished === isPublished);
  }

  return list;
}

export async function getBlogById(id) {
  const db = await readDb();
  return (db.blogs || []).find(b => String(b.id) === String(id) || b.slug === id);
}

export async function createBlog(blogData) {
  const db = await readDb();
  const id = String(Date.now());
  const slug = blogData.slug || blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  
  const newBlog = {
    id,
    slug,
    title: blogData.title || "Untitled Post",
    category: blogData.category || "Travel Tips",
    categorySlug: blogData.categorySlug || (blogData.category ? blogData.category.toLowerCase().replace(/\s+/g, "-") : "travel-tips"),
    categoryBadge: blogData.categoryBadge || (blogData.category ? blogData.category.toUpperCase() : "TRAVEL TIPS"),
    date: blogData.date || new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    readTime: blogData.readTime || "5 min read",
    author: blogData.author || "Desert Journey Team",
    views: "0 views",
    image: blogData.image || "/about_suv.jpg",
    excerpt: blogData.excerpt || "",
    intro: blogData.intro || "",
    content: blogData.content || "",
    tips: blogData.tips || [],
    finalThoughts: blogData.finalThoughts || "",
    tags: Array.isArray(blogData.tags) ? blogData.tags : (blogData.tags ? blogData.tags.split(",").map(t => t.trim()) : ["Desert Safari"]),
    likes: 0,
    isPublished: blogData.isPublished !== undefined ? blogData.isPublished : true,
    featured: Boolean(blogData.featured),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.blogs.unshift(newBlog);
  await writeDb(db);
  return newBlog;
}

export async function updateBlog(id, blogData) {
  const db = await readDb();
  const index = (db.blogs || []).findIndex(b => String(b.id) === String(id) || b.slug === id);
  if (index === -1) return null;

  const existing = db.blogs[index];
  const updated = {
    ...existing,
    ...blogData,
    id: existing.id,
    updatedAt: new Date().toISOString()
  };

  if (blogData.category && !blogData.categorySlug) {
    updated.categorySlug = blogData.category.toLowerCase().replace(/\s+/g, "-");
    updated.categoryBadge = blogData.category.toUpperCase();
  }

  db.blogs[index] = updated;
  await writeDb(db);
  return updated;
}

export async function deleteBlog(id) {
  const db = await readDb();
  const initialLen = db.blogs.length;
  db.blogs = (db.blogs || []).filter(b => String(b.id) !== String(id) && b.slug !== id);
  if (db.blogs.length === initialLen) return false;
  await writeDb(db);
  return true;
}

export async function likeBlog(id) {
  const db = await readDb();
  const blog = (db.blogs || []).find(b => String(b.id) === String(id) || b.slug === id);
  if (!blog) return null;
  blog.likes = (blog.likes || 0) + 1;
  await writeDb(db);
  return blog.likes;
}

// ================= BOOKINGS OPERATIONS =================
export async function getAllBookings({ type, status, search } = {}) {
  const db = await readDb();
  let list = db.bookings || [];

  if (type && type !== "all") {
    list = list.filter(b => b.type === type);
  }

  if (status && status !== "all") {
    list = list.filter(b => b.status === status);
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(b => 
      (b.name && b.name.toLowerCase().includes(q)) ||
      (b.email && b.email.toLowerCase().includes(q)) ||
      (b.phone && b.phone.includes(q)) ||
      (b.package && b.package.toLowerCase().includes(q))
    );
  }

  return list;
}

export async function createBooking(data) {
  const db = await readDb();
  const id = `bkg-${Date.now()}`;
  const newBooking = {
    id,
    type: data.type || "general",
    name: data.name,
    email: data.email,
    phone: data.phone,
    date: data.date || new Date().toISOString().split("T")[0],
    guests: Number(data.guests) || 1,
    package: data.package || data.tourTitle || data.tourName || "Desert Experience",
    tourTitle: data.tourTitle || data.package || "",
    tourPrice: data.tourPrice || "",
    safariType: data.safariType || "",
    pickupLocation: data.pickupLocation || "",
    specialRequests: data.specialRequests || data.message || "",
    status: "pending",
    source: data.source || "Website Form",
    createdAt: new Date().toISOString()
  };

  db.bookings.unshift(newBooking);
  await writeDb(db);
  return newBooking;
}

export async function updateBookingStatus(id, status) {
  const db = await readDb();
  const booking = (db.bookings || []).find(b => b.id === id);
  if (!booking) return null;
  booking.status = status;
  booking.updatedAt = new Date().toISOString();
  await writeDb(db);
  return booking;
}

export async function deleteBooking(id) {
  const db = await readDb();
  const initialLen = db.bookings.length;
  db.bookings = (db.bookings || []).filter(b => b.id !== id);
  if (db.bookings.length === initialLen) return false;
  await writeDb(db);
  return true;
}

// ================= CONTACT OPERATIONS =================
export async function getAllContacts({ search, status } = {}) {
  const db = await readDb();
  let list = db.contacts || [];

  if (status && status !== "all") {
    list = list.filter(c => c.status === status);
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(c =>
      (c.name && c.name.toLowerCase().includes(q)) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.message && c.message.toLowerCase().includes(q))
    );
  }

  return list;
}

export async function createContact(data) {
  const db = await readDb();
  const id = `msg-${Date.now()}`;
  const newContact = {
    id,
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    tourType: data.tourType || "General Inquiry",
    message: data.message,
    status: "new",
    createdAt: new Date().toISOString()
  };

  db.contacts.unshift(newContact);
  await writeDb(db);
  return newContact;
}

export async function updateContactStatus(id, status) {
  const db = await readDb();
  const contact = (db.contacts || []).find(c => c.id === id);
  if (!contact) return null;
  contact.status = status;
  contact.updatedAt = new Date().toISOString();
  await writeDb(db);
  return contact;
}

export async function deleteContact(id) {
  const db = await readDb();
  const initialLen = db.contacts.length;
  db.contacts = (db.contacts || []).filter(c => c.id !== id);
  if (db.contacts.length === initialLen) return false;
  await writeDb(db);
  return true;
}

// ================= STATS SUMMARY =================
export async function getDashboardStats() {
  const db = await readDb();
  const blogs = db.blogs || [];
  const bookings = db.bookings || [];
  const contacts = db.contacts || [];

  return {
    totalBlogs: blogs.length,
    publishedBlogs: blogs.filter(b => b.isPublished).length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === "pending").length,
    confirmedBookings: bookings.filter(b => b.status === "confirmed").length,
    safariBookings: bookings.filter(b => b.type === "safari").length,
    cityTourBookings: bookings.filter(b => b.type === "city-tour").length,
    generalBookings: bookings.filter(b => b.type === "general").length,
    totalContacts: contacts.length,
    newContacts: contacts.filter(c => c.status === "new").length,
    recentBookings: bookings.slice(0, 5),
    recentContacts: contacts.slice(0, 5)
  };
}
