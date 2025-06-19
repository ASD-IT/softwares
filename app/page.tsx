"use client";
import { useEffect } from "react";

// Contexts
import { useCategories } from "./context/categories-context";

// Constants/Helpers
import { bgColors } from "./lib/constants/themes";

// Components
import TubeLoaders from "./components/loaders/tube-loader";
import Categories from "./components/home/categories";
import PageHeader from "./components/layouts/page-header";

export default function Home() {
  const { userCategories, fetchUserCategories, loading, error } =
    useCategories();

  useEffect(() => {
    if (!userCategories.length) fetchUserCategories();
  }, [userCategories]);

  return (
    <main className="min-h-screen bg-white text-black p-2 md:p-4 lg:p-6 flex flex-col space-y-4">
      {/* Header */}
      <PageHeader subtitle="Downloads available only for Mac and Windows" />

      {/* Categories */}
      <div
        className={`flex flex-1 items-center justify-center rounded-lg p-2 ${bgColors.sub}`}
      >
        {loading.user ? (
          <div className="flex items-center justify-center grow">
            <TubeLoaders />
          </div>
        ) : error.user ? (
          <div className="flex items-center justify-center grow">
            Error loading categories. Please try again!
          </div>
        ) : (
          userCategories && <Categories categories={userCategories} />
        )}
      </div>
    </main>
  );
}
