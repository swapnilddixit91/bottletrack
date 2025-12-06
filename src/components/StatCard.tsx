import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  delay?: number;
}

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  delay = 0,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        "gradient-card rounded-2xl p-5 shadow-card border border-border/50 animate-slide-up",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {trend && (
          <span
            className={cn(
              "text-xs font-semibold px-2 py-1 rounded-full",
              trend.isPositive
                ? "bg-primary/10 text-primary"
                : "bg-destructive/10 text-destructive"
            )}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}%
          </span>
        )}
      </div>
      <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
      <p className="text-3xl font-bold text-foreground animate-count-up">
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      )}
    </div>
  );
};
