// src/app/api/spotify/now-playing/route.ts

import { getAccessToken } from "~/lib/spotify";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const token = await getAccessToken();

    const res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status === 204) {
      return NextResponse.json({ isPlaying: false });
    }

    if (!res.ok) {
      const error = await res.text();
      console.error(
        "[Spotify] Currently playing request failed",
        res.status,
        error,
      );
      return NextResponse.json(
        { error: "Spotify currently-playing request failed" },
        { status: res.status },
      );
    }

    const song = await res.json();

    if (!song?.item || song.item.type !== "track") {
      return NextResponse.json({ isPlaying: false });
    }

    const nowPlaying = {
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((a: any) => a.name).join(", "),
      album: song.item.album.name,
      albumImageUrl: song.item.album?.images?.[0]?.url ?? null,
      songUrl: song.item.external_urls.spotify,
    };

    return NextResponse.json(nowPlaying);
  } catch (error) {
    console.error("[Spotify] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch now playing track" },
      { status: 500 },
    );
  }
}
