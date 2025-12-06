import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { BottleEntry } from "@/types/entry";
import { Download, Share2, CheckCircle2, Clock } from "lucide-react";
import { BottleIcon } from "./BottleIcon";
import { cn } from "@/lib/utils";

interface QRCodeCardProps {
  entry: BottleEntry;
  onClose?: () => void;
}

export const QRCodeCard = ({ entry, onClose }: QRCodeCardProps) => {
  const qrValue = JSON.stringify({
    id: entry.id,
    name: entry.personName,
    bottles: entry.bottleCount,
  });

  const handleDownload = () => {
    const svg = document.getElementById(`qr-${entry.id}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = 300;
      canvas.height = 300;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 25, 25, 250, 250);
      }
      const link = document.createElement("a");
      link.download = `bottle-entry-${entry.personName.replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Bottle Entry - ${entry.personName}`,
          text: `${entry.personName} has registered ${entry.bottleCount} bottles for recycling. Entry ID: ${entry.id}`,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    }
  };

  const isSubmitted = entry.status === 'submitted';

  return (
    <div className={cn(
      "gradient-card rounded-2xl p-6 shadow-card border animate-slide-up",
      isSubmitted ? "border-primary/30 bg-primary/5" : "border-border/50"
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-xl",
            isSubmitted ? "bg-primary/20" : "bg-eco-sun/20"
          )}>
            {isSubmitted ? (
              <CheckCircle2 className="w-5 h-5 text-primary" />
            ) : (
              <Clock className="w-5 h-5 text-eco-sun" />
            )}
          </div>
          <div>
            <p className="font-bold text-foreground">{entry.personName}</p>
            <p className="text-sm text-muted-foreground">
              {isSubmitted ? "Submitted" : "Pending"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
          <BottleIcon size={18} className="text-primary" />
          <span className="font-bold text-foreground">{entry.bottleCount}</span>
        </div>
      </div>

      <div className="flex justify-center p-4 bg-white rounded-xl mb-4">
        <QRCodeSVG
          id={`qr-${entry.id}`}
          value={qrValue}
          size={180}
          level="H"
          includeMargin
          fgColor={isSubmitted ? "#94a3b8" : "#1a1a1a"}
        />
      </div>

      <p className="text-xs text-center text-muted-foreground mb-4 font-mono">
        ID: {entry.id.slice(0, 8)}...
      </p>

      {!isSubmitted && (
        <div className="flex gap-3">
          <Button
            variant="eco-outline"
            className="flex-1"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          {navigator.share && (
            <Button
              variant="eco-outline"
              className="flex-1"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          )}
        </div>
      )}

      {isSubmitted && entry.submittedAt && (
        <p className="text-sm text-center text-primary font-medium">
          ✓ Verified on {new Date(entry.submittedAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};
