"use client";

import { useState } from "react";
import { TrailerModal } from "./Trailer";

export const MovieDetailClient = ({ movie }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-40 py-16">

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div className="text-3xl font-bold mb-4">
            {movie.title}
          </div>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8">
              <img src="/star.png" alt="star" />
            </div>

            <div>
              <div className="text-xs">Rating:</div>
              <div className="font-semibold">
                {movie.vote_average?.toFixed(1)} /
                <span className="text-gray-500 ml-1">10</span>
              </div>
              <div className="text-xs">
                ({movie.vote_count} votes)
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm mt-2">
          {movie.release_date} · PG
        </div>

   
  <div className="mt-10 flex flex-col-reverse lg:flex-row-reverse gap-10 items-start">

  {/* Banner */}
  {movie.backdrop_path && (
    <div
      onClick={() => setOpen(true)}
      className="relative w-full lg:flex-1 h-[428px] w-[400px] cursor-pointer group"
    >
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-full rounded-2xl object-cover"
      />

      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-2xl">
        <div className="bg-white/80 rounded-full p-4 text-2xl">
          ▶
        </div>
      </div>
    </div>
  )}

  {/* Poster */}
  {movie.poster_path && (
    <div className="flex-shrink-0 h-[428px]">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.title}
        className="h-full w-auto rounded-xl object-cover"
      />
    </div>
  )}
</div>

        <p className="mt-8 text-gray-700 max-w-4xl">
          {movie.overview}
        </p>
      </div>

      <TrailerModal
        movieId={movie.id}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};