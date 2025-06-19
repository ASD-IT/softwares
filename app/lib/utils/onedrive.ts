import { NextResponse } from "next/server";
import { supabase } from "../supabase-client";

export async function getNewAccessToken() {
  const { ONEDRIVE_CLIENT_ID, ONEDRIVE_CLIENT_SECRET, ONEDRIVE_REDIRECT_URI } =
    process.env;

  // 1. Fetch refresh token from Supabase
  const { data: configRow, error } = await supabase
    .from("config")
    .select("value")
    .eq("key", "onedrive_refresh_token")
    .single();

  if (error || !configRow?.value) {
    return NextResponse.json(
      { error: "Refresh token missing in config", details: error },
      { status: 500 }
    );
  }

  const refreshToken = configRow.value;

  // 2. Exchange refresh token for access token
  const tokenRes = await fetch(
    "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: ONEDRIVE_CLIENT_ID!,
        client_secret: ONEDRIVE_CLIENT_SECRET!,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
        redirect_uri: ONEDRIVE_REDIRECT_URI!,
      }),
    }
  );

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Access token fetch failed", details: tokenData },
      { status: 401 }
    );
  }

  return accessToken;
}
