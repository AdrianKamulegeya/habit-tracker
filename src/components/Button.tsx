import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ButtonsProps = {
  variant?: "primary" | "secondary" | "ghost-destructive";
} & ComponentProps<"button">;

function Button({ variant = "primary", className, ...props }: ButtonsProps) {
  return (
    <button
      {...props}
      className={twMerge(
        `rounded px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed`,
        getVariantClasses(variant),
        className,
      )}
    ></button>
  );
}

function getVariantClasses(variant: ButtonsProps["variant"]) {
  switch (variant) {
    case "primary":
      return "bg-violet-600 hover:bg-violet-500";
    case "secondary":
      return "bg-zinc-700 hover:bg-zinc-600 text-zinc-400";
    case "ghost-destructive":
      return "text-red-800 hover:text-red-200 hover:bg-red-800";
    default:
      return "";
  }
}

export default Button;
