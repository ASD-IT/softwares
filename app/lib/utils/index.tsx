// Generate Filename
export const generateStoredFilename = (originalName: string) => {
  const extension = originalName.split(".").pop() || "";
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, ""); // Remove extension
  const timestamp = new Date().getTime().toString().slice(-4);
  return `${nameWithoutExt}_${timestamp}.${extension}`;
};

export const extractOriginalFilename = (storedName: string) => {
  const parts = storedName.split(".");
  const extension = parts.pop(); // remove extension
  const base = parts.join("."); // handle dots in name

  const underscoreIndex = base.lastIndexOf("_");
  if (underscoreIndex === -1) return storedName;

  const originalBase = base.substring(0, underscoreIndex);
  return `${originalBase}.${extension}`;
};

export const firstLetterCapital = (text: string) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getBasePublicUrl = (fullUrl: string) => {
  const lastSlashIndex = fullUrl.lastIndexOf("/");
  if (lastSlashIndex === -1) return fullUrl;
  return fullUrl.slice(0, lastSlashIndex);
};
