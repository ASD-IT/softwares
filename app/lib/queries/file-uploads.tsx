import { supabase } from "../supabase-client";

// Upload Document to storage
export const uploadDocument = async (filepath: string, formData: any) => {
  try {
    const { error } = await supabase.storage
      .from("softwares-icons")
      .upload(filepath, formData, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      if (process.env.NODE_ENV !== "production") {
        console.log("Failed to upload document:", error);
      }
      throw new Error("Failed to upload document.");
    }

    const { data: urlData } = supabase.storage
      .from("softwares-icons")
      .getPublicUrl(filepath);

    return urlData.publicUrl || null;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.log("Failed to upload document:", error);
    }
    return { error: "Failed to upload document." };
  }
};

// Remove Document from storage
export const removeDocument = async (filepath: string) => {
  try {
    const { error } = await supabase.storage
      .from("softwares-icons")
      .remove([filepath]);

    if (error) {
      if (process.env.NODE_ENV !== "production") {
        console.log("Failed to remove document:", error);
      }
      throw new Error("Failed to remove document.");
    }

    return "Removed Successfully";
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.log("Failed to remove document:", error);
    }
    return { error: "Failed to remove document." };
  }
};
