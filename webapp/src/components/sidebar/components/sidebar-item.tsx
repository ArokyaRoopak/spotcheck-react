import Icon from "../../icons";
import { IconType } from "../../icons/types";
import Text from "../../../components/text";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

// import { IconType } from "../../icons/types";

const SidebarItem: React.FC<{
  icon: IconType;
  label: string;
  isOpen: boolean;
  isSelected: boolean;
}> = ({ icon, label, isOpen, isSelected }) => {
  const navigate = useNavigate();

  const handleNavigation = useCallback(() => {
    navigate(`/${label.toLowerCase()}`);
  }, [label, navigate]);

  return (
    <div
      className={`flex group transition duration-300 ${
        isOpen ? "justify-start" : "justify-center"
      } items-center gap-3 cursor-pointer max-h-[32px] h-8 sm:min-h-[36px] sm:h-9  px-4 p
      y-2 ${
        isSelected ? "border-0  border-l-4 border-yellow-500 " : " border-0"
      } `}
      onClick={handleNavigation}
    >
      <div className="min-w-[24px] min-h-[24px] mt-0.5 transition duration-300 group-hover:scale-110">
        <Icon
          icon={icon}
          color="fill-white stroke-white"
          size="20"
          viewBox="0 0 24 24"
        />
      </div>
      {/* {isOpen ? <Text className=" text-base text-white">{label}</Text> : <></>} */}
      <Text
        className={`transition duration-300 text-base text-white cursor-pointer  ${
          isOpen ? "" : "hidden"
        }`}
      >
        {label}
      </Text>
    </div>
  );
};

export default SidebarItem;
