import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "icon";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, disabled, ...props }, ref) => {
    const baseStyle =
      "inline-flex items-center justify-center font-medium rounded-md transition-all duration-140 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 active:scale-97 select-none";

    const variantStyles = {
      primary:
        "bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white px-4 py-2 text-sm shadow-sm",
      secondary:
        "bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 text-neutral-900 px-4 py-2 text-sm",
      outline:
        "border border-neutral-200 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-neutral-900 px-4 py-2 text-sm shadow-xs",
      ghost:
        "hover:bg-neutral-100 active:bg-neutral-200 text-neutral-700 px-4 py-2 text-sm",
      icon:
        "p-2 rounded-full hover:bg-neutral-100 active:bg-neutral-200 text-neutral-500 hover:text-neutral-900"
    };

    const disabledStyle = "opacity-45 pointer-events-none cursor-not-allowed";

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          baseStyle,
          variantStyles[variant],
          disabled && disabledStyle,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
