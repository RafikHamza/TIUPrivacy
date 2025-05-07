import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  children?: React.ReactNode;
}

const ProgressCircle = React.forwardRef<HTMLDivElement, ProgressCircleProps>(
  ({ value, size = 40, strokeWidth = 4, color, bgColor, children, className, ...props }, ref) => {
    const normalizedValue = Math.min(100, Math.max(0, value));
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (normalizedValue / 100) * circumference;
    
    return (
      <div
        ref={ref}
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={bgColor || "var(--muted)"}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={color || "var(--primary)"}
            fill="none"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        {children && (
          <div className="absolute inset-0 flex items-center justify-center">
            {children}
          </div>
        )}
      </div>
    );
  }
);

ProgressCircle.displayName = "ProgressCircle";

export { ProgressCircle };
