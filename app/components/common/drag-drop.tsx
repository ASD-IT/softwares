"use client";
import { useState } from "react";

// Data
import { classes } from "@/app/lib/constants";

export default function DragAndDrop({
  label,
  setSelectedFiles,
  allowedTypes,
  required = false,
  field,
}: {
  label: string;
  setSelectedFiles: (state1: any, state2: string) => void;
  allowedTypes?: string[];
  required?: boolean;
  field: string;
}) {
  const [error, setError] = useState("");

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  //   Dropping files
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setError("");

    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      handleFileValidation(droppedFiles);
    }
  };

  //   Browse input
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (e.target.files) {
      const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
      handleFileValidation(selectedFiles);
    }
  };

  //   Files validation
  const handleFileValidation = (files: File[]) => {
    const validFiles = files.filter((file) => {
      const extension = file.name
        .slice(file.name.lastIndexOf("."))
        .toLowerCase();
      if (!allowedTypes?.includes(extension)) {
        setError("Only specified files are allowed.");
        return false;
      }
      const invalidCharacters = /[^a-zA-Z0-9._-]/;
      if (
        invalidCharacters.test(file.name.replace(/[-_]/g, "")) ||
        /\s/.test(file.name)
      ) {
        setError(
          "Please ensure Filenames do not contain special characters or spaces, except underscores or hyphens."
        );
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setSelectedFiles(validFiles, field);
      const fileInput = document.getElementById(
        field
      ) as HTMLInputElement | null;
      if (fileInput) {
        fileInput.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col h-auto gap-1 w-full">
      <label className="text-sm font-bold text-black">
        {label} {required && <span className="text-danger"> *</span>}
      </label>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`${classes.inputBox} border-dashed text-center cursor-pointer`}
      >
        <div className="flex flex-col w-full items-center justify-center">
          <input
            type="file"
            onChange={(e) => handleFileSelect(e)}
            style={{ display: "none" }}
            id={field}
            name={field}
            accept={allowedTypes?.join(", ")}
          />
          <label
            htmlFor={field}
            className="text-[#08649e] cursor-pointer w-full font-semibold"
          >
            Browse files
          </label>
          <p className="text-sm">Drag and drop files here</p>
        </div>
      </div>

      {/* Instruction */}
      <span className="text-xs text-gray-600 font-semibold tracking-wider">
        {`Filetypes allowed are ${allowedTypes?.join(", ") || "none"}.`}
      </span>

      {/* Error */}
      {error && <p className="text-danger text-center">{error}</p>}
    </div>
  );
}
