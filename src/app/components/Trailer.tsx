"use client";
import { useEffect, useState } from "react";
import { getMovieTrailer } from "@/lib/fetcher";

export const TrailerModal = ({ movieId, isOpen, onClose }: any) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && movieId) {
      getMovieTrailer(movieId).then((video) =>
        setTrailerKey(video?.key || null)
      );
    } else {
      setTrailerKey(null);
    }
  }, [movieId, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white z-10 text-2xl"
        >
          ✕
        </button>

        {trailerKey ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <div className="text-white flex h-full items-center justify-center">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};
