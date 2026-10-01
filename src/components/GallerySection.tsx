import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { Play, X, ChevronLeft, ChevronRight, Image as ImageIcon, Video, Sparkles, Maximize2, ArrowRight } from "lucide-react";
import {
  ALL_GALLERY_IMAGES,
  ALL_GALLERY_VIDEOS,
  HOME_GALLERY_IMAGES,
  HOME_GALLERY_VIDEOS,
  type GalleryImageItem,
  type GalleryVideoItem,
} from "../data/galleryData";
import { useLanguage } from "../lib/i18n";
import { TextReveal } from "./TextReveal";

interface GallerySectionProps {
  showTitle?: boolean;
  limit?: number;
  initialTab?: "all" | "photos" | "videos";
  isHomePage?: boolean;
}

// Dedicated Lightbox Video component with audio playback
function LightboxVideo({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
      videoRef.current.currentTime = 0;
      const promise = videoRef.current.play();
      if (promise !== undefined) {
        promise.catch((err) => {
          console.log("Autoplay with audio handled:", err);
        });
      }
    }
  }, [src]);

  return (
    <div className="relative w-full max-h-[80vh] flex items-center justify-center bg-black rounded-2xl overflow-hidden shadow-2xl">
      <video
        ref={videoRef}
        key={src}
        src={src}
        poster={poster}
        controls
        autoPlay
        playsInline
        preload="auto"
        className="max-h-[80vh] max-w-full w-auto h-auto rounded-xl shadow-2xl bg-black object-contain focus:outline-none"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support HTML5 video playback.
      </video>
    </div>
  );
}

