"use client";
import React, { createContext, useContext, useState } from "react";
import { getSoftwares } from "../lib/queries/softwares";

type SoftwaresContextType = {
  softwares: any;
  fetchSoftwares: (device: string, category?: string) => void;
  loading: boolean;
  error: string | null;
};

const SoftwaresContext = createContext<SoftwaresContextType | undefined>(
  undefined
);

export const SoftwaresProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [softwares, setSoftwares] = useState<any>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch softwares
  const fetchSoftwares = async (
    softwareCategoryId: string,
    userCategoryId?: string
  ) => {
    setLoading(true);

    try {
      const res = await getSoftwares(softwareCategoryId, userCategoryId);

      if (!Array.isArray(res) && res?.error) {
        throw new Error(res.error);
      }

      setSoftwares(Array.isArray(res) ? res : []);
    } catch (err) {
      setError("Error fetching software categories:");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <SoftwaresContext.Provider
      value={{ softwares, fetchSoftwares, loading, error }}
    >
      {children}
    </SoftwaresContext.Provider>
  );
};

export const useSoftwares = () => {
  const context = useContext(SoftwaresContext);
  if (!context) {
    throw new Error("useSoftwares must be used within a Softwares Provider");
  }
  return context;
};
