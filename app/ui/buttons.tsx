import Link from "next/link";
import Image from "next/image";

const buttonStyle =
  "whitespace-nowrap rounded-lg text-lg font-semibold border transition-all duration-300";
const linkStyle =
  "whitespace-nowrap rounded-lg py-1 px-4 text-lg font-semibold border transition-all duration-300";
const buttonHoverEffect =
  "hover:shadow-lg hover:shadow-[#00887A]/50 transition-shadow duration-300";
const linkHoverEffect =
  "hover:shadow-lg hover:shadow-[#122A73]/50 transition-shadow duration-300";

// Submit Button
interface StyledSubmitButtonProps {
  label: string | React.ReactNode;
  onClick: (event: React.FormEvent) => void;
  enableSave?: boolean;
  loading?: boolean;
  width?: string;
}

const StyledSubmitButton: React.FC<StyledSubmitButtonProps> = ({
  label,
  onClick,
  enableSave = true,
  loading = false,
  width,
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={!enableSave || loading}
      className={`${buttonStyle} ${
        width || "w-full mt-6 py-3 px-3"
      } text-center flex justify-center items-center ${
        enableSave
          ? `bg-[#00cdcf] text-white ${buttonHoverEffect} cursor-pointer`
          : "bg-gray-200 text-gray-400 cursor-not-allowed"
      }`}
    >
      {loading ? (
        <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
      ) : (
        label
      )}
    </button>
  );
};

// Link Button
interface StyledLinkButtonProps {
  href: string;
  label: string;
}

const StyledLinkButton: React.FC<StyledLinkButtonProps> = ({ href, label }) => {
  return (
    <Link
      href={href}
      className={`${linkStyle} bg-[#122A73] text-white ${linkHoverEffect}`}
    >
      {label}
    </Link>
  );
};

const StyledButton = ({
  label,
  type,
  onClick,
  loading,
  enableButtons = true,
  bgColor,
  padding,
  textColor,
}: {
  label: string;
  type?: "button" | "reset" | "submit" | undefined;
  onClick?: (state: any) => void;
  loading?: boolean;
  enableButtons?: boolean;
  bgColor?: string;
  padding?: string;
  textColor?: string;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`min-w-24 ${
        padding || "px-4 py-2"
      } rounded-md flex justify-center items-center whitespace-nowrap ${
        enableButtons
          ? `${
              textColor || "text-white"
            } font-bold transform transition-transform duration-500 ease-in-out hover:scale-95 cursor-pointer ${
              bgColor || "bg-blue-500"
            }`
          : "text-zinc-300 cursor-not-allowed bg-gray-500"
      }`}
    >
      {loading ? (
        <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
      ) : (
        label
      )}
    </button>
  );
};

const ButtonWithIcon = ({
  label,
  type,
  onClick,
  icon,
  altText,
  iconHeight,
  iconWidth,
}: {
  label: string;
  type?: "button" | "reset" | "submit" | undefined;
  onClick?: (state: any) => void;
  icon: string;
  altText?: string;
  iconHeight?: number;
  iconWidth?: number;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm hover:bg-gray-100 transition cursor-pointer"
    >
      <Image
        src={icon}
        alt={altText || "icon"}
        width={iconWidth || 15}
        height={iconHeight || 15}
      />
      {label}
    </button>
  );
};

export { StyledSubmitButton, StyledLinkButton, StyledButton, ButtonWithIcon };
