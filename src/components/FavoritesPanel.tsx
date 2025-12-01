import { X, Heart, Trash2, ExternalLink, Award, MapPin } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { University } from "@/data/universities";

interface FavoritesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: University[];
  onRemove: (id: string) => void;
  onViewDetails: (university: University) => void;
}

export const FavoritesPanel = ({
  isOpen,
  onClose,
  favorites,
  onRemove,
  onViewDetails,
}: FavoritesPanelProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg p-0">
        <SheetHeader className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10">
              <Heart className="h-5 w-5 text-destructive fill-destructive" />
            </div>
            <div>
              <SheetTitle>Your Favorites</SheetTitle>
              <p className="text-sm text-muted-foreground">
                {favorites.length} universities saved
              </p>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="p-6 space-y-4">
            {favorites.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  No favorites yet
                </h3>
                <p className="text-sm text-muted-foreground">
                  Click the heart icon on universities to add them here
                </p>
              </div>
            ) : (
              favorites.map((uni) => (
                <div
                  key={uni.id}
                  className="group flex gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-card transition-all"
                >
                  <img
                    src={uni.url}
                    alt={uni.title}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://images.unsplash.com/photo-1562774053-701939374585?w=200&auto=format&fit=crop";
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground line-clamp-2 text-sm mb-2">
                      {uni.title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        <Award className="h-3 w-3 mr-1" />#{uni.ranking}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        {uni.city}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => onViewDetails(uni)}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs text-destructive hover:text-destructive"
                        onClick={() => onRemove(uni.id)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
