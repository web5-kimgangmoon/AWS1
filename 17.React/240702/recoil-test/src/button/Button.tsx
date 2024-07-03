import { ReactNode, MouseEvent } from "react";

export type colorEnum = "SKY" | "GREEN" | "RED" | "ORANGE" | "WHITE";

export interface IProps {
  color: colorEnum;
  children: string | ReactNode;
  onClick?: () => void;
}
export const ButtonClassName = `px-3 py-1 font-semibold rounded-full transition-colors shadow `;
const Button = ({ color, children, onClick }: IProps): JSX.Element => {
  const colorENum =
    color === "SKY"
      ? 0
      : color === "GREEN"
      ? 1
      : color === "RED"
      ? 2
      : color === "ORANGE"
      ? 3
      : 4;
  const bgColor: Array<[string, string]> = [
    ["bg-sky-300", "hover:bg-sky-100"],
    ["bg-green-300", "hover:bg-green-100"],
    ["bg-red-300", "hover:bg-red-100"],
    ["bg-orange-200", "hover:bg-orange-400"],
    ["bg-white", "bg-white"],
  ];

  return (
    <button
      type="button"
      className={
        ButtonClassName + `${bgColor[colorENum][0]} ${bgColor[colorENum][1]}`
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
