import React from "react";
import { IconComponentProps } from "../types";

export function ChevronUp({
  size,
  viewBox,
  color,
  onClick,
}: IconComponentProps) {
  return (
    <svg
      width={size || "16"}
      height={size || "16"}
      viewBox={viewBox ?? `0 0 ${size || "16"} ${size || "16"}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={`m-0 ${onClick != null ? "cursor-pointer" : ""}`}
    >
      <path
        d="M12 9.83334L8.23573 6.06907C8.10553 5.93887 7.89447 5.93887 7.76427 6.06907L4 9.83334"
        className={` ${color}`}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
