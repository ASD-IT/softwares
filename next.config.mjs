/** @type {import('next').NextConfig} */
import dotenv from "dotenv";
dotenv.config();

const domain =
  process.env.NEXT_PUBLIC_SUPABASE_DOMAIN || "khqdrkgbcnauihndhmka.supabase.co";

const nextConfig = {
  images: {
    domains: [domain],
  },
};

export default nextConfig;
