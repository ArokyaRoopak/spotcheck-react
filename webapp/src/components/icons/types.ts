export enum IconType {
  DASHBOARD,
  PRODUCT,
  TRENDING_DOWN,
  TRENDING_UP,
  CHEVRON_UP,
}

export interface IconProps {
  icon: IconType;
  color: string;
  size?: string;
  viewBox?: string;
  hoverStyle?: string;
  height?: string;
  width?: string;
  style?: string;
  onClick?: (e: React.MouseEvent<SVGElement>) => any;
}

export interface IconComponentProps {
  color: string;
  size?: string;
  viewBox?: string;
  height?: string;
  width?: string;
  hoverStyle?: string;
  style?: string;
  onClick?: (e: React.MouseEvent<SVGElement>) => any;
}
