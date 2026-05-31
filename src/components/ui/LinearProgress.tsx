import React from "react";
import { cn } from "../../lib/utils";

interface LinearProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // percentage (0 to 100)
  colorClass?: string;
  height?: number;
}

export const LinearProgress = ({
  className,
  value,
  colorClass = "bg-primary-500",
  height = 8,
  ...props
}: LinearProgressProps) => {
  const cappedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn("w-full bg-neutral-100 rounded-full overflow-hidden", className)}
      style={{ height }}
      {...props}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-480 ease-spring", colorClass)}
        style={{ width: `${cappedValue}%` }}
      />
    </div>
  );
};

export default LinearProgress;
