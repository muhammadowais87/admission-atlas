import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cities, disciplines, provinces } from "@/data/universities";
import { useState } from "react";

interface Filters {
  city: string;
  discipline: string;
  province: string;
  minMerit: number;
  maxMerit: number;
  minFee: number;
  maxFee: number;
  sortBy: string;
}

interface UniversityFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  totalResults: number;
}

export const UniversityFilters = ({
  filters,
  onFiltersChange,
  totalResults,
}: UniversityFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = (key: keyof Filters, value: string | number) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFiltersChange({
      city: "",
      discipline: "",
      province: "",
      minMerit: 0,
      maxMerit: 100,
      minFee: 0,
      maxFee: 1000000,
      sortBy: "ranking",
    });
  };

  const activeFiltersCount = [
    filters.city,
    filters.discipline,
    filters.province,
    filters.minMerit > 0,
    filters.maxMerit < 100,
    filters.minFee > 0,
    filters.maxFee < 1000000,
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-foreground">
            Universities
          </h2>
          <Badge variant="secondary" className="text-sm">
            {totalResults} Results
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="glass"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                {activeFiltersCount}
              </span>
            )}
          </Button>

          <Select
            value={filters.sortBy}
            onValueChange={(value) => updateFilter("sortBy", value)}
          >
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ranking">Top Ranked</SelectItem>
              <SelectItem value="merit-low">Merit (Low to High)</SelectItem>
              <SelectItem value="merit-high">Merit (High to Low)</SelectItem>
              <SelectItem value="fee-low">Fee (Low to High)</SelectItem>
              <SelectItem value="fee-high">Fee (High to Low)</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filter Panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          showFilters ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 rounded-xl bg-card border border-border shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Filter Options</h3>
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <X className="h-4 w-4 mr-1" />
              Reset All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* City Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">City</label>
              <Select
                value={filters.city}
                onValueChange={(value) => updateFilter("city", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Discipline Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Discipline
              </label>
              <Select
                value={filters.discipline}
                onValueChange={(value) => updateFilter("discipline", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Disciplines" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Disciplines</SelectItem>
                  {disciplines.map((disc) => (
                    <SelectItem key={disc} value={disc}>
                      {disc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Province Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Province
              </label>
              <Select
                value={filters.province}
                onValueChange={(value) => updateFilter("province", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Provinces" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Provinces</SelectItem>
                  {provinces.map((prov) => (
                    <SelectItem key={prov} value={prov}>
                      {prov}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Sort By
              </label>
              <Select
                value={filters.sortBy}
                onValueChange={(value) => updateFilter("sortBy", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ranking">Top Ranked</SelectItem>
                  <SelectItem value="merit-low">Merit (Low to High)</SelectItem>
                  <SelectItem value="merit-high">Merit (High to Low)</SelectItem>
                  <SelectItem value="fee-low">Fee (Low to High)</SelectItem>
                  <SelectItem value="fee-high">Fee (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Merit Range Slider */}
          <div className="mt-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  Merit Range
                </label>
                <span className="text-sm text-muted-foreground">
                  {filters.minMerit}% - {filters.maxMerit}%
                </span>
              </div>
              <Slider
                value={[filters.minMerit, filters.maxMerit]}
                min={0}
                max={100}
                step={1}
                onValueChange={([min, max]) => {
                  onFiltersChange({
                    ...filters,
                    minMerit: min,
                    maxMerit: max,
                  });
                }}
                className="w-full"
              />
            </div>

            {/* Fee Range Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  Fee Range (PKR)
                </label>
                <span className="text-sm text-muted-foreground">
                  {filters.minFee.toLocaleString()} -{" "}
                  {filters.maxFee.toLocaleString()}
                </span>
              </div>
              <Slider
                value={[filters.minFee, filters.maxFee]}
                min={0}
                max={1000000}
                step={10000}
                onValueChange={([min, max]) => {
                  onFiltersChange({
                    ...filters,
                    minFee: min,
                    maxFee: max,
                  });
                }}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
