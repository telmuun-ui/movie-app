"use client";
import * as React from "react";
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Movie } from "./Movies";
import { TrailerModal } from "./Trailer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  carousalData: Movie[];
};

export const CarouselPlugin = ({ carousalData }: Props) => {
  const autoplay = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  );

  const [open, setOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  return (
    <>
      <Carousel
        plugins={[autoplay.current]}
        className="relative w-full"
        onMouseEnter={() => autoplay.current.stop()}
        onMouseLeave={() => autoplay.current.reset()}
      >
        <CarouselContent className="-ml-0">
          {carousalData.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0 basis-full">
              <div className="flex flex-col md:block relative w-full overflow-hidden bg-white dark:bg-black">
                <div className="relative h-[250px] sm:h-[400px] md:h-[600px] w-full shrink-0">
                  <img
                    src={`https://image.tmdb.org/t/p/original${slide.backdrop_path}`}
                    alt={slide.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>

                <div className="relative md:absolute md:inset-0 flex flex-col items-start justify-center p-6 md:px-12 text-black md:text-white">
                  <div className="w-full flex justify-between items-start md:block">
                    <div>
                      <p className="text-[10px] md:text-sm font-medium mb-1 opacity-60 md:opacity-100">
                        Now Playing:
                      </p>
                      <h2 className="text-xl md:text-5xl font-bold mb-1 md:mb-4">
                        {slide.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-1 font-bold text-sm md:text-lg">
                      <img src="/star.png" alt="star" className="h-4 w-4" />
                      {slide.vote_average.toFixed(1)}
                      <span className="font-normal opacity-60 md:text-gray-300 text-xs">
                        /10
                      </span>
                    </div>
                  </div>

                  <p className="mt-2 md:mt-4 max-w-2xl text-xs md:text-base line-clamp-3 md:line-clamp-none opacity-80 md:opacity-90">
                    {slide.overview}
                  </p>

                  <button
                    onClick={() => {
                      setSelectedMovieId(slide.id);
                      setOpen(true);
                    }}
                    className="mt-4 md:mt-6 rounded-lg bg-black md:bg-white px-5 py-2 md:px-6 md:py-3 text-white md:text-black text-xs md:text-base font-bold hover:opacity-80 transition"
                  >
                    Watch Trailer
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-white/50 border-none hover:bg-white" />
        <CarouselNext className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-white/50 border-none hover:bg-white" />
      </Carousel>
      {open && selectedMovieId && (
        <TrailerModal
          movieId={selectedMovieId}
          isOpen={open}
          onClose={() => {
            setOpen(false);
            setSelectedMovieId(null);
          }}
        />
      )}
    </>
  );
};
