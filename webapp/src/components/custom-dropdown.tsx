import React, { useRef, useEffect } from "react";
import Icon from "./icons";
import { IconType } from "./icons/types";

interface CustomDropdownProps {
  options: string[];
  selectedOption: string;
  onOptionSelect: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selectedOption,
  onOptionSelect,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (value: string) => {
    onOptionSelect(value);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="border flex gap-2 items-center rounded-lg px-3 py-1 mx-1 text-xs sm:text-sm text-gray-700 transition-all duration-200 hover:bg-slate-200 cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedOption}
        <div className={`transition-all ${isDropdownOpen ? "" : "rotate-180"}`}>
          <Icon icon={IconType.CHEVRON_UP} color="stroke-gray-700" />
        </div>
      </div>
      {isDropdownOpen && (
        <div className="absolute z-10 bg-white border rounded-lg shadow-lg mt-1 ml-1">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-xs sm:text-sm"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
