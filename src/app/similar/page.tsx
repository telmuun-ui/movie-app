
import { getSimilarMovies } from "@/lib/similars";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ movieId: string }>; 
}) {
  const { movieId } = await params; 
  const similar = await getSimilarMovies(movieId);

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-8">Similar Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {similar?.results?.map((item: any) => (
          <Link key={item?.id} href={`/detail/${item?.id}`} className="group">
            <img
              src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item?.poster_path}` : "/no-image.png"}
              alt={item?.title}
              className="rounded-xl w-full aspect-[2/3] object-cover group-hover:scale-105 transition"
            />
            <div className="mt-2 text-sm font-medium line-clamp-1">{item?.title}</div>
            <div className="text-xs text-gray-500">
              ⭐ {item?.vote_average?.toFixed(1)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
