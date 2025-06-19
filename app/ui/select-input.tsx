import { StyledInput } from "@/app/ui/inputs";
import React, { useState, useRef, useMemo, useEffect } from "react";

interface SelectProps {
  label?: string;
  options: any[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  className?: string;
  multiple?: boolean;
  readonly?: boolean;
}

const SelectInput: React.FC<SelectProps> = ({
  label = "",
  options,
  value,
  onChange,
  placeholder = "Select...",
  className = "",
  multiple = false,
  readonly = false,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isSelected = (val: string) =>
    multiple ? (value as string[]).includes(val) : value === val;

  const filteredOptions = useMemo(() => {
    let filtered = options;

    if (query) {
      filtered = filtered.filter((option) =>
        option?.label?.toLowerCase().includes(query.toLowerCase())
      );
    }

    return filtered;
  }, [options, query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);

    // If input is cleared, also clear the selected value
    if (input === "" && !multiple) {
      onChange("");
    }
    setIsOpen(input !== "");
  };

  const handleSelect = (selectedValue: string) => {
    if (multiple) {
      const current = value as string[];
      if (current.includes(selectedValue)) {
        onChange(current.filter((v) => v !== selectedValue));
      } else {
        onChange([...current, selectedValue]);
      }
      setQuery("");
    } else {
      onChange(selectedValue);
      setQuery(options.find((opt) => opt.value === selectedValue)?.label || "");
      setIsOpen(false);
    }
  };

  // Hide dropdown when clicking outside
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const displayValue = useMemo(() => {
    if (readonly) return value as string;
    if (multiple) return "";

    const selected = options?.find((o) => o.value === value);
    return selected?.label || "";
  }, [value, options, multiple]);

  useEffect(() => {
    if (!multiple) {
      const selected = options?.find((o) => o.value === value);
      setQuery(selected?.label || "");
    }
  }, [value, options]);

  // Dynamically position dropdown above or below
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      setDropUp(spaceBelow < 200 && spaceAbove > spaceBelow);
    }
  }, [isOpen]);

  return (
    <div
      className="w-full relative"
      ref={containerRef}
      tabIndex={-1}
      onBlur={handleBlur}
      onFocus={() => setIsOpen(true)}
    >
      <StyledInput
        label={label}
        type="text"
        placeholder={placeholder}
        value={query || displayValue}
        readonly={readonly}
        handleChange={handleInputChange}
        className={className}
      />

      {multiple && options && (value as string[]).length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {(value as string[]).map((val) => {
            const label = options?.find((o) => o.value === val)?.label || val;
            return (
              <span
                key={val}
                className="bg-gray-200 px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {label}
                <button
                  className="text-red-500 ml-1"
                  onClick={() =>
                    onChange((value as string[]).filter((v) => v !== val))
                  }
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}

      {isOpen && !readonly && (
        <div
          className={`absolute ${dropUp ? "bottom-full mb-1" : "top-full mt-1"} 
            border rounded-md shadow-sm max-h-60 overflow-y-auto bg-white z-10 w-full text-black ${className}`}
        >
          {filteredOptions?.length === 0 ? (
            <div className="px-3 py-2 text-gray-500">No results</div>
          ) : (
            filteredOptions?.map((option) => (
              <div
                key={option?.key}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center ${
                  isSelected(option.value) ? "bg-gray-100 font-medium" : ""
                }`}
                tabIndex={0}
                onClick={() => handleSelect(option.value)}
              >
                <span>{option.label}</span>
                {isSelected(option.value) && <span>✓</span>}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SelectInput;
