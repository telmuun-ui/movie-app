"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link"; 
import BadgeDemo from "../components/Genres";
import { DynamicPagination } from "../components/DynamicPagination";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error } = useSWR(
    query
      ? `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${page}`
      : null,
    fetcher,
  );

  if (isLoading) return <div className="py-20 text-center font-bold">Loading results...</div>;
  if (error) return <div className="py-20 text-center text-red-500">Something went wrong.</div>;

  const totalPages = Math.min(data?.total_pages ?? 1, 500);

  return (
    <div className="flex flex-col-reverse md:flex-row px-4 md:px-12 max-w-[1440px] mx-auto justify-center gap-6 md:gap-10">
      <div className="flex-1 min-w-0">
        <div className="py-12">
          <h1 className="text-2xl font-bold mb-8">
            {query ? `Search results for "${query}"` : "Search for movies"}
          </h1>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {data?.results?.map((item: any) => (
              <Link
                key={item?.id}
                href={`/detail/${item?.id}`} 
                className="bg-[#F4F4F5] pb-3 rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform duration-200 block"
              >
                <img
                  src={
                    item?.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item?.poster_path}`
                      : "/no-image.png"
                  }
                  alt={item?.title}
                  className="rounded-xl w-full aspect-[2/3] object-cover"
                />
                <div className="px-2">
                  <div className="text-sm mt-3 font-medium line-clamp-1">
                    {item?.title}
                  </div>
                  <div className="text-xs font-bold text-black flex items-center mt-1">
                    <img src="/star.png" alt="star" className="h-4 w-4 mr-1" />
                    {item?.vote_average?.toFixed(1)}
                    <span className="font-normal text-gray-500 ml-1">/10</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {data?.results?.length > 0 && (
            <div className="mt-12 flex justify-center">
              <DynamicPagination totalPages={totalPages} />
            </div>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 flex flex-col gap-6 mt-10 md:mt-26 w-full md:w-[280px]">
        <div className="flex flex-col">
          <div className="text-xl font-semibold">Search by genre</div>
          <p className="text-base opacity-70">See lists of movies by genre</p>
        </div>
        <BadgeDemo />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}