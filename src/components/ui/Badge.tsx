import React from "react";
import { cn } from "../../lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "critical" | "info";
  children: React.ReactNode;
}

export const Badge = ({
  className,
  variant = "primary",
  children,
  ...props
}: BadgeProps) => {
  const variantStyles = {
    primary: "bg-primary-50 text-primary-700 border-primary-100",
    secondary: "bg-neutral-100 text-neutral-700 border-neutral-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
    critical: "bg-red-50 text-red-700 border-red-100",
    info: "bg-sky-50 text-sky-700 border-sky-100"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border tracking-widest uppercase text-[10px]",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
