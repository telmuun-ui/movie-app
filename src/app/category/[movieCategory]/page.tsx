import { MovieCard } from "@/app/components/MovieCard";
import { Categories, Movie } from "@/app/components/Movies";

export default async function Page({
  params,
  searchParams, 
}: {
  params: Promise<{ movieCategory: string }>;
  searchParams: Promise<{ name?: string }>;
}) {
  const { movieCategory } = await params;
  const { name } = await searchParams; 

  const movies: Movie[] = (await Categories(movieCategory)) || [];

  return (
    <div className="px-20 py-10">
 
      <h1 className="text-3xl font-bold mb-8 text-black capitalize">
        {name ? `${name} Movies` : "Category Movies"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
    
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transform transition duration-300"
            >
              <MovieCard movie={movie} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500">
            No Movies
          </div>
        )}
      </div>
    </div>
  );
}