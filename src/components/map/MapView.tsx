import { useState } from "react";
import { MapPin, Layers, Navigation2, Locate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

type MapType = "standard" | "satellite";

interface MapViewProps {
  onSaveGPS?: (coords: { lat: number; lng: number }) => void;
  onGraveClick?: (graveId: string) => void;
}

export function MapView({ onSaveGPS }: MapViewProps) {
  const [mapType, setMapType] = useState<MapType>("standard");
  const [isLocating, setIsLocating] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleLocate = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLocating(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsLocating(false);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  const handleSaveGPS = () => {
    if (currentLocation && onSaveGPS) {
      onSaveGPS(currentLocation);
    } else {
      handleLocate();
    }
  };

  return (
    <div className="relative w-full h-full min-h-[60vh] rounded-2xl overflow-hidden">
      {/* Map placeholder with gradient */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          mapType === "satellite"
            ? "bg-gradient-to-br from-forest-dark via-forest to-forest-light"
            : "bg-gradient-to-br from-accent via-muted to-background"
        }`}
      >
        {/* Grid pattern for standard view */}
        {mapType === "standard" && (
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        )}

        {/* Satellite texture hint */}
        {mapType === "satellite" && (
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_40%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
        )}

        {/* Sample grave markers */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-primary"
            >
              <MapPin className="w-12 h-12 drop-shadow-lg" fill="currentColor" />
            </motion.div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium bg-card px-2 py-1 rounded-lg shadow-md whitespace-nowrap">
              John Smith
            </span>
          </div>
        </div>

        {/* Current location indicator */}
        <AnimatePresence>
          {currentLocation && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-1/3 left-1/3"
            >
              <div className="relative">
                <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg" />
                <div className="absolute inset-0 w-6 h-6 bg-blue-400 rounded-full animate-ping opacity-50" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Map type toggle */}
      <div className="absolute top-4 right-4 map-control">
        <div className="flex gap-1">
          <button
            onClick={() => setMapType("standard")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors touch-target ${
              mapType === "standard"
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
            }`}
          >
            Standard
          </button>
          <button
            onClick={() => setMapType("satellite")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors touch-target ${
              mapType === "satellite"
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
            }`}
          >
            Satellite
          </button>
        </div>
      </div>

      {/* Location controls */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-3">
        <Button
          onClick={handleLocate}
          variant="secondary"
          className="flex-1 h-14 text-lg font-semibold gap-2 shadow-outdoor"
          disabled={isLocating}
        >
          <Locate className={`w-5 h-5 ${isLocating ? "animate-spin" : ""}`} />
          {isLocating ? "Locating..." : "My Location"}
        </Button>
        <Button
          onClick={handleSaveGPS}
          className="flex-1 h-14 text-lg font-semibold gap-2 shadow-outdoor"
        >
          <Navigation2 className="w-5 h-5" />
          Save GPS
        </Button>
      </div>

      {/* Map type indicator */}
      <div className="absolute top-4 left-4 map-control px-3 py-2 flex items-center gap-2">
        <Layers className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium capitalize">{mapType}</span>
      </div>
    </div>
  );
}
