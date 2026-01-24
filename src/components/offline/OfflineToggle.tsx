import { useState } from "react";
import { Download, WifiOff, Check, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";

interface OfflineToggleProps {
  graveId?: string;
  onToggle?: (enabled: boolean) => void;
}

export function OfflineToggle({ graveId, onToggle }: OfflineToggleProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleToggle = async (checked: boolean) => {
    if (checked) {
      setIsDownloading(true);
      // Simulate download progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((r) => setTimeout(r, 200));
        setDownloadProgress(i);
      }
      setIsDownloading(false);
    }
    setIsEnabled(checked);
    onToggle?.(checked);
  };

  return (
    <div className="card-serene p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
            {isDownloading ? (
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            ) : isEnabled ? (
              <Check className="w-5 h-5 text-primary" />
            ) : (
              <WifiOff className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <div>
            <p className="font-medium">Offline Access</p>
            <p className="text-sm text-muted-foreground">
              {isDownloading
                ? `Downloading... ${downloadProgress}%`
                : isEnabled
                ? "Available offline"
                : "Download map & data"}
            </p>
          </div>
        </div>
        <Switch
          checked={isEnabled}
          onCheckedChange={handleToggle}
          disabled={isDownloading}
        />
      </div>

      <AnimatePresence>
        {isDownloading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${downloadProgress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Downloading map tiles and grave data...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
