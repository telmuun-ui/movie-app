export const getSimilarMovies = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`,
      },
    }
  );

  return res.json();
};