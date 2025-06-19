import { useEffect, useState } from "react";

const initialState = {
  name: "",
  email: "",
  username: "",
  password: null,
  role: "",
};

export const useUsersFormState = ({ selectedUser, action }: any) => {
  const [userDetail, setUserDetail] = useState(initialState);
  const [updatedDetail, setUpdatedDetail] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setUserDetail({
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        password: selectedUser.password || "",
        username: selectedUser.username || "",
        role: selectedUser.role || "",
      });
    } else {
      setUserDetail(initialState);
    }
  }, [selectedUser]);

  const handleChange = (value: any, field: string) => {
    setUserDetail((prev) => ({ ...prev, [field]: value }));
    if (action === "edit" && selectedUser) {
      const prevValue = selectedUser[field] ?? "";
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
    userDetail,
    updatedDetail,
    loading,
    error,
    setLoading,
    setError,
    handleChange,
  };
};
