import { Movie } from "@/app/components/Movies";
import { MovieCard } from "@/app/components/MovieCard";
import Link from "next/link";
type Props = {
  movies: Movie[];
  title: string;
  category: string;
};

export const MovieCategory = ({ movies, title, category }: Props) => {
  return (
    <div>
      <div className="flex justify-between  items center">
        <h1 className="text-2xl font-bold mb-4 mt-4">{title} Movies</h1>
        <Link href={`/category/${category}`}>
          <button className="flex items-center gap-[11px] justify-center mt-5 ">
            See more
            <img src="./arrow.svg" alt="" className="h-4 w-4" />
          </button>
        </Link>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transform transition duration-300"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};
