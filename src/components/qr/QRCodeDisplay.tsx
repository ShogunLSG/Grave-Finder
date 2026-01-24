import { QRCodeSVG } from "qrcode.react";
import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRCodeDisplayProps {
  graveId: string;
  graveName: string;
  size?: number;
}

export function QRCodeDisplay({ graveId, graveName, size = 200 }: QRCodeDisplayProps) {
  // Generate a unique URL for this grave
  const graveUrl = `${window.location.origin}/grave/${graveId}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${graveName} - Grave Finder`,
          text: `Find the gravesite of ${graveName}`,
          url: graveUrl,
        });
      } catch (err) {
        console.log("Share cancelled or failed");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(graveUrl);
    }
  };

  const handleDownload = () => {
    const svg = document.getElementById(`qr-${graveId}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = size + 40;
      canvas.height = size + 40;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 20, 20, size, size);
      }
      const link = document.createElement("a");
      link.download = `${graveName.replace(/\s+/g, "-")}-QR.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="qr-container">
        <QRCodeSVG
          id={`qr-${graveId}`}
          value={graveUrl}
          size={size}
          level="H"
          includeMargin={false}
          fgColor="hsl(118, 38%, 25%)"
          bgColor="white"
        />
      </div>

      <div className="text-center">
        <p className="font-medium mb-1">Scan to find gravesite</p>
        <p className="text-sm text-muted-foreground">{graveName}</p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={handleDownload} className="gap-2">
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button onClick={handleShare} className="gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>
    </div>
  );
}
