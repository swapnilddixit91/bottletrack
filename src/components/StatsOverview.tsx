import { BottleEntry } from "@/types/entry";
import { StatCard } from "./StatCard";
import { Users, Recycle, Clock, CheckCircle2 } from "lucide-react";

interface StatsOverviewProps {
  entries: BottleEntry[];
}

export const StatsOverview = ({ entries }: StatsOverviewProps) => {
  const totalBottles = entries.reduce((sum, e) => sum + e.bottleCount, 0);
  const pendingBottles = entries
    .filter((e) => e.status === "pending")
    .reduce((sum, e) => sum + e.bottleCount, 0);
  const submittedBottles = entries
    .filter((e) => e.status === "submitted")
    .reduce((sum, e) => sum + e.bottleCount, 0);
  const totalPeople = entries.length;

  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard
        title="Total People"
        value={totalPeople}
        icon={Users}
        delay={0}
      />
      <StatCard
        title="Total Bottles"
        value={totalBottles}
        icon={Recycle}
        delay={50}
      />
      <StatCard
        title="Pending"
        value={pendingBottles}
        subtitle="bottles"
        icon={Clock}
        delay={100}
      />
      <StatCard
        title="Submitted"
        value={submittedBottles}
        subtitle="bottles"
        icon={CheckCircle2}
        trend={
          submittedBottles > 0
            ? { value: Math.round((submittedBottles / totalBottles) * 100), isPositive: true }
            : undefined
        }
        delay={150}
      />
    </div>
  );
};
