import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  getSoftwareCategories,
  getSoftwareCategoryId,
  getUserCategories,
} from "../lib/queries/categories";

type Category = {
  id: string;
  name: string;
};

type CategoriesContextType = {
  userCategories: Category[];
  softwareCategories: Category[];
  fetchUserCategories: () => void;
  fetchSoftwareCategories: () => void;
  fetchSoftwareCategoryId: (categoryName: string) => void;
  loading: { user: boolean; software: boolean };
  error: { user: string; software: string };
};

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined
);

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [userCategories, setUserCategories] = useState<Category[]>([]);
  const [softwareCategories, setSoftwareCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState({ user: false, software: false });
  const [error, setError] = useState({ user: "", software: "" });

  const fetchUserCategories = async () => {
    setLoading((prev) => ({ ...prev, user: true }));
    try {
      const response = await getUserCategories();
      if (response.error) {
        throw new Error(response.error);
      }

      setUserCategories(response.categories || []);
    } catch (err) {
      setError((prev) => ({ ...prev, user: (err as Error).message }));
    } finally {
      setLoading((prev) => ({ ...prev, user: false }));
    }
  };

  const fetchSoftwareCategories = async () => {
    setLoading((prev) => ({ ...prev, software: true }));
    try {
      const response = await getSoftwareCategories();
      if (response.error) {
        throw new Error(response.error);
      }

      setSoftwareCategories(response.categories || []);
    } catch (err) {
      setError((prev) => ({ ...prev, software: (err as Error).message }));
    } finally {
      setLoading((prev) => ({ ...prev, software: false }));
    }
  };

  const fetchSoftwareCategoryId = async (categoryName: string) => {
    const { id, error } = await getSoftwareCategoryId(categoryName);
    if (error || !id) {
      console.log("Error:", error);
      return undefined;
    }
    return id;
  };

  useEffect(() => {
    fetchUserCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        userCategories,
        softwareCategories,
        fetchUserCategories,
        fetchSoftwareCategories,
        fetchSoftwareCategoryId,
        loading,
        error,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
};
