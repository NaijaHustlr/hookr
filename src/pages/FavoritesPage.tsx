
import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const FavoritesPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen pb-16">
      <header className="sticky top-0 z-30 bg-hookr-dark bg-opacity-95 backdrop-blur-sm px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-hookr-light">Favorites</h1>
        </div>
      </header>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-hookr-muted p-8 rounded-lg w-full max-w-md flex flex-col items-center">
          <div className="rounded-full bg-hookr-dark p-4 mb-6">
            <Heart className="h-10 w-10 text-hookr-accent" />
          </div>
          <h2 className="text-xl font-bold text-hookr-light mb-2">No Favorites Yet</h2>
          <p className="text-center text-hookr-light opacity-70 mb-6">
            When you find models you like, save them here for quick access.
          </p>
          <Button className="book-now-btn w-full">
            Browse Models
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
