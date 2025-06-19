// Hooks
import { useUsersFormSubmit } from "@/app/hooks/useUsersFormSubmit";
import { useUsersFormState } from "@/app/hooks/useUsersFormState";

// Components
import { StyledInput } from "@/app/ui/inputs";
import { StyledSelect } from "@/app/ui/selects";
import { ModalButtons } from "../../common/modal-buttons";

const ROLES = {
  admin: "Admin",
  it: "IT",
};

export default function UserForm({
  onClose,
  refetchData,
  selectedUser,
  action,
}: any) {
  const {
    userDetail,
    updatedDetail,
    loading,
    error,
    setLoading,
    setError,
    handleChange,
  } = useUsersFormState({ selectedUser, action });
  const { handleSubmit } = useUsersFormSubmit({
    userDetail,
    updatedDetail,
    selectedUser,
    setLoading,
    setError,
    refetchData,
    onClose,
  });

  const { name, email, username, password, role } = userDetail;

  const enableSave =
    Boolean(username && password && role) &&
    (action !== "edit" || !!updatedDetail);

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500 text-center">{error}</p>}

      <form className="grid grid-cols-2 gap-4">
        {/* Name */}
        <StyledInput
          label="Display Name (optional)"
          type="text"
          name="name"
          value={name || ""}
          handleChange={(e) => handleChange(e.target.value, e.target.name)}
        />

        {/* Email */}
        <StyledInput
          label="Email (optional)"
          type="text"
          name="email"
          value={email || ""}
          handleChange={(e) => handleChange(e.target.value, e.target.name)}
        />

        {/* Username */}
        <StyledInput
          label="UserName"
          type="text"
          name="username"
          value={username || ""}
          handleChange={(e) => handleChange(e.target.value, e.target.name)}
          required={true}
        />

        {/* Password */}
        <StyledInput
          label="Password"
          type="password"
          name="password"
          value={password || ""}
          handleChange={(e) => handleChange(e.target.value, e.target.name)}
          required={true}
        />

        {/* Role */}
        <div>
          <StyledSelect
            name="role"
            label="Role"
            value={role || ""}
            defaultLabel=""
            items={Object.keys(ROLES).map((key: any) => ({
              key: key,
              value: ROLES[key as keyof typeof ROLES],
              label: ROLES[key as keyof typeof ROLES],
            }))}
            handleChange={(e) => handleChange(e.target.value, e.target.name)}
            required={true}
          />
        </div>
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
