"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

// Constants / Hooks
import useUserSessionHook from "@/app/hooks/useUserSessionHook";
import { bgColors } from "@/app/lib/constants/themes";
import { USER_CATEGORIES } from "@/app/lib/constants";
import { getUserCategoryById } from "@/app/lib/queries/categories";

// Components
import { Snippet } from "@heroui/react";

const GENERAL_MENU = [
  {
    title: "Windows",
    href: "/softwares/windows",
    icon: "/images/windows-white.svg",
  },
  {
    title: "Mac",
    href: "/softwares/mac",
    icon: "/images/apple-white.svg",
  },
];

const ADMIN_MENU = [
  ...GENERAL_MENU,
  {
    title: "Settings",
    href: "/admin/settings",
    icon: "/images/settings-white.svg",
  },
];

const MenuList = ({ menu, userCategory }: any) => {
  const pathname = usePathname();

  return menu.map((item: any, index: number) => {
    const isActive = pathname === item.href;
    return (
      <Link
        href={
          userCategory
            ? `${item.href}?userCategory=${userCategory.id}`
            : item.href
        }
        key={index}
        className={`w-full inline-flex items-center gap-4 text-white font-semibold py-2 lg:py-5 px-2 rounded-md hover:bg-blue-500 hover:text-white ${
          isActive ? "bg-blue-500" : `${bgColors.main}`
        }`}
      >
        <span className="w-10 h-10 rounded-lg shadow-[0_3px_6px_rgba(83,108,167,0.16)] flex items-center justify-center">
          <Image
            src={item.icon}
            alt={item.title}
            width={25}
            height={25}
            className=""
          />
        </span>
        <h4 className="text-white">{item.title}</h4>
      </Link>
    );
  });
};

export default function Navbar({ userCategoryParam }: any) {
  const router = useRouter();
  const { status, userName, isAdmin } = useUserSessionHook();
  const [userCategory, setUserCategory] = useState<any>(undefined);

  const getUserCategory = async () => {
    const response = await getUserCategoryById(userCategoryParam);
    if (response.error) return undefined;

    setUserCategory(response.category);
  };

  useEffect(() => {
    if (userCategoryParam) getUserCategory();
  }, [userCategoryParam]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const menu = useMemo(() => {
    if (userName && isAdmin && !USER_CATEGORIES.includes(userCategory?.name)) {
      return ADMIN_MENU;
    }
    return GENERAL_MENU;
  }, [userCategory, userName]);

  const showLogout = useMemo(() => {
    return (
      userCategory?.name === "IT" ||
      (isAdmin && !USER_CATEGORIES.includes(userCategory?.name))
    );
  }, [userCategory, isAdmin]);

  return (
    <div className="flex h-full flex-col lg:w-64 lg:h-screen bg-gray-50 shadow-inner px-3 py-4 lg:px-2 lg:overflow-y-auto">
      {/* Title/Logo */}
      <div
        className={`w-full flex flex-col items-center justify-center py-4 gap-2 ${bgColors.main} rounded-md`}
      >
        <Image
          src="/images/asd-logo.webp"
          alt="ASD Logo"
          width={80}
          height={80}
          onClick={() => (showLogout ? null : router.push("/"))}
          className={showLogout ? "cursor-default" : "cursor-pointer"}
        />
        <h2 className="text-white font-semibold uppercase">ASD IT Downloads</h2>
        {showLogout && <span className="text-white">Hello, {userName}</span>}
      </div>

      {/* Menu or Loading */}
      {status === "loading" || !menu ? (
        <div className="flex grow flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-400 mb-4"></div>
          <span className="text-gray-700 text-lg">Loading menu...</span>
        </div>
      ) : (
        <>
          <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-4 py-4">
            <MenuList menu={menu} userCategory={userCategory} />

            {showLogout && (
              <div
                className={`inline-flex items-center gap-4 font-semibold py-2 lg:py-5 px-2 rounded-md ${bgColors.main} hover:bg-blue-500 hover:text-white cursor-pointer`}
                role="button"
                aria-label="Logout"
                onClick={handleLogout}
              >
                <span className="w-10 h-10 rounded-lg shadow-[0_3px_6px_rgba(83,108,167,0.16)] flex items-center justify-center">
                  <Image
                    src="/images/logout-white.svg"
                    alt="logout"
                    width={25}
                    height={25}
                  />
                </span>
                <h4 className="text-white">Logout</h4>
              </div>
            )}
          </div>

          {/* Helpdesk (fills remaining space) */}
          {!showLogout && (
            <div className="flex grow items-end justify-center rounded-md bg-cyan-100 p-2 lg:p-4">
              <Snippet
                size="sm"
                symbol="@"
                tooltipProps={{
                  color: "foreground",
                  content: "Email for Assistance",
                  disableAnimation: true,
                  placement: "top",
                  closeDelay: 0,
                }}
              >
                helpdesk@asd.edu.qa
              </Snippet>
            </div>
          )}
        </>
      )}
    </div>
  );
}
