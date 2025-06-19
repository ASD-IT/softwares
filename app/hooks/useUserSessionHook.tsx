"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserCategoryByName } from "../lib/queries/categories";
import { getUserById } from "../lib/queries/users";

const useUserSessionHook = () => {
  const { data: session, status } = useSession();
  const [userDetail, setUserDetail] = useState<any>(undefined);
  const [userCategory, setUserCategory] = useState<any>();

  const fetchUser = async (userid: string) => {
    const response = await getUserById(userid);
    setUserDetail(response.user);
  };

  useEffect(() => {
    if (session) {
      fetchUser(session?.user.id);
    }
  }, [session]);

  const getUserCategory = async () => {
    const response = await getUserCategoryByName("IT");
    if (response.error) return undefined;

    setUserCategory(response.category);
  };

  // Get user category if IT
  useEffect(() => {
    if (userDetail && userDetail?.role.toLowerCase() === "it") {
      getUserCategory();
    }
  }, [userDetail]);

  // Basic details
  const userLogged: any = userDetail || null;
  const userId = userLogged?.id;
  const isAdmin = userLogged?.role.toLowerCase() === "admin";
  const userName = userLogged?.name || userLogged?.username;

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
