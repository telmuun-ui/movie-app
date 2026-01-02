import { MovieCard } from "@/app/components/MovieCard";
import { Categories, Movie } from "@/app/components/Movies";

export default async function Page({
  params,
}: {
  params: Promise<{ movieCategory: string }>;
}) {
  const { movieCategory } = await params;
  const movies: Movie[] = await Categories(movieCategory);
  return (
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
  );
}
