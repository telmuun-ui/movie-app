"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import BadgeDemo from "../components/Genres";
const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error } = useSWR(
    query
      ? `https://api.themoviedb.org/3/search/movie?query=${
          query
        }&language=en-US&page=${page}`
      : null,
    fetcher,
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="flex px-12 max-w-[1440px] mx-auto justify-center gap-10">
      <div>
        <div className="max-w-[1440px]  py-16">
          <h1 className="text-2xl font-bold mb-8">Search results</h1>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {data?.results?.map((item: any) => (
              <div
                key={item?.id}
                className="bg-[#F4F4F5]  pb-3 rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105  transition-transform duration-200"
              >
                <img
                  src={
                    item?.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item?.poster_path}`
                      : "/no-image.png"
                  }
                  alt={item?.title}
                  className="rounded-xl w-full aspect-[2/3] object-cover group-hover:scale-105 transition"
                />
                <div className="text-sm mt-3 font-medium line-clamp-1">
                  {item?.title}
                </div>
                <div className="text-xs font-bold text-black flex items-center mt-1">
                  <img src="/star.png" alt="star" className="h-4 w-4 mr-1" />{" "}
                  {item?.vote_average?.toFixed(1)}{" "}
                  <span className="font-normal">/10</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-shrink-2 mt-33">
        <BadgeDemo></BadgeDemo>
      </div>
    </div>
  );
}
