
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export interface GifItem {
  id: string;
  title: string;
  url: string;
  preview: string;
}

interface GifLibraryProps {
  onGifSelect: (gif: GifItem) => void;
}

const GifLibrary: React.FC<GifLibraryProps> = ({ onGifSelect }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  // Sample GIFs (in a real app, these would come from GIPHY API or similar)
  const sampleGifs: GifItem[] = [
    {
      id: "1",
      title: "Dancing",
      url: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
      preview: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy_s.gif"
    },
    {
      id: "2",
      title: "Celebration",
      url: "https://media.giphy.com/media/g9582DNuQppxC/giphy.gif",
      preview: "https://media.giphy.com/media/g9582DNuQppxC/giphy_s.gif"
    },
    {
      id: "3",
      title: "Applause",
      url: "https://media.giphy.com/media/7rj2ZgttvgomY/giphy.gif",
      preview: "https://media.giphy.com/media/7rj2ZgttvgomY/giphy_s.gif"
    },
    {
      id: "4",
      title: "Thumbs Up",
      url: "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif",
      preview: "https://media.giphy.com/media/111ebonMs90YLu/giphy_s.gif"
    },
    {
      id: "5",
      title: "Fire",
      url: "https://media.giphy.com/media/l378khQxt68syiNJm/giphy.gif",
      preview: "https://media.giphy.com/media/l378khQxt68syiNJm/giphy_s.gif"
    },
    {
      id: "6",
      title: "Sparkles",
      url: "https://media.giphy.com/media/26BRte7E5dlGs8xiw/giphy.gif",
      preview: "https://media.giphy.com/media/26BRte7E5dlGs8xiw/giphy_s.gif"
    }
  ];

  const filteredGifs = sampleGifs.filter(gif => 
    gif.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search GIFs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
        {filteredGifs.map((gif) => (
          <div
            key={gif.id}
            className="aspect-square border rounded-md overflow-hidden cursor-pointer hover:ring-2 hover:ring-purple-300"
            onClick={() => onGifSelect(gif)}
          >
            <img
              src={gif.preview}
              alt={gif.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GifLibrary;
