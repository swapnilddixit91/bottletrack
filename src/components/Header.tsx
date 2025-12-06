import { Leaf } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/50">
      <div className="container flex items-center justify-center h-16 px-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl gradient-eco shadow-eco">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-bold text-foreground">EcoTrack</h1>
            <p className="text-xs text-muted-foreground">Bottle Tracker</p>
          </div>
        </div>
      </div>
    </header>
  );
};