export function GallerySection({ 
  showTitle = true, 
  limit, 
  initialTab = "all",
  isHomePage = false,
}: GallerySectionProps) {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "photos" | "videos">(initialTab);
  const [lightboxItem, setLightboxItem] = useState<{
    type: "image" | "video";
    src: string;
    index: number;
    poster?: string | undefined;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // On Home Page: specifically gallery_img_6.jpg, gallery_img_9.jpg, tour_ivideo_1.mp4, tour_ivideo_10.mp4
  const images = isHomePage ? HOME_GALLERY_IMAGES : ALL_GALLERY_IMAGES;
  const videos = isHomePage ? HOME_GALLERY_VIDEOS : ALL_GALLERY_VIDEOS;

  // Combined items for "all" tab
  type CombinedItem = 
    | { type: "image"; item: GalleryImageItem }
    | { type: "video"; item: GalleryVideoItem };

  const combinedItems: CombinedItem[] = [
    ...ALL_GALLERY_IMAGES.map((img) => ({ type: "image" as const, item: img })),
    ...ALL_GALLERY_VIDEOS.map((vid) => ({ type: "video" as const, item: vid })),
  ];

  const handleOpenLightbox = (e: React.MouseEvent, type: "image" | "video", src: string, index: number, poster?: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLightboxItem({ type, src, index, poster });
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!lightboxItem) return;
    if (lightboxItem.type === "image") {
      const currentList = images;
      const nextIdx = (lightboxItem.index + 1) % currentList.length;
      const nextImg = currentList[nextIdx];
      if (nextImg) {
        setLightboxItem({
          type: "image",
          src: nextImg.src,
          index: nextIdx,
        });
      }
    } else {
      const currentList = videos;
      const nextIdx = (lightboxItem.index + 1) % currentList.length;
      const nextVid = currentList[nextIdx];
      if (nextVid) {
        setLightboxItem({
          type: "video",
          src: nextVid.src,
          index: nextIdx,
          poster: nextVid.poster,
        });
      }
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!lightboxItem) return;
    if (lightboxItem.type === "image") {
      const currentList = images;
      const prevIdx = (lightboxItem.index - 1 + currentList.length) % currentList.length;
      const prevImg = currentList[prevIdx];
      if (prevImg) {
        setLightboxItem({
          type: "image",
          src: prevImg.src,
          index: prevIdx,
        });
      }
    } else {
      const currentList = videos;
      const prevIdx = (lightboxItem.index - 1 + currentList.length) % currentList.length;
      const prevVid = currentList[prevIdx];
      if (prevVid) {
        setLightboxItem({
          type: "video",
          src: prevVid.src,
          index: prevIdx,
          poster: prevVid.poster,
        });
      }
    }
  };

  // Keyboard navigation & lock scroll when modal is open
  useEffect(() => {
    if (!lightboxItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxItem(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxItem]);

  return (
    <div className="w-full">
      {showTitle && (
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D3B33]/5 border border-[#D4A353]/30 text-[#D4A353] text-[11px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("capturedMoments", "CAPTURED MOMENTS & MEMORIES")}</span>
          </div>

          <TextReveal as="h2" className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0D3B33] mb-3">
            {t("desertGalleryTitle", "Our Desert Safari")} <em className="gold-italic">{t("gallery", "Gallery")}</em>
          </TextReveal>

          <p className="font-sans text-sm text-[#5A5449] max-w-xl mx-auto leading-relaxed">
            {t(
              "gallerySubtitle",
              "Explore genuine photos captured across Dubai red dunes, camel treks, quad biking, and luxury Bedouin camp nights.",
            )}
          </p>
        </div>
      )}

      {/* Filter Tabs - Shown on full Gallery page */}
      {!isHomePage && (
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              activeTab === "all"
                ? "bg-[#0D3B33] text-[#E4B564] shadow-lg border border-[#E4B564]/50 scale-105"
                : "bg-white text-[#4A5550] border border-gray-200 hover:border-[#D4A353] hover:text-[#0D3B33]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("allMedia", "All Moments")} ({ALL_GALLERY_IMAGES.length + ALL_GALLERY_VIDEOS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("photos")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              activeTab === "photos"
                ? "bg-[#0D3B33] text-[#E4B564] shadow-lg border border-[#E4B564]/50 scale-105"
                : "bg-white text-[#4A5550] border border-gray-200 hover:border-[#D4A353] hover:text-[#0D3B33]"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{t("photoGallery", "Photos")} ({ALL_GALLERY_IMAGES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("videos")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              activeTab === "videos"
                ? "bg-[#0D3B33] text-[#E4B564] shadow-lg border border-[#E4B564]/50 scale-105"
                : "bg-white text-[#4A5550] border border-gray-200 hover:border-[#D4A353] hover:text-[#0D3B33]"
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>{t("videoHighlights", "Live Videos")} ({ALL_GALLERY_VIDEOS.length})</span>
          </button>
        </div>
      )}

      {/* When isHomePage: Show exactly 2 Images and 2 Videos in square style without border */}
      {isHomePage ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* 2 Preview Images (gallery_img_6.jpg, gallery_img_9.jpg) - Pure Square, No Border */}
            {images.map((img, idx) => (
              <div
                key={img.id}
                onClick={(e) => handleOpenLightbox(e, "image", img.src, idx)}
                className="relative group aspect-square rounded-none border-0 overflow-hidden bg-[#EFECE6] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img
                  src={img.src}
                  alt="Desert Safari Dubai"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                  <span className="w-11 h-11 rounded-none bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>
              </div>
            ))}

            {/* 2 Preview Videos (tour_ivideo_1.mp4, tour_ivideo_10.mp4) - Pure Square, No Border, Running continuously */}
            {videos.map((vid, idx) => (
              <div
                key={vid.id}
                onClick={(e) => handleOpenLightbox(e, "video", vid.src, idx, vid.poster)}
                className="relative group aspect-square rounded-none border-0 overflow-hidden bg-[#0F221E] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <video
                  src={vid.src}
                  poster={vid.poster}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                >
                  <source src={vid.src} type="video/mp4" />
                </video>

                {/* Video Play Button Badge */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-[#E4B564] text-[#0D3B33] flex items-center justify-center shadow-2xl group-hover:scale-115 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-none bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white/90 pointer-events-none">
                  {vid.duration}
                </div>
              </div>
            ))}
          </div>

          {/* View More Button Below that redirects to Gallery */}
          <div className="flex justify-center mt-10">
            <Link
              to="/gallery"
              className="bg-[#C68A36] hover:bg-[#B3792A] text-white font-sans font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-none flex items-center gap-2.5 transition-all shadow-md hover:shadow-xl active:scale-95 cursor-pointer"
            >
              <span>{t("viewMoreMoments", "View More Moments & Videos")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* Full Gallery page display in square style without border */
        <>
          {activeTab === "photos" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  onClick={(e) => handleOpenLightbox(e, "image", img.src, idx)}
                  className="relative group aspect-square rounded-none border-0 overflow-hidden bg-[#EFECE6] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <img
                    src={img.src}
                    alt="Desert Safari Dubai"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Clean Subtle Overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-none bg-black/50 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                      <Maximize2 className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "videos" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {videos.map((vid, idx) => (
                <div
                  key={vid.id}
                  onClick={(e) => handleOpenLightbox(e, "video", vid.src, idx, vid.poster)}
                  className="relative group aspect-square rounded-none border-0 overflow-hidden bg-[#0F221E] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Video Player running continuously muted */}
                  <video
                    src={vid.src}
                    poster={vid.poster}
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  >
                    <source src={vid.src} type="video/mp4" />
                  </video>

                  {/* Video Play Button Badge */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-[#E4B564] text-[#0D3B33] flex items-center justify-center shadow-2xl group-hover:scale-115 transition-transform duration-300">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-none bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white/90 pointer-events-none">
                    {vid.duration}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "all" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {combinedItems.map((entry) => {
                if (entry.type === "image") {
                  const img = entry.item;
                  const imgIndex = images.findIndex((i) => i.id === img.id);
                  return (
                    <div
                      key={img.id}
                      onClick={(e) => handleOpenLightbox(e, "image", img.src, imgIndex >= 0 ? imgIndex : 0)}
                      className="relative group aspect-square rounded-none border-0 overflow-hidden bg-[#EFECE6] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      <img
                        src={img.src}
                        alt="Desert Safari Dubai"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <span className="w-11 h-11 rounded-none bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                          <Maximize2 className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  );
                } else {
                  const vid = entry.item;
                  const vidIndex = videos.findIndex((v) => v.id === vid.id);
                  return (
                    <div
                      key={vid.id}
                      onClick={(e) => handleOpenLightbox(e, "video", vid.src, vidIndex >= 0 ? vidIndex : 0, vid.poster)}
                      className="relative group aspect-square rounded-none border-0 overflow-hidden bg-[#0F221E] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      <video
                        src={vid.src}
                        poster={vid.poster}
                        muted
                        autoPlay
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      >
                        <source src={vid.src} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center pointer-events-none">
                        <div className="w-14 h-14 rounded-full bg-[#E4B564] text-[#0D3B33] flex items-center justify-center shadow-2xl group-hover:scale-115 transition-transform duration-300">
                          <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-none bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white/90 pointer-events-none">
                        {vid.duration}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </>
      )}

      {/* Interactive Lightbox / Modal Rendered via React Portal at Root Document Body */}
      {mounted && lightboxItem && createPortal(
        <div
          className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
          onClick={() => setLightboxItem(null)}
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute -top-12 right-0 sm:-right-4 text-white hover:text-[#E4B564] p-2.5 rounded-none bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-50 shadow-lg border-0"
              aria-label="Close Preview"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 text-white hover:text-[#E4B564] p-3 rounded-none bg-black/70 sm:bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-50 shadow-xl border-0"
              aria-label="Previous Media"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 text-white hover:text-[#E4B564] p-3 rounded-none bg-black/70 sm:bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-50 shadow-xl border-0"
              aria-label="Next Media"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Pure Media Content Container (Without Border Style) */}
            <div className="w-full max-h-[82vh] flex items-center justify-center rounded-none overflow-hidden bg-black/90 border-0 shadow-2xl">
              {lightboxItem.type === "image" ? (
                <img
                  key={lightboxItem.src}
                  src={lightboxItem.src}
                  alt="Dubai Desert Safari Gallery"
                  className="max-h-[82vh] max-w-full w-auto h-auto object-contain rounded-none"
                />
              ) : (
                <LightboxVideo
                  src={lightboxItem.src}
                  poster={lightboxItem.poster}
                />
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}


