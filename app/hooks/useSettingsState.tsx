"use client";
import { useEffect, useState } from "react";

interface SettingsStateProps {
  data: any;
}

export const useSettingsState = ({ data }: SettingsStateProps) => {
  const [filterValue, setFilterValue] = useState(undefined);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
      resetFilter();
    }
  }, [data]);

  const handleFilters = async (field: string, value: string | boolean) => {
    setFilterValue((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetFilter = () => {
    setFilterValue(undefined);
  };

  const filterData = (filterValue: any) => {
    if (!data || !data.length) return;

    let filtered = [...data];

    // Search by name
    if (filterValue.searchQuery) {
      const query = filterValue.searchQuery.toLowerCase().trim();
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
    }

    // Search by user category
    if (filterValue.userCategory) {
      filtered = filtered.filter((item) =>
        item.software_user_categories.some(
          (item: any) => item.user_categories.id === filterValue.userCategory
        )
      );
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    if (filterValue && Object.keys(filterValue).length) {
      filterData(filterValue);
    } else {
      // Reset to full data when filters are cleared
      setFilteredData(data);
    }
  }, [filterValue, data]);

  return {
    filteredData,
    filterValue,
    handleFilters,
    resetFilter,
  };
};
