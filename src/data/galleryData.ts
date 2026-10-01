export interface GalleryImageItem {
  id: string;
  src: string;
  title: string;
  category: "Desert Safari" | "Dune Bashing" | "Camel Caravan" | "Quad & Buggy" | "Camp & Shows";
  width: number;
  height: number;
  aspect: "landscape" | "portrait";
}

export interface GalleryVideoItem {
  id: string;
  src: string;
  poster?: string;
  title: string;
  category: "Desert Safari" | "Quad Biking" | "City Tour" | "Camp Entertainment";
  duration: string;
}

// Specifically requested images for Hero showcase: 6, 3, 2, 1, 9
export const HERO_GALLERY_PREVIEW = [
  { id: "hero-6", src: "/gallery/gallery_img_6.jpg", title: "Desert Adventure & Safari", width: 1280, height: 960, aspect: "landscape" as const },
  { id: "hero-3", src: "/gallery/gallery_img_3.jpg", title: "Camel Caravan Sunset", width: 871, height: 654, aspect: "landscape" as const },
  { id: "hero-2", src: "/gallery/gallery_img_2.jpg", title: "4x4 Dune Bashing", width: 1280, height: 719, aspect: "landscape" as const },
  { id: "hero-1", src: "/gallery/gallery_img_1.jpg", title: "Quad Bike Desert Trails", width: 1280, height: 853, aspect: "landscape" as const },
  { id: "hero-9", src: "/gallery/gallery_img_9.jpg", title: "Traditional Bedouin Camp", width: 1280, height: 960, aspect: "landscape" as const },
];

export const ALL_GALLERY_IMAGES: GalleryImageItem[] = [
  { id: "img-1", src: "/gallery/gallery_img_1.jpg", title: "Golden Dune Thrills", category: "Dune Bashing", width: 1280, height: 853, aspect: "landscape" },
  { id: "img-2", src: "/gallery/gallery_img_2.jpg", title: "Extreme Safari Adventure", category: "Desert Safari", width: 1280, height: 719, aspect: "landscape" },
  { id: "img-3", src: "/gallery/gallery_img_3.jpg", title: "Authentic Sunset Camel Caravan", category: "Camel Caravan", width: 871, height: 654, aspect: "landscape" },
  { id: "img-4", src: "/gallery/gallery_img_4.jpg", title: "Arabian Falconry & Heritage", category: "Camp & Shows", width: 960, height: 1280, aspect: "portrait" },
  { id: "img-5", src: "/gallery/gallery_img_5.jpg", title: "Luxury Desert Glamping & VIP Lounge", category: "Camp & Shows", width: 960, height: 1280, aspect: "portrait" },
  { id: "img-6", src: "/gallery/gallery_img_6.jpg", title: "High Dune Quad Biking Action", category: "Quad & Buggy", width: 1280, height: 960, aspect: "landscape" },
  { id: "img-7", src: "/gallery/gallery_img_7.jpg", title: "Fiery Arabian Sunset Vista", category: "Desert Safari", width: 960, height: 1280, aspect: "portrait" },
  { id: "img-8", src: "/gallery/gallery_img_8.jpg", title: "Bedouin Culture & Hospitality", category: "Camp & Shows", width: 960, height: 1280, aspect: "portrait" },
  { id: "img-9", src: "/gallery/gallery_img_9.jpg", title: "Traditional Tanoura & Fire Show", category: "Camp & Shows", width: 1280, height: 960, aspect: "landscape" },
  { id: "img-10", src: "/gallery/gallery_img_10.jpg", title: "Sandboarding on Red Dunes", category: "Desert Safari", width: 960, height: 1280, aspect: "portrait" },
];

export const ALL_GALLERY_VIDEOS: GalleryVideoItem[] = [
  { id: "vid-1", src: "/videos/tour_ivideo_1.mp4", poster: "/gallery/gallery_img_1.jpg", title: "Dune Bashing & Sandboarding Highlights", category: "Desert Safari", duration: "0:30" },
  { id: "vid-2", src: "/videos/tour_ivideo_2.mp4", poster: "/gallery/gallery_img_2.jpg", title: "Quad Bike & Buggy Speed Action", category: "Quad Biking", duration: "0:45" },
  { id: "vid-3", src: "/videos/tour_ivideo_3.mp4", poster: "/gallery/gallery_img_3.jpg", title: "Sunset Camel Trail Experience", category: "Desert Safari", duration: "0:40" },
  { id: "vid-4", src: "/videos/tour_ivideo_4.mp4", poster: "/gallery/gallery_img_6.jpg", title: "VIP Desert Safari Full Experience", category: "Desert Safari", duration: "0:50" },
  { id: "vid-5", src: "/videos/tour_ivideo_5.mp4", poster: "/gallery/gallery_img_5.jpg", title: "Camp BBQ Dinner & Live Show Highlights", category: "Camp Entertainment", duration: "0:35" },
  { id: "vid-6", src: "/videos/tour_ivideo_6.mp4", poster: "/gallery/gallery_img_4.jpg", title: "Dubai Skyline & Landmarks Tour", category: "City Tour", duration: "0:45" },
  { id: "vid-7", src: "/videos/tour_ivideo_7.mp4", poster: "/gallery/gallery_img_7.jpg", title: "Abu Dhabi Grand Mosque & Louvre", category: "City Tour", duration: "0:35" },
  { id: "vid-8", src: "/videos/tour_ivideo_8.mp4", poster: "/gallery/gallery_img_8.jpg", title: "Hatta Mountain Heritage & Kayaking", category: "City Tour", duration: "0:25" },
  { id: "vid-9", src: "/videos/tour_ivideo_9.mp4", poster: "/gallery/gallery_img_9.jpg", title: "Spectacular Fire & Belly Dance Performance", category: "Camp Entertainment", duration: "0:40" },
  { id: "vid-10", src: "/videos/tour_ivideo_10.mp4", poster: "/gallery/gallery_img_10.jpg", title: "Exclusive Private Falconry Showcase", category: "Desert Safari", duration: "0:55" },
];
