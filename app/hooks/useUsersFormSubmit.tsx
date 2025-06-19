"use client";
import { useToast } from "../context/toast-context";

// Queries
import { createUser, deleteUser, updateUser } from "../lib/queries/users";

export const useUsersFormSubmit = ({
  userDetail,
  updatedDetail,
  selectedUser,
  setLoading,
  setError,
  refetchData,
  onClose,
}: any) => {
  const { addToast } = useToast();

  const addNewUser = async () => {
    const response = await createUser(userDetail);

    if (response.error) {
      throw new Error("Error adding new Users");
    }

    addToast("User added Successfully", "success");
    await refetchData();
    onClose();
  };

  const editUser = async () => {
    const response = await updateUser(selectedUser.id, updatedDetail);

    if (response.error) {
      throw new Error("Error adding new Users");
    }

    addToast("User updated Successfully", "success");
    await refetchData();
    onClose();
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (selectedUser && updatedDetail) {
        await editUser();
      } else {
        await addNewUser();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteUser(selectedUser.id);

      if (response.error) {
        throw new Error("Error deleting the user.");
      }

      addToast("Successfully deleted the User", "success");
      await refetchData();
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, handleDelete };
};
