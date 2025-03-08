import React from "react";
import { IconComponentProps } from "../types";

export function TrendingDown({
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
      className={`${style} ${color} fill-none`}
    >
      <path d="M21 12a1 1 0 0 0-2 0v2.3l-4.24-5a1 1 0 0 0-1.27-.21L9.22 11.7 4.77 6.36a1 1 0 1 0-1.54 1.28l5 6a1 1 0 0 0 1.28.22l4.28-2.57 4 4.71H15a1 1 0 0 0 0 2h5a1.1 1.1 0 0 0 .36-.07l.14-.08a1.19 1.19 0 0 0 .15-.09.75.75 0 0 0 .14-.17 1.1 1.1 0 0 0 .09-.14.64.64 0 0 0 .05-.17A.78.78 0 0 0 21 17z" />
    </svg>
  );
}
