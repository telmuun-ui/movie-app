
import { getSimilarMovies } from "@/lib/similars";
import Link from "next/link";
import { DynamicPagination } from "@/app/components/DynamicPagination";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ similar: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { similar: movieId } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;


  const data = await getSimilarMovies(movieId);
  const similarMovies = data.results || [];

  const totalPages = data.total_pages > 10 ? 10 : data.total_pages;

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-8">More like this</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {similarMovies.map((item: any) => (
          <Link 
            key={item?.id} 
            href={`/detail/${item?.id}`} 
            className="group bg-[#F4F4F5] pb-3 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-200"
          >
            <img
              src={item?.poster_path ? `https://image.tmdb.org/t/p/w500${item?.poster_path}` : "/no-image.png"}
              alt={item?.title}
              className="w-full aspect-[2/3] object-cover transition"
            />
            <div className="px-3">
              <div className="text-sm mt-3 font-medium line-clamp-1">{item?.title}</div>
              <div className="text-xs font-bold text-black flex items-center mt-1">
                 <img src="/star.png" alt="star" className="h-4 w-4 mr-1" /> 
                 {item?.vote_average?.toFixed(1)} <span className="font-normal text-gray-500">/10</span>
              </div>
            </div>
          </Link>
        ))}
      </div>


      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <DynamicPagination 
            totalPages={10} 
            genreId={movieId} 
          />
        </div>
      )}
    </div>
  );
}
