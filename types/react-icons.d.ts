import { IconType } from "react-icons";

declare module "react-icons/io" {
  export interface IconType {
    (props: { size?: number; color?: string; className?: string }): JSX.Element;
  }
}
