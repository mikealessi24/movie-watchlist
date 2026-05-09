import { NextRequest, NextResponse } from "next/server";
import { getPopular } from "@/services/tmdb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") ?? 1);

  try {
    console.info("Fetching popular movies: /movie/popular");
    const data = await getPopular(page);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch popular movies" },
      { status: 500 },
    );
  }
}
