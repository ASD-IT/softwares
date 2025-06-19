import { useMemo } from "react";

// Constants
import { iconFiles, softwareFiles } from "@/app/lib/constants";

// Components
import DragAndDrop from "../../common/drag-drop";
import FileDisplay from "../../common/file-display";

export default function UploadsSection({ details, handleChange }: any) {
  const { image, file } = details;

  //   Remove file
  const handleRemove = async (filename: string, field?: string) => {
    if (!filename) return null;
    handleChange(null, field);
  };

  // Get Filenames
  const imageName = useMemo(() => {
    if (!image) return null;

    if (image instanceof File) {
      return image?.name;
    }

    return image.split("/").pop();
  }, [image]);

  const fileName = useMemo(() => {
    if (!file) return null;

    if (file instanceof File) {
      return file?.name;
    }

    return file.split("/").pop();
  }, [file]);

  return (
    <>
      {imageName ? (
        <FileDisplay
          filename={imageName}
          handleRemove={handleRemove}
          removeFile={true}
          field="image"
        />
      ) : (
        <DragAndDrop
          setSelectedFiles={(file: File[], field) =>
            handleChange(file[0], field)
          }
          field="image"
          label="Software Icon"
          allowedTypes={iconFiles}
        />
      )}

      {fileName ? (
        <FileDisplay
          filename={fileName}
          handleRemove={handleRemove}
          removeFile={true}
          field="file"
        />
      ) : (
        <DragAndDrop
          setSelectedFiles={(file: File[], field) =>
            handleChange(file[0], field)
          }
          field="file"
          label="Software File"
          allowedTypes={softwareFiles}
          required={true}
        />
      )}
    </>
  );
}
