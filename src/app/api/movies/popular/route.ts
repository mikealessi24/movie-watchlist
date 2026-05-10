import { NextRequest, NextResponse } from "next/server";
import { getPopular } from "@/services/tmdb";
import { cleanResults } from "@/lib/cleanResults";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") ?? 1);

  try {
    const res = await getPopular(page);
    const data = { ...res, results: cleanResults(res.results) };
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch popular movies." },
      { status: 500 },
    );
  }
}
