"use client";

import { useRouter } from "next/navigation";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const { push } = useRouter();

  const handleClick = () => push(`/detail/${movie.id}`);

  return (
    <div
      className="bg-[#F4F4F5] rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform duration-200"
      onClick={handleClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto"
      />
      <div className="p-3">
        <p className="text-sm font-medium line-clamp-1">{movie.title}</p>
        <div className="text-xs font-bold text-black flex items-center mt-1">
          <img src="/star.png" alt="star" className="h-4 w-4 mr-1" />
          {movie.vote_average.toFixed(1)}
          <span className="text-gray-500 font-normal ml-1">/ 10</span>
        </div>
      </div>
    </div>
  );
};
