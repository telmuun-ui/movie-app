"use client";
import { MovieCard } from "./MovieCard";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Movie } from "./Movies";
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

  return (
    <Carousel
      plugins={[autoplay.current]}
      className=" relative"
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.reset()}
    >
      <CarouselContent>
        {carousalData.map((slide) => (
          <CarouselItem key={slide.id} className="basis-full">
            <div className="relative h-[600px] w-full overflow-hidden ">
              <div className="" />
              <img
                src={`https://image.tmdb.org/t/p/original${slide.backdrop_path}`}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-center px-12 text-white">
                <h2 className="mb-4 text-4xl font-bold">{slide.title}</h2>
                <div className="font-bold justify-center items-center flex">
                  <img src="./star.png" alt="" className="flex  h-4 w-4" />
                  {slide.vote_average.toFixed(1)}{" "}
                  <span className="font-normal">/10</span>
                </div>
                <p className="pr-80">{slide.overview}</p>
                <button className="rounded-lg bg-white px-6 py-3 text-black font-semibold hover:bg-gray-200 transition">
                  Watch Trailer{slide.button}
                </button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/70 text-black rounded-full p-3 hover:bg-white transition z-10" />
      <CarouselNext className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/70 text-black rounded-full p-3 hover:bg-white transition z-10" />
    </Carousel>
  );
};
