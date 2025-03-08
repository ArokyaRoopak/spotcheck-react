import React from "react";
import { useAuth } from "../../../../../context/AuthContext";
import Text from "../../../../../components/text";

const UserInfoCard = () => {
  const { user } = useAuth();

  return (
    <div className="flex gap-2.5 ">
      <div className="w-8 h-8 sm:h-10 sm:w-10 rounded-full bg-gray-100 border border-gray-600"></div>
      <div className="hidden sm:flex flex-col ">
        <Text className=" text-sm">{user?.name ?? "Name"}</Text>
        <Text className=" text-xs text-gray-600">{user?.role ?? "Role"}</Text>
      </div>
    </div>
  );
};

export default UserInfoCard;
