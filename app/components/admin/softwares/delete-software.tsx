// Hooks
import { useSoftwareFormState } from "@/app/hooks/useSoftwareFormState";
import { useSoftwareSubmit } from "@/app/hooks/useSoftwareSubmit";

// Components
import { StyledButton } from "@/app/ui/buttons";

export default function DeleteSoftware({
  selectedSoftware,
  categoryId,
  onClose,
  refetchdata,
}: any) {
  const { loading, error, setLoading, setError } = useSoftwareFormState({});
  const { handleDelete } = useSoftwareSubmit({
    setLoading,
    setError,
    onClose,
    refetchdata,
    selectedSoftware,
    categoryId,
  });

  return (
    <div className="w-full bg-white text-black">
      {error && <p className="text-center text-red-500">{error}</p>}

      <p>Are you sure you want to delete the selected Software ?</p>

      <hr className="my-4 border-gray-300" />

      {/* Submit / Cancel */}
      <div className="flex flex-row gap-4 justify-end items-center">
        <StyledButton label="Cancel" onClick={onClose} bgColor="bg-blue-500" />
        <StyledButton
          label="Delete"
          onClick={handleDelete}
          loading={loading}
          bgColor="bg-red-500"
        />
      </div>
    </div>
  );
}
