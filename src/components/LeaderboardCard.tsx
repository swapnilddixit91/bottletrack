import { Trophy, Medal, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardUser {
  id: string;
  name: string;
  bottles: number;
  avatar?: string;
}

interface LeaderboardCardProps {
  users: LeaderboardUser[];
  currentUserId?: string;
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-5 h-5 text-eco-sun" />;
    case 2:
      return <Medal className="w-5 h-5 text-muted-foreground" />;
    case 3:
      return <Award className="w-5 h-5 text-eco-earth" />;
    default:
      return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">{rank}</span>;
  }
};

export const LeaderboardCard = ({ users, currentUserId }: LeaderboardCardProps) => {
  return (
    <div className="gradient-card rounded-2xl p-5 shadow-card border border-border/50 animate-slide-up" style={{ animationDelay: "200ms" }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-eco-sun/20">
          <Trophy className="w-5 h-5 text-eco-sun" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">Top Recyclers</h3>
          <p className="text-sm text-muted-foreground">This week</p>
        </div>
      </div>

      <div className="space-y-3">
        {users.map((user, index) => (
          <div
            key={user.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-muted/50",
              user.id === currentUserId && "bg-primary/5 border border-primary/20"
            )}
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <div className="flex items-center justify-center w-8 h-8">
              {getRankIcon(index + 1)}
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">
                {user.name}
                {user.id === currentUserId && (
                  <span className="text-xs text-primary ml-2">(You)</span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                {user.bottles.toLocaleString()} bottles
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                #{index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
