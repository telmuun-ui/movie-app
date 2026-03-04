
import { getSimilarMovies } from "@/lib/similars";
import Link from "next/link";

export default async function Page({
  
  params,
}: {
  params: { similar: string };
}) {
 const { similar: movieId } = await params;
  const similar = await getSimilarMovies(movieId);
console.log("PARA:", similar);
  return (
    <div className="max-w-[1440px] mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-8">More like this</h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {similar?.results?.map((item: any) => (
          <Link key={item?.id} href={`/detail/${item?.id}`} className="bg-[#F4F4F5]  pb-3 rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105  transition-transform duration-200">
            <img
              src={item?.poster_path ? `https://image.tmdb.org/t/p/w500${item?.poster_path}` : "/no-image.png"}
              alt={item?.title}
              className="rounded-xl w-full aspect-[2/3] object-cover group-hover:scale-105 transition"
            />
            <div className="text-sm mt-3 font-medium line-clamp-1">{item?.title}</div>
            <div className="text-xs font-bold text-black flex items-center mt-1">
               <img src="/star.png" alt="star" className="h-4 w-4 mr-1" /> {item?.vote_average?.toFixed(1)} <span className="font-normal">/10</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
