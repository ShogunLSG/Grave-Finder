import { useState } from "react";
import { ArrowLeft, Navigation2, Share2, QrCode, MapPin, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { TributeWall } from "@/components/tributes/TributeWall";
import { QRCodeDisplay } from "@/components/qr/QRCodeDisplay";
import { OfflineToggle } from "@/components/offline/OfflineToggle";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

// Mock data
const mockGrave = {
  id: "1",
  name: "John William Smith",
  birthDate: "1942-05-15",
  deathDate: "2019-11-23",
  description: "Beloved father, grandfather, and friend. A life well lived in service to others. His kindness touched countless hearts.",
  coordinates: { lat: 35.6762, lng: 139.6503 },
  isPublic: true,
  photoUrl: undefined,
  panoramicUrl: undefined,
};

export default function GraveDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const grave = mockGrave; // In real app, fetch by id

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    try {
      return format(new Date(dateStr), "MMMM d, yyyy");
    } catch {
      return dateStr;
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen">
        {/* Header with back button */}
        <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border safe-area-inset-top">
          <div className="container py-4 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="touch-target"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-serif text-lg font-bold truncate flex-1">
              {grave.name}
            </h1>
            <Button variant="ghost" size="icon" className="touch-target">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Photo/Panoramic placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-forest-dark via-forest to-forest-light">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-primary-foreground">
              <MapPin className="w-12 h-12 mx-auto mb-2 opacity-80" />
              <span className="text-sm opacity-70">360° View Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="container py-6 flex-1">
          {/* Name and dates */}
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl font-bold mb-2">{grave.name}</h2>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>
                {formatDate(grave.birthDate)} — {formatDate(grave.deathDate)}
              </span>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex gap-3 mb-6">
            <Button
              onClick={() => navigate(`/navigate/${id}`)}
              className="flex-1 h-14 text-lg font-semibold gap-2 shadow-outdoor"
            >
              <Navigation2 className="w-5 h-5" />
              Navigate
            </Button>
            <Button
              variant="secondary"
              onClick={() => setActiveTab("qr")}
              className="h-14 px-4"
            >
              <QrCode className="w-5 h-5" />
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-6">
              <TabsTrigger value="details" className="flex-1 text-base">
                Details
              </TabsTrigger>
              <TabsTrigger value="tributes" className="flex-1 text-base">
                Tributes
              </TabsTrigger>
              <TabsTrigger value="qr" className="flex-1 text-base">
                QR Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              {/* Description */}
              {grave.description && (
                <div className="card-serene p-4">
                  <h3 className="font-serif font-bold mb-2">Remembrance</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {grave.description}
                  </p>
                </div>
              )}

              {/* GPS coordinates */}
              <div className="card-serene p-4">
                <h3 className="font-serif font-bold mb-2">Location</h3>
                <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>
                    {grave.coordinates.lat.toFixed(6)}, {grave.coordinates.lng.toFixed(6)}
                  </span>
                </div>
              </div>

              {/* Offline toggle */}
              <OfflineToggle graveId={grave.id} />
            </TabsContent>

            <TabsContent value="tributes">
              <TributeWall graveId={grave.id} />
            </TabsContent>

            <TabsContent value="qr">
              <div className="flex justify-center py-8">
                <QRCodeDisplay graveId={grave.id} graveName={grave.name} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
