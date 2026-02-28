import { MovieCard } from "@/app/components/MovieCard";
import { MovieCategory } from "./MovieCategories";
import { Popular } from "./Popular";
import { Top } from "./Top";
import { CarouselPlugin } from "./Carousel";
type MovieRating = "G" | "PG" | "PG-13" | "R" | "NC-17" | "Unrated";
export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
  original_title: string;
  button: string;
  rating: MovieRating;
};
export const Categories = async (category: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${category}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`,
      },
    },
  );
  const data = await response.json();
  return data.results;
};

const Car = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`,
      },
    },
  );
  const data = await response.json();

  return data.results;
};

export const Movies = async () => {
  const up: Movie[] = await Categories(`upcoming`);
  const popular: Movie[] = await Categories(`popular`);
  const topranked: Movie[] = await Categories(`top_rated`);
  const carousalData: Movie[] = await Car();
  return (
    <div>
      <CarouselPlugin carousalData={carousalData} />
      <div className="px-30">
        <MovieCategory movies={up} title="Upcoming" category="upcoming" />
        <MovieCategory movies={popular} title="Popular" category="popular" />
        <MovieCategory
          movies={topranked}
          title="Top Rated"
          category="top_rated"
        />
      </div>
    </div>
  );
};
