import { useState, useEffect } from "react";
import { ArrowUp, Navigation2 } from "lucide-react";
import { motion } from "framer-motion";

interface HotColdNavigationProps {
  targetName?: string;
  targetCoords?: { lat: number; lng: number };
  currentCoords?: { lat: number; lng: number };
}

export function HotColdNavigation({
  targetName = "John Smith",
  targetCoords = { lat: 35.6762, lng: 139.6503 },
  currentCoords,
}: HotColdNavigationProps) {
  const [distance, setDistance] = useState(150);
  const [bearing, setBearing] = useState(45);
  const [isLocating, setIsLocating] = useState(false);

  // Calculate distance color based on proximity
  const getDistanceColor = () => {
    if (distance < 10) return "bg-rose text-white"; // Very hot
    if (distance < 50) return "bg-orange-500 text-white"; // Hot
    if (distance < 100) return "bg-yellow-500 text-foreground"; // Warm
    if (distance < 300) return "bg-blue-400 text-white"; // Cool
    return "bg-blue-600 text-white"; // Cold
  };

  const getDistanceLabel = () => {
    if (distance < 10) return "You're there!";
    if (distance < 50) return "Very close";
    if (distance < 100) return "Getting warmer";
    if (distance < 300) return "Keep going";
    return "Follow the arrow";
  };

  // Haversine formula for distance calculation
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // Calculate bearing between two points
  const calculateBearing = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x =
      Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    const θ = Math.atan2(y, x);

    return ((θ * 180) / Math.PI + 360) % 360;
  };

  // Demo: simulate movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBearing((prev) => (prev + Math.random() * 10 - 5 + 360) % 360);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-8 bg-serene-gradient">
      {/* Target info */}
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl font-bold mb-1">{targetName}</h2>
        <p className="text-muted-foreground">{getDistanceLabel()}</p>
      </div>

      {/* Navigation arrow */}
      <motion.div
        className="nav-arrow-container mb-8"
        animate={{ rotate: bearing }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowUp className="w-24 h-24 text-primary drop-shadow-lg" strokeWidth={3} />
        </motion.div>
        
        {/* Compass ring decoration */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20">
          <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-primary">N</span>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-muted-foreground">S</span>
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">W</span>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">E</span>
        </div>
      </motion.div>

      {/* Distance badge */}
      <motion.div
        className={`distance-badge ${getDistanceColor()} transition-colors duration-500`}
        animate={{ scale: distance < 10 ? [1, 1.1, 1] : 1 }}
        transition={{ repeat: distance < 10 ? Infinity : 0, duration: 0.5 }}
      >
        {distance < 1000 ? `${Math.round(distance)}m` : `${(distance / 1000).toFixed(1)}km`}
      </motion.div>

      {/* Instructions */}
      <div className="mt-8 text-center">
        <p className="text-muted-foreground text-lg">
          Walk in the direction of the arrow
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          GPS accuracy: ±5m
        </p>
      </div>

      {/* Demo controls */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => setDistance(Math.max(1, distance - 50))}
          className="px-4 py-2 bg-card rounded-lg shadow-sm text-sm font-medium border border-border"
        >
          Closer
        </button>
        <button
          onClick={() => setDistance(distance + 50)}
          className="px-4 py-2 bg-card rounded-lg shadow-sm text-sm font-medium border border-border"
        >
          Further
        </button>
      </div>
    </div>
  );
}
