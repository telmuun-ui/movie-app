"use client";

import { useState } from "react";
import Link from "next/link";
import { TrailerModal } from "@/app/components/Trailer";

export const MovieDetailClient = ({ movie, credits, similar }: any) => {
  const [open, setOpen] = useState(false);

  const { title, id } = movie; // movie.id-г авлаа

  return (
    <>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-40 py-16">
        {/* Title and Rating Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div className="text-3xl font-bold mb-4">{title}</div>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8">
              <img src="/star.png" alt="star" />
            </div>

            <div>
              <div className="text-xs">Rating:</div>
              <div className="font-semibold">
                {movie?.vote_average?.toFixed(1)} /
                <span className="text-gray-500 ml-1">10</span>
              </div>
              <div className="text-xs">({movie?.vote_count} votes)</div>
            </div>
          </div>
        </div>

        <div className="text-sm mt-2">{movie?.release_date} · PG</div>

        {/* Banner and Poster Section */}
        <div className="mt-10 flex flex-col-reverse lg:flex-row-reverse gap-10 items-start">
          {movie?.backdrop_path && (
            <div
              onClick={() => setOpen(true)}
              className="relative w-full lg:flex-1 h-[428px] cursor-pointer group"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                alt={movie?.title}
                className="w-full h-full rounded-2xl object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-2xl">
                <div className="bg-white/80 rounded-full p-4 text-2xl">▶</div>
              </div>
            </div>
          )}

          {movie?.poster_path && (
            <div className="flex-shrink-0 h-[428px]">
              <img
                src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                alt={movie?.title}
                className="h-full w-auto rounded-xl object-cover"
              />
            </div>
          )}
        </div>

        {/* ШИНЭЭР НЭМЭГДСЭН: WATCH NOW BUTTON */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link 
            href={`/watch/${id}`}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-bold transition-transform active:scale-95 shadow-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Now
          </Link>
          
          <button 
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-black px-8 py-3 rounded-lg font-bold transition"
          >
             Trailer
          </button>
        </div>

        {/* Genres */}
        <div className="flex gap-2 mt-6">
          {movie?.genres?.map((genre: any) => (
            <span
              key={genre?.id}
              className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
            >
              {genre?.name}
            </span>
          ))}
        </div>

        {/* Credits */}
        <div className="text-base flex flex-col gap-3 mt-8">
          <p className="border-b border-gray-300 flex gap-13 pb-2">
            <span className="font-bold w-20">Director</span>
            <span className="flex-1">{credits?.director.map((item: any) => item?.name).join(", ")}</span>
          </p>
          <p className="border-b border-gray-300 flex gap-13 pb-2">
            <span className="font-bold w-20">Writers</span>
            <span className="flex-1">{credits?.writers.map((item: any) => item?.name).join(", ")}</span>
          </p>
          <p className="border-b border-gray-300 flex gap-13 pb-2">
            <span className="font-bold w-20">Stars</span>
            <span className="flex-1">{credits?.stars.map((item: any) => item?.name).join(", ")}</span>
          </p>
        </div>

        <p className="mt-6 text-base max-w-4xl leading-relaxed">{movie?.overview}</p>

        {/* Similar Movies Section (Хэвээрээ) */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">More Like This</h2>
            <Link href={`/similar/${movie?.id}`} className="text-indigo-600 hover:underline">See more →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {similar?.slice(0, 10).map((item: any) => (
              <Link
                key={item?.id}
                href={`/detail/${item?.id}`}
                className="bg-[#F4F4F5] pb-3 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 shadow-sm"
              >
                {item.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                    alt={item?.title}
                    className="w-full aspect-[2/3] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[2/3] bg-gray-200 flex items-center justify-center text-xs">No Image</div>
                )}

                <div className="p-2">
                  <div className="text-xs font-medium line-clamp-1">{item?.title}</div>
                  <div className="text-[10px] flex items-center mt-1 font-bold">
                    <img src="/star.png" alt="star" className="h-3 w-3 mr-1" /> 
                    {item?.vote_average?.toFixed(1)} 
                    <span className="font-normal text-gray-400 ml-1">/10</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <TrailerModal
        movieId={movie?.id}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};