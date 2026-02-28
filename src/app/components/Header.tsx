"use client";

import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";

export const Header = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [genreOne, setGenre] = useState(false);
  const { data: genreData } = useSWR(
    [
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY,
    ],
    ([url, token]) =>
      fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
  );
  const genres = genreData?.genres || [];
  const { data } = useSWR(
    query
      ? [
          `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
          process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY,
        ]
      : null,
    ([url, token]) =>
      fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
  );

  const results = data?.results || [];
  const featured = results[0];
  const others = results.slice(1, 6);

  return (
    <header className="w-full h-[59px] bg-white px-12 flex items-center justify-between relative">
      {/* Logo */}
      <Link href="/" className="h-[20px] w-[92px]">
        <img src="/Logo.png" className="h-full w-full object-contain" />
      </Link>

      {/* Center */}
      <div className="flex items-center gap-3 relative">
        <button
          onClick={() => setGenre(!genreOne)}
          className="flex items-center justify-center gap-2 h-[36px] w-[97px] rounded-md border text-sm"
        >
          <img src="/down.png" className="h-3 w-3" />
          Genres
        </button>

        {genreOne && genres.length > 0 && (
          <div className="absolute top-[40px] flex flex-col pb-4 bg-white border rounded-md shadow-lg z-50">
            <div className="px-4 py-2 gap-1 flex flex-col">
              <div className="text-2xl font-semibold">Genres</div>
              <div className="border-b-2 pb-4 text-base  border-[#E4E4E7]">
                See lists of movies by genre
              </div>
            </div>
            <ul className="flex pl-4 gap-3 pt-4 flex-wrap">
              {genres.map((genre: any) => (
                <Link
                  key={genre.id}
                href={`/genre?genreIds=${genre.id}`}
                  onClick={() => setGenre(false)} 
                >
                  <li className="px-3 py-1 flex items-center gap-1 text-xs border rounded-2xl hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                    {genre.name}{" "}
                    <img src="/sum.svg" alt="" className="h-3 w-3" />
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
        {/* Search */}
        <div className="relative">
          <img
            src="/search.svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
          />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search..."
            className="h-[36px] w-[388px] pl-10 rounded-md border focus:ring-2 focus:ring-indigo-500"
          />

          {open && query && results.length > 0 && (
            <div className="absolute top-[45px]  w-[577px]  bg-white shadow-xl rounded-xl z-50 pl-6 pt-6 flex gap-6">
              <div className="flex flex-col gap-10">
                {others.map((movie: any) => (
                  <div
                    key={movie.id}
                    className="flex items-center justify-between pr-5 w-[553px] hover:bg-gray-100  rounded cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        className="w-10 rounded h-[100px] w-[67px]"
                      />
                      <div>
                        <p className="font-medium">{movie.title}</p>
                        <p className="text-xs text-gray-500">
                          {movie.release_date?.slice(0, 4)}
                        </p>
                        <div className="text-xs font-bold text-black flex mt-1">
                          <img src="/star.png" alt="" className="h-4 w-4" />{" "}
                          {movie.vote_average.toFixed(1)}{" "}
                          <span className="text-gray-500 font-normal">/10</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm flex  h-25 justify-end items-end text-black">
                      See more →
                    </span>
                  </div>
                ))}

                <div className="pt-3 border-t text-sm text-indigo-600 cursor-pointer">
                  See all results for "{query}"
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right */}
      <button className="h-[36px] w-[36px] border rounded-md">
        <img src="/moon.png" className="h-4 w-4 mx-auto" />
      </button>
    </header>
  );
};
