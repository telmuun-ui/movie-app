export const Categories = async (category: string, page: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`,
      },
      cache: "no-store",
    }
  );

  return res.json();
};

