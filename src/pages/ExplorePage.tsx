import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { MapView } from "@/components/map/MapView";
import { GraveCard } from "@/components/graves/GraveCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";

const mockGraves = [
  {
    id: "1",
    name: "John William Smith",
    birthDate: "1942-05-15",
    deathDate: "2019-11-23",
    distance: 150,
    isPublic: true,
  },
  {
    id: "2",
    name: "Mary Elizabeth Johnson",
    birthDate: "1955-08-22",
    deathDate: "2021-03-10",
    distance: 340,
    isPublic: true,
  },
  {
    id: "3",
    name: "Robert James Williams",
    birthDate: "1930-12-01",
    deathDate: "2015-07-18",
    distance: 890,
    isPublic: false,
  },
];

export default function ExplorePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filteredGraves = mockGraves.filter((grave) =>
    grave.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveGPS = (coords: { lat: number; lng: number }) => {
    navigate("/add", { state: { coordinates: coords } });
  };

  return (
    <AppLayout>
      <div className="flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border safe-area-inset-top">
          <div className="container py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Grave Finder" className="w-10 h-10" />
                <h1 className="font-serif text-xl font-bold">Grave Finder</h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearch(!showSearch)}
                className="touch-target"
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>

            {/* Search bar */}
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <Input
                  placeholder="Search graves by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-accessible"
                  autoFocus
                />
              </motion.div>
            )}
          </div>
        </header>

        {/* Map */}
        <div className="h-[45vh] relative">
          <MapView onSaveGPS={handleSaveGPS} />
        </div>

        {/* Nearby graves */}
        <div className="container py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-bold">Nearby Graves</h2>
            <Button
              onClick={() => navigate("/add")}
              className="gap-2 shadow-outdoor"
            >
              <Plus className="w-4 h-4" />
              Add New
            </Button>
          </div>

          <div className="space-y-3">
            {filteredGraves.map((grave, index) => (
              <motion.div
                key={grave.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GraveCard
                  {...grave}
                  onClick={() => navigate(`/grave/${grave.id}`)}
                />
              </motion.div>
            ))}
          </div>

          {filteredGraves.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No graves found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
