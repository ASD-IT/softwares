import type { Metadata } from "next";
import "./globals.css";

// Contexts
import AppProviders from "./context/appProviders";

export const metadata: Metadata = {
  title: "ASD IT DOWNLOADS",
  description: "Download Softwares",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
