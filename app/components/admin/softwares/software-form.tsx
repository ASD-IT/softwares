"use client";
import { useEffect } from "react";

// Contexts / Hooks
import { useCategories } from "@/app/context/categories-context";
import { useSoftwareFormState } from "@/app/hooks/useSoftwareFormState";
import { useSoftwareSubmit } from "@/app/hooks/useSoftwareSubmit";

// Components
import { StyledInput, StyledTextarea } from "@/app/ui/inputs";
import UploadsSection from "./uploads-section";
import { ModalButtons } from "../../common/modal-buttons";
import { UserCategorySelect } from "./user-category-select";

export default function SoftwareForm({
  selectedSoftware,
  categoryId,
  onClose,
  refetchdata,
  action,
}: any) {
  const { userCategories, fetchUserCategories } = useCategories();

  useEffect(() => {
    fetchUserCategories();
  }, []);

  const {
    softwareDetail,
    updatedDetail,
    loading,
    error,
    setLoading,
    setError,
    handleChange,
  } = useSoftwareFormState({ selectedSoftware, action });
  const { handleSubmit } = useSoftwareSubmit({
    categoryId,
    softwareDetail,
    updatedDetail,
    setLoading,
    setError,
    onClose,
    refetchdata,
    selectedSoftware,
  });

  const { name, description, instructions, image, file, userCategoryIds } =
    softwareDetail;

  const enableSave =
    action === "edit"
      ? !!updatedDetail && Boolean(name && file && userCategoryIds.length)
      : Boolean(name && file && userCategoryIds.length);

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500 text-center">{error}</p>}

      <form className="grid grid-cols-2 gap-4">
        {/* Name of the software */}
        <StyledInput
          label="Software Name"
          type="text"
          name="name"
          value={name || ""}
          handleChange={(e) => handleChange(e.target.value, e.target.name)}
          required={true}
        />

        {/* Description */}
        <StyledInput
          label="Description"
          type="text"
          name="description"
          value={description || ""}
          handleChange={(e) => handleChange(e.target.value, e.target.name)}
        />

        {/* Instructions */}
        <StyledTextarea
          rows={6}
          label="Instructions"
          name="instructions"
          value={instructions || ""}
          border="border-gray-200"
          handleChange={(e) => handleChange(e.target.value, e.target.name)}
        />

        {/* User Category */}
        <UserCategorySelect
          userCategories={userCategories}
          selectedIds={userCategoryIds}
          onChange={handleChange}
        />

        {/* Uploads section */}
        <UploadsSection details={{ image, file }} handleChange={handleChange} />
      </form>

      <hr className="border border-gray-200" />

      {/* Submit / Cancel */}
      <ModalButtons
        onClose={onClose}
        handleSubmit={handleSubmit}
        enableSubmit={enableSave}
        loading={loading}
      />
    </div>
  );
}
