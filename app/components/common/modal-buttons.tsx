import { StyledButton } from "@/app/ui/buttons";

export const ModalButtons = ({
  onClose,
  handleSubmit,
  enableSubmit,
  loading,
}: any) => {
  return (
    <div className="flex justify-end gap-4">
      <StyledButton label="Cancel" onClick={onClose} bgColor="bg-rose-500" />
      <StyledButton
        label="Submit"
        onClick={handleSubmit}
        enableButtons={enableSubmit}
        loading={loading}
      />
    </div>
  );
};
