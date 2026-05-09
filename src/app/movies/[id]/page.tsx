import { getMovie } from "@/services/tmdb";
import { notFound } from "next/navigation";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId)) notFound();

  const movie = await getMovie(movieId);

  if (!movie) notFound();

  return (
    <div>
      <h1>{movie.title}</h1>
    </div>
  );
}
