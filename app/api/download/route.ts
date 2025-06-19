import { getNewAccessToken } from "@/app/lib/utils/onedrive";
import { NextRequest, NextResponse } from "next/server";

// Encode URL in base64url format
function base64urlEncode(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function GET(req: NextRequest) {
  const publicUrl = req.nextUrl.searchParams.get("url");
  if (!publicUrl)
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });

  try {
    const accessToken = await getNewAccessToken();

    const base64Url = base64urlEncode(publicUrl);
    const resolveRes = await fetch(
      `https://graph.microsoft.com/v1.0/shares/u!${base64Url}/driveItem`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const resolved = await resolveRes.json();
    if (!resolved?.id) {
      return NextResponse.json(
        { error: "Unable to resolve shared link" },
        { status: 400 }
      );
    }

    const metadataRes = await fetch(
      `https://graph.microsoft.com/v1.0/me/drive/items/${resolved.id}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const metadata = await metadataRes.json();
    return NextResponse.json({
      downloadUrl: metadata["@microsoft.graph.downloadUrl"],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
