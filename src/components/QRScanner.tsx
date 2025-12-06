import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Camera, X, CheckCircle2, AlertCircle } from "lucide-react";
import { BottleEntry } from "@/types/entry";
import { cn } from "@/lib/utils";

interface QRScannerProps {
  entries: BottleEntry[];
  onVerify: (entryId: string) => void;
}

export const QRScanner = ({ entries, onVerify }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    entry?: BottleEntry;
  } | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const startScanning = async () => {
    try {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          handleScanSuccess(decodedText);
        },
        () => {}
      );

      setIsScanning(true);
    } catch (err) {
      console.error("Failed to start scanner:", err);
      setScanResult({
        success: false,
        message: "Camera access denied. Please allow camera permission.",
      });
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current = null;
      } catch (err) {
        console.error("Failed to stop scanner:", err);
      }
    }
    setIsScanning(false);
  };

  const handleScanSuccess = (decodedText: string) => {
    try {
      const data = JSON.parse(decodedText);
      const entry = entries.find((e) => e.id === data.id);

      if (!entry) {
        setScanResult({
          success: false,
          message: "Entry not found in system.",
        });
      } else if (entry.status === "submitted") {
        setScanResult({
          success: false,
          message: "This entry has already been submitted!",
          entry,
        });
      } else {
        onVerify(entry.id);
        setScanResult({
          success: true,
          message: `Verified! ${entry.bottleCount} bottles from ${entry.personName}`,
          entry,
        });
      }

      stopScanning();
    } catch {
      setScanResult({
        success: false,
        message: "Invalid QR code format.",
      });
      stopScanning();
    }
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const resetScanner = () => {
    setScanResult(null);
  };

  return (
    <div className="gradient-card rounded-2xl p-6 shadow-card border border-border/50 animate-slide-up">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-accent/20">
          <Camera className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">Verify Submission</h3>
          <p className="text-sm text-muted-foreground">Scan QR to confirm bottles</p>
        </div>
      </div>

      {!isScanning && !scanResult && (
        <Button
          variant="eco"
          size="lg"
          className="w-full"
          onClick={startScanning}
        >
          <Camera className="w-5 h-5 mr-2" />
          Start Scanner
        </Button>
      )}

      {isScanning && (
        <div className="space-y-4">
          <div
            id="qr-reader"
            className="w-full rounded-xl overflow-hidden bg-muted"
          />
          <Button
            variant="outline"
            className="w-full"
            onClick={stopScanning}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      )}

      {scanResult && (
        <div
          className={cn(
            "p-4 rounded-xl text-center",
            scanResult.success
              ? "bg-primary/10 border border-primary/20"
              : "bg-destructive/10 border border-destructive/20"
          )}
        >
          <div className="flex justify-center mb-3">
            {scanResult.success ? (
              <CheckCircle2 className="w-12 h-12 text-primary" />
            ) : (
              <AlertCircle className="w-12 h-12 text-destructive" />
            )}
          </div>
          <p
            className={cn(
              "font-semibold mb-1",
              scanResult.success ? "text-primary" : "text-destructive"
            )}
          >
            {scanResult.success ? "Success!" : "Error"}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            {scanResult.message}
          </p>
          <Button variant="eco-outline" onClick={resetScanner}>
            Scan Another
          </Button>
        </div>
      )}
    </div>
  );
};
