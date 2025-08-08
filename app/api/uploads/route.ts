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
    console.log("invalid file type");
  }

  // 1. Get access token
  const accessToken = await getNewAccessToken();

  // 2. Read file content
  const buffer = Buffer.from(await file.arrayBuffer());

  // 3. Upload file
  const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/Softwares/${filepath}/${filename}:/content`;
  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": file.type || "application/octet-stream", // fallback for safety
    },
    body: buffer,
  });

  const uploaded = await uploadRes.json();

  if (!uploaded?.id) {
    return NextResponse.json(
      { error: "Upload failed", details: uploaded },
      { status: 400 }
    );
  }

  // 4. Generate a shareable public link
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
