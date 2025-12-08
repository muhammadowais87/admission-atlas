import { useState, useMemo, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  GraduationCap,
  Heart,
  Menu,
  X,
  Search,
  BookOpen,
  Users,
  Award,
  Calculator,
  ChevronDown,
  Sparkles,
  Filter,
  MapPin,
  Phone,
  Mail,
  Globe,
  ExternalLink,
  Scale,
  TrendingUp,
  Trash2,
  Calendar,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";

// ==================== DATA ====================
export interface University {
  id: string;
  title: string;
  city: string;
  province: string;
  degree: string;
  discipline: string;
  fee: number;
  merit: number;
  ranking: number;
  status: number;
  contact: string;
  info: string;
  web: string;
  url: string;
  logo: string;
  admissions: string;
  map: {
    address: string;
    lat: number;
    long: number;
    location: string;
  };
  deadline: string;
  admission: string;
  meritHistory?: { year: number; merit: number }[];
}

// ==================== HEADER COMPONENT ====================
interface HeaderProps {
  favoritesCount: number;
  onShowFavorites: () => void;
}

const Header = ({ favoritesCount, onShowFavorites }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-hero">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Campus<span className="text-secondary">Finder</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#home"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </a>
          <a
            href="#universities"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Universities
          </a>
          <Link
            to="/ranking-search"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Rankings
          </Link>
          <Link
            to="/discipline-search"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Disciplines
          </Link>
          <a
            href="#compare"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Compare
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="glass"
            size="sm"
            className="relative"
            onClick={onShowFavorites}
          >
            <Heart className="h-4 w-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-secondary text-secondary-foreground text-xs font-bold rounded-full">
                {favoritesCount}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <a
                href="#home"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Home
              </a>
              <a
                href="#universities"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Universities
              </a>
              <Link
                to="/ranking-search"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Rankings
              </Link>
              <Link
                to="/discipline-search"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Disciplines
              </Link>
              <a
                href="#compare"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Compare
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// ==================== HERO SECTION COMPONENT ====================
interface HeroSectionProps {
  marks: string;
  setMarks: (value: string) => void;
  maxFee: number[];
  setMaxFee: (value: number[]) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  selectedDiscipline: string;
  setSelectedDiscipline: (value: string) => void;
  onCheck: () => void;
  cities: string[];
  disciplines: string[];
}

const HeroSection = ({
  marks,
  setMarks,
  maxFee,
  setMaxFee,
  selectedCity,
  setSelectedCity,
  selectedDiscipline,
  setSelectedDiscipline,
  onCheck,
  cities,
  disciplines,
}: HeroSectionProps) => {
  return (
    <section
      id="home"
      className="relative overflow-hidden py-20 md:py-28 lg:py-32"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Pakistan's #1 University Discovery Platform</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Find Your Perfect{" "}
            <span className="text-gradient">University</span> Match
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Compare universities across Pakistan based on your marks, budget, and
            preferences. Make informed decisions for your academic future.
          </p>
        </div>

        {/* Eligibility Checker Card */}
        <Card variant="elevated" className="max-w-4xl mx-auto">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-hero">
                <Calculator className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl">
                  Check Your Eligibility
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Fill in your details to find matching universities
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Marks */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Your Marks (%)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 85"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  className="h-12 rounded-xl"
                  min={0}
                  max={100}
                />
              </div>

              {/* Max Fee */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">
                    Max Fee Budget (PKR)
                  </Label>
                  <span className="text-sm font-semibold text-secondary">
                    {maxFee[0].toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={maxFee}
                  onValueChange={setMaxFee}
                  min={0}
                  max={1000000}
                  step={10000}
                  className="py-4"
                />
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Preferred City</Label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="h-12 rounded-xl">
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

              {/* Discipline */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Discipline</Label>
                <Select
                  value={selectedDiscipline}
                  onValueChange={setSelectedDiscipline}
                >
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="All Disciplines" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Disciplines</SelectItem>
                    {disciplines.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full mt-6 h-14 text-base rounded-xl"
              onClick={onCheck}
            >
              <Search className="mr-2 h-5 w-5" />
              Find Matching Universities
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
          {[
            { icon: GraduationCap, label: "Universities", value: "200+" },
            { icon: BookOpen, label: "Programs", value: "1000+" },
            { icon: Users, label: "Students Helped", value: "50K+" },
            { icon: Award, label: "Success Rate", value: "95%" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-4 rounded-2xl bg-card/50 border border-border/50"
            >
              <stat.icon className="h-6 w-6 mx-auto mb-2 text-secondary" />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== UNIVERSITY CARD COMPONENT ====================
interface UniversityCardProps {
  university: University;
  isFavorite: boolean;
  isInCompare: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onViewDetails: (university: University) => void;
  index: number;
}

const UniversityCard = ({
  university,
  isFavorite,
  isInCompare,
  onToggleFavorite,
  onToggleCompare,
  onViewDetails,
  index,
}: UniversityCardProps) => {
  const getRankingBadge = (ranking: number) => {
    if (ranking <= 5) return { variant: "accent" as const, label: "Top 5" };
    if (ranking <= 10) return { variant: "success" as const, label: "Top 10" };
    if (ranking <= 25) return { variant: "info" as const, label: "Top 25" };
    return { variant: "muted" as const, label: `#${ranking}` };
  };

  const rankingBadge = getRankingBadge(university.ranking);

  return (
    <Card
      variant="interactive"
      className="group overflow-hidden h-full animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={university.url}
          alt={university.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={rankingBadge.variant}>{rankingBadge.label}</Badge>
          {university.admission === "Open" && (
            <Badge variant="success">Admissions Open</Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            variant="glass"
            size="sm"
            className={cn("h-9 w-9 p-0", isFavorite && "text-red-500")}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(university.id);
            }}
          >
            <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
          </Button>
          <Button
            variant="glass"
            size="sm"
            className={cn("h-9 w-9 p-0", isInCompare && "text-secondary")}
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(university.id);
            }}
          >
            <Scale className="h-4 w-4" />
          </Button>
        </div>

        {/* Logo */}
        <div className="absolute bottom-3 left-3">
          <div className="h-12 w-12 rounded-lg bg-white p-1 shadow-lg">
            <img
              src={university.logo}
              alt={`${university.title} logo`}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-5">
        <h3 className="font-semibold text-foreground line-clamp-2 mb-3 min-h-[3rem]">
          {university.title}
        </h3>

        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
          <MapPin className="h-4 w-4" />
          <span>{university.city}</span>
          <span className="text-border">•</span>
          <span>{university.province}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-2 rounded-lg bg-muted/50 text-center">
            <p className="text-xs text-muted-foreground">Merit</p>
            <p className="font-semibold text-foreground">{university.merit}%</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50 text-center">
            <p className="text-xs text-muted-foreground">Fee/Year</p>
            <p className="font-semibold text-foreground">
              {(university.fee / 1000).toFixed(0)}K
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">{university.discipline}</Badge>
          <Badge variant="outline">{university.degree}</Badge>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onViewDetails(university)}
        >
          View Details
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

// ==================== UNIVERSITY DETAILS DIALOG ====================
interface UniversityDetailsDialogProps {
  university: University | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UniversityDetailsDialog = ({
  university,
  open,
  onOpenChange,
}: UniversityDetailsDialogProps) => {
  if (!university) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* Hero Image */}
        <div className="relative h-64">
          <img
            src={university.url}
            alt={university.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-xl bg-white p-2 shadow-lg">
                <img
                  src={university.logo}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {university.title}
                </h2>
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="accent">Rank #{university.ranking}</Badge>
                  <Badge variant="secondary">
                    <MapPin className="h-3 w-3 mr-1" />
                    {university.city}
                  </Badge>
                  {university.admission === "Open" && (
                    <Badge variant="success">Admissions Open</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-secondary" />
              <p className="text-2xl font-bold text-foreground">
                {university.merit}%
              </p>
              <p className="text-sm text-muted-foreground">Merit Required</p>
            </Card>
            <Card className="p-4 text-center">
              <Calculator className="h-6 w-6 mx-auto mb-2 text-secondary" />
              <p className="text-2xl font-bold text-foreground">
                {(university.fee / 1000).toFixed(0)}K
              </p>
              <p className="text-sm text-muted-foreground">Fee/Year (PKR)</p>
            </Card>
            <Card className="p-4 text-center">
              <Award className="h-6 w-6 mx-auto mb-2 text-secondary" />
              <p className="text-2xl font-bold text-foreground">
                #{university.ranking}
              </p>
              <p className="text-sm text-muted-foreground">National Ranking</p>
            </Card>
            <Card className="p-4 text-center">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-secondary" />
              <p className="text-lg font-bold text-foreground">
                {university.deadline}
              </p>
              <p className="text-sm text-muted-foreground">Deadline</p>
            </Card>
          </div>

          {/* Program Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Program Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Discipline</span>
                  <span className="font-medium">{university.discipline}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Degree</span>
                  <span className="font-medium">{university.degree}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Province</span>
                  <span className="font-medium">{university.province}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
              <div className="space-y-3">
                <a
                  href={`tel:${university.contact}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Phone className="h-5 w-5 text-secondary" />
                  <span>{university.contact}</span>
                </a>
                <a
                  href={`mailto:${university.info}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Mail className="h-5 w-5 text-secondary" />
                  <span>{university.info}</span>
                </a>
                <a
                  href={university.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Globe className="h-5 w-5 text-secondary" />
                  <span className="truncate">{university.web}</span>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </a>
              </div>
            </div>
          </div>

          {/* Merit History Chart */}
          {university.meritHistory && university.meritHistory.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Merit History</h3>
              <Card className="p-4">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={university.meritHistory}>
                    <XAxis dataKey="year" />
                    <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="merit"
                      stroke="hsl(var(--secondary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--secondary))" }}
                      name="Merit %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Location</h3>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <MapPin className="h-5 w-5 text-secondary mt-0.5" />
              <p className="text-muted-foreground">{university.map.address}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="hero"
              className="flex-1"
              onClick={() => window.open(university.web, "_blank")}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Website
            </Button>
            <Button variant="outline" className="flex-1">
              <Mail className="mr-2 h-4 w-4" />
              Contact Admissions
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ==================== COMPARE SHEET ====================
interface CompareSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  compareList: University[];
  onRemove: (id: string) => void;
}

const CompareSheet = ({
  open,
  onOpenChange,
  compareList,
  onRemove,
}: CompareSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-secondary" />
            Compare Universities ({compareList.length}/4)
          </SheetTitle>
        </SheetHeader>

        {compareList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Scale className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Universities to Compare</h3>
            <p className="text-muted-foreground">
              Click the compare icon on university cards to add them here
            </p>
          </div>
        ) : (
          <ScrollArea className="h-full pt-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Criteria</th>
                    {compareList.map((uni) => (
                      <th key={uni.id} className="p-3 min-w-[200px]">
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={uni.logo}
                            alt=""
                            className="h-12 w-12 object-contain"
                          />
                          <p className="text-sm font-medium text-center line-clamp-2">
                            {uni.title}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemove(uni.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Ranking", key: "ranking", format: (v: number) => `#${v}` },
                    { label: "Merit", key: "merit", format: (v: number) => `${v}%` },
                    {
                      label: "Fee/Year",
                      key: "fee",
                      format: (v: number) => `PKR ${v.toLocaleString()}`,
                    },
                    { label: "City", key: "city", format: (v: string) => v },
                    { label: "Discipline", key: "discipline", format: (v: string) => v },
                    { label: "Degree", key: "degree", format: (v: string) => v },
                    { label: "Deadline", key: "deadline", format: (v: string) => v },
                  ].map((row) => (
                    <tr key={row.key} className="border-b">
                      <td className="p-3 font-medium text-muted-foreground">
                        {row.label}
                      </td>
                      {compareList.map((uni) => (
                        <td key={uni.id} className="p-3 text-center">
                          {row.format((uni as any)[row.key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
};

// ==================== FAVORITES SHEET ====================
interface FavoritesSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  favorites: University[];
  onRemove: (id: string) => void;
  onViewDetails: (university: University) => void;
}

const FavoritesSheet = ({
  open,
  onOpenChange,
  favorites,
  onRemove,
  onViewDetails,
}: FavoritesSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Saved Universities ({favorites.length})
          </SheetTitle>
        </SheetHeader>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Heart className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Saved Universities</h3>
            <p className="text-muted-foreground text-sm">
              Click the heart icon on university cards to save them
            </p>
          </div>
        ) : (
          <ScrollArea className="h-full pt-4">
            <div className="space-y-3">
              {favorites.map((uni) => (
                <Card key={uni.id} className="p-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={uni.logo}
                      alt=""
                      className="h-10 w-10 object-contain rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-1">
                        {uni.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {uni.city} • {uni.discipline}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => onViewDetails(uni)}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500"
                        onClick={() => onRemove(uni.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
};

// ==================== FOOTER COMPONENT ====================
const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-hero">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Campus<span className="text-secondary">Finder</span>
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Pakistan's leading university discovery platform. Helping students
              find their perfect academic match since 2024.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                About Us
              </a>
              <a
                href="#"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
              <a
                href="#"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>info@campusfinder.pk</p>
              <p>+92 300 1234567</p>
              <p>Islamabad, Pakistan</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 CampusFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// ==================== MAIN INDEX COMPONENT ====================
const Index = () => {
  const { toast } = useToast();
  
  // Data state
  const [universities, setUniversities] = useState<University[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [disciplines, setDisciplines] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter state
  const [marks, setMarks] = useState("");
  const [maxFee, setMaxFee] = useState([500000]);
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedDiscipline, setSelectedDiscipline] = useState("all");
  const [hasSearched, setHasSearched] = useState(false);

  // UI state
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

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
        
        // Extract unique cities and disciplines
        setCities([...new Set(transformedData.map((u) => u.city))]);
        setDisciplines([...new Set(transformedData.map((u) => u.discipline))]);
      } catch (error) {
        console.error("Error loading universities:", error);
        toast({
          title: "Error",
          description: "Failed to load universities data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUniversitiesData();
  }, []);

  // Filter universities
  const filteredUniversities = useMemo(() => {
    if (!hasSearched) return [];
    
    return universities.filter((uni) => {
      const marksNum = parseFloat(marks) || 0;
      const meetsMarks = uni.merit <= marksNum;
      const meetsFee = uni.fee <= maxFee[0];
      const meetsCity = selectedCity === "all" || uni.city === selectedCity;
      const meetsDiscipline =
        selectedDiscipline === "all" || uni.discipline === selectedDiscipline;

      return meetsMarks && meetsFee && meetsCity && meetsDiscipline;
    });
  }, [universities, marks, maxFee, selectedCity, selectedDiscipline, hasSearched]);

  // Handle eligibility check
  const handleEligibilityCheck = () => {
    if (!marks || !selectedCity || selectedCity === "all" || !selectedDiscipline || selectedDiscipline === "all") {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields (marks, city, and discipline) to search",
        variant: "destructive",
      });
      return;
    }
    
    setHasSearched(true);
    
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    const marksNum = parseFloat(marks) || 0;
    const count = universities.filter((uni) => {
      const meetsMarks = uni.merit <= marksNum;
      const meetsFee = uni.fee <= maxFee[0];
      const meetsCity = selectedCity === "all" || uni.city === selectedCity;
      const meetsDiscipline = selectedDiscipline === "all" || uni.discipline === selectedDiscipline;
      return meetsMarks && meetsFee && meetsCity && meetsDiscipline;
    }).length;

    toast({
      title: "Search Complete",
      description: `Found ${count} matching universities`,
    });
  };

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Toggle compare
  const toggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList((prev) => prev.filter((c) => c !== id));
    } else if (compareList.length < 4) {
      setCompareList((prev) => [...prev, id]);
    } else {
      toast({
        title: "Compare Limit Reached",
        description: "You can compare up to 4 universities at a time",
      });
    }
  };

  // Get favorite universities
  const favoriteUniversities = universities.filter((u) =>
    favorites.includes(u.id)
  );

  // Get compare universities
  const compareUniversities = universities.filter((u) =>
    compareList.includes(u.id)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 mx-auto mb-4 text-secondary animate-pulse" />
          <p className="text-muted-foreground">Loading universities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        favoritesCount={favorites.length}
        onShowFavorites={() => setShowFavorites(true)}
      />

      <HeroSection
        marks={marks}
        setMarks={setMarks}
        maxFee={maxFee}
        setMaxFee={setMaxFee}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedDiscipline={selectedDiscipline}
        setSelectedDiscipline={setSelectedDiscipline}
        onCheck={handleEligibilityCheck}
        cities={cities}
        disciplines={disciplines}
      />

      {/* Results Section */}
      <section id="universities" ref={resultsRef} className="py-16">
        <div className="container">
          {hasSearched && (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Matching Universities
                  </h2>
                  <p className="text-muted-foreground">
                    Found {filteredUniversities.length} universities matching your
                    criteria
                  </p>
                </div>

                {compareList.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setShowCompare(true)}
                  >
                    <Scale className="mr-2 h-4 w-4" />
                    Compare ({compareList.length})
                  </Button>
                )}
              </div>

              {filteredUniversities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredUniversities.map((university, index) => (
                    <UniversityCard
                      key={university.id}
                      university={university}
                      isFavorite={favorites.includes(university.id)}
                      isInCompare={compareList.includes(university.id)}
                      onToggleFavorite={toggleFavorite}
                      onToggleCompare={toggleCompare}
                      onViewDetails={(uni) => {
                        setSelectedUniversity(uni);
                        setShowDetails(true);
                      }}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Filter className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Universities Found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters to see more results
                  </p>
                </Card>
              )}
            </>
          )}

          {!hasSearched && (
            <Card className="p-12 text-center">
              <Search className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Search for Universities
              </h3>
              <p className="text-muted-foreground">
                Fill in your eligibility details above to find matching universities
              </p>
            </Card>
          )}
        </div>
      </section>

      <Footer />

      {/* Dialogs & Sheets */}
      <UniversityDetailsDialog
        university={selectedUniversity}
        open={showDetails}
        onOpenChange={setShowDetails}
      />

      <CompareSheet
        open={showCompare}
        onOpenChange={setShowCompare}
        compareList={compareUniversities}
        onRemove={(id) => setCompareList((prev) => prev.filter((c) => c !== id))}
      />

      <FavoritesSheet
        open={showFavorites}
        onOpenChange={setShowFavorites}
        favorites={favoriteUniversities}
        onRemove={(id) => setFavorites((prev) => prev.filter((f) => f !== id))}
        onViewDetails={(uni) => {
          setSelectedUniversity(uni);
          setShowFavorites(false);
          setShowDetails(true);
        }}
      />
    </div>
  );
};

export default Index;
