import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { extractOriginalFilename } from "@/app/lib/utils";

interface SoftwareDetailProps {
  software: any;
  handleInstructions: (instructions: string) => void;
}

const SoftwareDetail: React.FC<SoftwareDetailProps> = ({
  software,
  handleInstructions,
}) => {
  const { name, description, instructions, image_url, file_url } = software;
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      if (file_url) {
        // Wait for UI to update first
        await new Promise((resolve) => setTimeout(resolve, 50));

        const parts = file_url.split("/");
        const filename = extractOriginalFilename(parts.pop());
        const url = parts.join("/");

        const res = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
        const { downloadUrl } = await res.json();

        if (!downloadUrl) {
          throw new Error("Unable to get download link");
        }

        // Step 2: Trigger direct browser download from OneDrive
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = filename; // This may be ignored if OneDrive sets its own filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className="flex items-center gap-4">
        <Image
          src={image_url || "/images/download.png"}
          alt={name}
          width={100}
          height={100}
          className="w-16 h-16 object-contain rounded-md border bg-blue-100"
        />
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm line-clamp-2">{description}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handleInstructions(instructions)}
          className="text-sm px-3 py-1.5 rounded-md bg-blue-100 text-blue-800 hover:bg-blue-200 transition"
        >
          View Instructions
        </button>
        <button
          className={styles.button}
          onClick={handleDownload}
          disabled={loading}
        >
          {loading ? "Downloading..." : "Download"}
        </button>
      </div>
    </div>
  );
};

export default SoftwareDetail;
