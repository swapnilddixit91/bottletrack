import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Minus, Plus } from "lucide-react";
import { BottleIcon } from "./BottleIcon";
import { v4 as uuidv4 } from "uuid";
import { BottleEntry } from "@/types/entry";

interface EntryFormProps {
  onSubmit: (entry: BottleEntry) => void;
}

export const EntryForm = ({ onSubmit }: EntryFormProps) => {
  const [personName, setPersonName] = useState("");
  const [bottleCount, setBottleCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName.trim() || bottleCount < 1) return;

    setIsSubmitting(true);
    
    const entry: BottleEntry = {
      id: uuidv4(),
      personName: personName.trim(),
      bottleCount,
      createdAt: new Date(),
      submittedAt: null,
      status: 'pending',
    };

    setTimeout(() => {
      onSubmit(entry);
      setPersonName("");
      setBottleCount(1);
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <form onSubmit={handleSubmit} className="gradient-card rounded-2xl p-6 shadow-card border border-border/50 animate-slide-up">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <UserPlus className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">New Entry</h3>
          <p className="text-sm text-muted-foreground">Register bottles for recycling</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="personName" className="text-foreground font-medium">
            Person Name
          </Label>
          <Input
            id="personName"
            type="text"
            placeholder="Enter name"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            className="h-12 rounded-xl bg-muted/50 border-border focus:border-primary"
            maxLength={50}
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-foreground font-medium">Bottle Count</Label>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="eco-outline"
              size="icon"
              onClick={() => setBottleCount(Math.max(1, bottleCount - 1))}
              disabled={bottleCount <= 1}
            >
              <Minus className="w-5 h-5" />
            </Button>
            <div className="flex-1 text-center">
              <div className="flex items-center justify-center gap-2">
                <BottleIcon size={28} className="text-primary" />
                <span className="text-4xl font-bold text-gradient-eco">{bottleCount}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {bottleCount === 1 ? "bottle" : "bottles"}
              </p>
            </div>
            <Button
              type="button"
              variant="eco-outline"
              size="icon"
              onClick={() => setBottleCount(bottleCount + 1)}
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          variant="eco"
          size="lg"
          className="w-full mt-4"
          disabled={!personName.trim() || isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Creating...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Create Entry & Generate QR
            </span>
          )}
        </Button>
      </div>
    </form>
  );
};
