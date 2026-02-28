export const getMovieTrailer = async (id: number) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();

    const video = data.results?.find(
      (video: any) =>
        (video.type === "Trailer" ) &&
        video.site === "YouTube"
    );

    return video || null;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
