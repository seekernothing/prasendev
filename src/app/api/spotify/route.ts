import { getSpotifyData } from "@/lib/spotify";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const response = await getSpotifyData();
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch Spotify data",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
