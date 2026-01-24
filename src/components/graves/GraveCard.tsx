import { MapPin, Heart, Calendar, Lock, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface GraveCardProps {
  id: string;
  name: string;
  birthDate?: string;
  deathDate?: string;
  distance?: number;
  isPublic?: boolean;
  photoUrl?: string;
  onClick?: () => void;
}

export function GraveCard({
  name,
  birthDate,
  deathDate,
  distance,
  isPublic = true,
  photoUrl,
  onClick,
}: GraveCardProps) {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    try {
      return format(new Date(dateStr), "MMM d, yyyy");
    } catch {
      return dateStr;
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full card-serene p-4 flex gap-4 items-start text-left animate-fade-in"
    >
      {/* Photo or placeholder */}
      <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
        {photoUrl ? (
          <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <MapPin className="w-6 h-6 text-muted-foreground" />
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-bold truncate">{name}</h3>
          <span className="flex-shrink-0">
            {isPublic ? (
              <Globe className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Lock className="w-4 h-4 text-primary" />
            )}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>
            {formatDate(birthDate)} — {formatDate(deathDate)}
          </span>
        </div>

        {distance !== undefined && (
          <div className="flex items-center gap-2 mt-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {distance < 1000 ? `${Math.round(distance)}m` : `${(distance / 1000).toFixed(1)}km`} away
            </span>
          </div>
        )}
      </div>

      {/* Tribute count indicator */}
      <div className="flex items-center gap-1 text-rose">
        <Heart className="w-4 h-4" fill="currentColor" />
        <span className="text-sm font-medium">12</span>
      </div>
    </motion.button>
  );
}
