// pages/api/spotify/refresh.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  const basicAuth = Buffer.from(
    "d338afaacd994a44bc36741b7a8e39e0:82c9d03f746546a99b2f76c80817d4e0"
  ).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token || "",
    }),
  });

  const data = await response.json();
  return res.status(200).json(data);
}