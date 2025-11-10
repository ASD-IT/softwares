"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

// Helpers
import { firstLetterCapital } from "@/app/lib/utils";

// Contexts / Hooks
import { useCategories } from "@/app/context/categories-context";
import { useSoftwares } from "@/app/context/softwares-context";
import { useSettingsState } from "@/app/hooks/useSettingsState";

// Components
import Softwares from "@/app/components/softwares";
import Actions from "@/app/components/softwares/actions";
import { DualRingLoader } from "@/app/ui/loaders";

const SoftwaresByPlatformPage = () => {
  const params = useParams();
  const platform = params?.platform as string;
  const searchParams = useSearchParams();
  const userCategoryParam = searchParams.get("userCategory");

  const { userCategories, fetchUserCategories, fetchSoftwareCategoryId } =
    useCategories();
  const { softwares, fetchSoftwares, loading, error } = useSoftwares();
  const [categoryId, setCategoryId] = useState("");
  const [userCategory, setUserCategory] = useState("");

  const { filteredData, filterValue, handleFilters } = useSettingsState({
    data: softwares,
  });

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

  useEffect(() => {
    if (platform && categoryId) fetchSoftwares(categoryId, userCategory);
  }, [platform, categoryId, userCategory]);

  return (
    <div
      className={`h-full flex flex-col ${
        platform === "windows"
          ? "bg-gradient-to-r from-[#00C9FF] to-[#92FE9D]"
          : "bg-gradient-to-r from-[#00C9FF] to-[#dd3e54]"
      } rounded-md text-black overflow-hidden`}
    >
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between py-4 px-2 md:px-4 gap-4 md:gap-0">
        <h1 className="text-lg md:text-xl xl:text-2xl font-bold text-black">
          Softwares for{" "}
          {platform ? firstLetterCapital(platform) : "Unknown Platform"}
        </h1>

        {/* Filters */}
        <Actions
          filterValue={filterValue}
          handleFilters={handleFilters}
          loggedUserCategory={loggedUserCategory}
        />
      </div>

      <hr className="border-b border-b-gray-200 my-2" />

      {loading || !softwares ? (
        <div className="w-full h-96 flex items-center justify-center">
          <DualRingLoader />
        </div>
      ) : error ? (
        <div className="w-full h-96 flex items-center justify-center">
          <p className="text-danger">
            Error Fetching Categories, Please try again!
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <Softwares softwares={filteredData} />
        </div>
      )}
    </div>
  );
};

export default SoftwaresByPlatformPage;
