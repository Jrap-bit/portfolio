// pages/api/spotify/callback.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string;

  const authOptions = {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from("d338afaacd994a44bc36741b7a8e39e0" + ":" + "82c9d03f746546a99b2f76c80817d4e0").toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "https://parjanya.vercel.app/api/spotify/callback",
    }),
  };

  const response = await fetch("https://accounts.spotify.com/api/token", authOptions);
  const data = await response.json();

  if (response.ok) {
    // Save this securely: in database or use it immediately
    return res.status(200).json(data);
  } else {
    console.error("Spotify Token Error:", data);
    return res.status(500).json({ error: "Failed to get token from Spotify" });
  }
}