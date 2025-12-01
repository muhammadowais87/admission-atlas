import { useState, useMemo, useRef } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { EligibilityChecker } from "@/components/EligibilityChecker";
import { UniversityFilters } from "@/components/UniversityFilters";
import { UniversityCard } from "@/components/UniversityCard";
import { ComparePanel } from "@/components/ComparePanel";
import { UniversityDetailModal } from "@/components/UniversityDetailModal";
import { FavoritesPanel } from "@/components/FavoritesPanel";
import { Footer } from "@/components/Footer";
import { universities, University } from "@/data/universities";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const universitiesRef = useRef<HTMLDivElement>(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    city: "",
    discipline: "",
    province: "",
    minMerit: 0,
    maxMerit: 100,
    minFee: 0,
    maxFee: 1000000,
    sortBy: "ranking",
  });

  // UI State
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set());
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);

  // Filter universities
  const filteredUniversities = useMemo(() => {
    let result = [...universities];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.title.toLowerCase().includes(query) ||
          u.city.toLowerCase().includes(query) ||
          u.degree.toLowerCase().includes(query) ||
          u.discipline.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.city && filters.city !== "all") {
      result = result.filter((u) => u.city === filters.city);
    }
    if (filters.discipline && filters.discipline !== "all") {
      result = result.filter((u) => u.discipline === filters.discipline);
    }
    if (filters.province && filters.province !== "all") {
      result = result.filter((u) => u.province === filters.province);
    }
    result = result.filter(
      (u) => u.merit >= filters.minMerit && u.merit <= filters.maxMerit
    );
    result = result.filter(
      (u) => u.fee >= filters.minFee && u.fee <= filters.maxFee
    );

    // Sort
    switch (filters.sortBy) {
      case "ranking":
        result.sort((a, b) => a.ranking - b.ranking);
        break;
      case "merit-low":
        result.sort((a, b) => a.merit - b.merit);
        break;
      case "merit-high":
        result.sort((a, b) => b.merit - a.merit);
        break;
      case "fee-low":
        result.sort((a, b) => a.fee - b.fee);
        break;
      case "fee-high":
        result.sort((a, b) => b.fee - a.fee);
        break;
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [searchQuery, filters]);

  // Get favorite and compare universities
  const favoriteUniversities = useMemo(
    () => universities.filter((u) => favoriteIds.has(u.id)),
    [favoriteIds]
  );

  const compareUniversities = useMemo(
    () => universities.filter((u) => compareIds.has(u.id)),
    [compareIds]
  );

  // Handlers
  const handleToggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast({
          title: "Removed from favorites",
          description: "University removed from your favorites list",
        });
      } else {
        next.add(id);
        toast({
          title: "Added to favorites",
          description: "University added to your favorites list",
        });
      }
      return next;
    });
  };

  const handleToggleCompare = (id: string) => {
    setCompareIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 3) {
        next.add(id);
        setShowCompare(true);
      } else {
        toast({
          title: "Maximum reached",
          description: "You can compare up to 3 universities at a time",
          variant: "destructive",
        });
        return prev;
      }
      return next;
    });
  };

  const handleEligibilityCheck = (eligibility: {
    marks: number;
    maxFee: number;
    city: string;
    discipline: string;
  }) => {
    setFilters((prev) => ({
      ...prev,
      minMerit: 0,
      maxMerit: eligibility.marks,
      maxFee: eligibility.maxFee || 1000000,
      city: eligibility.city === "all" ? "" : eligibility.city,
      discipline:
        eligibility.discipline === "all" ? "" : eligibility.discipline,
    }));

    // Scroll to universities
    universitiesRef.current?.scrollIntoView({ behavior: "smooth" });

    toast({
      title: "Filters applied",
      description: "Showing universities matching your eligibility",
    });
  };

  const scrollToUniversities = () => {
    universitiesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        favoritesCount={favoriteIds.size}
        onShowFavorites={() => setShowFavorites(true)}
      />

      <main>
        {/* Hero Section */}
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onScrollToUniversities={scrollToUniversities}
        />

        {/* Eligibility Checker */}
        <section className="container py-8">
          <EligibilityChecker onCheck={handleEligibilityCheck} />
        </section>

        {/* Universities Section */}
        <section
          id="universities"
          ref={universitiesRef}
          className="container py-12"
        >
          <UniversityFilters
            filters={filters}
            onFiltersChange={setFilters}
            totalResults={filteredUniversities.length}
          />

          {/* University Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUniversities.map((university, index) => (
              <div
                key={university.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <UniversityCard
                  university={university}
                  isFavorite={favoriteIds.has(university.id)}
                  isSelected={compareIds.has(university.id)}
                  onToggleFavorite={() => handleToggleFavorite(university.id)}
                  onToggleCompare={() => handleToggleCompare(university.id)}
                  onViewDetails={() => setSelectedUniversity(university)}
                />
              </div>
            ))}
          </div>

          {filteredUniversities.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                No universities found matching your criteria
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />

      {/* Compare Panel */}
      {showCompare && compareUniversities.length > 0 && (
        <ComparePanel
          universities={compareUniversities}
          onRemove={(id) => handleToggleCompare(id)}
          onClose={() => setShowCompare(false)}
        />
      )}

      {/* University Detail Modal */}
      <UniversityDetailModal
        university={selectedUniversity}
        isOpen={!!selectedUniversity}
        onClose={() => setSelectedUniversity(null)}
        isFavorite={
          selectedUniversity ? favoriteIds.has(selectedUniversity.id) : false
        }
        onToggleFavorite={() =>
          selectedUniversity && handleToggleFavorite(selectedUniversity.id)
        }
      />

      {/* Favorites Panel */}
      <FavoritesPanel
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favoriteUniversities}
        onRemove={handleToggleFavorite}
        onViewDetails={(uni) => {
          setShowFavorites(false);
          setSelectedUniversity(uni);
        }}
      />
    </div>
  );
};

export default Index;
