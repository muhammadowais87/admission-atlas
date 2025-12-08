import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Search,
  Award,
  MapPin,
  TrendingUp,
  ArrowLeft,
  Trophy,
  Medal,
} from "lucide-react";
import { University } from "./Index";

const RankingSearch = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedUniversity, setSearchedUniversity] = useState<University | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Load universities from JSON
  useEffect(() => {
    const loadUniversitiesData = async () => {
      try {
        const response = await fetch('/campusfinder_cleaned.json');
        const data = await response.json();
        
        // Transform the data to match University interface
        const transformedData: University[] = data.map((uni: any) => ({
          id: `pk${uni.key}`,
          title: uni.title,
          city: uni.city,
          province: uni.province,
          degree: uni.degree,
          discipline: uni.discipline,
          fee: uni.fee,
          merit: uni.merit,
          ranking: uni.ranking,
          status: uni.status,
          contact: uni.contact,
          info: uni.info,
          web: uni.web,
          url: uni.url,
          logo: uni.logo,
          admissions: uni.admissions,
          map: {
            address: uni['map.address'] || '',
            lat: uni['map.lat'] || 0,
            long: uni['map.long'] || 0,
            location: uni['map.location'] || uni.city,
          },
          deadline: uni.deadline,
          admission: uni.admission,
        }));

        setUniversities(transformedData);
      } catch (error) {
        console.error("Error loading universities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUniversitiesData();
  }, []);

  // Top 5 universities by ranking
  const top5Universities = useMemo(() => {
    return [...universities].sort((a, b) => a.ranking - b.ranking).slice(0, 5);
  }, [universities]);

  // Search for university
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setHasSearched(true);
    const query = searchQuery.toLowerCase();
    const found = universities.find(
      (u) => u.title.toLowerCase().includes(query)
    );
    setSearchedUniversity(found || null);
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />;
    return <Award className="h-5 w-5 text-secondary" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 mx-auto mb-4 text-secondary animate-pulse" />
          <p className="text-muted-foreground">Loading rankings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-hero">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Campus<span className="text-secondary">Finder</span>
            </span>
          </Link>

          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-4">
            <Trophy className="h-4 w-4" />
            <span>University Rankings</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Search University <span className="text-gradient">Ranking</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Enter a university name to find its ranking in Pakistan
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter university name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="h-14 pl-12 pr-4 text-base rounded-2xl border-2 border-border bg-card shadow-card focus:border-secondary focus:shadow-card-hover transition-all"
              />
            </div>
            <Button
              variant="hero"
              size="lg"
              className="h-14 px-8 rounded-xl"
              onClick={handleSearch}
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Search Result */}
        {hasSearched && (
          <div className="max-w-2xl mx-auto mb-12">
            {searchedUniversity ? (
              <Card variant="elevated" className="border-2 border-secondary/30">
                <CardHeader className="gradient-hero text-primary-foreground rounded-t-xl">
                  <CardTitle className="flex items-center gap-3">
                    {getRankIcon(searchedUniversity.ranking)}
                    <span>Search Result</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-bold text-2xl">
                      #{searchedUniversity.ranking}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {searchedUniversity.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge variant="secondary">
                          <MapPin className="h-3 w-3 mr-1" />
                          {searchedUniversity.city}
                        </Badge>
                        <Badge variant="outline">{searchedUniversity.discipline}</Badge>
                        <Badge variant="accent">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Merit: {searchedUniversity.merit}%
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Fee: PKR {searchedUniversity.fee.toLocaleString()}/year
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card variant="outline" className="border-2 border-destructive/30">
                <CardContent className="p-8 text-center">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    University Not Found
                  </h3>
                  <p className="text-muted-foreground">
                    No university found matching "{searchQuery}"
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Top 5 Universities */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-accent">
              <Trophy className="h-5 w-5 text-accent-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Top 5 Universities
            </h2>
          </div>

          <div className="space-y-4">
            {top5Universities.map((uni, index) => (
              <Card
                key={uni.id}
                variant="interactive"
                className="overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 p-4">
                    {/* Rank */}
                    <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold text-xl">
                      #{uni.ranking}
                    </div>

                    {/* Image */}
                    <div className="hidden sm:block flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden">
                      <img
                        src={uni.url}
                        alt={uni.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://images.unsplash.com/photo-1562774053-701939374585?w=200&auto=format&fit=crop";
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground line-clamp-1 mb-1">
                        {uni.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {uni.city}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {uni.discipline}
                        </Badge>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="hidden md:flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Merit</p>
                        <p className="font-bold text-foreground">{uni.merit}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Fee</p>
                        <p className="font-bold text-foreground">
                          {(uni.fee / 1000).toFixed(0)}K
                        </p>
                      </div>
                    </div>

                    {/* Trophy Icon */}
                    <div className="flex-shrink-0">
                      {getRankIcon(uni.ranking)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RankingSearch;
