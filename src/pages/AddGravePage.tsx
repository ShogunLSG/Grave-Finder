import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { GraveForm } from "@/components/graves/GraveForm";
import { Button } from "@/components/ui/button";

export default function AddGravePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialCoords = location.state?.coordinates;

  const handleSubmit = (data: any) => {
    console.log("Grave data:", data);
    // In real app, save to Supabase
    navigate("/saved");
  };

  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
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
            <h1 className="font-serif text-lg font-bold">Add New Grave</h1>
          </div>
        </header>

        {/* Form */}
        <div className="container py-6">
          <GraveForm onSubmit={handleSubmit} initialCoords={initialCoords} />
        </div>
      </div>
    </AppLayout>
  );
}
