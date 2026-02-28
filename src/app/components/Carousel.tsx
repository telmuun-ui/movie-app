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
    Autoplay({ delay: 3000, stopOnInteraction: false })
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
        <CarouselContent>
          {carousalData.map((slide) => (
            <CarouselItem key={slide.id} className="basis-full">
              <div className="relative h-[600px] w-full overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/original${slide.backdrop_path}`}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" /> 
                
                <div className="absolute inset-0 flex flex-col items-start justify-center px-12 text-white">
                  <h2 className="mb-4 text-4xl font-bold">{slide.title}</h2>
                  <div className="flex items-center gap-2 font-bold">
                    <img src="/star.png" alt="star" className="h-4 w-4" />
                    {slide.vote_average.toFixed(1)}
                    <span className="font-normal text-gray-300">/10</span>
                  </div>
                  <p className="mt-4 max-w-2xl line-clamp-3">{slide.overview}</p>
                  
                  <button
                    onClick={() => {
                      setSelectedMovieId(slide.id);
                      setOpen(true);
                    }}
                    className="mt-6 rounded-lg bg-white px-6 py-3 text-black font-semibold hover:bg-gray-200 transition"
                  >
                    Watch Trailer
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-white/50 border-none hover:bg-white" />
        <CarouselNext className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-white/50 border-none hover:bg-white" />
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