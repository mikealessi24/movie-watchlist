import { NextResponse } from "next/server";
import { getTrending } from "@/services/tmdb";
import { cleanResults } from "@/lib/cleanResults";

export async function GET() {
  try {
    const data = await getTrending("week", 1);
    return NextResponse.json({
      ...data,
      results: cleanResults(data.results).slice(0, 10),
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch trending movies" },
      { status: 500 },
    );
  }
}
