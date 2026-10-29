'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

interface VideoCardProps {
  src: string;
  poster: string;
  title: string;
  description: string;
  duration: string;
}

export default function VideoCard({
  src,
  poster,
  title,
  description,
  duration,
}: VideoCardProps) {
  const [expanded, setExpanded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlay() {
    setExpanded(true);
    // Small delay to let the animation start, then play
    setTimeout(() => videoRef.current?.play(), 300);
  }

  function handleClose() {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setExpanded(false);
  }

  return (
    <div className="mb-16">
      <AnimatePresence mode="wait">
        {!expanded ? (
          <motion.button
            key="card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={handlePlay}
            className="group flex w-full cursor-pointer items-center gap-6 rounded-[14px] border border-line bg-surface p-4 text-left transition-all duration-[0.25s] hover:border-line-strong sm:gap-8 sm:p-5"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video w-[180px] shrink-0 overflow-hidden rounded-[10px] sm:w-[220px]">
              <img
                src={poster}
                alt={title}
                className="h-full w-full object-cover"
              />
              {/* Play overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all duration-200 group-hover:bg-black/40">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md transition-transform duration-200 group-hover:scale-110">
                  <Play className="ml-0.5 h-4 w-4 fill-current text-gray-900" />
                </div>
              </div>
              {/* Duration badge */}
              <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 font-mono text-[11px] text-white">
                {duration}
              </span>
            </div>

            {/* Text */}
            <div className="min-w-0">
              <h3 className="mb-1 text-[15px] font-semibold tracking-[-0.2px]">
                {title}
              </h3>
              <p className="text-[13px] leading-[1.5] text-text-2">
                {description}
              </p>
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="player"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-[14px] border border-line bg-black"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/80 hover:text-white"
              aria-label="Close video"
            >
              <X className="h-4 w-4" />
            </button>

            <video
              ref={videoRef}
              src={src}
              poster={poster}
              controls
              playsInline
              preload="none"
              className="aspect-video w-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
