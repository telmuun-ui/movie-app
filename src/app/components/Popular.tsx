import { Movie } from "@/app/components/Movies";
import { MovieCard } from "@/app/components/MovieCard";

type Props = {
  pop: Movie[];
};

export const Popular = ({ pop }: Props) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 mt-4">Popular</h1>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {pop.map((movie) => (
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
