import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";

interface ProgressChartProps {
  data: { day: string; bottles: number }[];
}

export const ProgressChart = ({ data }: ProgressChartProps) => {
  const totalWeek = data.reduce((sum, d) => sum + d.bottles, 0);
  const avgDaily = Math.round(totalWeek / data.length);

  return (
    <div className="gradient-card rounded-2xl p-5 shadow-card border border-border/50 animate-slide-up" style={{ animationDelay: "100ms" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-accent/20">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Weekly Progress</h3>
            <p className="text-sm text-muted-foreground">
              Avg. {avgDaily} bottles/day
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gradient-eco">{totalWeek}</p>
          <p className="text-xs text-muted-foreground">This week</p>
        </div>
      </div>

      <div className="h-[180px] -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBottles" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(145 65% 42%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(145 65% 42%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(150 15% 45%)" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(150 15% 45%)" }}
              dx={-5}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0 0% 100%)",
                border: "1px solid hsl(140 20% 88%)",
                borderRadius: "12px",
                boxShadow: "0 4px 20px hsl(150 30% 15% / 0.08)",
              }}
              labelStyle={{ color: "hsl(150 30% 15%)", fontWeight: 600 }}
              itemStyle={{ color: "hsl(145 65% 42%)" }}
              formatter={(value: number) => [`${value} bottles`, "Recycled"]}
            />
            <Area
              type="monotone"
              dataKey="bottles"
              stroke="hsl(145 65% 42%)"
              strokeWidth={3}
              fill="url(#colorBottles)"
              dot={{ fill: "hsl(145 65% 42%)", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: "hsl(145 65% 42%)", stroke: "white", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
