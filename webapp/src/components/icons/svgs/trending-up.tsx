import React from "react";
import { IconComponentProps } from "../types";

export function TrendingUp({
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
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  );
}
