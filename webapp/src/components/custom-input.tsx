import React from "react";

interface CustomInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className={`w-full p-3 border border-gray-200 rounded-lg bg-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    />
  );
};

export default CustomInput;
