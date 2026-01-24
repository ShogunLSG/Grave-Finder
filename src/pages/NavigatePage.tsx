import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { HotColdNavigation } from "@/components/navigation/HotColdNavigation";
import { Button } from "@/components/ui/button";

export default function NavigatePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
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
          <h1 className="font-serif text-lg font-bold">Navigate to Grave</h1>
        </div>
      </header>

      {/* Navigation view */}
      <div className="flex-1">
        <HotColdNavigation targetName="John William Smith" />
      </div>
    </div>
  );
}
