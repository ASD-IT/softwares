import Image from "next/image";

export const FileContainer = ({
  filename,
  containerProps,
  field,
}: {
  filename: any;
  containerProps: any;
  field?: string;
}) => {
  const { handleRemove, removeFile } = containerProps;
  const fileDisplayed = filename || undefined;

  return (
    <div className="flex flex-row items-center justify-center gap-4 relative w-full">
      {removeFile && (
        <span
          onClick={() => handleRemove(fileDisplayed, field)}
          className="absolute -top-4 right-0 w-5 h-5 rounded-full bg-gray-300 hover:bg-blue-200 flex items-center justify-center cursor-pointer"
        >
          <Image
            src="/images/xmark-black.svg"
            alt="file"
            width={10}
            height={10}
          />
        </span>
      )}
      <div
        className={`flex justify-center w-full rounded-md py-2 text-center ${
          fileDisplayed ? `bg-blue-500 text-white` : "bg-gray-200 text-zinc-600"
        }`}
      >
        {fileDisplayed || "No files uploaded"}
      </div>
    </div>
  );
};

export default function FileDisplay({
  handleRemove,
  filename,
  removeFile = true,
  field,
}: {
  handleRemove?: ((state: string) => void) | undefined;
  filename: any;
  removeFile?: boolean;
  field?: string;
}) {
  const containerProps = {
    handleRemove,
    removeFile,
  };

  return (
    <div className="flex w-full gap-4 relative py-2 flex-col">
      <h4 className="text-sm font-bold text-black">Uploaded {field}</h4>

      <FileContainer
        containerProps={containerProps}
        filename={filename}
        field={field}
      />
    </div>
  );
}
