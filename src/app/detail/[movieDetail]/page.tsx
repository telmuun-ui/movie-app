import { notFound } from "next/navigation";
import { Movie } from "@/app/page";
import Image from "next/image";
import { MovieDetailClient } from "@/app/components/Detail.client";
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

  return (
  
  <div>  <MovieDetailClient movie={movie} />;</div>
  );
};

export default Page;
