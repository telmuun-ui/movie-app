import { headers } from "next/headers";

export const getMovieCredits = async (movieId: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`,
      },
    },
  );
  if (!res.ok) return null;
  const credits = await res.json();
 
  const director = credits.crew.filter(
    (person: any) => person.job === "Director",
  );
  const writers = credits.crew.filter(
    (person: any) => person.department === "Writing",
  );
  const stars = credits.cast.slice(0, 3);
  return {
    director,
    writers,
    stars,
  };
};
