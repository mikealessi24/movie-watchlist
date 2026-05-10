"use client";

import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { TMDBMovie } from "@/types/tmdb";
import { getBackdropUrl } from "@/services/tmdb";
import Detail from "./Details";
import { IconBookmark } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

interface HeroCarouselProps {
  movies: TMDBMovie[];
}

export default function HeroCarousel({ movies }: HeroCarouselProps) {
  const { data: session } = useSession();

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
                {session && (
                  <button
                    className="absolute top-5 right-5 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm"
                    onClick={(e) => e.preventDefault()}
                  >
                    <IconBookmark size={36} />
                  </button>
                )}

                {/* <div className="absolute bottom-6 right-6 text-[8rem] font-black leading-none text-white/20 select-none">
                  {index + 1}
                </div> */}
                <Detail movie={movie} />
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
