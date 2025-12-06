import { cn } from "@/lib/utils";

interface BottleIconProps {
  className?: string;
  size?: number;
  filled?: boolean;
}

export const BottleIcon = ({ className, size = 24, filled = true }: BottleIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("transition-all duration-300", className)}
    >
      {/* Bottle cap */}
      <rect
        x="9"
        y="1"
        width="6"
        height="3"
        rx="1"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Bottle neck */}
      <path
        d="M10 4V6C10 6 8 7 8 9V21C8 22.1046 8.89543 23 10 23H14C15.1046 23 16 22.1046 16 21V9C16 7 14 6 14 6V4"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Recycling symbol */}
      {filled && (
        <g opacity="0.3">
          <path
            d="M12 12L10 15H14L12 12Z"
            fill="white"
          />
          <path
            d="M11 16L12 18L13 16"
            stroke="white"
            strokeWidth="0.5"
          />
        </g>
      )}
    </svg>
  );
};
