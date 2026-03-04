import Link from "next/link";

export function DynamicPagination({
  totalPage,
  currentPage,
  category,
}: {
  totalPage: number;
  currentPage: number;
  category: string;
}) {
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <div className="flex gap-2">
      {pages.map((page) => (
        <Link
          key={page}
          href={`/movies/${category}?page=${page}`}
          className={`px-4 py-2 rounded ${
            page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {page}
        </Link>
      ))}
    </div>
  );
}
