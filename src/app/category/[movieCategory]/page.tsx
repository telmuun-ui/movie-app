
import { Categories } from "@/lib/category";
import { DynamicPagination } from "@/app/components/DynamicPagination";
import Image from "next/image";

interface CategoryPageProps {
  params: Promise<{ movieCategory: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {

  const { movieCategory } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;


  const data = await Categories(movieCategory, currentPage);
  const movies = data.results || [];
  const totalPages = data.total_pages > 500 ? 500 : data.total_pages; 

  return (

    <main className="container mx-auto px-4 md:px-10 py-6 md:py-8">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 capitalize">
        {movieCategory.replace("_", " ")} movies
      </h1>

   
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
        {movies.map((movie: any) => (
          <div key={movie.id} className="group cursor-pointer">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-gray-200">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
        
            <h3 className="mt-2 text-sm md:text-base font-medium line-clamp-1">
              {movie.title}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              {movie.release_date?.split("-")[0]}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 md:mt-12 flex justify-center">
        <DynamicPagination 
          totalPages={10} 
          genreId={movieCategory} 
        />
      </div>
    </main>
  );
}
