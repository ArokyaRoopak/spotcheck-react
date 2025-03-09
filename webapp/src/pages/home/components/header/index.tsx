import React, { useMemo } from "react";
import Text from "../../../../components/text";
import UserInfoCard from "./components/user-info";

const Header: React.FC<{ onToggleSideBar: () => void }> = ({
  onToggleSideBar,
}) => {
  const currentPage = window.location.pathname;
  const currentPageTitle = useMemo(() => {
    const path = currentPage.split("/").pop() || "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  }, [currentPage]);

  return (
    <div className=" min-h-[60px] h-[60px] lg:min-h-[80px] lg:h-[80px]  lg:pt-6   w-full flex justify-between items-center sm:pr-14 shadow-sm">
      <span className="block sm:hidden" onClick={onToggleSideBar}>
        <Text className=" text-black font-bold font-noto  text-3xl">SP</Text>
      </span>
      <Text className="hidden sm:inline-block text-black font-semibold text-2xl">
        {currentPageTitle}
      </Text>
      <div className="flex gap-4">
        <UserInfoCard />
      </div>
    </div>
  );
};

export default Header;
