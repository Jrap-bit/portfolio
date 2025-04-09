// pages/api/spotify/now-playing.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "~/lib/spotify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = await getAccessToken();

    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204 || response.status > 400) {
      return res.status(200).json({ isPlaying: false });
    }

    const song = await response.json();

    const nowPlaying = {
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((a: any) => a.name).join(", "),
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0].url,
      songUrl: song.item.external_urls.spotify,
    };

    res.status(200).json(nowPlaying);
  } catch (error) {
    console.error("Spotify error:", error);
    res.status(500).json({ error: "Unable to fetch song" });
  }
}