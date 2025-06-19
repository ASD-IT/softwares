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
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center space-x-2">
        {/* Search - email / name */}
        <div className="relative inline-block text-left">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleFilters("searchQuery", e.target.value)}
            placeholder="Search by name..."
            className={`border text-black rounded-md bg-white border-white p-2`}
          />
        </div>

        {/* Filter by User Category */}
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

        {/* Add */}
        <StyledButton
          label="Add New Software"
          type="button"
          bgColor="bg-white hover:bg-cyan-500"
          textColor="text-black hover:text-white"
          onClick={() => handleAction("add")}
        />
      </div>

      {/* Total */}
      <div className="text-white">Total: {total}</div>
    </div>
  );
};

export default SoftwaresActions;
