import React, { useMemo, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { getBasePublicUrl } from "@/app/lib/utils";

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

  const imgUrl = useMemo(() => {
    if (image_url) return getBasePublicUrl(image_url);

    return null;
  }, []);

  const handleDownload = async () => {
    setLoading(true);
    try {
      if (file_url) {
        const parts = file_url.split("/");
        const filename = parts.pop(); // Last part is the filename
        const url = parts.join("/");
        const downloadApiUrl = `/api/download?url=${encodeURIComponent(
          url
        )}&filename=${encodeURIComponent(filename)}`;
        const a = document.createElement("a");
        a.href = downloadApiUrl;
        a.download = filename;
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
          src={imgUrl || "/images/download.png"}
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
        <button className={styles.button} onClick={handleDownload}>
          {loading ? "Downloading..." : "Download"}
        </button>
      </div>
    </div>
  );
};

export default SoftwareDetail;
