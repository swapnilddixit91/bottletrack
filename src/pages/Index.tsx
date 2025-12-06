import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { StatCard } from "@/components/StatCard";
import { LogBottleButton } from "@/components/LogBottleButton";
import { ProgressChart } from "@/components/ProgressChart";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { ImpactCard } from "@/components/ImpactCard";
import { BottleIcon } from "@/components/BottleIcon";
import { Recycle, Target, Calendar, MapPin, BarChart3, User, Settings, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockWeeklyData = [
  { day: "Mon", bottles: 12 },
  { day: "Tue", bottles: 8 },
  { day: "Wed", bottles: 15 },
  { day: "Thu", bottles: 10 },
  { day: "Fri", bottles: 18 },
  { day: "Sat", bottles: 22 },
  { day: "Sun", bottles: 14 },
];

const mockLeaderboard = [
  { id: "1", name: "Maria Garcia", bottles: 342 },
  { id: "2", name: "John Smith", bottles: 298 },
  { id: "current", name: "You", bottles: 247 },
  { id: "4", name: "Alex Chen", bottles: 201 },
  { id: "5", name: "Emma Wilson", bottles: 189 },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [totalBottles, setTotalBottles] = useState(247);
  const [todayBottles, setTodayBottles] = useState(14);
  const { toast } = useToast();

  const handleLogBottle = (count: number) => {
    setTotalBottles((prev) => prev + count);
    setTodayBottles((prev) => prev + count);
    toast({
      title: "🎉 Great job!",
      description: `You recycled ${count} ${count === 1 ? "bottle" : "bottles"}! Keep it up!`,
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-5">
            {/* Hero Section */}
            <div className="gradient-eco rounded-2xl p-6 shadow-eco text-primary-foreground animate-slide-up">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm font-medium">
                    Welcome back! 👋
                  </p>
                  <h2 className="text-2xl font-bold mt-1">Keep Recycling!</h2>
                  <p className="text-primary-foreground/80 text-sm mt-2">
                    You're making a difference
                  </p>
                </div>
                <div className="animate-float">
                  <BottleIcon size={64} className="text-primary-foreground/90" />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                title="Today"
                value={todayBottles}
                subtitle="bottles recycled"
                icon={Recycle}
                trend={{ value: 12, isPositive: true }}
                delay={50}
              />
              <StatCard
                title="Total"
                value={totalBottles}
                subtitle="all time"
                icon={Target}
                delay={100}
              />
            </div>

            {/* Log Bottle */}
            <LogBottleButton onLog={handleLogBottle} />

            {/* Weekly Progress */}
            <ProgressChart data={mockWeeklyData} />

            {/* Environmental Impact */}
            <ImpactCard totalBottles={totalBottles} />

            {/* Leaderboard */}
            <LeaderboardCard users={mockLeaderboard} currentUserId="current" />
          </div>
        );

      case "stats":
        return (
          <div className="space-y-5">
            <div className="text-center py-8 animate-slide-up">
              <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-primary/10 mb-4">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Statistics</h2>
              <p className="text-muted-foreground mt-2">
                Detailed analytics coming soon
              </p>
            </div>
            <ProgressChart data={mockWeeklyData} />
            <ImpactCard totalBottles={totalBottles} />
          </div>
        );

      case "map":
        return (
          <div className="text-center py-12 animate-slide-up">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-accent/10 mb-4">
              <MapPin className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Collection Points</h2>
            <p className="text-muted-foreground mt-2 max-w-xs mx-auto">
              Find nearby recycling stations and collection points
            </p>
            <div className="mt-6 p-8 rounded-2xl bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground">
                Map integration coming soon
              </p>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="space-y-5 animate-slide-up">
            <div className="text-center py-6">
              <div className="w-24 h-24 rounded-full gradient-eco mx-auto flex items-center justify-center text-primary-foreground text-3xl font-bold shadow-eco">
                Y
              </div>
              <h2 className="text-2xl font-bold text-foreground mt-4">Your Profile</h2>
              <p className="text-muted-foreground">Eco Warrior Level 3</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <StatCard
                title="Total Bottles"
                value={totalBottles}
                icon={Recycle}
                delay={50}
              />
              <StatCard
                title="Rank"
                value="#3"
                subtitle="in your area"
                icon={Award}
                delay={100}
              />
            </div>

            <div className="gradient-card rounded-2xl p-5 shadow-card border border-border/50">
              <h3 className="font-bold text-foreground mb-4">Settings</h3>
              <div className="space-y-3">
                {[
                  { icon: User, label: "Edit Profile" },
                  { icon: Settings, label: "Preferences" },
                  { icon: Award, label: "Achievements" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="container px-4 py-5">{renderContent()}</main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
