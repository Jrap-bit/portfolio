// pages/api/spotify/callback.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code || null;

  if (!code) return res.status(400).send("Missing code");

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code as string,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
        client_id: process.env.SPOTIFY_CLIENT_ID!,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    // 🔐 You'll receive access_token + refresh_token
    const { refresh_token, access_token } = response.data;

    console.log("Refresh Token:", refresh_token); // ⬅️ Copy this to your `.env.local`

    return res.status(200).json({ refresh_token, access_token });
  } catch (err) {
    console.error("Error exchanging token:", err);
    return res.status(500).send("Token exchange failed");
  }
}