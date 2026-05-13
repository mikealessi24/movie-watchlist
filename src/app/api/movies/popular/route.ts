import { NextRequest, NextResponse } from "next/server";
import { getPopular } from "@/services/tmdb";
import { cleanResults } from "@/lib/cleanResults";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.min(Number(searchParams.get("page") ?? 1), 500);

  try {
    const data = await getPopular(page);
    const cleaned = cleanResults(data.results);
    return NextResponse.json({ ...data, results: cleaned });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch popular movies." },
      { status: 500 },
    );
  }
}
