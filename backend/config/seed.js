import Blog from "../models/Blog.js";
import Booking from "../models/Booking.js";
import Contact from "../models/Contact.js";

const DEFAULT_BLOGS = [
  {
    title: "10 Essential Tips for Your First Dubai Desert Safari",
    slug: "essential-tips-first-dubai-desert-safari",
    category: "Safari Guides",
    excerpt: "Everything you need to know before heading into the Arabian dunes, from clothing advice to dune bashing safety tips.",
    content: "## Preparation is Key\n\nDubai's majestic desert landscape offers some of the world's most thrilling off-road adventures. To make the most of your journey:\n\n1. **Wear Light, Breathable Fabrics:** Cotton and linen in neutral tones.\n2. **Hydration:** Always drink plenty of water before and during the excursion.\n3. **Sun Protection:** High-SPF sunscreen, sunglasses, and a wide-brim hat.\n4. **Motion Sickness Precautions:** Have a light meal prior to dune bashing.",
    coverImage: "/hero_desert_safari.jpg",
    author: "Hamdan Al-Maktoum",
    readTime: "6 min read",
    tags: ["Tips", "Desert Safari", "Guide", "First Timers"],
    isPublished: true,
    views: 1420,
    likes: 86
  },
  {
    title: "Morning vs Evening Desert Safari: Which One Should You Choose?",
    slug: "morning-vs-evening-desert-safari-comparison",
    category: "Comparisons",
    excerpt: "Compare the tranquil sunrise camel treks of the morning with the vibrant fire shows and BBQ dinners of the evening safari.",
    content: "## Morning Safari Highlights\n\n- Crisp desert air and mesmerizing sunrise over red dunes\n- Intense 45-minute dune bashing with high adrenaline\n- Quad biking and sandboarding under cooler temperatures\n\n## Evening Safari Highlights\n\n- Magnificent desert sunset photography\n- Traditional Bedouin camp BBQ buffet and cultural performances\n- Henna painting, sheesha lounge, and stargazing",
    coverImage: "/evening_desert_safari.png",
    author: "Fatima Al-Zahra",
    readTime: "8 min read",
    tags: ["Morning Safari", "Evening Safari", "Comparison", "Dubai Tours"],
    isPublished: true,
    views: 2150,
    likes: 142
  },
  {
    title: "The Ultimate Guide to Dubai Quad Biking and Dune Buggies",
    slug: "guide-to-dubai-quad-biking-and-dune-buggies",
    category: "Adventure",
    excerpt: "Master high-powered Yamaha ATVs and custom Can-Am Maverick buggies with expert driving tips across the Red Dunes.",
    content: "## Choosing Your Off-Road Beast\n\n- **Yamaha Raptor 700cc:** For experienced single riders seeking speed.\n- **Can-Am Maverick 1000cc 2-Seater / 4-Seater:** Built for safety, high horsepower, roll-cage protection, and extreme dune conquering.\n\nAll rentals include helmet, goggles, briefing, and an expert marshal escort.",
    coverImage: "/quad_biking_dune_safari.png",
    author: "Rashid Tariq",
    readTime: "5 min read",
    tags: ["Quad Bike", "ATV", "Dune Buggy", "Adventure"],
    isPublished: true,
    views: 1890,
    likes: 119
  },
  {
    title: "Top 7 Cultural Shows You Will Experience at Our Luxury Camp",
    slug: "top-cultural-shows-luxury-camp",
    category: "Culture & Dining",
    excerpt: "Discover the captivating folklore of the Tanoura dance, mesmerizing belly dancing, and dramatic fire breathing shows.",
    content: "## The Magic of Bedouin Hospitality\n\nWhen twilight falls over the Arabian desert, our 5-star camp comes alive with vibrant Middle Eastern entertainment:\n\n1. **Tanoura Folk Dance:** A mystical whirling performance featuring dazzling LED costumes.\n2. **Authentic Fire Show:** Expert acrobats breathing fire under the starry night sky.\n3. **Belly Dancing:** Traditional oriental rhythms performed live on the central stage.\n4. **Falconry Presentation:** Meet the UAE's iconic national bird.",
    coverImage: "/camp_cultural_fire_show.png",
    author: "Mariam Mansoor",
    readTime: "7 min read",
    tags: ["Cultural Shows", "Tanoura", "Belly Dance", "Camp Dinner"],
    isPublished: true,
    views: 3100,
    likes: 210
  },
  {
    title: "A Complete Checklist for Dubai City Tour Sightseeing",
    slug: "dubai-city-tour-sightseeing-checklist",
    category: "City Tours",
    excerpt: "From the towering Burj Khalifa to the historic Al Fahidi Fort and the Dubai Frame, explore the must-see landmarks.",
    content: "## The Wonders of Modern and Historic Dubai\n\n- **Burj Al Arab & Jumeirah Beach:** Unbeatable coastal photo stop.\n- **Dubai Marina & Blue Waters Island:** Gaze upon the world's most luxurious skyline.\n- **Dubai Mall & Fountain Show:** Witness water dancing up to 150 meters in the air.\n- **Gold & Spice Souks:** Board a traditional wooden Abra boat across Dubai Creek.",
    coverImage: "/dubai_city_tour.png",
    author: "Zayd Al-Nuaimi",
    readTime: "9 min read",
    tags: ["City Tour", "Burj Khalifa", "Sightseeing", "Dubai Landmarks"],
    isPublished: true,
    views: 1680,
    likes: 95
  },
  {
    title: "Photography Guide: How to Capture Breathtaking Desert Sunsets",
    slug: "photography-guide-desert-sunsets",
    category: "Photography",
    excerpt: "Camera settings, golden hour timing, and composition tricks for snapping award-winning desert photos.",
    content: "## Golden Hour in the Arabian Desert\n\nThe low angle of the sun accentuates the razor-sharp curves of wind-swept sand dunes:\n\n- **Camera Settings:** ISO 100, f/8 to f/11 for edge-to-edge sharpness.\n- **Leading Lines:** Use the crest of the dune as a diagonal leading line.\n- **Silhouette Portraits:** Place your subject against the burning orange sun for dramatic vacation portraits.",
    coverImage: "/hero_bg_sand_dunes.png",
    author: "Elena Rostova",
    readTime: "5 min read",
    tags: ["Photography", "Sunset", "Golden Hour", "Camera Tips"],
    isPublished: true,
    views: 2430,
    likes: 188
  }
];

