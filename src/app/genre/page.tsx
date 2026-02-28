import { MovieCard } from "@/app/components/MovieCard";
import BadgeDemo from "@/app/components/Genres";

export type Movie = {
  id: number;
  runtime: number;
  vote_count: number;
  backdrop_path: string;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  original_title: string;
  genres: { id: number; name: string }[];
};

const fetchMoviesByGenre = async (genreId: string, page?: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreId}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`,
      },
      cache: "no-store",
    },
  );

  return res.json();
};

const fetchGenres = async () => {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`,
        },
        cache: "no-store",
      },
    );

    const data = await res.json();
    return data.genres ?? [];
  } catch (error) {
    console.log("Genre fetch error:", error);
    return [];
  }
};

export default async function GenreResultPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; genreIds: string }>;
}) {
  const { page = 1, genreIds } = await searchParams;

  const [movieData, genres] = await Promise.all([
    fetchMoviesByGenre(genreIds, String(page)),
    fetchGenres(),
  ]);

  const movies = movieData?.results ?? [];
  const totalResults = movieData?.total_results ?? 0;

  const currentGenre = genres.find(
    (g: any) => String(g.id) === String(genreIds),
  );

  return (
    <div className="flex flex-col lg:flex-row gap-10">
 
      <div className="w-full lg:w-[70%] p-8">
   
        <h1 className="text-3xl font-bold text-black mb-2">
          {currentGenre ? `${currentGenre.name} Movies` : "Genre Movies"}
        </h1>

        <p className="text-gray-400 mb-6">
          Found {totalResults.toLocaleString()} movies
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.length > 0 ? (
            movies.map((movie: any) => (
              <MovieCard movie={movie} key={movie.id} />
            ))
          ) : (
            <p className="text-black">No movies found</p>
          )}
        </div>
      </div>

   
      <div className="w-full lg:w-[30%] p-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Search filter</h2>

        <BadgeDemo />
      </div>
    </div>
  );
}
