"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const usePagination = (totalPages: number) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") ?? 1);
  const maxVisibleButtons = 3;

  const updatePage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    push(`${pathname}?${params.toString()}`);
  };

  const handlePrevious = () => {
    if (currentPage > 1) updatePage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) updatePage(currentPage + 1);
  };

  const half = Math.floor(maxVisibleButtons / 2);

  let startPage = Math.max(1, currentPage - half);
  let endPage = startPage + maxVisibleButtons - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisibleButtons + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return {
    currentPage,
    pages,
    handlePrevious,
    handleNext,
    handlePageChange: (page: number) => () => updatePage(page),
  };
};