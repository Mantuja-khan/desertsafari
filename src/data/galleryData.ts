import galleryImg1 from "../assets/gallery_img_1.jpg";
import galleryImg2 from "../assets/gallery_img_2.jpg";
import galleryImg3 from "../assets/gallery_img_3.jpg";
import galleryImg4 from "../assets/gallery_img_4.jpg";
import galleryImg5 from "../assets/gallery_img_5.jpg";
import galleryImg6 from "../assets/gallery_img_6.jpg";
import galleryImg7 from "../assets/gallery_img_7.jpg";
import galleryImg8 from "../assets/gallery_img_8.jpg";
import galleryImg9 from "../assets/gallery_img_9.jpg";
import galleryImg10 from "../assets/gallery_img_10.jpg";

import tourVideo1 from "../assets/tour_ivideo_1.mp4";
import tourVideo2 from "../assets/tour_ivideo_2.mp4";
import tourVideo3 from "../assets/tour_ivideo_3.mp4";
import tourVideo4 from "../assets/tour_ivideo_4.mp4";
import tourVideo5 from "../assets/tour_ivideo_5.mp4";
import tourVideo6 from "../assets/tour_ivideo_6.mp4";
import tourVideo7 from "../assets/tour_ivideo_7.mp4";
import tourVideo8 from "../assets/tour_ivideo_8.mp4";
import tourVideo9 from "../assets/tour_ivideo_9.mp4";
import tourVideo10 from "../assets/tour_ivideo_10.mp4";

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
  { id: "hero-6", src: galleryImg6, title: "Desert Adventure & Safari", width: 1280, height: 960, aspect: "landscape" as const },
  { id: "hero-3", src: galleryImg3, title: "Camel Caravan Sunset", width: 871, height: 654, aspect: "landscape" as const },
  { id: "hero-2", src: galleryImg2, title: "4x4 Dune Bashing", width: 1280, height: 719, aspect: "landscape" as const },
  { id: "hero-1", src: galleryImg1, title: "Quad Bike Desert Trails", width: 1280, height: 853, aspect: "landscape" as const },
  { id: "hero-9", src: galleryImg9, title: "Traditional Bedouin Camp", width: 1280, height: 960, aspect: "landscape" as const },
];

export const ALL_GALLERY_IMAGES: GalleryImageItem[] = [
  { id: "img-1", src: galleryImg1, title: "Golden Dune Thrills", category: "Dune Bashing", width: 1280, height: 853, aspect: "landscape" },
  { id: "img-2", src: galleryImg2, title: "Extreme Safari Adventure", category: "Desert Safari", width: 1280, height: 719, aspect: "landscape" },
  { id: "img-3", src: galleryImg3, title: "Authentic Sunset Camel Caravan", category: "Camel Caravan", width: 871, height: 654, aspect: "landscape" },
  { id: "img-4", src: galleryImg4, title: "Arabian Falconry & Heritage", category: "Camp & Shows", width: 960, height: 1280, aspect: "portrait" },
  { id: "img-5", src: galleryImg5, title: "Luxury Desert Glamping & VIP Lounge", category: "Camp & Shows", width: 960, height: 1280, aspect: "portrait" },
  { id: "img-6", src: galleryImg6, title: "High Dune Quad Biking Action", category: "Quad & Buggy", width: 1280, height: 960, aspect: "landscape" },
  { id: "img-7", src: galleryImg7, title: "Fiery Arabian Sunset Vista", category: "Desert Safari", width: 960, height: 1280, aspect: "portrait" },
  { id: "img-8", src: galleryImg8, title: "Bedouin Culture & Hospitality", category: "Camp & Shows", width: 960, height: 1280, aspect: "portrait" },
  { id: "img-9", src: galleryImg9, title: "Traditional Tanoura & Fire Show", category: "Camp & Shows", width: 1280, height: 960, aspect: "landscape" },
  { id: "img-10", src: galleryImg10, title: "Sandboarding on Red Dunes", category: "Desert Safari", width: 960, height: 1280, aspect: "portrait" },
];

export const ALL_GALLERY_VIDEOS: GalleryVideoItem[] = [
  { id: "vid-1", src: tourVideo1, poster: galleryImg1, title: "Dune Bashing & Sandboarding Highlights", category: "Desert Safari", duration: "0:30" },
  { id: "vid-2", src: tourVideo2, poster: galleryImg2, title: "Quad Bike & Buggy Speed Action", category: "Quad Biking", duration: "0:45" },
  { id: "vid-3", src: tourVideo3, poster: galleryImg3, title: "Sunset Camel Trail Experience", category: "Desert Safari", duration: "0:40" },
  { id: "vid-4", src: tourVideo4, poster: galleryImg6, title: "VIP Desert Safari Full Experience", category: "Desert Safari", duration: "0:50" },
  { id: "vid-5", src: tourVideo5, poster: galleryImg5, title: "Camp BBQ Dinner & Live Show Highlights", category: "Camp Entertainment", duration: "0:35" },
  { id: "vid-6", src: tourVideo6, poster: galleryImg4, title: "Dubai Skyline & Landmarks Tour", category: "City Tour", duration: "0:45" },
  { id: "vid-7", src: tourVideo7, poster: galleryImg7, title: "Abu Dhabi Grand Mosque & Louvre", category: "City Tour", duration: "0:35" },
  { id: "vid-8", src: tourVideo8, poster: galleryImg8, title: "Hatta Mountain Heritage & Kayaking", category: "City Tour", duration: "0:25" },
  { id: "vid-9", src: tourVideo9, poster: galleryImg9, title: "Spectacular Fire & Belly Dance Performance", category: "Camp Entertainment", duration: "0:40" },
  { id: "vid-10", src: tourVideo10, poster: galleryImg10, title: "Exclusive Private Falconry Showcase", category: "Desert Safari", duration: "0:55" },
];
