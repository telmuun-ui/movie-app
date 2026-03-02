import { getMovieCredits } from "@/lib/credits";
import { getSimilarMovies } from "@/lib/similars";
import { MovieDetailClient } from "./components/Detail.client";
export const getMovieDetail = async (movieId: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`,
      },
    },
  );

  if (!res.ok) return null;

  return res.json();
};

const Page = async ({
  params,
}: {
  params: Promise<{ movieDetail: string }>;
}) => {
  const { movieDetail } = await params;
  const movie = await getMovieDetail(movieDetail);
  const similar = await getSimilarMovies(movieDetail);

  const credits = await getMovieCredits(movieDetail);
  if (!movie) {
    return <p>Movie not found</p>;
  }
  return (
    <div>
      <MovieDetailClient
        movie={movie}
        credits={credits}
        similar={similar?.results}
      />
    </div>
  );
};

export default Page;
