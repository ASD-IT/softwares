import { getNewAccessToken } from "@/app/lib/utils/onedrive";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const filename = formData.get("filename") as string;
  const filepath = formData.get("filepath") as string;

  if (!file || !filename || !filepath) {
    return NextResponse.json(
      { error: "Missing file, filename, or filepath" },
      { status: 400 }
    );
  }

  if (!file.type) {
    console.warn("Invalid file type");
  }

  // 1. Get access token
  const accessToken = await getNewAccessToken();

  // 2. Create Blob from the incoming File (safe for fetch BodyInit)
  const blob = new Blob([await file.arrayBuffer()], {
    type: file.type || "application/octet-stream",
  });

  const fileSize = blob.size;

  // Small file threshold for Graph API direct upload (4 MB)
  const SMALL_FILE_LIMIT = 4 * 1024 * 1024;

  let uploaded;

  if (fileSize <= SMALL_FILE_LIMIT) {
    // ---- Small file direct upload ----
    const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/Softwares/${filepath}/${filename}:/content`;

    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: blob,
    });

    uploaded = await uploadRes.json();
  } else {
    // ---- Large file chunked upload ----
    // 1. Create an upload session
    const sessionRes = await fetch(
      `https://graph.microsoft.com/v1.0/me/drive/root:/Softwares/${filepath}/${filename}:/createUploadSession`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: { "@microsoft.graph.conflictBehavior": "replace" },
        }),
      }
    );

    const sessionData = await sessionRes.json();
    if (!sessionData?.uploadUrl) {
      return NextResponse.json(
        { error: "Failed to create upload session", details: sessionData },
        { status: 400 }
      );
    }

    // 2. Upload in chunks (5 MB each)
    const chunkSize = 5 * 1024 * 1024;
    let start = 0;
    let end = chunkSize;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    while (start < fileSize) {
      const chunk = fileBuffer.subarray(start, Math.min(end, fileSize));

      const chunkRes = await fetch(sessionData.uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Length": chunk.length.toString(),
          "Content-Range": `bytes ${start}-${
            Math.min(end, fileSize) - 1
          }/${fileSize}`,
        },
        body: chunk,
      });

      uploaded = await chunkRes.json();
      start = end;
      end += chunkSize;
    }
  }

  if (!uploaded?.id) {
    return NextResponse.json(
      { error: "Upload failed", details: uploaded },
      { status: 400 }
    );
  }

  // 3. Generate a public view link
  const linkRes = await fetch(
    `https://graph.microsoft.com/v1.0/me/drive/items/${uploaded.id}/createLink`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "view", scope: "anonymous" }),
    }
  );

  const linkData = await linkRes.json();
  const publicUrl = linkData?.link?.webUrl;

  return NextResponse.json({
    message: "Upload successful",
    fileName: uploaded.name,
    publicUrl,
  });
}
