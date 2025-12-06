import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BottleIcon } from "./BottleIcon";
import { Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogBottleButtonProps {
  onLog: (count: number) => void;
}

export const LogBottleButton = ({ onLog }: LogBottleButtonProps) => {
  const [isLogging, setIsLogging] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [count, setCount] = useState(1);

  const handleLog = () => {
    setIsLogging(true);
    setTimeout(() => {
      onLog(count);
      setIsLogging(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setCount(1);
      }, 1500);
    }, 500);
  };

  return (
    <div className="gradient-card rounded-2xl p-6 shadow-card border border-border/50 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">Log Bottles</h3>
          <p className="text-sm text-muted-foreground">
            Record recycled bottles
          </p>
        </div>
        <div className="animate-float">
          <BottleIcon size={40} className="text-primary" />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-5">
        <Button
          variant="eco-outline"
          size="icon"
          onClick={() => setCount(Math.max(1, count - 1))}
          disabled={count <= 1 || isLogging}
        >
          <span className="text-xl">−</span>
        </Button>
        <div className="flex-1 text-center">
          <span className="text-5xl font-bold text-gradient-eco">{count}</span>
          <p className="text-sm text-muted-foreground mt-1">
            {count === 1 ? "bottle" : "bottles"}
          </p>
        </div>
        <Button
          variant="eco-outline"
          size="icon"
          onClick={() => setCount(count + 1)}
          disabled={isLogging}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <Button
        variant="eco"
        size="lg"
        className={cn(
          "w-full transition-all duration-500",
          showSuccess && "bg-eco-forest"
        )}
        onClick={handleLog}
        disabled={isLogging}
      >
        {isLogging ? (
          <span className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Logging...
          </span>
        ) : showSuccess ? (
          <span className="flex items-center gap-2 animate-count-up">
            <Check className="w-5 h-5" />
            Logged Successfully!
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <BottleIcon size={20} />
            Log {count} {count === 1 ? "Bottle" : "Bottles"}
          </span>
        )}
      </Button>
    </div>
  );
};
