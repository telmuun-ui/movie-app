"use client";

import Link from "next/link";
import useSWR from "swr";
import { useState, useRef, useEffect } from "react"; 

export const Header = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [genreOne, setGenre] = useState(false);


  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setGenre(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // GENRE FETCH
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

  // SEARCH FETCH
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
  const others = results.slice(0, 5);

  return (
    <header className="w-full h-[59px] bg-white px-4 md:px-12 flex items-center justify-between relative border-b z-[100]">
 <Link href="/" className="h-[20px] flex items-center gap-1 font-bold italic shrink-0 group">
  <img src="/t.png" className="h-full w-auto object-contain transition-transform group-hover:scale-110" />
  
  <p className="whitespace-nowrap hidden sm:block leading-none bg-[linear-gradient(to_right,#1d4ed8,#7c3aed,#4338CA,#1d4ed8)] bg-[length:200%_auto] bg-clip-text text-transparent animate-[text-slide_5s_ease-in-out_infinite]">
    TekuMovie
  </p>
</Link>

      
      <div className="flex items-center gap-2 md:gap-3 relative flex-1 max-w-[600px] justify-end sm:justify-start ml-4" ref={containerRef}>
        
        <button
          onClick={() => { setGenre(!genreOne); setOpen(false); }}
          className="flex items-center justify-center gap-2 h-[36px] min-w-[80px] px-3 rounded-md border text-sm shrink-0"
        >
          <span className="">Genres</span>
        </button>

        {genreOne && genres.length > 0 && (
          <div className="absolute top-[40px] left-0 flex flex-col pb-4 bg-white border rounded-md shadow-lg z-50 w-[280px] sm:w-auto">
            <div className="px-4 py-2 gap-1 flex flex-col">
              <div className="text-2xl font-semibold">Genres</div>
              <div className="border-b-2 pb-4 text-base border-[#E4E4E7]">
                See lists of movies by genre
              </div>
            </div>

            <ul className="flex pl-4 gap-3 pt-4 flex-wrap max-h-[400px] overflow-y-auto">
              {genres.map((genre: any) => (
                <Link
                  key={genre.id}
                  href={`/genre?genreIds=${genre.id}`}
                  onClick={() => setGenre(false)}
                >
                  <li className="px-3 py-1 flex items-center gap-1 text-xs border rounded-2xl hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                    {genre.name}
                    <img src="/sum.svg" alt="" className="h-3 w-3" />
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}

        <div className="relative flex-1 max-w-[388px]">
          <img
            src="/search.svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50"
          />

          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setGenre(false);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search..."
            className="h-[36px] w-full pl-10 pr-3 rounded-md border focus:ring-2 focus:ring-indigo-500 text-sm"
          />

          {open && query && results.length > 0 && (
            <div className="absolute top-[45px] right-0 sm:left-0 w-[90vw] sm:w-[577px] bg-white shadow-xl rounded-xl z-50 p-4 sm:p-6 border">
              <div className="flex flex-col gap-4">
                {others.map((movie: any) => (
                  <Link
                    key={movie.id}
                    href={`/detail/${movie.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : "/no-image.png"}
                        className="rounded object-cover h-[80px] w-[54px] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate group-hover:text-indigo-600">{movie.title}</p>
                        <p className="text-xs text-gray-500">
                          {movie.release_date?.slice(0, 4)}
                        </p>
                        <div className="text-xs font-bold text-black flex items-center mt-1">
                          <img src="/star.png" alt="star" className="h-3 w-3 mr-1" />
                          {movie.vote_average.toFixed(1)}
                          <span className="text-gray-500 font-normal ml-1"> /10</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-gray-800 shrink-0 group-hover:underline">
                      See more
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </Link>
                ))}
                <Link
                  href={`/search?query=${query}`}
                  onClick={() => setOpen(false)}
                  className="pt-3 border-t text-sm font-semibold text-indigo-600 hover:underline text-center sm:text-left"
                >
                  See all results for "{query}"
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <button className="h-[36px] w-[36px] border rounded-md shrink-0 ml-2">
        <img src="/moon.png" className="h-4 w-4 mx-auto" />
      </button>
    </header>
  );
};