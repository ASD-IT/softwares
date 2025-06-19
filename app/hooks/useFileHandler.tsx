import { generateStoredFilename } from "@/app/lib/utils";
import { removeDocument, uploadDocument } from "../lib/queries/file-uploads";

interface FileHandlerProps {
  setError: (state: string) => void;
}

const useFileHandler = ({ setError }: FileHandlerProps) => {
  const uploadFileToOneDrive = async (
    file: File,
    filename: string,
    filepath: string,
    onProgress?: (p: number) => void
  ) => {
    // 1) ask your server for an upload session
    const sessRes = await fetch("/api/onedrive/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename, filepath }),
    });

    const sessJson = await sessRes.json();
    if (!sessJson?.uploadUrl)
      throw new Error(
        "Failed to create upload session: " + JSON.stringify(sessJson)
      );

    const uploadUrl: string = sessJson.uploadUrl;

    // 2) upload in chunks to uploadUrl
    const chunkSize = 5 * 1024 * 1024; // 5MB
    let start = 0;
    let item: any = null;

    while (start < file.size) {
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      const contentRange = `bytes ${start}-${end - 1}/${file.size}`;

      const chunkRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          // note: do not send Authorization here — uploadUrl already has a token
          "Content-Range": contentRange,
        },
        body: chunk,
      });

      // successful final upload returns 200 or 201 with item JSON
      if (chunkRes.status === 200 || chunkRes.status === 201) {
        item = await chunkRes.json();
        // finished
        if (onProgress) onProgress(1);
        break;
      }

      // 202 Accepted => chunk accepted, continue
      if (chunkRes.status === 202) {
        // Optional: read response JSON to get nextExpectedRanges
        // const accepted = await chunkRes.json(); // some servers won't return JSON here
        start = end;
        if (onProgress) onProgress(end / file.size);
        continue;
      }

      // Any other status -> error (get text for debugging)
      const text = await chunkRes.text();
      throw new Error(`Chunk upload failed: ${chunkRes.status} ${text}`);
    }

    if (!item?.id) {
      throw new Error(
        "Upload did not return item id. Response: " + JSON.stringify(item)
      );
    }

    // 3) ask server to create an anonymous share link for that item id
    const linkRes = await fetch("/api/onedrive/create-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId: item.id }),
    });
    const linkJson = await linkRes.json();
    if (!linkJson?.webUrl) {
      // fallback: return Graph item webUrl if present
      return { item, publicUrl: item?.webUrl || null, linkRaw: linkJson };
    }

    return { item, publicUrl: linkJson.webUrl };
  };

  // File upload to storage - onedrive
  const handleUpload = async (file: File, type: string) => {
    try {
      if (type === "images") {
        const filename = generateStoredFilename(file.name);
        const filepath = `${type}/${filename}`;
        const formData = new FormData();
        formData.append("file", file);
        const response = await uploadDocument(filepath, formData);
        return response;
      } else {
        const filename = generateStoredFilename(file.name);
        const filepath = `${type}`;
        const { publicUrl, item } = await uploadFileToOneDrive(
          file,
          filename,
          filepath,
          (p) => {
            // optional progress callback: p is 0..1
            console.log(`upload progress: ${(p * 100).toFixed(1)}%`);
          }
        );
        return `${publicUrl}/${filename}`;
      }
    } catch (err) {
      console.log("Error uploading file:", err);
      setError("An error occurred while uploading the file. Please try again.");
    }
  };

  // File - upload or remove
  const handleFileProcess = async (file: any, type: string) => {
    // Upload new file
    if (file && file instanceof File) {
      const uploadedUrl = await handleUpload(file, type);

      return uploadedUrl;
    }
    return null;
  };

  // Handle Remove document
  const handleRemoveDocument = async (fileUrl: string, type: string) => {
    if (!fileUrl) return;

    const filename = decodeURIComponent(fileUrl.split("/").pop()!);
    const filepath = `${type}/${filename}`;
    const formData = new FormData();
    formData.append("filepath", filepath);

    try {
      if (type === "images") {
        await removeDocument(filepath);
      } else {
        await fetch("/api/delete", {
          method: "DELETE",
          body: formData,
        });
      }
    } catch (err) {
      console.error("Error removing file:", err);
      return { error: "Error removing document, Please try again!" };
    }
  };

  return {
    handleFileProcess,
    handleRemoveDocument,
  };
};

export default useFileHandler;
