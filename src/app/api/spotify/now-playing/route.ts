// src/app/api/spotify/now-playing/route.ts

import { getAccessToken } from "~/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = await getAccessToken();

    const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 204 || res.status > 400) {
      return NextResponse.json({ isPlaying: false });
    }

    const song = await res.json();

    const nowPlaying = {
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((a: any) => a.name).join(", "),
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0].url,
      songUrl: song.item.external_urls.spotify,
    };

    return NextResponse.json(nowPlaying);
  } catch (error) {
    console.error("[Spotify] Error:", error);
    return NextResponse.json({ error: "Failed to fetch now playing track" }, { status: 500 });
  }
}