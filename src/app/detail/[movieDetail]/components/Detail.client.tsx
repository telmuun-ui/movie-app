"use client";

import { useState } from "react";
import Link from "next/link";
import { TrailerModal } from "@/app/components/Trailer";
export const MovieDetailClient = ({ movie, credits, similar }: any) => {
  const [open, setOpen] = useState(false);

  const { title, vote_count } = movie;

  return (
    <>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-40 py-16">
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

        <div className="mt-10 flex flex-col-reverse lg:flex-row-reverse gap-10 items-start">
          {/* Banner */}
          {movie?.backdrop_path && (
            <div
              onClick={() => setOpen(true)}
              className="relative w-full lg:flex-1 h-[428px] w-[400px] cursor-pointer group"
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

          {/* Poster */}
          {movie?.poster_path && (
            <div className="flex-shrink-0 h-[428px]">
              <img
                src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                alt={movie.title}
                className="h-full w-auto rounded-xl object-cover"
              />
            </div>
          )}
        </div>
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
        <div className="text-base flex flex-col gap-3 mt-4">
          <p className="border-b border-gray-300 flex gap-13 pb-2">
            <span className="font-bold">Director </span>
            {credits?.director.map((item: any) => item?.name)}
          </p>
          <p className="border-b border-gray-300 flex gap-14 pb-2">
            <span className="font-bold">Writers</span>{" "}
            {credits?.writers.map((item: any) => item?.name).join(", ")}
          </p>
          <p className="border-b border-gray-300 flex gap-18 pb-2">
            <span className="font-bold">Stars</span>{" "}
            {credits?.stars.map((item: any) => item?.name).join(", ")}
          </p>
        </div>
        <p className="mt-4 text-base max-w-4xl">{movie?.overview}</p>
        <div className="mt-16">
          <div className="flex  justify-between">
            <h2 className="text-xl font-semibold mb-6">More Like This</h2>
            <Link href={`/similar/${movie?.id}`}>See more →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {similar?.slice(0, 10).map((item: any) => (
              <Link
                key={item?.id}
                href={`/detail/${item?.id}`}
                className="bg-[#F4F4F5] rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                {item.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                    alt={item?.title}
                    className="bg-[#F4F4F5] rounded-t-lg overflow-hidden shadow-md "
                  />
                )}

                <div className="mt-2 bg text-sm font-medium">{item?.title}</div>

                <div className="text-xs flex text-gray-500">
                  <img src="/star.png" alt="star" className="h-4 w-4 mr-1" />{" "}
                  {item.vote_average?.toFixed(1)}
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
