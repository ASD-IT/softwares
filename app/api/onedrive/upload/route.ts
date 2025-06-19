// app/api/onedrive-session/route.ts
import { NextResponse } from "next/server";
import { getNewAccessToken } from "@/app/lib/utils/onedrive";

export async function POST(req: Request) {
  try {
    const { filename, filepath } = await req.json();

    if (!filename || !filepath) {
      return NextResponse.json(
        { error: "Missing filename or filepath" },
        { status: 400 }
      );
    }

    const accessToken = await getNewAccessToken();

    // Encode each path segment safely so nested folders are supported:
    const pathSegments = filepath
      .split("/")
      .map(encodeURIComponent)
      .filter(Boolean);
    const remotePath = [...pathSegments, encodeURIComponent(filename)].join(
      "/"
    );

    const url = `https://graph.microsoft.com/v1.0/me/drive/root:/Softwares/${remotePath}:/createUploadSession`;

    const sessionRes = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: { "@microsoft.graph.conflictBehavior": "replace" },
      }),
    });

    const sessionData = await sessionRes.json();

    if (!sessionData?.uploadUrl) {
      return NextResponse.json(
        { error: "Failed to create upload session", details: sessionData },
        { status: 500 }
      );
    }

    return NextResponse.json({ uploadUrl: sessionData.uploadUrl });
  } catch (err: any) {
    console.error("onedrive-session error:", err);
    return NextResponse.json(
      { error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
