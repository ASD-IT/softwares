import React from "react";

interface StyledInputProps {
  label: string;
  type: string;
  name?: string;
  value?: string | number;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
  border?: string;
  icon?: any;
  className?: string;
  required?: boolean;
  placeholder?: string;
}

const StyledInput: React.FC<StyledInputProps> = ({
  label,
  type,
  name,
  value,
  handleChange,
  readonly = false,
  border,
  placeholder = "Enter text",
  icon = undefined,
  className = "",
  required = false,
}) => {
  return (
    <div className="w-full flex flex-col">
      <label className="text-sm font-bold text-black">
        {label} {required && <span className="text-danger"> *</span>}
      </label>
      <div className="relative">
        <input
          readOnly={readonly}
          name={name}
          type={type}
          value={value || ""}
          className={`whitespace-nowrap rounded-lg bg-white border w-full focus:outline-0 ${
            readonly
              ? "cursor-not-allowed text-gray-600"
              : `${border} text-black`
          } ${className || "py-3 px-3"}`}
          onChange={handleChange}
          placeholder={placeholder}
        />
        {icon && icon}
      </div>
    </div>
  );
};

// Textarea
interface StyledTextareaProps {
  rows?: number;
  label: string;
  name: string;
  value: string | number;
  handleChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readonly?: boolean;
  border?: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
}

const StyledTextarea: React.FC<StyledTextareaProps> = ({
  rows,
  label,
  required,
  readonly,
  name,
  value,
  border,
  placeholder = "",
  className,
  handleChange,
}) => {
  return (
    <div className="w-full flex flex-col">
      <label className="text-sm font-bold text-black">
        {label} {required && <span className="text-danger"> *</span>}
      </label>
      <textarea
        rows={rows || 3}
        placeholder={placeholder}
        readOnly={readonly}
        name={name}
        value={value}
        className={`whitespace-nowrap rounded-lg py-3 px-3 bg-white border w-full focus:outline-0 ${
          readonly ? "cursor-not-allowed text-gray-600" : `${border} text-black`
        } ${className}`}
        onChange={handleChange}
      />
    </div>
  );
};

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  label,
  type,
  icon,
  containerClassName = "",
  inputClassName = "",
  handleChange,
  ...props
}) => (
  <div className={`w-full flex flex-col ${containerClassName}`}>
    {label && (
      <label className="text-black mb-1">
        {label}
        {props.required && <span className="text-danger"> *</span>}
      </label>
    )}
    <div className="relative">
      <input
        className={`whitespace-nowrap rounded-lg py-3 px-3 bg-white border w-full focus:outline-0 ${
          props.readOnly ? "cursor-not-allowed text-gray-600" : "text-black"
        } ${inputClassName}`}
        {...props}
        type={type}
        onChange={handleChange}
      />
      {icon && (
        <span className="absolute inset-y-0 right-3 flex items-center">
          {icon}
        </span>
      )}
    </div>
  </div>
);

export { StyledInput, StyledTextarea, InputWithIcon };
