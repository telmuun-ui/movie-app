import { Movie } from "./Movies";
import Image from "next/image";
export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="bg-[#F4F4F5] hover:scale-105 transition">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto "
      />
      <div className="p-3">
        <p className="text-sm font-medium line-clamp-1">{movie.title}</p>

        <div className="text-xs font-bold text-black flex mt-1">
          <img src="./star.png" alt="" className="h-4 w-4" />{" "}
          {movie.vote_average.toFixed(1)}{" "}
          <span className="text-gray-500 font-normal">/10</span>
        </div>
      </div>
    </div>
  );
};
