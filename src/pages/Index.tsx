import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { EntryForm } from "@/components/EntryForm";
import { EntriesList } from "@/components/EntriesList";
import { QRScanner } from "@/components/QRScanner";
import { StatsOverview } from "@/components/StatsOverview";
import { BottleIcon } from "@/components/BottleIcon";
import { BottleEntry } from "@/types/entry";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "ecotrack_entries";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [entries, setEntries] = useState<BottleEntry[]>([]);
  const [latestEntry, setLatestEntry] = useState<BottleEntry | null>(null);
  const { toast } = useToast();

  // Load entries from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setEntries(parsed.map((e: BottleEntry) => ({
          ...e,
          createdAt: new Date(e.createdAt),
          submittedAt: e.submittedAt ? new Date(e.submittedAt) : null,
        })));
      } catch {
        console.error("Failed to parse stored entries");
      }
    }
  }, []);

  // Save entries to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const handleNewEntry = (entry: BottleEntry) => {
    setEntries((prev) => [entry, ...prev]);
    setLatestEntry(entry);
    toast({
      title: "Entry Created!",
      description: `QR code generated for ${entry.personName} with ${entry.bottleCount} bottles.`,
    });
  };

  const handleVerify = (entryId: string) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === entryId
          ? { ...e, status: "submitted" as const, submittedAt: new Date() }
          : e
      )
    );
    toast({
      title: "Bottles Verified!",
      description: "Entry marked as submitted successfully.",
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-5">
            {/* Hero */}
            <div className="gradient-eco rounded-2xl p-6 shadow-eco text-primary-foreground animate-slide-up">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm font-medium">
                    Welcome! 👋
                  </p>
                  <h2 className="text-2xl font-bold mt-1">Track Bottles</h2>
                  <p className="text-primary-foreground/80 text-sm mt-2">
                    Register & verify plastic bottle recycling
                  </p>
                </div>
                <div className="animate-float">
                  <BottleIcon size={64} className="text-primary-foreground/90" />
                </div>
              </div>
            </div>

            {/* Stats */}
            <StatsOverview entries={entries} />

            {/* Entry Form */}
            <EntryForm onSubmit={handleNewEntry} />

            {/* Latest Entry */}
            {latestEntry && latestEntry.status === 'pending' && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground">Latest Entry</h3>
                <div className="animate-slide-up">
                  <div className="gradient-card rounded-2xl p-4 shadow-card border border-primary/30">
                    <p className="text-sm text-muted-foreground mb-2">Show this QR when returning bottles:</p>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <BottleIcon size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-foreground">{latestEntry.personName}</p>
                        <p className="text-sm text-muted-foreground">{latestEntry.bottleCount} bottles</p>
                      </div>
                      <Button
                        variant="eco"
                        size="sm"
                        onClick={() => setActiveTab("entries")}
                      >
                        View QR
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Install App */}
            <div className="gradient-card rounded-2xl p-5 shadow-card border border-border/50 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-accent/20">
                  <Smartphone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Install App</h3>
                  <p className="text-sm text-muted-foreground">Add to home screen</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Install this app on your phone for quick access. Open browser menu and tap "Add to Home Screen".
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted rounded-lg p-3">
                <Download className="w-4 h-4" />
                <span>Works offline • No app store needed</span>
              </div>
            </div>
          </div>
        );

      case "entries":
        return <EntriesList entries={entries} />;

      case "scan":
        return <QRScanner entries={entries} onVerify={handleVerify} />;

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
