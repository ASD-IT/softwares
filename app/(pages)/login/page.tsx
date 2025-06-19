"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Constants
import { bgColors } from "@/app/lib/constants/themes";

// Hooks
import useUserSessionHook from "@/app/hooks/useUserSessionHook";

// Components
import PageHeader from "@/app/components/layouts/page-header";
import LoginCredentials from "@/app/components/auth/login-credentials";
import TubeLoaders from "@/app/components/loaders/tube-loader";

export default function LoginPage() {
  const router = useRouter();
  const { status, userLogged, isAdmin, userCategory } = useUserSessionHook();

  useEffect(() => {
    if (userLogged) {
      if (isAdmin) {
        router.push("/admin/settings");
      } else if (userCategory) {
        router.push(`/softwares/windows?userCategory=${userCategory?.id}`);
      }
    }
  }, [userLogged, isAdmin, router, userCategory]);

  if (status === "loading") {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <TubeLoaders />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black p-2 md:p-4 lg:p-6 flex flex-col space-y-4">
      {/* Header */}
      <PageHeader subtitle="Login" />

      {/* Login */}
      <div
        className={`flex flex-1 items-center justify-center rounded-lg p-2 ${bgColors.sub}`}
      >
        <LoginCredentials />
      </div>
    </main>
  );
}
