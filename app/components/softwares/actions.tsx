import React, { useEffect } from "react";
import { useCategories } from "@/app/context/categories-context";

interface SoftwaresActionsProps {
  filterValue: any;
  handleFilters: (field: string, value: string) => void;
  loggedUserCategory: string | undefined;
}

const Actions: React.FC<SoftwaresActionsProps> = ({
  filterValue,
  handleFilters,
  loggedUserCategory,
}) => {
  const { userCategories, fetchSoftwareCategories } = useCategories();
  const { searchQuery, userCategory } = filterValue || {};

  useEffect(() => {
    if (!userCategories.length) fetchSoftwareCategories();
  }, []);

  return (
    <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-row md:items-center justify-end gap-4">
      {/* Search - name */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => handleFilters("searchQuery", e.target.value)}
        placeholder="Search by name..."
        className={`border text-black rounded-md bg-white border-white p-2`}
      />

      {/* Filter by User Category */}
      {loggedUserCategory ? (
        <div className="border bg-white border-white rounded-md px-3 py-1 md:py-2 text-black font-semibold">
          {loggedUserCategory}
        </div>
      ) : (
        <div>
          <select
            className="border bg-white border-gray-400 rounded-md px-3 py-2.5 text-sm"
            value={userCategory}
            onChange={(e) => handleFilters("userCategory", e.target.value)}
          >
            <option value="">-- All Categories --</option>
            {userCategories.map((opt: any) => (
              <option key={opt.id} value={opt.id}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Actions;
