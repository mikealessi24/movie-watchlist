import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const watchlist = await prisma.watchlistEntry.findMany({
      where: { userId: user.id },
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
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { movie: movieData } = body;

    if (!movieData?.tmdbId) {
      return NextResponse.json(
        { error: "Movie data is required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // upsert movie into cache
    const movie = await prisma.movie.upsert({
      where: { tmdbId: movieData.tmdbId },
      update: { cachedAt: new Date() },
      create: {
        tmdbId: movieData.tmdbId,
        title: movieData.title,
        posterPath: movieData.poster_path ?? null,
        overview: movieData.overview ?? null,
        voteAverage: movieData.vote_average ?? null,
        releaseDate: movieData.release_date ?? null,
        genreIds: movieData.genre_ids ?? [],
      },
    });

    // create watchlist entry
    const entry = await prisma.watchlistEntry.create({
      data: {
        userId: user.id,
        movieId: movie.id,
        status: "WANT_TO_WATCH",
      },
      include: { movie: true },
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    // P2002 = unique constraint violation (already in watchlist)
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
