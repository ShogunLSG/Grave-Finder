import { useState } from "react";
import { Camera, MapPin, Upload, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface GraveFormProps {
  onSubmit?: (data: GraveFormData) => void;
  initialCoords?: { lat: number; lng: number };
}

interface GraveFormData {
  name: string;
  birthDate: string;
  deathDate: string;
  description: string;
  isPublic: boolean;
  coordinates: { lat: number; lng: number };
}

export function GraveForm({ onSubmit, initialCoords }: GraveFormProps) {
  const [formData, setFormData] = useState<GraveFormData>({
    name: "",
    birthDate: "",
    deathDate: "",
    description: "",
    isPublic: true,
    coordinates: initialCoords || { lat: 0, lng: 0 },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Photo upload */}
      <div className="space-y-2">
        <Label className="text-base font-medium">Photos</Label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="aspect-square rounded-2xl border-2 border-dashed border-border bg-muted/50 flex flex-col items-center justify-center gap-2 hover:bg-muted transition-colors"
          >
            <Camera className="w-8 h-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Take Photo</span>
          </button>
          <button
            type="button"
            className="aspect-square rounded-2xl border-2 border-dashed border-border bg-muted/50 flex flex-col items-center justify-center gap-2 hover:bg-muted transition-colors"
          >
            <Upload className="w-8 h-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Upload</span>
          </button>
        </div>
      </div>

      {/* Panoramic view placeholder */}
      <div className="space-y-2">
        <Label className="text-base font-medium">360° Panoramic View</Label>
        <div className="panoramic-viewer flex flex-col items-center justify-center">
          <Camera className="w-12 h-12 text-muted-foreground mb-2" />
          <span className="text-muted-foreground text-center px-4">
            Tap to capture panoramic surroundings
          </span>
        </div>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-base font-medium">
          Full Name *
        </Label>
        <Input
          id="name"
          placeholder="Enter the person's full name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input-accessible"
          required
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="birthDate" className="text-base font-medium">
            Birth Date
          </Label>
          <Input
            id="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            className="input-accessible"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deathDate" className="text-base font-medium">
            Death Date
          </Label>
          <Input
            id="deathDate"
            type="date"
            value={formData.deathDate}
            onChange={(e) => setFormData({ ...formData, deathDate: e.target.value })}
            className="input-accessible"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-base font-medium">
          Description / Epitaph
        </Label>
        <Textarea
          id="description"
          placeholder="A short remembrance or description..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="input-accessible min-h-[120px] resize-none"
        />
      </div>

      {/* GPS Coordinates */}
      <div className="space-y-2">
        <Label className="text-base font-medium">GPS Location</Label>
        <div className="flex gap-2">
          <div className="flex-1 bg-muted rounded-xl px-4 py-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-sm font-mono">
              {formData.coordinates.lat.toFixed(6)}, {formData.coordinates.lng.toFixed(6)}
            </span>
          </div>
          <Button type="button" variant="outline" className="h-auto px-4">
            Update
          </Button>
        </div>
      </div>

      {/* Privacy toggle */}
      <div className="card-serene p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {formData.isPublic ? (
              <Globe className="w-6 h-6 text-primary" />
            ) : (
              <Lock className="w-6 h-6 text-secondary" />
            )}
            <div>
              <p className="font-medium">
                {formData.isPublic ? "Public" : "Private (Family Only)"}
              </p>
              <p className="text-sm text-muted-foreground">
                {formData.isPublic
                  ? "Anyone can find and view this grave"
                  : "Only shared family members can access"}
              </p>
            </div>
          </div>
          <Switch
            checked={formData.isPublic}
            onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked })}
          />
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full h-14 text-lg font-semibold shadow-outdoor">
        Save Grave Profile
      </Button>
    </form>
  );
}
