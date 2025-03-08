import React from "react";
import Text from "../../../../components/text";
import UserInfoCard from "./components/user-info";

const Header: React.FC<{ onToggleSideBar: () => void }> = ({
  onToggleSideBar,
}) => {
  const currentPage = window.location.pathname;
  const currentPageTitle =
    (currentPage.split("/").pop() || "Dashboard").charAt(0).toUpperCase() +
    (currentPage.split("/").pop() || "Dashboard").slice(1);

  return (
    <div className=" min-h-[60px] h-[60px]  sm:min-h-[80px] sm:h-[80px]  w-full flex justify-between items-center sm:pr-14 shadow-sm">
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
