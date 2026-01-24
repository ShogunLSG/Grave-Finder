import { useState } from "react";
import { Bookmark, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { GraveCard } from "@/components/graves/GraveCard";
import { Input } from "@/components/ui/input";

const mockSavedGraves = [
  {
    id: "1",
    name: "John William Smith",
    birthDate: "1942-05-15",
    deathDate: "2019-11-23",
    distance: 150,
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

export default function SavedGravesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGraves = mockSavedGraves.filter((grave) =>
    grave.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border safe-area-inset-top">
          <div className="container py-4">
            <div className="flex items-center gap-3">
              <Bookmark className="w-6 h-6 text-primary" />
              <h1 className="font-serif text-xl font-bold">My Saved Graves</h1>
            </div>

            {/* Search */}
            <div className="mt-4 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search your saved graves..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-accessible pl-12"
              />
            </div>
          </div>
        </header>

        {/* Saved graves list */}
        <div className="container py-6 flex-1">
          {filteredGraves.length > 0 ? (
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
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bookmark className="w-16 h-16 text-muted-foreground/50 mb-4" />
              <h2 className="font-serif text-xl font-bold mb-2">No Saved Graves</h2>
              <p className="text-muted-foreground max-w-xs">
                {searchQuery
                  ? "No graves match your search."
                  : "Start exploring and save gravesites to access them here."}
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
