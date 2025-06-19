"use client";
import { CategoriesProvider } from "./categories-context";
import { SessionProvider } from "next-auth/react";
import { SoftwaresProvider } from "./softwares-context";
import { ToastProvider } from "./toast-context";
import { UsersProvider } from "./users-context";
import { HeroUIProvider } from "@heroui/react";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroUIProvider>
      <SessionProvider>
        <ToastProvider>
          <UsersProvider>
            <CategoriesProvider>
              <SoftwaresProvider>{children}</SoftwaresProvider>
            </CategoriesProvider>
          </UsersProvider>
        </ToastProvider>
      </SessionProvider>
    </HeroUIProvider>
  );
};

export default AppProviders;