export async function seedDatabase() {
  try {
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      console.log("🌱 Seeding default desert safari blog articles into MongoDB...");
      await Blog.insertMany(DEFAULT_BLOGS);
      console.log(`✅ Seeded ${DEFAULT_BLOGS.length} blog articles successfully.`);
    }

    const bookingCount = await Booking.countDocuments();
    if (bookingCount === 0) {
      await Booking.create([
        {
          bookingType: "safari",
          tourTitle: "VIP Desert Safari with Quad Biking & BBQ",
          customerName: "Alexander Wright",
          customerEmail: "alexander.w@example.com",
          customerPhone: "+971501234567",
          tourDate: "2026-10-15",
          guests: 2,
          pickupLocation: "Atlantis The Palm, Dubai",
          specialNotes: "Vegetarian BBQ option requested",
          totalAmount: 600,
          currency: "AED",
          status: "confirmed",
        },
        {
          bookingType: "city-tour",
          tourTitle: "Full Day Dubai City Tour with Burj Khalifa",
          customerName: "Sarah Jenkins",
          customerEmail: "sarah.j@example.com",
          customerPhone: "+447911123456",
          tourDate: "2026-10-18",
          guests: 4,
          pickupLocation: "JW Marriott Marquis Hotel",
          specialNotes: "Traveling with 2 kids",
          totalAmount: 1200,
          currency: "AED",
          status: "pending",
        },
        {
          bookingType: "general",
          tourTitle: "Morning Dune Buggy Safari (Can-Am 1000cc)",
          customerName: "David Miller",
          customerEmail: "dmiller@example.com",
          customerPhone: "+14155552678",
          tourDate: "2026-10-20",
          guests: 2,
          pickupLocation: "Address Downtown Dubai",
          specialNotes: "Need pickup at 6:30 AM sharp",
          totalAmount: 950,
          currency: "AED",
          status: "pending",
        }
      ]);
      console.log("✅ Seeded sample booking records into MongoDB.");
    }

    const contactCount = await Contact.countDocuments();
    if (contactCount === 0) {
      await Contact.create([
        {
          name: "Michael Chen",
          email: "m.chen@example.com",
          phone: "+6598765432",
          tourType: "Private VIP Desert Camp",
          message: "We are a corporate group of 15 people visiting Dubai in November. Can you provide custom VIP camp buyout pricing?",
          status: "new"
        },
        {
          name: "Elena Vaneva",
          email: "elena.v@example.com",
          phone: "+359888123456",
          tourType: "Overnight Desert Safari",
          message: "Is stargazing with an astronomer available for overnight desert camping?",
          status: "read"
        }
      ]);
      console.log("✅ Seeded sample contact inquiries into MongoDB.");
    }
  } catch (error) {
    console.warn("⚠️ Database seeding warning:", error.message);
  }
}
