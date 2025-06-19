import { NextResponse } from "next/server";
import { getNewAccessToken } from "@/app/lib/utils/onedrive";

export async function POST(req: Request) {
  try {
    const { itemId } = await req.json();
    if (!itemId)
      return NextResponse.json({ error: "Missing itemId" }, { status: 400 });

    const accessToken = await getNewAccessToken();

    const res = await fetch(
      `https://graph.microsoft.com/v1.0/me/drive/items/${encodeURIComponent(
        itemId
      )}/createLink`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "view", scope: "anonymous" }),
      }
    );

    const data = await res.json();
    const webUrl = data?.link?.webUrl || null;

    return NextResponse.json({ webUrl, raw: data });
  } catch (err: any) {
    console.error("onedrive-create-link error:", err);
    return NextResponse.json(
      { error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
