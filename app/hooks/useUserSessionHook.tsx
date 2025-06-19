"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserCategoryByName } from "../lib/queries/categories";

const useUserSessionHook = () => {
  const { data: session, status } = useSession();
  const [userCategory, setUserCategory] = useState<any>();

  // Basic details
  const userLogged = session?.user || null;
  const userId = userLogged?.id;
  const isAdmin = userLogged?.role.toLowerCase() === "admin";
  const userName = userLogged?.name ?? userLogged?.username;

  const getUserCategory = async () => {
    const response = await getUserCategoryByName("IT");
    if (response.error) return undefined;

    setUserCategory(response.category);
  };

  // Get user category if IT
  useEffect(() => {
    if (userLogged && userLogged?.role.toLowerCase() === "it") {
      getUserCategory();
    }
  }, [userLogged]);

  return {
    status,
    userLogged,
    userId,
    isAdmin,
    userName,
    userCategory,
  };
};

export default useUserSessionHook;
