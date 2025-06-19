"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { lusitana } from "@/app/fonts";
import { bgColors } from "@/app/lib/constants/themes";

interface PageHeaderProps {
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ subtitle }) => {
  const router = useRouter();

  return (
    <div
      className={`${bgColors.main} ${lusitana.className} relative rounded-lg p-2 flex flex-col md:flex-row items-center justify-between`}
    >
      {/* Logo */}
      <div className="z-10">
        <Image
          alt="ASD School Logo"
          src="/images/asd-logo.webp"
          width={200}
          height={100}
          className="w-24 md:w-36 lg:w-48 h-auto opacity-70 cursor-pointer"
          onClick={() => router.push("/")}
        />
      </div>

      {/* Title */}
      <div className="md:absolute inset-0 flex flex-col items-center justify-center text-white uppercase space-y-1 md:space-y-2 z-0 text-center md:pl-12 tracking-wide">
        <p className="text-lg md:text-3xl lg:text-4xl font-bold">
          ASD IT Downloads
        </p>
        <p className="text-xs md:text-base font-semibold">{subtitle}</p>
      </div>
    </div>
  );
};

export default PageHeader;
