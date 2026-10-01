import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Play, X, ChevronLeft, ChevronRight, Image as ImageIcon, Video, Sparkles, Eye, Maximize2, ArrowRight } from "lucide-react";
import { ALL_GALLERY_IMAGES, ALL_GALLERY_VIDEOS, type GalleryImageItem, type GalleryVideoItem } from "../data/galleryData";
import { useLanguage } from "../lib/i18n";
import { TextReveal } from "./TextReveal";

interface GallerySectionProps {
  showTitle?: boolean;
  limit?: number;
  initialTab?: "all" | "photos" | "videos";
  isHomePage?: boolean;
}

export function GallerySection({ 
  showTitle = true, 
  limit, 
  initialTab = "all",
  isHomePage = false,
}: GallerySectionProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"all" | "photos" | "videos">(initialTab);
  const [lightboxItem, setLightboxItem] = useState<{
    type: "image" | "video";
    src: string;
    title: string;
    category: string;
    index: number;
    poster?: string | undefined;
  } | null>(null);

  // On Home Page: 2 images and 2 videos
  const homeImages = ALL_GALLERY_IMAGES.slice(0, 2);
  const homeVideos = ALL_GALLERY_VIDEOS.slice(0, 2);
  
  const images = isHomePage ? homeImages : ALL_GALLERY_IMAGES;
  const videos = isHomePage ? homeVideos : ALL_GALLERY_VIDEOS;

  // Combined items for "all" tab
  type CombinedItem = 
    | { type: "image"; item: GalleryImageItem }
    | { type: "video"; item: GalleryVideoItem };

  const combinedItems: CombinedItem[] = [
    ...ALL_GALLERY_IMAGES.map(img => ({ type: "image" as const, item: img })),
    ...ALL_GALLERY_VIDEOS.map(vid => ({ type: "video" as const, item: vid })),
  ];

  const handleOpenLightbox = (type: "image" | "video", src: string, title: string, category: string, index: number, poster?: string) => {
    setLightboxItem({ type, src, title, category, index, poster });
  };

  const handleNext = () => {
    if (!lightboxItem) return;
    if (lightboxItem.type === "image") {
      const currentList = images;
      const nextIdx = (lightboxItem.index + 1) % currentList.length;
      const nextImg = currentList[nextIdx];
      if (nextImg) {
        setLightboxItem({
          type: "image",
          src: nextImg.src,
          title: nextImg.title,
          category: nextImg.category,
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
          title: nextVid.title,
          category: nextVid.category,
          index: nextIdx,
          poster: nextVid.poster,
        });
      }
    }
  };

  const handlePrev = () => {
    if (!lightboxItem) return;
    if (lightboxItem.type === "image") {
      const currentList = images;
      const prevIdx = (lightboxItem.index - 1 + currentList.length) % currentList.length;
      const prevImg = currentList[prevIdx];
      if (prevImg) {
        setLightboxItem({
          type: "image",
          src: prevImg.src,
          title: prevImg.title,
          category: prevImg.category,
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
          title: prevVid.title,
          category: prevVid.category,
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

      {/* When isHomePage: Show exactly 2 Images and 2 Videos, with View More button below */}
      {isHomePage ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 2 Preview Images */}
            {homeImages.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => handleOpenLightbox("image", img.src, img.title, img.category, idx)}
                className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-[#EFECE6] cursor-pointer h-[320px] sm:h-[360px]"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                  <div className="self-end">
                    <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E4B564] mb-1 block">
                      {img.category}
                    </span>
                    <h4 className="font-serif text-base sm:text-lg font-bold leading-tight">{img.title}</h4>
                  </div>
                </div>
              </div>
            ))}

            {/* 2 Preview Videos */}
            {homeVideos.map((vid, idx) => (
              <div
                key={vid.id}
                onClick={() => handleOpenLightbox("video", vid.src, vid.title, vid.category, idx, vid.poster)}
                className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-[#0D3B33] cursor-pointer h-[320px] sm:h-[360px]"
              >
                <video
                  src={vid.src}
                  poster={vid.poster}
                  muted
                  playsInline
                  preload="metadata"
                  loop
                  onMouseEnter={(e) => {
                    const v = e.currentTarget;
                    v.play().catch(() => {});
                  }}
                  onMouseLeave={(e) => {
                    const v = e.currentTarget;
                    v.pause();
                    v.currentTime = 0;
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                >
                  <source src={vid.src} type="video/mp4" />
                </video>

                {/* Video Play Button Badge */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-[#E4B564] text-[#0D3B33] flex items-center justify-center shadow-2xl group-hover:scale-115 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-xs text-[10px] font-mono text-white/90 pointer-events-none">
                  {vid.duration}
                </div>

                {/* Video Info Bottom */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white pointer-events-none">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#E4B564] block mb-0.5">
                    {vid.category} (Video)
                  </span>
                  <h4 className="font-serif text-base font-semibold truncate">{vid.title}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button Below that redirects to Gallery */}
          <div className="flex justify-center mt-10">
            <Link
              to="/gallery"
              className="bg-[#C68A36] hover:bg-[#B3792A] text-white font-sans font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl flex items-center gap-2.5 transition-all shadow-md hover:shadow-xl active:scale-95 cursor-pointer"
            >
              <span>{t("viewMoreMoments", "View More Moments & Videos")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* Full Gallery page display with masonry/grid without border style */
        <>
          {activeTab === "photos" && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  onClick={() => handleOpenLightbox("image", img.src, img.title, img.category, idx)}
                  className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-[#EFECE6] cursor-pointer"
                >
                  <div className="overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{
                        aspectRatio: `${img.width} / ${img.height}`,
                      }}
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                    <div className="self-end">
                      <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#E4B564] mb-1 block">
                        {img.category}
                      </span>
                      <h4 className="font-serif text-lg font-bold leading-tight">{img.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "videos" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((vid, idx) => (
                <div
                  key={vid.id}
                  onClick={() => handleOpenLightbox("video", vid.src, vid.title, vid.category, idx, vid.poster)}
                  className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-[#0D3B33] cursor-pointer"
                >
                  {/* Video Player / Thumbnail Preview */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
                    <video
                      src={vid.src}
                      poster={vid.poster}
                      muted
                      playsInline
                      preload="metadata"
                      loop
                      onMouseEnter={(e) => {
                        const v = e.currentTarget;
                        v.play().catch(() => {});
                      }}
                      onMouseLeave={(e) => {
                        const v = e.currentTarget;
                        v.pause();
                        v.currentTime = 0;
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    >
                      <source src={vid.src} type="video/mp4" />
                    </video>

                    {/* Video Play Button Badge */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-[#E4B564] text-[#0D3B33] flex items-center justify-center shadow-2xl group-hover:scale-115 transition-transform duration-300">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[10px] font-mono text-white/90 pointer-events-none">
                      {vid.duration}
                    </div>
                  </div>

                  {/* Video Info Bottom */}
                  <div className="p-4 bg-gradient-to-t from-[#0D3B33] to-[#0A2E28] text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E4B564] block mb-0.5">
                      {vid.category}
                    </span>
                    <h4 className="font-serif text-base font-semibold truncate">{vid.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "all" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {combinedItems.map((entry) => {
                if (entry.type === "image") {
                  const img = entry.item;
                  const imgIndex = images.findIndex((i) => i.id === img.id);
                  return (
                    <div
                      key={img.id}
                      onClick={() => handleOpenLightbox("image", img.src, img.title, img.category, imgIndex)}
                      className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-[#EFECE6] cursor-pointer h-[280px] sm:h-[320px]"
                    >
                      <img
                        src={img.src}
                        alt={img.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                        <div className="self-end">
                          <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40">
                            <Eye className="w-4 h-4" />
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#E4B564] mb-1 block">
                            {img.category}
                          </span>
                          <h4 className="font-serif text-base sm:text-lg font-bold leading-tight">{img.title}</h4>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  const vid = entry.item;
                  const vidIndex = videos.findIndex((v) => v.id === vid.id);
                  return (
                    <div
                      key={vid.id}
                      onClick={() => handleOpenLightbox("video", vid.src, vid.title, vid.category, vidIndex, vid.poster)}
                      className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-[#0D3B33] cursor-pointer h-[280px] sm:h-[320px]"
                    >
                      <video
                        src={vid.src}
                        poster={vid.poster}
                        muted
                        playsInline
                        preload="metadata"
                        loop
                        onMouseEnter={(e) => {
                          const v = e.currentTarget;
                          v.play().catch(() => {});
                        }}
                        onMouseLeave={(e) => {
                          const v = e.currentTarget;
                          v.pause();
                          v.currentTime = 0;
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      >
                        <source src={vid.src} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                        <div className="w-14 h-14 rounded-full bg-[#E4B564] text-[#0D3B33] flex items-center justify-center shadow-2xl group-hover:scale-115 transition-transform duration-300">
                          <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white pointer-events-none">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#E4B564] block mb-0.5">
                          {vid.category} (Video)
                        </span>
                        <h4 className="font-serif text-base font-semibold truncate">{vid.title}</h4>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </>
      )}

      {/* Interactive Lightbox / Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute -top-12 right-0 sm:-right-4 text-white hover:text-[#E4B564] p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-50 shadow-lg"
              aria-label="Close Preview"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 text-white hover:text-[#E4B564] p-3 rounded-full bg-black/70 sm:bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-50 shadow-xl border border-white/10"
              aria-label="Previous Media"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 text-white hover:text-[#E4B564] p-3 rounded-full bg-black/70 sm:bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-50 shadow-xl border border-white/10"
              aria-label="Next Media"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Content Container */}
            <div className="w-full max-h-[75vh] flex items-center justify-center rounded-xl overflow-hidden bg-black/80 border border-white/20 shadow-2xl">
              {lightboxItem.type === "image" ? (
                <img
                  key={lightboxItem.src}
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  className="max-h-[75vh] max-w-full w-auto h-auto object-contain rounded-lg"
                />
              ) : (
                <video
                  key={lightboxItem.src}
                  src={lightboxItem.src}
                  poster={lightboxItem.poster}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  className="max-h-[75vh] max-w-full w-auto h-auto rounded-lg shadow-2xl bg-black object-contain"
                >
                  <source src={lightboxItem.src} type="video/mp4" />
                  Your browser does not support HTML5 video playback.
                </video>
              )}
            </div>

            {/* Title & Metadata Footer */}
            <div className="w-full mt-4 flex items-center justify-between text-white px-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E4B564] block">
                  {lightboxItem.category}
                </span>
                <h3 className="font-serif text-xl font-bold">{lightboxItem.title}</h3>
              </div>
              <div className="text-xs font-mono text-white/60">
                {lightboxItem.type === "image"
                  ? `${lightboxItem.index + 1} / ${images.length} Photos`
                  : `${lightboxItem.index + 1} / ${videos.length} Videos`}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

