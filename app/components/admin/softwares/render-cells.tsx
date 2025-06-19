"use client";
import React from "react";
import Image from "next/image";

import { USER_CATEGORY_SHORT_MAP } from "@/app/lib/constants";
import { StyledButton } from "@/app/ui/buttons";
import { extractOriginalFilename } from "@/app/lib/utils";

type RenderCellProps = {
  item: any;
  keyName: string;
  handleAction: (action: string, id?: string) => void;
};

const RenderCells = ({ item, keyName, handleAction }: RenderCellProps) => {
  switch (keyName) {
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <StyledButton
            label="Edit"
            padding="py-1"
            bgColor="bg-green-600"
            onClick={() => {
              handleAction("edit", item.id);
            }}
          />
          <StyledButton
            label="Delete"
            padding="py-1"
            bgColor="bg-red-500"
            onClick={() => {
              handleAction("delete", item.id);
            }}
          />
        </div>
      );
    case "image_url":
      const imageUrl = item?.[keyName];
      if (typeof imageUrl === "string" && imageUrl) {
        return <Image src={imageUrl} alt="icon" width={20} height={10} />;
      }
      return "-";
    case "file_url":
      const url = extractOriginalFilename(item?.[keyName]);
      if (typeof url === "string" && url) {
        const filename = url.split("/").pop();
        return filename || "-";
      }
      return "-";
    case "user_category":
      const categories = item?.software_user_categories || [];
      const shortNames = categories.map((cat: any) => {
        const name = cat?.user_categories?.name || "";
        return USER_CATEGORY_SHORT_MAP[name] || name.slice(0, 2);
      });
      return shortNames.join(", ");
    case "instructions":
      return (
        <StyledButton
          label={item.instructions ? "View Instructions" : "Not available"}
          padding="py-1 px-4"
          bgColor="bg-blue-400"
          onClick={() => {
            item.instructions ? handleAction("view", item.instructions) : null;
          }}
        />
      );
    default:
      return item?.[keyName as keyof typeof item] || "-";
  }
};

export default RenderCells;
