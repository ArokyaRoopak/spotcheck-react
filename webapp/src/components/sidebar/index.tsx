import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SidebarItem from "./components/sidebar-item";
import { IconType } from "../icons/types";
import Text from "../text";

const menuItems = [
  { icon: IconType.DASHBOARD, label: "Dashboard" },
  { icon: IconType.PRODUCT, label: "Products" },
];

const Sidebar: React.FC<{
  isMobile: boolean;
  isOpen: boolean;
  toggleSidebar: () => void;
}> = ({ isMobile, isOpen, toggleSidebar }) => {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("sidebarOpen", isOpen.toString());
  }, [isOpen]);

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed sm:relative top-0 left-0 h-full flex flex-col gap-2 sm:gap-3 rounded-3xl mt-3 sm:m-0 max-h-[calc(100vh-34px)] bg-primary text-white py-4 transition-all duration-300 z-50 ${
          isOpen
            ? " w-64 translate-x-0"
            : isMobile
            ? "-translate-x-full"
            : "w-16"
        }`}
      >
        <div className="py-2 px-4" onClick={toggleSidebar}>
          <Text className="font-noto text-3xl text-white font-bold">SP</Text>
        </div>
        <span className="px-4" onClick={toggleSidebar}>
          <Text className="text-white text-xs cursor-pointer">MENU</Text>
        </span>
        <div className="flex flex-col gap-2 sm:gap-4">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              isOpen={isOpen}
              isSelected={location.pathname === `/${item.label.toLowerCase()}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
