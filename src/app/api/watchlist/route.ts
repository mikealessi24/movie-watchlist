import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getMovie } from "@/services/tmdb";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const watchlist = await prisma.watchlistEntry.findMany({
      where: { userId: session.user.id },
      include: { movie: true },
      orderBy: { addedAt: "desc" },
    });

    return NextResponse.json(watchlist);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch watchlist" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { tmdbId } = body;

    if (!tmdbId || isNaN(Number(tmdbId))) {
      return NextResponse.json(
        { error: "A valid tmdbId is required" },
        { status: 400 },
      );
    }

    const movieData = await getMovie(Number(tmdbId));

    const movie = await prisma.movie.upsert({
      where: { tmdbId: movieData.id },
      update: { cachedAt: new Date() },
      create: {
        tmdbId: movieData.id,
        title: movieData.title,
        posterPath: movieData.poster_path ?? null,
        overview: movieData.overview ?? null,
        voteAverage: movieData.vote_average ?? null,
        releaseDate: movieData.release_date ?? null,
        genreIds: movieData.genre_ids ?? [],
      },
    });

    const entry = await prisma.watchlistEntry.create({
      data: {
        userId: session.user.id,
        movieId: movie.id,
        status: "WANT_TO_WATCH",
      },
      include: { movie: true },
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Movie already in watchlist" },
        { status: 409 },
      );
    }
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add to watchlist" },
      { status: 500 },
    );
  }
}
