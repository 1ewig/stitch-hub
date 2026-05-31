import React from "react";
import { cn } from "../../lib/utils";

interface MetricGaugeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // percentage (0 to 100)
  title?: string;
  subtitle?: string;
  size?: number;
  strokeWidth?: number;
  isDashed?: boolean;
  type?: "circular" | "semicircular";
  trend?: "up" | "down";
}

export const MetricGauge = ({
  className,
  value,
  title,
  subtitle,
  size = 200,
  strokeWidth = 14,
  isDashed = true,
  type = "semicircular",
  trend,
  ...props
}: MetricGaugeProps) => {
  // Constants for calculations
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  let strokeDasharray = "";
  let strokeDashoffset = 0;
  let rotationAngle = -90; // Default starting from top for circular

  if (type === "semicircular") {
    // Semicircle sweep is 180 degrees
    const circumference = radius * Math.PI;
    const filledLength = (value / 100) * circumference;
    
    strokeDasharray = isDashed ? "3 12" : `${circumference}`;
    // For semicircular we draw 180 deg sweep starting from bottom-left (180deg angle)
    rotationAngle = 180;
    // We adjust strokeDashoffset for smooth filled sweep
    strokeDashoffset = circumference - filledLength;
  } else {
    // Full circle sweep is 360 degrees
    const circumference = 2 * radius * Math.PI;
    const filledLength = (value / 100) * circumference;
    
    strokeDasharray = isDashed ? "3 12" : `${circumference}`;
    strokeDashoffset = circumference - filledLength;
  }

  return (
    <div
      className={cn("flex flex-col items-center justify-center relative", className)}
      style={{ width: size, height: type === "semicircular" ? size / 2 + 20 : size }}
      {...props}
    >
      <svg
        width={size}
        height={type === "semicircular" ? size / 2 + 20 : size}
        viewBox={`0 0 ${size} ${type === "semicircular" ? size / 2 + 20 : size}`}
        className="transform overflow-visible"
      >
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary-400)" />
            <stop offset="100%" stopColor="var(--color-primary-600)" />
          </linearGradient>
        </defs>

        {type === "semicircular" ? (
          <>
            {/* Background semi-circular arc */}
            <path
              d={`M ${strokeWidth/2},${center} A ${radius},${radius} 0 0,1 ${size - strokeWidth/2},${center}`}
              fill="none"
              stroke="var(--color-neutral-100)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={isDashed ? "3 12" : undefined}
            />

            {/* Foreground active arc */}
            <path
              d={`M ${strokeWidth/2},${center} A ${radius},${radius} 0 0,1 ${size - strokeWidth/2},${center}`}
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={isDashed ? "3 12" : undefined}
              strokeDashoffset={(value / 100) * (radius * Math.PI)}
              className="transition-all duration-480 ease-spring"
              style={{
                strokeDasharray: isDashed ? "3 12" : `${radius * Math.PI}`,
                strokeDashoffset: radius * Math.PI - (value / 100) * (radius * Math.PI)
              }}
            />
          </>
        ) : (
          <>
            {/* Background full circular arc */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="var(--color-neutral-100)"
              strokeWidth={strokeWidth}
              strokeDasharray={isDashed ? "3 12" : undefined}
            />

            {/* Foreground active arc */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth={strokeWidth}
              strokeDashoffset={strokeDashoffset}
              strokeDasharray={strokeDasharray}
              transform={`rotate(${rotationAngle} ${center} ${center})`}
              strokeLinecap="round"
              className="transition-all duration-480 ease-spring"
            />
          </>
        )}
      </svg>

      {/* Centered values display */}
      <div
        className={cn(
          "absolute flex flex-col items-center justify-center text-center",
          type === "semicircular" ? "bottom-2" : "inset-0"
        )}
      >
        <span className="text-3xl font-extrabold tracking-tight text-neutral-900 font-display">
          {value}%
        </span>
        {subtitle && (
          <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mt-1">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricGauge;
