import React from "react";
import { IconComponentProps } from "../types";

export function DashboardIcon({
  color = "fill-primary",
  size,
  height,
  width,
  viewBox,
  style,
  onClick,
}: IconComponentProps) {
  return (
    <svg
      width={size || "24"}
      height={size || "24"}
      viewBox={viewBox ?? `0 0 ${size || "24"} ${size || "24"}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${style} ${color} stroke-none`}
    >
      <rect x="2" y="2" width="9" height="11" rx="2"></rect>
      <rect x="13" y="2" width="9" height="7" rx="2"></rect>
      <rect x="2" y="15" width="9" height="7" rx="2"></rect>
      <rect x="13" y="11" width="9" height="11" rx="2"></rect>
    </svg>
  );
}
