import { NextRequest, NextResponse } from "next/server";
import { getMovie } from "@/services/tmdb";
import { logError } from "@/lib/logger";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId)) {
    return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 });
  }

  try {
    const data = await getMovie(movieId);
    return NextResponse.json(data);
  } catch (error) {
    logError(`GET /api/movies/${movieId}`, error);
    return NextResponse.json(
      { error: "Failed to fetch movie" },
      { status: 500 },
    );
  }
}
