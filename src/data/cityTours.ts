export interface TourFeature {
  title: string;
  desc: string;
  icon: string;
}

export interface TourAttraction {
  name: string;
  subtitle: string;
  image: string;
}

export interface TourItineraryStep {
  time: string;
  title: string;
  desc: string;
}

export interface TourFAQ {
  q: string;
  a: string;
}

export interface CityTour {
  id: string;
  slug: string;
  title: string;
  type: "Private Tour" | "Sharing Tour";
  city: string;
  tag: string;
  price: string;
  priceNum: number;
  originalPrice: string;
  saveTag: string;
  badge: string;
  choiceBadge: string;
  image: string;
  description: string;
  overviewFeatures: TourFeature[];
  attractions: TourAttraction[];
  itinerary: TourItineraryStep[];
  inclusions: string[];
  exclusions: string[];
  faqs: TourFAQ[];
}

export const CITY_TOURS: CityTour[] = [
  {
    id: "1",
    slug: "private-dubai-city-tour",
    title: "Private Dubai City Tour",
    type: "Private Tour",
    city: "Dubai",
    tag: "DUBAI CITY TOUR",
    price: "AED 699",
    priceNum: 699,
    originalPrice: "AED 799",
    saveTag: "Save AED 100",
    badge: "BestSeller",
    choiceBadge: "2025 Traveller's Choice",
    image: "/dubai-tour-bg.jpg",
    description:
      "This is the ultimate city tour experience in Dubai. On this tour, you will discover the magic and charm of Dubai, experiencing a world of modern architecture, cultural heritage, luxury lifestyle and breathtaking attractions. Our private Dubai city tour gives you the flexibility to explore at your own pace with a comfortable, hassle-free experience.",
    overviewFeatures: [
      { title: "Private Vehicle", desc: "Comfortable & Air Conditioned", icon: "car" },
      { title: "Professional Guide", desc: "Friendly & Experienced", icon: "user" },
      { title: "Photo Stops", desc: "At all major attractions", icon: "camera" },
      { title: "Flexible Timing", desc: "Explore at your own pace", icon: "clock" },
    ],
    attractions: [
      { name: "Burj Khalifa", subtitle: "World's Tallest Building", image: "/dubai-tour-bg.jpg" },
      { name: "Dubai Marina", subtitle: "Stunning Waterfront", image: "/hero_bg.jpg" },
      { name: "Palm Jumeirah", subtitle: "Iconic Palm Island", image: "/guest_reviews_bg.jpg" },
      { name: "Burj Al Arab", subtitle: "Luxury 7 Star Hotel", image: "/about_suv.jpg" },
    ],
    itinerary: [
      { time: "09:00 AM", title: "Hotel Pickup", desc: "Pick up from your location" },
      { time: "Photo Stop", title: "Dubai Marina", desc: "Explore the waterfront" },
      { time: "Visit & Photo Stop", title: "Palm Jumeirah", desc: "See the iconic palm island" },
      { time: "Photo Stop", title: "Burj Al Arab", desc: "Capture stunning views" },
      { time: "Free Time", title: "Dubai Mall", desc: "Shopping & exploration" },
      { time: "End of Tour", title: "Drop Off", desc: "Return to your location" },
    ],
    inclusions: [
      "Hotel pick & drop (Private Vehicle)",
      "Professional English speaking guide",
      "Visit to major attractions",
      "Photo stops at key locations",
      "Bottled water",
      "Fuel, parking & Salik charges",
    ],
    exclusions: [
      "Meals",
      "Entry tickets to paid attractions (e.g., Burj Khalifa, Sky Views etc.)",
      "Personal expenses",
      "Anything not mentioned in inclusions",
    ],
    faqs: [
      {
        q: "How long is the Dubai city tour?",
        a: "The private Dubai city tour typically lasts 4 to 5 hours, with flexible timings based on your preference.",
      },
      {
        q: "What attractions are included?",
        a: "You will visit Burj Khalifa, Dubai Marina, Palm Jumeirah, Burj Al Arab, Dubai Frame, and Dubai Mall.",
      },
      {
        q: "Is hotel pickup and drop available?",
        a: "Yes, private hotel pickup and drop-off anywhere in Dubai is included in your package.",
      },
      {
        q: "Can I customize the itinerary?",
        a: "Absolutely! Since this is a private tour, you can customize stops and duration with your driver guide.",
      },
      {
        q: "Are entry tickets included?",
        a: "Exterior sightseeing and photo stops are included. Tickets for Burj Khalifa or inside attractions can be added on request.",
      },
    ],
  },
  {
    id: "2",
    slug: "sharing-dubai-city-tour",
    title: "Sharing Dubai City Tour",
    type: "Sharing Tour",
    city: "Dubai",
    tag: "DUBAI CITY TOUR",
    price: "AED 99",
    priceNum: 99,
    originalPrice: "AED 149",
    saveTag: "Save AED 50",
    badge: "BestSeller",
    choiceBadge: "2025 Traveller's Choice",
    image: "/dubai-tour-bg.jpg",
    description:
      "This is the ultimate desert safari & city experience in Dubai. Discover the magic and charm of the Dubai skyline, experiencing world-class landmarks, historic Dubai Creek, and Bedouin cultural roots in a budget-friendly sharing tour.",
    overviewFeatures: [
      { title: "Shared Luxury Coach", desc: "Clean & Air Conditioned", icon: "car" },
      { title: "Tour Guide", desc: "Informative Commentary", icon: "user" },
      { title: "Iconic Landmarks", desc: "Top Dubai Attractions", icon: "camera" },
      { title: "Fixed Schedule", desc: "Half Day Morning Tour", icon: "clock" },
    ],
    attractions: [
      { name: "Dubai Creek & Abra", subtitle: "Historic Waterway", image: "/dubai-tour-bg.jpg" },
      { name: "Dubai Frame", subtitle: "Picture of Past & Present", image: "/hero_bg.jpg" },
      { name: "Burj Al Arab", subtitle: "Iconic Sail Architecture", image: "/about_suv.jpg" },
      {
        name: "Burj Khalifa & Mall",
        subtitle: "Heart of Downtown",
        image: "/guest_reviews_bg.jpg",
      },
    ],
    itinerary: [
      {
        time: "08:30 AM",
        title: "Centralized Pickup",
        desc: "Pick up from designated hotel points",
      },
      { time: "Stop 1", title: "Dubai Creek & Souks", desc: "Gold & Spice Souk views" },
      { time: "Stop 2", title: "Burj Al Arab Beach", desc: "Iconic photo session" },
      { time: "Stop 3", title: "Atlantis Palm Jumeirah", desc: "Scenic drive through the trunk" },
      { time: "01:30 PM", title: "Dubai Mall Drop Off", desc: "Tour concludes at Downtown" },
    ],
    inclusions: [
      "Pick up and drop from standard Dubai locations",
      "Guided bus tour with English commentary",
      "Photo stops at Burj Al Arab and Atlantis",
      "Drive through Sheikh Zayed Road",
      "Chilled bottled drinking water",
    ],
    exclusions: ["Attraction entry tickets", "Food and beverages", "Personal shopping expenses"],
    faqs: [
      {
        q: "What are the timings for the sharing tour?",
        a: "Morning sharing tours usually begin with pickups between 08:30 AM and 09:30 AM, finishing around 01:30 PM.",
      },
      {
        q: "Is it suitable for solo travelers?",
        a: "Yes! Our sharing tour is the #1 choice for solo adventurers and small groups looking to make new friends.",
      },
    ],
  },
  {
    id: "3",
    slug: "private-abu-dhabi-city-tour",
    title: "Private Abu Dhabi City Tour",
    type: "Private Tour",
    city: "Abu Dhabi",
    tag: "ABU DHABI CITY TOUR",
    price: "AED 799",
    priceNum: 799,
    originalPrice: "AED 899",
    saveTag: "Save AED 100",
    badge: "BestSeller",
    choiceBadge: "2025 Traveller's Choice",
    image: "/abudhabi-tour-bg.jpg",
    description:
      "Embark on an exclusive full-day journey to the capital of the UAE. Marvel at the architectural grandeur of the Sheikh Zayed Grand Mosque, stroll the Abu Dhabi Corniche, view Emirates Palace and explore the cultural heart of the Emirates.",
    overviewFeatures: [
      { title: "Private VIP SUV/Van", desc: "Door to Door from Dubai", icon: "car" },
      { title: "Licensed Guide", desc: "Deep Cultural Insight", icon: "user" },
      { title: "Grand Mosque Entry", desc: "Full Visit & Photography", icon: "camera" },
      { title: "Full Day Tour", desc: "8 to 9 Hours Duration", icon: "clock" },
    ],
    attractions: [
      {
        name: "Sheikh Zayed Grand Mosque",
        subtitle: "World Wonder of Marble & Gold",
        image: "/abudhabi-tour-bg.jpg",
      },
      { name: "Emirates Palace", subtitle: "Ultra-Luxury Landmark", image: "/hero_bg.jpg" },
      {
        name: "Louvre Abu Dhabi",
        subtitle: "Iconic Floating Dome",
        image: "/guest_reviews_bg.jpg",
      },
      {
        name: "Ferrari World Yas Island",
        subtitle: "Photo Stop at F1 Track",
        image: "/dubai-tour-bg.jpg",
      },
    ],
    itinerary: [
      {
        time: "09:00 AM",
        title: "Dubai Hotel Pickup",
        desc: "Private luxury transfer to Abu Dhabi",
      },
      {
        time: "10:30 AM",
        title: "Sheikh Zayed Grand Mosque",
        desc: "Guided tour inside the mosque",
      },
      {
        time: "12:30 PM",
        title: "Corniche & Emirates Palace",
        desc: "Drive along the waterfront & photo stop",
      },
      {
        time: "02:00 PM",
        title: "Heritage Village & Marina Mall",
        desc: "Lunch and cultural exhibits",
      },
      {
        time: "03:30 PM",
        title: "Yas Island & Ferrari World",
        desc: "Photo stop outside the iconic park",
      },
      { time: "05:30 PM", title: "Dubai Return", desc: "Drop off at your hotel" },
    ],
    inclusions: [
      "Pick up and drop-off from Dubai in private vehicle",
      "Sheikh Zayed Grand Mosque entrance",
      "Corniche drive & Emirates Palace photo stop",
      "Yas Island and Ferrari World photo stop",
      "Bottled water throughout the day",
    ],
    exclusions: [
      "Lunch / Meals",
      "Louvre Museum & Ferrari World theme park tickets",
      "Personal expenses",
    ],
    faqs: [
      {
        q: "What is the dress code for Sheikh Zayed Mosque?",
        a: "Modest loose-fitting clothing covering shoulders and ankles. Women must wear a headscarf (Abayas can be arranged).",
      },
      {
        q: "How far is Abu Dhabi from Dubai?",
        a: "Abu Dhabi is about an 80 to 90 minute comfortable highway drive from Dubai.",
      },
    ],
  },
  {
    id: "4",
    slug: "sharing-abu-dhabi-city-tour",
    title: "Sharing Abu Dhabi City Tour",
    type: "Sharing Tour",
    city: "Abu Dhabi",
    tag: "ABU DHABI CITY TOUR",
    price: "AED 149",
    priceNum: 149,
    originalPrice: "AED 199",
    saveTag: "Save AED 50",
    badge: "BestSeller",
    choiceBadge: "2025 Traveller's Choice",
    image: "/abudhabi-tour-bg.jpg",
    description:
      "Join our popular group excursion from Dubai to Abu Dhabi. Visit the world-renowned Grand Mosque, admire the capital's towering skyscrapers, and discover ancient Emirati heritage at an unbeatable price.",
    overviewFeatures: [
      { title: "Shared AC Coach", desc: "Comfortable & Spacious", icon: "car" },
      { title: "English Guide", desc: "Expert Commentary", icon: "user" },
      { title: "Mosque Included", desc: "Free Time to Explore", icon: "camera" },
      { title: "Full Day Group", desc: "8 Hours Tour", icon: "clock" },
    ],
    attractions: [
      {
        name: "Sheikh Zayed Mosque",
        subtitle: "Spiritual Architectural Gem",
        image: "/abudhabi-tour-bg.jpg",
      },
      { name: "Abu Dhabi Corniche", subtitle: "Golden Coast Skyline", image: "/dubai-tour-bg.jpg" },
      { name: "Heritage Village", subtitle: "Oasis Traditions", image: "/guest_reviews_bg.jpg" },
      { name: "Yas Island", subtitle: "Entertainment Hub", image: "/hero_bg.jpg" },
    ],
    itinerary: [
      { time: "08:30 AM", title: "Dubai Pickups", desc: "Pick up from designated points" },
      { time: "10:30 AM", title: "Grand Mosque Visit", desc: "90 minutes inside the mosque" },
      { time: "01:00 PM", title: "Heritage Village", desc: "Crafts and traditional souk" },
      { time: "03:00 PM", title: "Yas Island Photo Stop", desc: "Ferrari World & Yas Mall" },
      { time: "06:00 PM", title: "Dubai Drop Off", desc: "Return to meeting locations" },
    ],
    inclusions: [
      "Return transportation from Dubai",
      "Sheikh Zayed Mosque admission",
      "Professional tour guide",
      "Bottled water",
    ],
    exclusions: ["Theme park entry tickets", "Meals & drinks"],
    faqs: [
      {
        q: "Are pickups provided from hotels?",
        a: "Yes, pickups are provided from major hotels and central meeting spots across Dubai.",
      },
    ],
  },
  {
    id: "5",
    slug: "thrilling-hatta-tour",
    title: "Thrilling Hatta Tour",
    type: "Private Tour",
    city: "Dubai",
    tag: "HATTA MOUNTAIN TOUR",
    price: "AED 799",
    priceNum: 799,
    originalPrice: "AED 899",
    saveTag: "Save AED 100",
    badge: "BestSeller",
    choiceBadge: "2025 Traveller's Choice",
    image: "/hatta-tour-bg.jpg",
    description:
      "Journey into the breathtaking Hajar Mountains. Discover turquoise waters at the historic Hatta Dam, kayak across mountain fjords, visit Hatta Heritage Village and marvel at panoramic valley lookouts.",
    overviewFeatures: [
      { title: "4x4 Mountain Cruiser", desc: "Rugged & Luxurious", icon: "car" },
      { title: "Mountain Guide", desc: "Local Geography Expert", icon: "user" },
      { title: "Hatta Kayaking", desc: "Dam Photo & Kayak Stop", icon: "camera" },
      { title: "Full Day Mountain", desc: "6 to 7 Hours", icon: "clock" },
    ],
    attractions: [
      { name: "Hatta Dam", subtitle: "Turquoise Alpine Waters", image: "/hatta-tour-bg.jpg" },
      {
        name: "Hatta Heritage Village",
        subtitle: "Ancient Mountain Fort",
        image: "/guest_reviews_bg.jpg",
      },
      { name: "Hatta Hill Park", subtitle: "Panoramic Mountain Views", image: "/about_suv.jpg" },
      { name: "Hatta Wadi Hub", subtitle: "Adventure & Activities", image: "/hero_bg.jpg" },
    ],
    itinerary: [
      {
        time: "08:00 AM",
        title: "Hotel Departure",
        desc: "Scenic mountain drive via desert dunes",
      },
      {
        time: "09:45 AM",
        title: "Hatta Dam & Kayaking",
        desc: "Kayaking and mountain photography",
      },
      { time: "11:30 AM", title: "Heritage Village", desc: "Explore 3000-year-old settlement" },
      { time: "01:00 PM", title: "Hatta Hill Park", desc: "Picnic & mountain view tower" },
      { time: "03:00 PM", title: "Return Journey", desc: "Drop off in Dubai" },
    ],
    inclusions: [
      "Private 4x4 Land Cruiser transfer",
      "Hatta Dam sightseeing & photo stops",
      "Heritage Village entry",
      "Hill Park panoramic lookout",
      "Bottled water & snacks",
    ],
    exclusions: ["Kayak / boat rental fees at Hatta Dam", "Lunch"],
    faqs: [
      {
        q: "Do I need a passport for Hatta?",
        a: "UAE residents and tourists should carry original Emirates ID or passport as there may be routine checkpoint stops on the route.",
      },
    ],
  },
  {
    id: "6",
    slug: "enjoy-khor-fakkan-tour-with-mountains-and-water-fall-2024",
    title: "Enjoy Khor Fakkan Tour with Mountains and Water Fall 2024",
    type: "Sharing Tour",
    city: "Dubai",
    tag: "KHOR FAKKAN TOUR",
    price: "AED 699",
    priceNum: 699,
    originalPrice: "AED 799",
    saveTag: "Save AED 100",
    badge: "BestSeller",
    choiceBadge: "2025 Traveller's Choice",
    image: "/guest_reviews_bg.jpg",
    description:
      "Experience the beauty of the East Coast with scenic mountain passes and crystal clear waters. Visit the iconic Roman-style Khor Fakkan Amphitheatre, man-made waterfalls, Shees Park, and serene beaches.",
    overviewFeatures: [
      { title: "Luxury Vehicle", desc: "Coastal Highway Drive", icon: "car" },
      { title: "Tour Captain", desc: "Scenic Landmarks Guide", icon: "user" },
      { title: "Waterfall & Amphitheatre", desc: "Spectacular Photo Stops", icon: "camera" },
      { title: "Full Day Coastal", desc: "7 to 8 Hours", icon: "clock" },
    ],
    attractions: [
      {
        name: "Khor Fakkan Waterfall",
        subtitle: "Majestic Carved Cascade",
        image: "/guest_reviews_bg.jpg",
      },
      {
        name: "Roman Amphitheatre",
        subtitle: "Cultural Architectural Icon",
        image: "/dubai-tour-bg.jpg",
      },
      { name: "Shees Park & Valley", subtitle: "Lush Mountain Oasis", image: "/hatta-tour-bg.jpg" },
      { name: "Khor Fakkan Beach", subtitle: "Gulf of Oman Sands", image: "/hero_bg.jpg" },
    ],
    itinerary: [
      {
        time: "08:30 AM",
        title: "Pickup in Dubai",
        desc: "Drive through Sharjah desert & mountains",
      },
      { time: "10:30 AM", title: "Shees Park & Canyon", desc: "Walkways, streams & greenery" },
      {
        time: "12:00 PM",
        title: "Waterfall & Amphitheatre",
        desc: "Photography & architecture tour",
      },
      { time: "01:30 PM", title: "Khor Fakkan Corniche", desc: "Beachside leisure & lunch time" },
      { time: "04:30 PM", title: "Return to Dubai", desc: "Drop off at your location" },
    ],
    inclusions: [
      "Complete return transport from Dubai",
      "Visit to Shees Park and mountain tunnels",
      "Khor Fakkan Waterfall & Amphitheatre stops",
      "Beachfront leisure time",
      "Bottled water",
    ],
    exclusions: ["Water sports activities", "Lunch / Food items"],
    faqs: [
      {
        q: "Can we swim at Khor Fakkan beach?",
        a: "Yes, Khor Fakkan beach is safe and suitable for swimming and water sports.",
      },
    ],
  },
];
