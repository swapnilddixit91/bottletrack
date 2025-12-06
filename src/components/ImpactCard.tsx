import { Droplets, TreeDeciduous, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImpactCardProps {
  totalBottles: number;
}

const calculateImpact = (bottles: number) => ({
  waterSaved: Math.round(bottles * 3), // liters
  co2Reduced: Math.round(bottles * 0.082 * 10) / 10, // kg
  treesEquivalent: Math.round(bottles / 50 * 10) / 10,
});

export const ImpactCard = ({ totalBottles }: ImpactCardProps) => {
  const impact = calculateImpact(totalBottles);

  const impactItems = [
    {
      icon: Droplets,
      value: `${impact.waterSaved}L`,
      label: "Water Saved",
      color: "text-eco-sky",
      bg: "bg-eco-sky/10",
    },
    {
      icon: Zap,
      value: `${impact.co2Reduced}kg`,
      label: "CO₂ Reduced",
      color: "text-eco-sun",
      bg: "bg-eco-sun/10",
    },
    {
      icon: TreeDeciduous,
      value: impact.treesEquivalent.toString(),
      label: "Trees Equiv.",
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  return (
    <div className="gradient-card rounded-2xl p-5 shadow-card border border-border/50 animate-slide-up" style={{ animationDelay: "150ms" }}>
      <h3 className="text-lg font-bold text-foreground mb-4">Your Impact</h3>
      <div className="grid grid-cols-3 gap-3">
        {impactItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex flex-col items-center text-center p-3 rounded-xl bg-muted/30"
            >
              <div className={cn("p-2 rounded-lg mb-2", item.bg)}>
                <Icon className={cn("w-5 h-5", item.color)} />
              </div>
              <p className="text-xl font-bold text-foreground">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
