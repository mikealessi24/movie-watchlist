import { NextRequest, NextResponse } from "next/server";
import { getMovie } from "@/services/tmdb";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 });
  }

  try {
    const data = await getMovie(id);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[/api/movies/[id]]", error);
    return NextResponse.json(
      { error: "Failed to fetch movie" },
      { status: 500 },
    );
  }
}
