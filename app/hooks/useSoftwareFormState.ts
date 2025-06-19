import { useEffect, useState } from "react";

const initialState = {
  name: "",
  description: "",
  instructions: "",
  image: null,
  file: null,
  userCategoryIds: [],
};

export const useSoftwareFormState = ({ selectedSoftware, action }: any) => {
  const [softwareDetail, setSoftwareDetail] = useState(initialState);
  const [updatedDetail, setUpdatedDetail] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedSoftware) {
      setSoftwareDetail({
        name: selectedSoftware.name || "",
        description: selectedSoftware.description || "",
        instructions: selectedSoftware.instructions || "",
        image: selectedSoftware.image_url || null,
        file: selectedSoftware.file_url || null,
        userCategoryIds:
          selectedSoftware.software_user_categories.map(
            (item: any) => item.user_categories.id
          ) || [],
      });
    } else {
      setSoftwareDetail(initialState);
    }
  }, [selectedSoftware]);

  const handleChange = (value: any, field: string) => {
    setSoftwareDetail((prev) => ({ ...prev, [field]: value }));
    if (action === "edit" && selectedSoftware) {
      const prevValue = selectedSoftware[field] ?? "";
      if (value !== prevValue) {
        setUpdatedDetail((prev: any) => ({ ...prev, [field]: value }));
      } else {
        setUpdatedDetail((prev: any) => {
          if (!prev) return prev;
          const updated = { ...prev };
          delete updated[field];
          return Object.keys(updated).length ? updated : undefined;
        });
      }
    }
  };

  return {
    softwareDetail,
    updatedDetail,
    loading,
    error,
    setLoading,
    setError,
    handleChange,
  };
};
