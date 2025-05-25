
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Sticker {
  id: string;
  name: string;
  url: string;
  category: string;
}

interface StickerLibraryProps {
  onStickerSelect: (sticker: Sticker) => void;
}

const StickerLibrary: React.FC<StickerLibraryProps> = ({ onStickerSelect }) => {
  const stickers: Sticker[] = [
    { id: "1", name: "Heart", url: "❤️", category: "Emotions" },
    { id: "2", name: "Star", url: "⭐", category: "Shapes" },
    { id: "3", name: "Fire", url: "🔥", category: "Effects" },
    { id: "4", name: "Thumbs Up", url: "👍", category: "Gestures" },
    { id: "5", name: "Lightning", url: "⚡", category: "Effects" },
    { id: "6", name: "Crown", url: "👑", category: "Objects" },
    { id: "7", name: "Party", url: "🎉", category: "Celebrations" },
    { id: "8", name: "Money", url: "💰", category: "Objects" },
    { id: "9", name: "Rocket", url: "🚀", category: "Objects" },
    { id: "10", name: "Diamond", url: "💎", category: "Objects" },
    { id: "11", name: "Sunglasses", url: "😎", category: "Emotions" },
    { id: "12", name: "Check", url: "✅", category: "Symbols" },
  ];

  const categories = ["All", "Emotions", "Shapes", "Effects", "Gestures", "Objects", "Celebrations", "Symbols"];
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredStickers = activeCategory === "All" 
    ? stickers 
    : stickers.filter(sticker => sticker.category === activeCategory);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className="text-xs"
          >
            {category}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
        {filteredStickers.map((sticker) => (
          <div
            key={sticker.id}
            className="aspect-square border rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100 text-2xl"
            onClick={() => onStickerSelect(sticker)}
            title={sticker.name}
          >
            {sticker.url}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickerLibrary;
