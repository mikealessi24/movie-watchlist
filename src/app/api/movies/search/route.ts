import { NextRequest, NextResponse } from "next/server";
import { searchMovies } from "@/services/tmdb";
import { cleanResults } from "@/lib/cleanResults";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const page = Number(searchParams.get("page") ?? 1);

  if (!query || query.trim() === "") {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 },
    );
  }

  try {
    const data = await searchMovies(query, page);
    const cleaned = cleanResults(data.results);

    return NextResponse.json({
      ...data,
      results: cleaned,
      total_pages: cleaned.length === 0 ? page : data.total_pages,
    });
  } catch (error) {
    console.error("[/api/movies/search]", error);
    return NextResponse.json(
      { error: "Failed to search movies" },
      { status: 500 },
    );
  }
}
