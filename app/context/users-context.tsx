"use client";
import React, { createContext, useContext, useState } from "react";
import { getSoftwares } from "../lib/queries/softwares";
import { getAllUsers } from "../lib/queries/users";

type UsersContextType = {
  users: any;
  fetchUsers: () => void;
  loading: boolean;
  error: string | null;
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<any>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);

    try {
      const res = await getAllUsers();

      if (res.error) {
        throw new Error("Error fetching users");
      }

      setUsers(res.users ?? []);
    } catch (err) {
      setError("Error fetching Users.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <UsersContext.Provider value={{ users, fetchUsers, loading, error }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a Users Provider");
  }
  return context;
};
