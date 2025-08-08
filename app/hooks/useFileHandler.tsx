import { generateStoredFilename } from "@/app/lib/utils";
import { removeDocument, uploadDocument } from "../lib/queries/file-uploads";

interface FileHandlerProps {
  setError: (state: string) => void;
}

const useFileHandler = ({ setError }: FileHandlerProps) => {
  // File upload to storage - onedrive
  const handleUpload = async (file: File, type: string) => {
    try {
      const filename = generateStoredFilename(file.name);
      if (type === "images") {
        const filename = generateStoredFilename(file.name);
        const filepath = `${type}/${filename}`;
        const formData = new FormData();
        formData.append("file", file);
        const response = await uploadDocument(filepath, formData);
        return response;
      } else {
        const filepath = `${type}`;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename", filename);
        formData.append("filepath", filepath);

        const res = await fetch("/api/uploads", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        return `${data.publicUrl}/${filename}`;
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
