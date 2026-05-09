import { NextRequest, NextResponse } from "next/server";
import { searchMovies } from "@/services/tmdb";

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
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to search movies." },
      { status: 500 },
    );
  }
}
