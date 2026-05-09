"use client";

import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { TMDBMovie } from "@/types/tmdb";
import { getBackdropUrl } from "@/services/tmdb";
import Detail from "./Details";

interface HeroCarouselProps {
  movies: TMDBMovie[];
}

export default function HeroCarousel({ movies }: HeroCarouselProps) {
  return (
    <Carousel
      plugins={[Autoplay({ delay: 6500, stopOnInteraction: true })]}
      className="w-full"
      opts={{ loop: true }}
    >
      <CarouselContent>
        {movies.map((movie, index) => (
          <CarouselItem key={movie.id}>
            <Link href={`/movies/${movie.id}`}>
              <div className="relative w-full h-[65vh] overflow-hidden">
                <Image
                  src={getBackdropUrl(movie.backdrop_path)}
                  alt={movie.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center justify-center h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold">
                  {index + 1}
                </div>
                <Detail movie={movie} />
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
