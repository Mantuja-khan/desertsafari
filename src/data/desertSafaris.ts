export interface DesertSafariTour {
  id: string;
  slug: string;
  title: string;
  tag: string;
  city: string;
  type: string;
  price: string;
  originalPrice?: string;
  saveAmount?: string;
  duration: string;
  image: string;
  isBestSeller?: boolean;
  isTravellerChoice?: boolean;
  description: string;
  overviewFeatures: {
    title: string;
    description: string;
    icon: string;
  }[];
  attractions: {
    title: string;
    subtitle: string;
    image: string;
  }[];
  itinerary: {
    title: string;
    time?: string;
    description: string;
    icon: string;
  }[];
  inclusions: string[];
  exclusions: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const DESERT_SAFARIS: DesertSafariTour[] = [
  {
    id: "evening-desert-safari",
    slug: "evening-desert-safari",
    title: "Evening Desert Safari",
    tag: "MOST POPULAR / ICONIC DUBAI ADVENTURE",
    city: "Dubai",
    type: "Sharing Tour",
    price: "AED 99",
    originalPrice: "AED 149",
    saveAmount: "Save AED 50",
    duration: "6 - 7 Hours",
    image: "/pkg_vip.jpg",
    isBestSeller: true,
    isTravellerChoice: true,
    description:
      "This is the quintessential Dubai desert safari experience. Witness the mesmerizing sunset over golden sand dunes, enjoy exhilarating 4x4 dune bashing, camel rides, sandboarding, and an authentic Bedouin camp celebration with BBQ dinner and 5 live stage shows.",
    overviewFeatures: [
      {
        title: "4x4 Dune Bashing",
        description: "Thrilling 30-minute roller-coaster ride over towering red dunes",
        icon: "car",
      },
      {
        title: "Live Entertainment",
        description: "5 live shows including Belly Dance, Tanoura, and Fire Shows",
        icon: "sparkles",
      },
      {
        title: "BBQ Buffet Dinner",
        description: "Delicious 5-star international BBQ buffet with Veg & Non-Veg options",
        icon: "utensils",
      },
      {
        title: "Camel Ride & Sandboarding",
        description: "Traditional camel ride and sand surfing on golden dunes",
        icon: "compass",
      },
    ],
    attractions: [
      {
        title: "Lahbab Red Dunes",
        subtitle: "Towering 300-foot crimson dunes",
        image: "/hero_bg.jpg",
      },
      {
        title: "Traditional Bedouin Camp",
        subtitle: "Atmospheric Arabian oasis",
        image: "/polaroid_camp.jpg",
      },
      {
        title: "Desert Sunset Point",
        subtitle: "Panoramic golden hour photography",
        image: "/polaroid_camel.jpg",
      },
      {
        title: "Live Entertainment Stage",
        subtitle: "World-class cultural dance performances",
        image: "/review_card_4.jpg",
      },
    ],
    itinerary: [
      {
        title: "Hotel Pickup",
        time: "02:30 PM - 03:00 PM",
        description: "Pick up from your hotel or residence in Dubai / Sharjah by 4x4 SUV.",
        icon: "car",
      },
      {
        title: "Dune Bashing & Sandboarding",
        time: "04:15 PM",
        description: "Adrenaline-fueled 30-min dune bashing session followed by sand surfing.",
        icon: "mountain",
      },
      {
        title: "Sunset Photography",
        time: "05:30 PM",
        description: "Stop at the highest dune to capture breathtaking sunset photos.",
        icon: "camera",
      },
      {
        title: "Bedouin Camp Welcome",
        time: "06:15 PM",
        description: "Arabic Gahwa coffee, fresh dates, snacks, henna tattoo & camel ride.",
        icon: "coffee",
      },
      {
        title: "Live Shows & BBQ Dinner",
        time: "07:00 PM",
        description: "Lavish BBQ buffet dinner accompanied by Belly Dance, Tanoura & Fire Show.",
        icon: "flame",
      },
      {
        title: "Drop-off",
        time: "09:30 PM",
        description: "Comfortable drive back to your hotel or drop-off location.",
        icon: "car",
      },
    ],
    inclusions: [
      "Pickup & Drop-off by 4x4 Land Cruiser SUV",
      "30–35 Minutes Dune Bashing at Lahbab Red Dunes",
      "Sunset photo stop on high dunes",
      "Camel ride & Sandboarding experience",
      "Unlimited mineral water, soft drinks, tea & Arabic coffee",
      "Free snacks and starters upon arrival",
      "Henna tattooing for ladies & kids",
      "Arabic dress photo opportunity",
      "BBQ Buffet Dinner (Veg & Non-Veg dishes)",
      "Live Shows: 2 Belly Dance, 2 Fire Shows, 1 Tanoura Show",
    ],
    exclusions: [
      "Quad Bike / Dune Buggy rental (available as add-on)",
      "Alcoholic beverages",
      "Souvenir photography purchases",
      "VIP table service (available upon request)",
    ],
    faqs: [
      {
        question: "What is the pickup and drop-off timing for Evening Desert Safari?",
        answer:
          "Pickup is usually between 2:30 PM and 3:30 PM depending on your hotel location, and drop-off is around 9:00 PM to 9:30 PM.",
      },
      {
        question: "Is the BBQ dinner suitable for vegetarians?",
        answer:
          "Yes! Our international buffet includes dedicated vegetarian dishes, fresh salads, breads, pasta, and desserts alongside grilled meats.",
      },
      {
        question: "What should I wear during the desert safari?",
        answer:
          "Casual, comfortable clothing with sandals, sneakers, or open shoes. During winter months (Nov–March), a light jacket or shawl is recommended for the evening.",
      },
    ],
  },
  {
    id: "premium-desert-safari",
    slug: "premium-desert-safari",
    title: "Premium Desert Safari",
    tag: "VIP LUXURY / 5-STAR DESERT DINING",
    city: "Dubai",
    type: "VIP Tour",
    price: "AED 149",
    originalPrice: "AED 220",
    saveAmount: "Save AED 71",
    duration: "7 - 8 Hours",
    image: "/pkg_vip.jpg",
    isBestSeller: true,
    isTravellerChoice: true,
    description:
      "Indulge in the ultimate luxury desert safari featuring VIP sofa seating, table service for dinner and starters, extended red dune bashing in a premium 4x4 Land Cruiser, priority camel rides, and front-row entertainment views.",
    overviewFeatures: [
      {
        title: "VIP Sofa Seating",
        description: "Reserved luxury sofa seating with personal table service",
        icon: "crown",
      },
      {
        title: "Extended Dune Bashing",
        description: "40 minutes high-octane dune bashing in Lahbab Desert",
        icon: "car",
      },
      {
        title: "Table Served Dinner",
        description: "Starters and gourmet BBQ dishes served directly to your table",
        icon: "utensils",
      },
      {
        title: "Front Row Shows",
        description: "Unobstructed views of all 5 live cultural dance shows",
        icon: "sparkles",
      },
    ],
    attractions: [
      {
        title: "VIP Desert Pavilion",
        subtitle: "Exclusive air-cooled luxury lounge",
        image: "/polaroid_camp.jpg",
      },
      {
        title: "Lahbab Red Dunes",
        subtitle: "Thrilling 4x4 high-dune bash",
        image: "/hero_bg.jpg",
      },
      {
        title: "Royal Sunset Lounge",
        subtitle: "Champagne style non-alcoholic toast",
        image: "/polaroid_camel.jpg",
      },
      {
        title: "Gourmet Live BBQ Stations",
        subtitle: "Freshly grilled kebabs & seafood",
        image: "/review_card_4.jpg",
      },
    ],
    itinerary: [
      {
        title: "VIP Hotel Pickup",
        time: "02:30 PM",
        description: "Pickup in premium air-conditioned 4x4 Land Cruiser.",
        icon: "car",
      },
      {
        title: "Extreme Red Dune Bashing",
        time: "04:00 PM",
        description: "40 minutes thrilling dune bashing on massive red sand dunes.",
        icon: "mountain",
      },
      {
        title: "Sandboarding & Sunset Shoot",
        time: "05:15 PM",
        description: "VIP photo session at golden hour with traditional falcon props.",
        icon: "camera",
      },
      {
        title: "VIP Lounge Check-in",
        time: "06:00 PM",
        description: "Welcome mocktails, hot starters & snacks served to your table.",
        icon: "coffee",
      },
      {
        title: "Gourmet Dinner & Shows",
        time: "07:15 PM",
        description: "Table-served BBQ buffet dinner + Belly Dance, Tanoura & Fire Show.",
        icon: "flame",
      },
      {
        title: "VIP Return Drop-off",
        time: "09:45 PM",
        description: "Direct drop-off to your accommodation.",
        icon: "car",
      },
    ],
    inclusions: [
      "Pickup & Drop-off by 4x4 SUV Land Cruiser",
      "VIP Reserved Sofa Seating Area",
      "Table service for starters, drinks, and dinner",
      "40 minutes high-dune bashing at Lahbab",
      "Sandboarding & Camel Riding",
      "Fresh Fruit Basket & VIP Snacks on Arrival",
      "Gourmet BBQ Buffet with Live Cooking Stations",
      "Unlimited cold drinks, water, tea, and premium Arabic coffee",
      "5 Live Cultural Performances with Front-Row Seating",
      "Falcon photo opportunity & Henna artist",
    ],
    exclusions: [
      "Quad bike / Buggy self-drive (available as extra)",
      "Alcoholic beverages",
      "VIP Shisha on table (charged separately)",
    ],
    faqs: [
      {
        question: "What makes the Premium Desert Safari different from Standard?",
        answer:
          "The Premium Safari includes reserved VIP sofa seating, table service (so you don't need to queue for buffet or starters), extended dune bashing time, and priority service for activities.",
      },
      {
        question: "Can children join the Premium Desert Safari?",
        answer:
          "Yes, children of all ages are welcome. Booster seats and child car seats can be requested in advance.",
      },
    ],
  },
  {
    id: "private-desert-safari",
    slug: "private-desert-safari",
    title: "Private Desert Safari",
    tag: "EXCLUSIVE CAR / TOTAL PRIVACY & COMFORT",
    city: "Dubai",
    type: "Private Tour",
    price: "AED 699",
    originalPrice: "AED 899",
    saveAmount: "Save AED 200",
    duration: "7 - 8 Hours",
    image: "/pkg_private.jpg",
    isBestSeller: true,
    isTravellerChoice: true,
    description:
      "Experience Dubai's desert exclusively with your family or friends in a dedicated private 4x4 Land Cruiser. Enjoy customized pace, tailored dune bashing intensity, private hotel pickup/drop-off, and complete personalized attention from your professional guide.",
    overviewFeatures: [
      {
        title: "Private 4x4 Vehicle",
        description: "Dedicated luxury SUV exclusively for up to 6 passengers",
        icon: "car",
      },
      {
        title: "Flexible Timings",
        description: "Choose your own pickup time and customize your itinerary",
        icon: "clock",
      },
      {
        title: "Customized Dune Bashing",
        description: "Mild, medium, or extreme dune bashing suited to your comfort",
        icon: "mountain",
      },
      {
        title: "VIP Desert Camp",
        description: "Full access to camp activities, BBQ dinner, and live shows",
        icon: "crown",
      },
    ],
    attractions: [
      {
        title: "Exclusive Lahbab Dunes",
        subtitle: "Private desert dunes photoshoot",
        image: "/about_suv.jpg",
      },
      {
        title: "Private Sunset Spot",
        subtitle: "Secluded tranquility away from crowds",
        image: "/polaroid_camel.jpg",
      },
      {
        title: "Bedouin Desert Camp",
        subtitle: "Authentic Arabian hospitality",
        image: "/polaroid_camp.jpg",
      },
      {
        title: "Spectacular Fire Show",
        subtitle: "High-energy desert acrobatics",
        image: "/review_card_4.jpg",
      },
    ],
    itinerary: [
      {
        title: "Private Doorstep Pickup",
        time: "03:00 PM (Flexible)",
        description: "Exclusive pickup directly from your hotel / residence.",
        icon: "car",
      },
      {
        title: "Custom Dune Bashing",
        time: "04:30 PM",
        description: "Tailored 35-min dune bash suited to your group's preference.",
        icon: "mountain",
      },
      {
        title: "Private Sunset Session",
        time: "05:45 PM",
        description: "Private photo stop with scenic sunset views.",
        icon: "camera",
      },
      {
        title: "Camp Activities & Camel Ride",
        time: "06:30 PM",
        description: "Camel rides, sandboarding, Henna art, and Arabic coffee.",
        icon: "coffee",
      },
      {
        title: "Dinner & 5 Live Shows",
        time: "07:30 PM",
        description: "International BBQ dinner buffet with live entertainment.",
        icon: "flame",
      },
      {
        title: "Direct Private Return",
        time: "09:30 PM",
        description: "Relaxing drive back without waiting for other guests.",
        icon: "car",
      },
    ],
    inclusions: [
      "Exclusive Private 4x4 Land Cruiser SUV (Up to 6 Guests)",
      "Direct Private Hotel Pickup & Drop-off (Dubai & Sharjah)",
      "Customizable Dune Bashing intensity (Mild, Medium or Thrill)",
      "Sandboarding & Camel Rides",
      "Unlimited Drinks (Water, Soft Drinks, Juices, Tea, Arabic Gahwa)",
      "Appetizers & Starters",
      "Full International BBQ Buffet Dinner (Veg & Non-Veg)",
      "Henna Painting & Arabic Costumes Photography",
      "5 Live Shows (Tanoura, Fire, Belly Dance)",
      "Fuel, toll gates, and desert entry fees included",
    ],
    exclusions: [
      "Quad bike / Dune buggy rental (can be added on request)",
      "VIP Sofa Lounge upgrade (optional)",
      "Alcoholic drinks",
    ],
    faqs: [
      {
        question: "How many people can fit into one Private Safari car?",
        answer:
          "Each private 4x4 vehicle can comfortably accommodate up to 6 adult guests plus the driver.",
      },
      {
        question: "Can we adjust the dune bashing intensity if we have seniors or toddlers?",
        answer:
          "Absolutely! Because the vehicle is 100% private, your driver will adjust the dune driving to be as gentle or as exciting as you desire.",
      },
    ],
  },
  {
    id: "evening-desert-safari-with-quad-bike",
    slug: "evening-desert-safari-with-quad-bike",
    title: "Evening Desert Safari with Quad Bike",
    tag: "POWER & ADVENTURE / SELF-DRIVE QUAD BIKE",
    city: "Dubai",
    type: "Adventure Tour",
    price: "AED 180",
    originalPrice: "AED 250",
    saveAmount: "Save AED 70",
    duration: "7 - 8 Hours",
    image: "/pkg_quad.jpg",
    isBestSeller: true,
    isTravellerChoice: true,
    description:
      "Unleash your inner adventurer with a thrilling 30-minute self-drive Quad Bike (ATV) ride across open desert tracks, followed by red dune bashing, camel riding, sandboarding, BBQ dinner, and live shows.",
    overviewFeatures: [
      {
        title: "30-Min Quad Bike Ride",
        description: "Powerful 250cc-400cc ATV self-drive on dedicated desert terrain",
        icon: "zap",
      },
      {
        title: "Full Safety Gear Included",
        description: "Helmets, goggles, and guided safety instruction provided",
        icon: "shield",
      },
      {
        title: "4x4 Dune Bashing",
        description: "Thrilling roller-coaster ride over high desert dunes",
        icon: "car",
      },
      {
        title: "Camp Dinner & Shows",
        description: "BBQ buffet dinner and 5 live cultural dance performances",
        icon: "flame",
      },
    ],
    attractions: [
      {
        title: "ATV Quad Biking Arena",
        subtitle: "Open dunes circuit with high-power bikes",
        image: "/pkg_quad.jpg",
      },
      {
        title: "Red Dunes of Dubai",
        subtitle: "Deep desert dune bashing",
        image: "/hero_bg.jpg",
      },
      {
        title: "Desert Sunset Photography",
        subtitle: "Golden hour photo memories",
        image: "/polaroid_camel.jpg",
      },
      {
        title: "Desert Safari Camp",
        subtitle: "Festive Arabian night celebration",
        image: "/polaroid_camp.jpg",
      },
    ],
    itinerary: [
      {
        title: "Hotel Pickup",
        time: "02:30 PM",
        description: "Pick up by 4x4 SUV from your Dubai location.",
        icon: "car",
      },
      {
        title: "Quad Biking Session",
        time: "04:00 PM",
        description: "Safety briefing followed by 30 mins self-drive ATV quad biking.",
        icon: "zap",
      },
      {
        title: "Dune Bashing & Sandboarding",
        time: "04:45 PM",
        description: "30 minutes thrilling 4x4 dune bashing across high red dunes.",
        icon: "mountain",
      },
      {
        title: "Sunset Stop",
        time: "05:45 PM",
        description: "Watch the sun sink into the Arabian sands.",
        icon: "camera",
      },
      {
        title: "Bedouin Camp Arrival",
        time: "06:30 PM",
        description: "Camel rides, henna tattoo, snacks, Gahwa coffee.",
        icon: "coffee",
      },
      {
        title: "BBQ Dinner & Live Shows",
        time: "07:15 PM",
        description: "Lavish BBQ buffet dinner with Fire Show, Belly Dance & Tanoura.",
        icon: "flame",
      },
      {
        title: "Hotel Drop-off",
        time: "09:30 PM",
        description: "Drive back to your accommodation.",
        icon: "car",
      },
    ],
    inclusions: [
      "Pickup & Drop-off by 4x4 Land Cruiser SUV",
      "30 Minutes Quad Biking (ATV) with Helmet and Goggles",
      "30 Minutes 4x4 Dune Bashing on Lahbab Red Dunes",
      "Sandboarding & Camel Ride",
      "Sunset photo stop on high sand dunes",
      "Unlimited Water, Soft Drinks, Tea, and Coffee",
      "Starter snacks served upon arrival",
      "BBQ Buffet Dinner (Vegetarian and Non-Vegetarian options)",
      "Henna Art & Arabic Costume Photography",
      "5 Live Stage Shows (Belly Dance, Fire Shows, Tanoura Dance)",
    ],
    exclusions: [
      "Dune Buggy upgrades (available upon request)",
      "Alcoholic beverages",
      "Souvenir photos",
    ],
    faqs: [
      {
        question: "Do I need a driver's license to ride a quad bike?",
        answer:
          "No driving license is required. Before riding, our trained instructors provide full safety gear and a step-by-step briefing.",
      },
      {
        question: "What is the minimum age to drive a quad bike?",
        answer:
          "Drivers must be at least 15 years old. Younger children can ride as passengers with an adult on double quad bikes.",
      },
    ],
  },
  {
    id: "evening-desert-safari-with-dune-buggy",
    slug: "evening-desert-safari-with-dune-buggy",
    title: "Evening Desert Safari with Dune Buggy",
    tag: "HIGH OCTANE / POLARIS & CAN-AM BUGGY",
    city: "Dubai",
    type: "Adventure Tour",
    price: "AED 399",
    originalPrice: "AED 550",
    saveAmount: "Save AED 151",
    duration: "7 - 8 Hours",
    image: "/pkg_quad.jpg",
    isBestSeller: true,
    isTravellerChoice: true,
    description:
      "Tear through the open Arabian dunes in an ultra-modern, roll-caged Can-Am / Polaris Dune Buggy with bucket seats and 4-point harnesses. Complete with 4x4 dune bashing, camel rides, BBQ dinner, and live shows.",
    overviewFeatures: [
      {
        title: "30-Min Dune Buggy Drive",
        description: "High-horsepower twin-seater buggy with roll cage and 4-point harness",
        icon: "zap",
      },
      {
        title: "Guided Desert Convoy",
        description: "Expert leader guide leading you through scenic dune crests",
        icon: "compass",
      },
      {
        title: "4x4 Dune Bashing",
        description: "Heart-pounding SUV dune bash across the deep desert",
        icon: "car",
      },
      {
        title: "Camp Buffet & Shows",
        description: "Grand BBQ buffet dinner accompanied by 5 cultural stage shows",
        icon: "flame",
      },
    ],
    attractions: [
      {
        title: "High Dune Buggy Track",
        subtitle: "Pure sand terrain with rolling slopes",
        image: "/pkg_quad.jpg",
      },
      {
        title: "Lahbab Red Desert",
        subtitle: "World famous Dubai crimson sands",
        image: "/hero_bg.jpg",
      },
      {
        title: "Sunset Lookout",
        subtitle: "Panoramic desert sunset vantage",
        image: "/polaroid_camel.jpg",
      },
      {
        title: "Arabian Desert Camp",
        subtitle: "Atmospheric evening oasis",
        image: "/polaroid_camp.jpg",
      },
    ],
    itinerary: [
      {
        title: "Hotel Pickup",
        time: "02:30 PM",
        description: "Pickup by 4x4 Land Cruiser from your Dubai hotel.",
        icon: "car",
      },
      {
        title: "Dune Buggy Drive",
        time: "04:00 PM",
        description: "Gear up and drive your Dune Buggy for 30 minutes in open sands.",
        icon: "zap",
      },
      {
        title: "4x4 SUV Dune Bashing",
        time: "04:50 PM",
        description: "30 minutes high-energy dune bashing with experienced safari driver.",
        icon: "mountain",
      },
      {
        title: "Sunset Photos & Sandboarding",
        time: "05:45 PM",
        description: "Glide down sand dunes on sandboards and capture sunset photos.",
        icon: "camera",
      },
      {
        title: "Bedouin Camp Arrival",
        time: "06:30 PM",
        description: "Camel rides, henna painting, Arabic Gahwa, and welcome snacks.",
        icon: "coffee",
      },
      {
        title: "Dinner & 5 Live Shows",
        time: "07:15 PM",
        description: "5-star BBQ buffet dinner with Tanoura, Fire & Belly Dance shows.",
        icon: "flame",
      },
      {
        title: "Hotel Drop-off",
        time: "09:30 PM",
        description: "Comfortable drop-off back to your hotel.",
        icon: "car",
      },
    ],
    inclusions: [
      "Hotel Pickup & Drop-off by 4x4 Land Cruiser SUV",
      "30 Minutes Dune Buggy Self-Drive (1-Seater or 2-Seater)",
      "Full Safety Gear: Full-face Helmets, Goggles, Safety Harness",
      "30 Minutes 4x4 Dune Bashing in Lahbab Red Dunes",
      "Sandboarding & Camel Ride",
      "Sunset photo stop on top of sand dunes",
      "Unlimited Mineral Water, Soft Drinks, Juices, and Hot Tea/Coffee",
      "Starters & Snacks on Camp Arrival",
      "International BBQ Buffet Dinner (Veg & Non-Veg)",
      "5 Live Stage Shows (Belly Dance, Fire Show, Tanoura)",
    ],
    exclusions: ["Alcoholic beverages", "Souvenir photography", "VIP Sofa table service upgrade"],
    faqs: [
      {
        question: "Can two people share one Dune Buggy?",
        answer:
          "Yes! We offer 2-seater and 4-seater Dune Buggies so you can ride together and swap drivers during the session.",
      },
      {
        question: "Is safety gear provided?",
        answer:
          "Yes, high-grade safety helmets, eye goggles, and vehicle safety harnesses are provided for all participants.",
      },
    ],
  },
  {
    id: "overnight-desert-safari",
    slug: "overnight-desert-safari",
    title: "Overnight Desert Safari",
    tag: "STARRY NIGHT / BEDOUIN GLAMPING & SUNRISE",
    city: "Dubai",
    type: "Overnight Stay",
    price: "AED 349",
    originalPrice: "AED 499",
    saveAmount: "Save AED 150",
    duration: "18 Hours (Overnight)",
    image: "/polaroid_camp.jpg",
    isBestSeller: true,
    isTravellerChoice: true,
    description:
      "Sleep under a canopy of desert stars in an authentic Bedouin tent or open sky. Enjoy the full evening desert safari program, night campfire with stargazing, comfortable sleeping tents with mattresses & blankets, and a fresh sunrise breakfast.",
    overviewFeatures: [
      {
        title: "Overnight Tent Stay",
        description: "Comfortable tents equipped with mattresses, pillows, and sleeping bags",
        icon: "moon",
      },
      {
        title: "Stargazing & Campfire",
        description: "Midnight campfire under the clear desert night sky",
        icon: "flame",
      },
      {
        title: "Sunrise Breakfast",
        description: "Freshly prepared morning breakfast with Arabic tea and coffee",
        icon: "sun",
      },
      {
        title: "Full Evening Safari",
        description: "Dune bashing, camel ride, sandboarding, BBQ dinner, and 5 live shows",
        icon: "sparkles",
      },
    ],
    attractions: [
      {
        title: "Desert Stargazing Sky",
        subtitle: "Untouched night sky far from city lights",
        image: "/hero_bg.jpg",
      },
      {
        title: "Desert Sunrise Panorama",
        subtitle: "Golden morning light over dunes",
        image: "/polaroid_camel.jpg",
      },
      {
        title: "Bedouin Night Camp",
        subtitle: "Authentic Arabian camp setting",
        image: "/polaroid_camp.jpg",
      },
      {
        title: "Morning Wildlife Spotting",
        subtitle: "Desert gazelles and birds at dawn",
        image: "/about_suv.jpg",
      },
    ],
    itinerary: [
      {
        title: "Afternoon Pickup",
        time: "03:00 PM",
        description: "Pick up by 4x4 Land Cruiser SUV from your hotel.",
        icon: "car",
      },
      {
        title: "Dune Bashing & Sunset",
        time: "04:30 PM",
        description: "Thrilling dune bashing, sandboarding & golden sunset shoot.",
        icon: "mountain",
      },
      {
        title: "Evening Camp & Dinner",
        time: "06:30 PM",
        description: "Live shows, camel rides, henna tattoo & BBQ buffet dinner.",
        icon: "flame",
      },
      {
        title: "Campfire & Stargazing",
        time: "10:30 PM",
        description: "Camp lights dim for campfire, hot tea, and stargazing in tranquility.",
        icon: "moon",
      },
      {
        title: "Sunrise & Breakfast",
        time: "06:00 AM",
        description: "Witness the magnificent desert sunrise followed by a warm breakfast.",
        icon: "sun",
      },
      {
        title: "Morning Return Drop-off",
        time: "08:30 AM",
        description: "Comfortable drive back to your hotel.",
        icon: "car",
      },
    ],
    inclusions: [
      "Hotel Pickup & Drop-off by 4x4 Land Cruiser SUV",
      "Overnight Accommodation in Desert Camp (Tents, Mattresses, Blankets, Pillows)",
      "Evening Dune Bashing, Sandboarding & Camel Riding",
      "BBQ Buffet Dinner with 5 Live Stage Shows",
      "Midnight Campfire with Arabian Tea & Coffee",
      "Morning Sunrise Viewing on High Dunes",
      "Freshly Cooked Breakfast (Eggs, Toast, Jam, Juice, Tea & Coffee)",
      "Clean restrooms and washroom facilities at camp",
      "Unlimited bottled water and refreshments",
    ],
    exclusions: [
      "Quad bike or Dune buggy self-drives",
      "Alcoholic beverages",
      "Personal toiletries",
    ],
    faqs: [
      {
        question: "Are bathroom and shower facilities available at the overnight camp?",
        answer:
          "Yes, our campsite has clean, modern, gender-segregated western toilets and wash basins.",
      },
      {
        question: "Is bedding provided for the overnight stay?",
        answer:
          "Yes, clean mattresses, pillows, sheets, and warm blankets/sleeping bags are provided for all overnight guests.",
      },
    ],
  },
  {
    id: "morning-desert-safari",
    slug: "morning-desert-safari",
    title: "Morning Desert Safari",
    tag: "EARLY BIRDS / CRISP DESERT BREEZE & ADVENTURE",
    city: "Dubai",
    type: "Morning Tour",
    price: "AED 80",
    originalPrice: "AED 120",
    saveAmount: "Save AED 40",
    duration: "4 - 5 Hours",
    image: "/hero_bg.jpg",
    isBestSeller: false,
    isTravellerChoice: true,
    description:
      "Start your day with the cool morning breeze and pristine untouched sand dunes. Ideal for travelers with tight schedules, photography lovers, and thrill seekers looking for uninterrupted 4x4 dune bashing, camel riding, and sandboarding.",
    overviewFeatures: [
      {
        title: "Morning Dune Bashing",
        description: "35 minutes exhilarating 4x4 dune bashing on fresh sand ripples",
        icon: "car",
      },
      {
        title: "Sandboarding Thrill",
        description: "Glide down steep desert dunes on custom sandboards",
        icon: "mountain",
      },
      {
        title: "Morning Camel Ride",
        description: "Peaceful desert camel trekking in the soft morning light",
        icon: "compass",
      },
      {
        title: "Convenient Half-Day",
        description: "Back in Dubai by 12:30 PM with the rest of your day free",
        icon: "clock",
      },
    ],
    attractions: [
      {
        title: "Untouched Sand Dunes",
        subtitle: "Fresh wind-blown sand ripples",
        image: "/hero_bg.jpg",
      },
      {
        title: "Morning Camel Trek",
        subtitle: "Traditional desert transportation",
        image: "/polaroid_camel.jpg",
      },
      {
        title: "High Dune Sandboarding",
        subtitle: "Surfing down red sands",
        image: "/about_suv.jpg",
      },
      {
        title: "Desert Oasis Stop",
        subtitle: "Refreshing drinks in the peaceful desert",
        image: "/polaroid_camp.jpg",
      },
    ],
    itinerary: [
      {
        title: "Early Morning Pickup",
        time: "07:30 AM - 08:00 AM",
        description: "Pickup from your hotel in Dubai / Sharjah by 4x4 Land Cruiser.",
        icon: "car",
      },
      {
        title: "Lahbab Desert Arrival",
        time: "08:45 AM",
        description: "Tire deflation and photo stop while getting ready for action.",
        icon: "camera",
      },
      {
        title: "Action-Packed Dune Bashing",
        time: "09:00 AM",
        description: "35 minutes thrilling high-dune bash over pristine red dunes.",
        icon: "mountain",
      },
      {
        title: "Sandboarding & Camel Ride",
        time: "09:45 AM",
        description: "Sand surfing down massive slopes and traditional camel ride.",
        icon: "compass",
      },
      {
        title: "Refreshment Break",
        time: "10:30 AM",
        description: "Unlimited cold water, juices, and soft drinks.",
        icon: "coffee",
      },
      {
        title: "Return Drop-off",
        time: "11:30 AM - 12:30 PM",
        description: "Drop-off back to your hotel before lunch time.",
        icon: "car",
      },
    ],
    inclusions: [
      "Pickup & Drop-off by 4x4 Land Cruiser SUV",
      "30–35 Minutes Dune Bashing on Lahbab Red Dunes",
      "Sandboarding session on high dunes",
      "Traditional Camel Ride",
      "Unlimited Mineral Water, Soft Drinks, and Cold Juices",
      "Photo stops in pristine desert scenery",
      "Fuel, toll charges, and desert entrance permits",
    ],
    exclusions: [
      "Quad bike or buggy rental (can be added as an extra)",
      "BBQ dinner or live shows (available on Evening Safari)",
    ],
    faqs: [
      {
        question: "Why choose Morning Desert Safari over Evening?",
        answer:
          "Morning Desert Safari is ideal if you have evening plans (like dinner cruises or Burj Khalifa tickets), prefer cooler morning temperatures, or want to enjoy pure adventure without camp shows.",
      },
      {
        question: "What time will I be back in Dubai?",
        answer:
          "You will be back at your hotel between 12:00 PM and 1:00 PM, giving you the entire afternoon and evening to explore.",
      },
    ],
  },
];
