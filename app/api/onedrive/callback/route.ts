import { supabase } from "@/app/lib/supabase-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const { NEXTAUTH_URL } = process.env;
  const baseUrl = NEXTAUTH_URL || "https://softwares.asd.edu.qa";

  if (!code)
    return NextResponse.redirect(
      `${baseUrl}/admin/settings?onedrive=codemissing`
    );

  const tokenRes = await fetch(
    "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.ONEDRIVE_CLIENT_ID!,
        client_secret: process.env.ONEDRIVE_CLIENT_SECRET!,
        redirect_uri: process.env.ONEDRIVE_REDIRECT_URI!,
        code,
        grant_type: "authorization_code",
      }),
    }
  );

  const tokenData = await tokenRes.json();

  if (!tokenData.refresh_token) {
    console.error("Token Error:", tokenData);
    return NextResponse.redirect(
      `${baseUrl}/admin/settings?onedrive=tokenerror`
    );
  }

  // Save to Supabase
  const { error } = await supabase.from("config").upsert({
    key: "onedrive_refresh_token",
    value: tokenData.refresh_token,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.redirect(`${baseUrl}/admin/settings?onedrive=dberror`);
  }

  return NextResponse.redirect(`${baseUrl}/admin/settings?onedrive=connected`);
}
