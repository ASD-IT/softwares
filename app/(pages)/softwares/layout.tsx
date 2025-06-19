"use client";
import { useSearchParams } from "next/navigation";
import { lusitana } from "@/app/fonts";

// Components
import Navbar from "@/app/components/layouts/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const userCategoryParam = searchParams.get("userCategory");

  return (
    <div
      className={`w-full min-h-screen bg-white text-black ${lusitana.className} flex flex-col lg:flex-row`}
    >
      {/* Navbar */}
      <Navbar userCategoryParam={userCategoryParam} />

      {/* Content */}
      <main className="w-full h-screen px-3 py-4 lg:px-2 bg-white text-black">
        {children}
      </main>
    </div>
  );
}
