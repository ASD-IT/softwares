import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const scope = encodeURIComponent("offline_access Files.ReadWrite User.Read");
  const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.ONEDRIVE_CLIENT_ID}&response_type=code&redirect_uri=${process.env.ONEDRIVE_REDIRECT_URI}&response_mode=query&scope=${scope}`;
  return NextResponse.redirect(authUrl);
}
