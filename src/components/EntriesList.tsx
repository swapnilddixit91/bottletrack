import { BottleEntry } from "@/types/entry";
import { QRCodeCard } from "./QRCodeCard";
import { ClipboardList, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface EntriesListProps {
  entries: BottleEntry[];
}

export const EntriesList = ({ entries }: EntriesListProps) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted'>('all');

  const filteredEntries = entries.filter((entry) => {
    if (filter === 'all') return true;
    return entry.status === filter;
  });

  const pendingCount = entries.filter((e) => e.status === 'pending').length;
  const submittedCount = entries.filter((e) => e.status === 'submitted').length;

  if (entries.length === 0) {
    return (
      <div className="gradient-card rounded-2xl p-8 shadow-card border border-border/50 text-center animate-slide-up">
        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-muted mb-4">
          <ClipboardList className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">No Entries Yet</h3>
        <p className="text-muted-foreground">
          Create your first entry to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Entries</h3>
        <span className="text-sm text-muted-foreground">
          {entries.length} total
        </span>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 p-1 bg-muted rounded-xl">
        <button
          onClick={() => setFilter('all')}
          className={cn(
            "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
            filter === 'all'
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          All ({entries.length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={cn(
            "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5",
            filter === 'pending'
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Clock className="w-3.5 h-3.5" />
          Pending ({pendingCount})
        </button>
        <button
          onClick={() => setFilter('submitted')}
          className={cn(
            "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5",
            filter === 'submitted'
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Done ({submittedCount})
        </button>
      </div>

      {/* Entries */}
      <div className="space-y-4">
        {filteredEntries.map((entry) => (
          <QRCodeCard key={entry.id} entry={entry} />
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No {filter} entries found
        </div>
      )}
    </div>
  );
};
