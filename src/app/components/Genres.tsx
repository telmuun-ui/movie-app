"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Genre = {
  id: number;
  name: string;
};

export default function BadgeDemo() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
            },
          },
        );

        const data = await res.json();

        setGenres(data.genres || []);
      } catch (err) {
        console.error("Failed to fetch genres", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return <div className="text-gray-400">Loading genres...</div>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {genres.map((genre) => (
        <Link key={genre.id} href={`/genre?genreIds=${genre.id}`}>
          <span className="cursor-pointer px-4 py-2 rounded-full bg-gray-800 text-white text-sm hover:bg-blue-600 transition">
            {genre.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
