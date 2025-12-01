import { Search, BookOpen, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onScrollToUniversities: () => void;
}

export const HeroSection = ({
  searchQuery,
  onSearchChange,
  onScrollToUniversities,
}: HeroSectionProps) => {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 gradient-hero opacity-[0.03]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--secondary)/0.15),transparent)]" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-2xl gradient-accent opacity-20 animate-float" />
      <div
        className="absolute bottom-32 right-20 w-16 h-16 rounded-full gradient-hero opacity-20 animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-40 right-32 w-12 h-12 rounded-xl bg-secondary/20 animate-float"
        style={{ animationDelay: "4s" }}
      />

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-6 animate-fade-in">
            <Award className="h-4 w-4" />
            <span>Pakistan's #1 University Search Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up">
            Find Your{" "}
            <span className="text-gradient">Perfect University</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Discover top universities across Pakistan based on your marks, budget,
            and preferences. Compare, shortlist, and make informed decisions.
          </p>

          {/* Search Bar */}
          <div
            className="max-w-2xl mx-auto mb-12 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search universities, programs, or cities..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-14 pl-12 pr-4 text-base rounded-2xl border-2 border-border bg-card shadow-card focus:border-secondary focus:shadow-card-hover transition-all"
              />
              <Button
                variant="hero"
                size="lg"
                className="absolute right-2 rounded-xl"
                onClick={onScrollToUniversities}
              >
                Search
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <StatItem icon={BookOpen} value="200+" label="Universities" />
            <StatItem icon={Users} value="50K+" label="Students Helped" />
            <StatItem icon={Award} value="100+" label="Programs" />
            <StatItem icon={Search} value="15+" label="Cities" />
          </div>
        </div>
      </div>
    </section>
  );
};

const StatItem = ({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
}) => (
  <div className="text-center group">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/10 text-secondary mb-3 group-hover:scale-110 transition-transform">
      <Icon className="h-5 w-5" />
    </div>
    <div className="text-2xl md:text-3xl font-bold text-foreground">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);
