"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { getBackdropUrl } from "@/services/tmdb";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useTrending } from "@/hooks/api/movies/useTrending";

export default function HeroCarousel() {
  const { data: movies, isLoading } = useTrending();

  if (isLoading) {
    return <div className="w-full h-[65vh] animate-pulse bg-muted" />;
  }

  if (!movies?.length) return null;

  return (
    <Carousel
      plugins={[Autoplay({ delay: 6500, stopOnInteraction: true })]}
      className="w-full relative"
      opts={{ loop: true }}
    >
      <CarouselContent>
        {movies.map((movie, index) => (
          <CarouselItem key={movie.id}>
            <Link href={`/movies/${movie.id}`}>
              <div className="relative w-full h-[65vh] overflow-hidden">
                {/* Backdrop */}
                <Image
                  src={getBackdropUrl(movie.backdrop_path)}
                  alt={movie.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Ranking badge */}
                <div className="absolute top-4 left-4 flex items-center justify-center h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold">
                  {index + 1}
                </div>

                {/* Movie info — lower half */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  {/* Title + rating */}
                  <div className="flex items-end justify-between">
                    <div>
                      <h2 className="text-white text-2xl font-bold drop-shadow-lg">
                        {movie.title}
                      </h2>
                      <p className="text-white/70 text-sm mt-1">
                        {movie.release_date?.slice(0, 4)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400 font-medium">
                      <span>★</span>
                      <span className="text-white text-sm">
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
