import { Movie } from "./Movies";
import Image from "next/image";
export const NowPlaying = ({ movie }: { movie: Movie }) => {
  return (
    <div className="bg-[#F4F4F5] hover:scale-105 transition">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-auto "
      />
    </div>
  );
};
