import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getMovie,
  getPosterUrl,
  getBackdropUrl,
  getTopCast,
  getTrailer,
  getDirector,
} from "@/services/tmdb";
import { IconStarFilled } from "@tabler/icons-react";
import WatchlistButton from "@/components/WatchlistButton";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId)) notFound();

  const movie = await getMovie(movieId);

  if (!movie) notFound();

  const cast = getTopCast(movie, 10);
  const trailer = getTrailer(movie);
  const director = getDirector(movie);
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : null;

  return (
    <div className="min-h-screen">
      {/* Backdrop hero */}
      <div className="relative w-full h-[65vh]">
        <Image
          src={getBackdropUrl(movie.backdrop_path)}
          alt={movie.title}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-opacity duration-500"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        {/* Add to watchlist button — top right */}

        <div className="absolute top-8 right-8">
          <WatchlistButton movie={movie} size={36} />
        </div>
      </div>

      {/* Poster + info row */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex gap-8 -mt-32 relative z-10">
          {/* Poster */}
          <div className="hidden sm:block shrink-0 w-48 md:w-56 lg:w-64">
            <div className="relative aspect-2/3 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={getPosterUrl(movie.poster_path)}
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-end pb-4 text-foreground">
            <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-foreground/60 italic mt-1">{movie.tagline}</p>
            )}
            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-foreground/80">
              {movie.release_date && (
                <span>{movie.release_date.slice(0, 4)}</span>
              )}
              {runtime && <span>{runtime}</span>}
              <div className="flex items-center gap-0.5 rounded-full text-sm text-foreground">
                <IconStarFilled
                  height={14}
                  width={14}
                  className=" text-yellow-300"
                />
                {movie.vote_average.toFixed(1)}
              </div>
              {director && <span>Dir. {director}</span>}
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-foreground text-xs px-3 py-1 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Below the fold content */}
      <div className="mx-auto max-w-7xl px-4 py-12 space-y-12">
        {/* Overview */}
        {movie.overview && (
          <section>
            <h2 className="text-xl font-semibold mb-3">Overview</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              {movie.overview}
            </p>
          </section>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Cast</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {cast.map((member) => (
                <div key={member.id} className="shrink-0 w-24 text-center">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted mx-auto mb-2">
                    {member.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                        alt={member.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-2xl">
                        ?
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-medium truncate">{member.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {member.character}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Trailer */}
        {trailer && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Trailer</h2>
            <div className="aspect-video w-full max-w-3xl rounded-lg overflow-hidden">
              <iframe
                src={trailer}
                title={`${movie.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
