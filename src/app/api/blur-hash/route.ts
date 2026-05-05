// app/api/blur-hash/route.ts

import { getBlurDataURL } from "~/lib/getAllPostPreviews";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return Response.json({ error: "Missing url param" }, { status: 400 });
  }

  const base64 = await getBlurDataURL(url);
  return Response.json({ base64 });
}