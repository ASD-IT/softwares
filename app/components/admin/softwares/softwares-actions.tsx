import React, { useEffect } from "react";
import { useCategories } from "@/app/context/categories-context";
import { StyledButton } from "@/app/ui/buttons";

interface SoftwaresActionsProps {
  total: number;
  filterValue: any;
  handleAction: (action: string) => void;
  handleFilters: (field: string, value: string) => void;
}

const SoftwaresActions: React.FC<SoftwaresActionsProps> = ({
  total,
  filterValue,
  handleAction,
  handleFilters,
}) => {
  const { userCategories, fetchSoftwareCategories } = useCategories();
  const { searchQuery, userCategory } = filterValue || {};

  useEffect(() => {
    if (!userCategories.length) fetchSoftwareCategories();
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between py-2 gap-2 md:gap-0">
      <div className="w-full flex flex-col md:flex-row md:items-center gap-2">
        {/* Search - email / name */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleFilters("searchQuery", e.target.value)}
          placeholder="Search by name..."
          className={`border text-black rounded-md bg-white border-white p-2`}
        />

        {/* Filter by User Category */}
        <div className="flex flex-row gap-2">
          <select
            className="border bg-white border-gray-400 rounded-md px-3 py-1 md:py-2.5 text-sm"
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

          {/* Add */}
          <StyledButton
            label="Add New Software"
            type="button"
            bgColor="bg-white hover:bg-cyan-500"
            padding="py-1 px-2"
            textColor="text-black hover:text-white"
            onClick={() => handleAction("add")}
          />
        </div>
      </div>

      {/* Total */}
      <div className="text-white whitespace-nowrap">Total: {total}</div>
    </div>
  );
};

export default SoftwaresActions;
