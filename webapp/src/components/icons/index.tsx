import React from "react";
import { IconProps, IconType } from "./types";
import { DashboardIcon } from "./svgs/dasboard";
import { ProductIcon } from "./svgs/product";
import { TrendingDown } from "./svgs/trending-down";
import { TrendingUp } from "./svgs/trending-up";
import { ChevronUp } from "./svgs/chevron-up";

const getIcon = ({
  icon,
  color,
  size,
  viewBox,
  height,
  width,
  hoverStyle,
  style,
  onClick,
}: IconProps) => {
  switch (icon) {
    case IconType.DASHBOARD:
      return (
        <DashboardIcon
          color={color}
          size={size}
          viewBox={viewBox}
          style={style}
          onClick={onClick}
        />
      );
    case IconType.PRODUCT:
      return (
        <ProductIcon
          color={color}
          size={size}
          viewBox={viewBox}
          style={style}
          onClick={onClick}
        />
      );
    case IconType.TRENDING_DOWN:
      return (
        <TrendingDown
          color={color}
          size={size}
          viewBox={viewBox}
          style={style}
          onClick={onClick}
        />
      );
    case IconType.TRENDING_UP:
      return (
        <TrendingUp
          color={color}
          size={size}
          viewBox={viewBox}
          style={style}
          onClick={onClick}
        />
      );
    case IconType.CHEVRON_UP:
      return (
        <ChevronUp
          color={color}
          size={size}
          viewBox={viewBox}
          style={style}
          onClick={onClick}
        />
      );

    default:
      return <></>;
  }
};

export default function Icon({
  icon,
  color,
  size,
  height,
  width,
  viewBox,
  hoverStyle,
  style,
  onClick,
}: IconProps) {
  return getIcon({
    icon,
    color,
    size,
    viewBox,
    hoverStyle,
    height,
    width,
    style,
    onClick,
  });
}
