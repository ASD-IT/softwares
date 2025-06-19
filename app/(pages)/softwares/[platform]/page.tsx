"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

// Helpers / Contexts
import { firstLetterCapital } from "@/app/lib/utils";
import { useCategories } from "@/app/context/categories-context";

// Components
import Softwares from "@/app/components/softwares";

const SoftwaresByPlatformPage = () => {
  const params = useParams();
  const platform = params?.platform as string;
  const searchParams = useSearchParams();
  const userCategoryParam = searchParams.get("userCategory");

  const { userCategories, fetchUserCategories, fetchSoftwareCategoryId } =
    useCategories();
  const [categoryId, setCategoryId] = useState("");
  const [userCategory, setUserCategory] = useState("");

  const fetchCategoryId = async () => {
    const id = await fetchSoftwareCategoryId(platform);
    if (id !== undefined && id !== null && id !== "") {
      setCategoryId(id);
    }
  };

  useEffect(() => {
    if (platform) {
      fetchCategoryId();
    }

    fetchUserCategories();
  }, [platform]);

  const loggedUserCategory = useMemo(() => {
    if (userCategoryParam && userCategories.length > 0) {
      const user = userCategories.find(
        (item: any) => item.id === userCategoryParam
      );
      setUserCategory(user?.id || "");
      return user?.name;
    }
    return undefined;
  }, [userCategories, userCategoryParam]);

  return (
    <div
      className={`h-full ${
        platform === "windows"
          ? "bg-gradient-to-r from-[#00C9FF] to-[#92FE9D]"
          : "bg-gradient-to-r from-[#00C9FF] to-[#dd3e54]"
      } rounded-md text-black`}
    >
      {/* Header */}
      <div className="w-full flex flex-row items-center justify-between p-4">
        <h1 className="text-lg md:text-2xl font-bold text-black">
          Softwares for{" "}
          {platform ? firstLetterCapital(platform) : "Unknown Platform"}
        </h1>

        {/* Filter by User Category */}
        <div>
          {userCategoryParam ? (
            <div className="border bg-white border-white rounded-md px-3 py-1 md:py-2.5 text-black font-semibold">
              {loggedUserCategory}
            </div>
          ) : (
            <select
              className="border bg-white border-gray-400 rounded-md px-3 py-2.5 text-sm"
              value={userCategory}
              onChange={(e) => setUserCategory(e.target.value)}
            >
              <option value="">-- All Categories --</option>
              {userCategories.map((opt: any) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <hr className="border-b border-b-gray-200 my-2" />

      <Softwares categoryId={categoryId} userCategory={userCategory} />
    </div>
  );
};

export default SoftwaresByPlatformPage;
