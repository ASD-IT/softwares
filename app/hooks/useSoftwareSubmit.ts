"use client";
import { useToast } from "../context/toast-context";
import useFileHandler from "./useFileHandler";

// Queries
import {
  deleteSoftware,
  mapUserToSoftware,
  updateSoftware,
  uploadSoftware,
  upsertUserToSoftware,
} from "../lib/queries/softwares";

export const useSoftwareSubmit = ({
  categoryId,
  softwareDetail,
  updatedDetail,
  setLoading,
  setError,
  onClose,
  refetchdata,
  selectedSoftware,
}: any) => {
  const { addToast } = useToast();
  const { handleFileProcess, handleRemoveDocument } = useFileHandler({
    setError,
  });

  // Create New Software
  const addNewSoftware = async () => {
    const { name, description, instructions, image, file, userCategoryIds } =
      softwareDetail;

    // Step1: Upload Image
    const imageFile = image;
    const imageUrl = await handleFileProcess(imageFile, "images");
    if (imageFile instanceof File && !imageUrl) {
      throw new Error("Error Uploading Icon image, Please try again!");
    }

    // Step2: Upload File
    const softwareFile = file;
    const softwareFileUrl = await handleFileProcess(softwareFile, "files");
    if (softwareFile instanceof File && !softwareFileUrl) {
      throw new Error("Error Uploading the software file, Please try again!");
    }

    // Step3: Upload the detail with the urls
    const softwareData = {
      name,
      description,
      instructions,
      image_url: imageUrl,
      file_url: softwareFileUrl,
      category_id: categoryId,
    };
    const response = await uploadSoftware(softwareData);
    if (response.error) {
      throw new Error("Error Uploading the software, Please try again!");
    }

    // Step4: Map with User categories
    const relationData = userCategoryIds.map((userCatId: string) => ({
      software_id: response.softwareId,
      user_category_id: userCatId,
    }));

    const mapResponse = await mapUserToSoftware(relationData);
    if (mapResponse.error) {
      throw new Error("Error mapping user and software, Please try again!");
    }

    addToast("Successfully uploaded Software", "success");
    await refetchdata(categoryId);
    onClose();
  };

  // Update Software
  const editSoftware = async () => {
    let data = updatedDetail;
    // Step1: Upload New Image & delete old
    if ("image" in updatedDetail) {
      const imageFile = updatedDetail.image;

      // Case 1: New image uploaded
      if (imageFile instanceof File) {
        const imageUrl = await handleFileProcess(imageFile, "images");
        if (selectedSoftware.image_url) {
          await handleRemoveDocument(selectedSoftware.image_url, "images");
        }
        data.image_url = imageUrl;
      }

      // Case 2: Image removed & no new image
      else if (imageFile === null && selectedSoftware.image_url) {
        await handleRemoveDocument(selectedSoftware.image_url, "images");
        data.image_url = "removed";
      }
    }

    // Step2: Upload New File & delete old
    if ("file" in updatedDetail) {
      const softwareFile = updatedDetail.file;

      const softwareFileUrl = await handleFileProcess(softwareFile, "files");
      // Delete old file
      if (selectedSoftware.file_url) {
        await handleRemoveDocument(selectedSoftware.file_url, "files");
      }
      data.file_url = softwareFileUrl;
    }

    // Step3: Upload the detail with the urls
    const softwareData = {
      ...(data.name && { name: data.name }),
      ...(data.description && { description: data.description }),
      ...(data.instructions && { instructions: data.instructions }),
      ...((data.image_url || data.image_url === "removed") && {
        image_url: data.image_url === "removed" ? null : data.image_url,
      }),
      ...(data.file_url && { file_url: data.file_url }),
    };
    const response = await updateSoftware(selectedSoftware.id, softwareData);
    if (response.error) {
      throw new Error("Error Uploading the software, Please try again!");
    }

    // Step4: Map with User categories
    if ("userCategoryIds" in updatedDetail) {
      const mapResponse = await upsertUserToSoftware(
        selectedSoftware.id,
        updatedDetail.userCategoryIds
      );
      if (mapResponse.error) {
        throw new Error("Error mapping user and software, Please try again!");
      }
    }

    addToast("Successfully updated Software", "success");
    await refetchdata(categoryId);
    onClose();
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (updatedDetail) {
        await editSoftware();
      } else {
        await addNewSoftware();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteSoftware(selectedSoftware.id);

      if (response.error) {
        throw new Error("Error deleting the software.");
      }

      // Remove Image & File
      await handleRemoveDocument(selectedSoftware.image_url, "images");
      await handleRemoveDocument(selectedSoftware.file_url, "files");

      addToast("Successfully deleted successfully", "success");
      await refetchdata(categoryId);
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, handleDelete };
};
