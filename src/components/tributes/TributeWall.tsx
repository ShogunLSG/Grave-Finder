import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Tribute {
  id: string;
  type: "flower" | "candle" | "heart" | "note";
  emoji?: string;
  message?: string;
  userName: string;
  createdAt: string;
}

const TRIBUTE_EMOJIS = [
  { type: "flower" as const, emoji: "🌸", label: "Flower" },
  { type: "candle" as const, emoji: "🕯️", label: "Candle" },
  { type: "heart" as const, emoji: "❤️", label: "Heart" },
  { type: "flower" as const, emoji: "🌹", label: "Rose" },
  { type: "flower" as const, emoji: "🌺", label: "Hibiscus" },
  { type: "flower" as const, emoji: "🌷", label: "Tulip" },
];

const mockTributes: Tribute[] = [
  { id: "1", type: "flower", emoji: "🌸", userName: "Sarah M.", createdAt: "2 hours ago" },
  { id: "2", type: "note", message: "Forever in our hearts, Grandpa. Miss you every day.", userName: "James R.", createdAt: "Yesterday" },
  { id: "3", type: "candle", emoji: "🕯️", userName: "Maria L.", createdAt: "3 days ago" },
  { id: "4", type: "heart", emoji: "❤️", userName: "Anonymous", createdAt: "1 week ago" },
];

interface TributeWallProps {
  graveId?: string;
}

export function TributeWall({ graveId }: TributeWallProps) {
  const [tributes, setTributes] = useState<Tribute[]>(mockTributes);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(true);

  const handleAddEmoji = (emoji: string, type: Tribute["type"]) => {
    const newTribute: Tribute = {
      id: Date.now().toString(),
      type,
      emoji,
      userName: "You",
      createdAt: "Just now",
    };
    setTributes([newTribute, ...tributes]);
  };

  const handleAddNote = () => {
    if (!newMessage.trim()) return;
    const newTribute: Tribute = {
      id: Date.now().toString(),
      type: "note",
      message: newMessage,
      userName: "You",
      createdAt: "Just now",
    };
    setTributes([newTribute, ...tributes]);
    setNewMessage("");
  };

  return (
    <div className="space-y-6">
      {/* Emoji tribute buttons */}
      <div className="space-y-3">
        <h3 className="font-serif text-lg font-bold">Leave a Tribute</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {TRIBUTE_EMOJIS.map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleAddEmoji(item.emoji, item.type)}
              className="tribute-btn"
              title={item.label}
            >
              {item.emoji}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Note input */}
      <div className="flex gap-2">
        <Input
          placeholder="Write a memory or message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
          className="input-accessible flex-1"
        />
        <Button
          onClick={handleAddNote}
          disabled={!newMessage.trim()}
          className="h-14 px-4"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>

      {/* Tribute feed */}
      <div className="space-y-3">
        <h3 className="font-serif text-lg font-bold">Tributes</h3>
        <AnimatePresence mode="popLayout">
          {tributes.map((tribute) => (
            <motion.div
              key={tribute.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              layout
              className="card-serene p-4"
            >
              <div className="flex items-start gap-3">
                {tribute.emoji && (
                  <span className="text-3xl">{tribute.emoji}</span>
                )}
                <div className="flex-1 min-w-0">
                  {tribute.message && (
                    <p className="text-foreground mb-2">{tribute.message}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">{tribute.userName}</span>
                    <span>•</span>
                    <span>{tribute.createdAt}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
