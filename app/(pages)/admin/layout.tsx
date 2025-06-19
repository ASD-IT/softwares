"use client";
import { lusitana } from "@/app/fonts";

// Hooks
import useUserSessionHook from "@/app/hooks/useUserSessionHook";

// Components
import TubeLoaders from "@/app/components/loaders/tube-loader";
import { StyledLinkButton } from "@/app/ui/buttons";
import Navbar from "@/app/components/layouts/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { status, userLogged } = useUserSessionHook();

  if (status === "loading") {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <TubeLoaders />
      </div>
    );
  }

  if (!userLogged) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <StyledLinkButton href="/" label="Please log in to continue." />
      </div>
    );
  }

  return (
    <div
      className={`w-full min-h-screen bg-white text-black ${lusitana.className} flex flex-col lg:flex-row`}
    >
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <main className="w-full h-screen px-3 py-4 lg:px-2 bg-white text-black overflow-hidden">
        {children}
      </main>
    </div>
  );
}
