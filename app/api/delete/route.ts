import { getNewAccessToken } from "@/app/lib/utils/onedrive";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const formData = await req.formData();
  const filepath = formData.get("filepath") as string;

  if (!filepath) {
    return NextResponse.json(
      { error: "Missing sourcePath or destinationPath" },
      { status: 400 }
    );
  }

  // 1. Get access token
  const accessToken = await getNewAccessToken();

  // 2. Get file ID of the source file
  const deleteRes = await fetch(
    `https://graph.microsoft.com/v1.0/me/drive/root:/Softwares/${filepath}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!deleteRes.ok) {
    let errorDetail;
    try {
      errorDetail = await deleteRes.json();
    } catch {
      errorDetail = { message: "Unknown error" };
    }

    return NextResponse.json(
      { error: "Failed to delete file", details: errorDetail },
      { status: deleteRes.status }
    );
  }

  return NextResponse.json({ message: "File deleted successfully" });
}
