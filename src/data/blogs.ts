export interface BlogTip {
  number: number;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  categoryBadge: string;
  date: string;
  readTime: string;
  views: string;
  image: string;
  excerpt: string;
  intro?: string;
  tips?: BlogTip[];
  finalThoughts?: string;
  tags: string[];
  likes: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: "all", name: "All Posts", slug: "all", icon: "file-text", count: 24 },
  { id: "travel-tips", name: "Travel Tips", slug: "travel-tips", icon: "lightbulb", count: 6 },
  {
    id: "safari-experiences",
    name: "Safari Experiences",
    slug: "safari-experiences",
    icon: "compass",
    count: 8,
  },
  { id: "desert-culture", name: "Desert Culture", slug: "desert-culture", icon: "tent", count: 5 },
  { id: "tour-packages", name: "Tour Packages", slug: "tour-packages", icon: "map", count: 3 },
  {
    id: "food-tradition",
    name: "Food & Tradition",
    slug: "food-tradition",
    icon: "utensils",
    count: 4,
  },
];

export const BLOG_TAGS: string[] = [
  "Desert Safari",
  "Rajasthan",
  "Travel Tips",
  "Camel Safari",
  "Desert Camp",
  "Cultural Experience",
  "Adventure",
  "Sunset",
  "Travel Guide",
  "Rajasthani Food",
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "top-10-tips-for-an-unforgettable-desert-safari-experience",
    title: "Top 10 Tips for an Unforgettable Desert Safari Experience",
    category: "Travel Tips",
    categorySlug: "travel-tips",
    categoryBadge: "TRAVEL TIPS",
    date: "25 Sep 2026",
    readTime: "6 min read",
    views: "1.2K views",
    image: "/about_suv.jpg",
    excerpt:
      "Planning a desert safari? Here are the essential tips to make your experience safe, exciting and memorable.",
    intro:
      "A desert safari is more than just a trip – it's an adventure into a world of golden dunes, vibrant culture and unforgettable experiences. Whether you are planning your first safari or want to make your next one even better, here are the top 10 tips to help you enjoy the desert to the fullest.",
    tips: [
      {
        number: 1,
        title: "Choose the Right Time to Visit",
        description:
          "The best time for a desert safari is between October and March when the weather is pleasant and ideal for outdoor activities. Avoid the peak summer months as temperatures can be extremely high.",
      },
      {
        number: 2,
        title: "Dress Comfortably",
        description:
          "Wear light, breathable clothes, a hat or cap, sunglasses and comfortable shoes. In the evening, carry a light jacket as the desert can get cool after sunset.",
        image: "/pkg_quad.jpg",
        imageAlt: "Desert accessories sunglasses and hat",
      },
      {
        number: 3,
        title: "Stay Hydrated",
        description:
          "The desert climate can be dehydrating. Carry a water bottle and keep yourself hydrated throughout the safari.",
        image: "/hero_bg.jpg",
        imageAlt: "Water hydration in desert sands",
      },
      {
        number: 4,
        title: "Don't Miss the Camel Safari",
        description:
          "A camel safari is a must-do experience. It gives you a chance to explore the desert the traditional way and enjoy the peaceful beauty of the golden sands.",
        image: "/polaroid_camel.jpg",
        imageAlt: "Camel safari at sunset",
      },
      {
        number: 5,
        title: "Try Local Food",
        description:
          "Enjoy authentic Rajasthani cuisine like dal baati churma, gatte ki sabzi and traditional sweets. Most desert camps offer delicious local food as part of the experience.",
        image: "/pkg_private.jpg",
        imageAlt: "Authentic desert food and barbecue",
      },
      {
        number: 6,
        title: "Experience Cultural Activities",
        description:
          "Desert safaris often include folk music, dance performances and other cultural activities. These give you a glimpse of the rich heritage and traditions of Rajasthan.",
        image: "/polaroid_camp.jpg",
        imageAlt: "Desert cultural dance and music",
      },
      {
        number: 7,
        title: "Capture the Moments",
        description:
          "The desert offers some of the most stunning views, especially during sunrise and sunset. Keep your camera or phone ready to capture the magical moments.",
      },
      {
        number: 8,
        title: "Follow Safety Guidelines",
        description:
          "Always listen to your guide, follow safety instructions and stay within the designated areas during dune bashing or other adventure activities.",
      },
      {
        number: 9,
        title: "Book with a Trusted Operator",
        description:
          "Choose a reliable desert safari operator who offers safe, well-organized and authentic experiences.",
      },
      {
        number: 10,
        title: "Respect the Environment",
        description:
          "Help keep the desert clean by not littering and respecting the natural beauty and wildlife.",
      },
    ],
    finalThoughts:
      "A desert safari is a unique and magical experience that stays with you forever. By following these tips, you can make your journey safe, exciting and truly memorable.",
    tags: ["Desert Safari", "Travel Tips", "Rajasthan", "Adventure", "Sunset"],
    likes: 42,
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
    views: "950 views",
    image: "/polaroid_camel.jpg",
    excerpt:
      "Experience the timeless beauty of the desert on a camel safari and connect with nature, culture and adventure.",
    intro:
      "Riding across shifting golden dunes on the back of a majestic camel is an unforgettable hallmark of desert travel. Discover the rich history and soul-stirring tranquility of this ancient mode of travel.",
    tips: [
      {
        number: 1,
        title: "Embrace the Rhythm of the Ship of the Desert",
        description:
          "Camels move with a gentle, swaying gait. Relax your posture, hold onto the saddle grip comfortably, and synchronize with the animal's natural stride.",
        image: "/polaroid_camel.jpg",
      },
      {
        number: 2,
        title: "Opt for Sunset or Sunrise Rides",
        description:
          "The golden hour illuminates desert ripples with breathtaking orange and crimson tones while keeping temperatures cool and refreshing.",
        image: "/footer_bg.png",
      },
      {
        number: 3,
        title: "Connect with Bedouin Guides",
        description:
          "Local camel handlers possess deep generational wisdom about the dunes, star navigation, and native desert wildlife.",
        image: "/polaroid_camp.jpg",
      },
    ],
    finalThoughts:
      "A camel ride connects you to centuries of nomadic heritage while granting peaceful moments of reflection among silent dunes.",
    tags: ["Camel Safari", "Safari Experiences", "Sunset", "Rajasthan"],
    likes: 38,
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
    views: "1.5K views",
    image: "/polaroid_camp.jpg",
    excerpt:
      "Discover the magic of a desert camp - from traditional music and dance to authentic Rajasthani cuisine.",
    intro:
      "As night blankets the desert and stars illuminate the Arabian sky, desert camps burst to life with the warmth of bonfires, hypnotic rhythms of folk music, and aromas of freshly roasted banquets.",
    tips: [
      {
        number: 1,
        title: "Gather Around the Central Fire Pit",
        description:
          "The camp bonfire serves as the heart of evening entertainment, where guests gather on plush Arabian floor majlis cushions under starlight.",
        image: "/polaroid_camp.jpg",
      },
      {
        number: 2,
        title: "Savor Authentic Culinary Feasts",
        description:
          "Enjoy freshly baked flatbreads, live barbecue grills, rich fragrant gravies, and aromatic cardamom-infused Arabic coffee and dates.",
        image: "/pkg_private.jpg",
      },
      {
        number: 3,
        title: "Witness Captivating Live Performances",
        description:
          "Be entranced by whirling Tanoura dancers, mesmerizing fire spinners, and graceful traditional belly dancing performances.",
        image: "/pkg_vip.jpg",
      },
    ],
    finalThoughts:
      "An evening at a desert camp offers the perfect harmony of authentic hospitality, cultural heritage, and celestial wonder.",
    tags: ["Desert Camp", "Desert Culture", "Cultural Experience", "Rajasthani Food"],
    likes: 56,
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
    views: "820 views",
    image: "/pkg_vip.jpg",
    excerpt:
      "From morning dune bashing to overnight luxury glamping, find the right desert safari tour for your budget and travel style.",
    intro:
      "With multiple safari tour options ranging from adrenaline-pumping sunrise adventures to VIP private desert glamping, selecting the package suited to your party ensures the ultimate getaway.",
    tips: [
      {
        number: 1,
        title: "Determine Your Adventure Level",
        description:
          "Choose between high-octane 4x4 dune bashing and quad biking or a gentle cultural evening with sunset photography and stargazing.",
        image: "/about_suv.jpg",
      },
      {
        number: 2,
        title: "Consider Timing & Duration",
        description:
          "Morning safaris are quick and thrill-focused (3-4 hours), while Evening safaris (6-7 hours) include camp dinners, shows, and sunset viewing.",
        image: "/hero_bg.jpg",
      },
    ],
    finalThoughts:
      "Choose a package that aligns with your timeline and comfort preference for an unparalleled Arabian experience.",
    tags: ["Tour Packages", "Desert Safari", "Adventure", "Travel Guide"],
    likes: 29,
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
    views: "1.1K views",
    image: "/pkg_private.jpg",
    excerpt:
      "Explore the rich culinary heritage of the desert from barbecue feasts to aromatic spiced teas and sweet treats.",
    intro:
      "Desert gastronomy reflects thousands of years of nomadic hospitality, featuring slow-cooked meats, fragrant basmati rice dishes, rich lentil delicacies, and warm honey-drizzled desserts.",
    tips: [
      {
        number: 1,
        title: "Indulge in Live Barbecue Grills",
        description:
          "Savor tender skewers of spiced chicken shish tawook, juicy lamb kebabs, and chargrilled vegetables cooked over glowing charcoal.",
        image: "/pkg_private.jpg",
      },
      {
        number: 2,
        title: "Sip Traditional Karak Chai and Arabic Gahwa",
        description:
          "Experience the warm welcome of freshly brewed cardamom coffee served in delicate handle-less cups alongside succulent dates.",
        image: "/polaroid_camp.jpg",
      },
    ],
    finalThoughts:
      "Every meal in the desert is a celebration of rich culture and communal warmth that leaves a lasting impression.",
    tags: ["Rajasthani Food", "Food & Tradition", "Cultural Experience"],
    likes: 47,
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
    views: "740 views",
    image: "/reviews_bg.jpg",
    excerpt:
      "Everything you need to know about weather, temperatures, sunset timings and when to book your desert adventure.",
    intro:
      "Planning the timing of your desert trip is key to enjoying comfortable temperatures, clear starry skies, and prime conditions for outdoor adventures across the golden sand dunes.",
    tips: [
      {
        number: 1,
        title: "Winter Season (October to March) is Ideal",
        description:
          "Daytime temperatures are mild and sunny, while cool evenings create the perfect ambiance for open-air campfires and stargazing.",
        image: "/reviews_bg.jpg",
      },
      {
        number: 2,
        title: "Pack Layered Clothing",
        description:
          "Desert temperatures drop quickly after sunset. Lightweight linen clothing for daytime and cozy jackets or shawls for night will keep you comfortable.",
        image: "/polaroid_camel.jpg",
      },
    ],
    finalThoughts:
      "Plan between autumn and early spring to experience the majesty of the desert dunes at their absolute finest.",
    tags: ["Travel Tips", "Rajasthan", "Travel Guide", "Sunset"],
    likes: 31,
  },
];
