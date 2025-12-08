import { useState, useMemo } from "react";
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

// Import universities data
const universities: University[] = [
  {
    id: "pk0",
    title: "Federal Urdu University of Arts, Sciences & Technology, Islamabad",
    city: "Islamabad",
    province: "Punjab",
    degree: "MBBS",
    discipline: "Medical",
    fee: 42620,
    merit: 92.0,
    ranking: 47,
    status: 1,
    contact: "(051) 9252860",
    info: "info@mite.edu.pk",
    web: "http://www.fuuast.edu.pk/",
    url: "https://firebasestorage.googleapis.com/v0/b/campusfinder-6c74d.appspot.com/o/university_listing%2Fdownload%20(1).jpeg?alt=media&token=5339f81e-2e01-4460-bc48-d00888d984eb",
    logo: "https://www.fuuastisb.edu.pk/images/logonew.png",
    admissions: "1.0",
    map: {
      address: "M3XC+79J, Kuri Model Village, Mozah Mohrian, 5B, near Bahria Enclave Road, G 7/1 G-7, Islamabad",
      lat: 33.6686,
      long: 72.0602,
      location: "Islamabad",
    },
    deadline: "December 2024",
    admission: "Open",
  },
  {
    id: "pk1",
    title: "Quaid-i-Azam University, Islamabad",
    city: "Islamabad",
    province: "Punjab",
    degree: "BS Computer Science",
    discipline: "Computer Science",
    fee: 35000,
    merit: 88.5,
    ranking: 3,
    status: 1,
    contact: "(051) 9064-3000",
    info: "info@qau.edu.pk",
    web: "https://www.qau.edu.pk/",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Quaid-i-Azam_University_Campus.jpg/1200px-Quaid-i-Azam_University_Campus.jpg",
    logo: "https://www.qau.edu.pk/wp-content/uploads/2021/09/QAU-Logo.png",
    admissions: "1.0",
    map: {
      address: "Quaid-i-Azam University, Islamabad 45320",
      lat: 33.7470,
      long: 73.1371,
      location: "Islamabad",
    },
    deadline: "January 2025",
    admission: "Open",
  },
  {
    id: "pk2",
    title: "COMSATS University Islamabad",
    city: "Islamabad",
    province: "Punjab",
    degree: "BS Software Engineering",
    discipline: "Computer Science",
    fee: 125000,
    merit: 75.0,
    ranking: 8,
    status: 1,
    contact: "(051) 9049-5000",
    info: "admissions@comsats.edu.pk",
    web: "https://www.comsats.edu.pk/",
    url: "https://www.comsats.edu.pk/images/slider/slider1.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/en/d/d8/COMSATS_new_logo.jpg",
    admissions: "1.0",
    map: {
      address: "Park Road, Tarlai Kalan, Islamabad 45550",
      lat: 33.6526,
      long: 73.1569,
      location: "Islamabad",
    },
    deadline: "November 2024",
    admission: "Open",
  },
  {
    id: "pk3",
    title: "National University of Sciences and Technology (NUST)",
    city: "Islamabad",
    province: "Punjab",
    degree: "BS Electrical Engineering",
    discipline: "Engineering",
    fee: 185000,
    merit: 85.0,
    ranking: 1,
    status: 1,
    contact: "(051) 9085-5000",
    info: "admissions@nust.edu.pk",
    web: "https://nust.edu.pk/",
    url: "https://nust.edu.pk/wp-content/uploads/2021/10/nust-campus.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/3e/NUST_logo.png",
    admissions: "1.0",
    map: {
      address: "H-12, Islamabad 44000",
      lat: 33.6425,
      long: 72.9903,
      location: "Islamabad",
    },
    deadline: "October 2024",
    admission: "Closed",
  },
  {
    id: "pk4",
    title: "Lahore University of Management Sciences (LUMS)",
    city: "Lahore",
    province: "Punjab",
    degree: "BBA",
    discipline: "Business",
    fee: 450000,
    merit: 90.0,
    ranking: 2,
    status: 1,
    contact: "(042) 3560-8000",
    info: "admissions@lums.edu.pk",
    web: "https://lums.edu.pk/",
    url: "https://lums.edu.pk/sites/default/files/styles/full_width/public/2021-03/lums-campus.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/en/8/86/LUMS_logo.png",
    admissions: "1.0",
    map: {
      address: "DHA, Lahore Cantt. 54792",
      lat: 31.4697,
      long: 74.4072,
      location: "Lahore",
    },
    deadline: "January 2025",
    admission: "Open",
  },
  {
    id: "pk5",
    title: "University of Engineering and Technology (UET) Lahore",
    city: "Lahore",
    province: "Punjab",
    degree: "BS Civil Engineering",
    discipline: "Engineering",
    fee: 65000,
    merit: 82.0,
    ranking: 5,
    status: 1,
    contact: "(042) 9902-9000",
    info: "info@uet.edu.pk",
    web: "https://uet.edu.pk/",
    url: "https://uet.edu.pk/images/campus.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f3/University_of_Engineering_and_Technology_logo.png",
    admissions: "1.0",
    map: {
      address: "G.T. Road, Lahore 54890",
      lat: 31.5815,
      long: 74.3575,
      location: "Lahore",
    },
    deadline: "December 2024",
    admission: "Open",
  },
  {
    id: "pk6",
    title: "Aga Khan University, Karachi",
    city: "Karachi",
    province: "Sindh",
    degree: "MBBS",
    discipline: "Medical",
    fee: 550000,
    merit: 95.0,
    ranking: 4,
    status: 1,
    contact: "(021) 111-911-911",
    info: "admissions@aku.edu",
    web: "https://www.aku.edu/",
    url: "https://www.aku.edu/siteassets/images/aku-karachi.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/5a/Aga_Khan_University_logo.png",
    admissions: "1.0",
    map: {
      address: "Stadium Road, Karachi 74800",
      lat: 24.8907,
      long: 67.0742,
      location: "Karachi",
    },
    deadline: "November 2024",
    admission: "Open",
  },
  {
    id: "pk7",
    title: "Institute of Business Administration (IBA) Karachi",
    city: "Karachi",
    province: "Sindh",
    degree: "BBA",
    discipline: "Business",
    fee: 380000,
    merit: 88.0,
    ranking: 6,
    status: 1,
    contact: "(021) 111-422-422",
    info: "admissions@iba.edu.pk",
    web: "https://www.iba.edu.pk/",
    url: "https://www.iba.edu.pk/images/campus.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f4/IBA_Karachi_logo.png",
    admissions: "1.0",
    map: {
      address: "University Road, Karachi 75270",
      lat: 24.9407,
      long: 67.1111,
      location: "Karachi",
    },
    deadline: "January 2025",
    admission: "Open",
  },
  {
    id: "pk10",
    title: "FAST National University of Computer and Emerging Sciences",
    city: "Islamabad",
    province: "Punjab",
    degree: "BS Computer Science",
    discipline: "Computer Science",
    fee: 195000,
    merit: 80.0,
    ranking: 7,
    status: 1,
    contact: "(051) 111-128-128",
    info: "admissions@nu.edu.pk",
    web: "https://www.nu.edu.pk/",
    url: "https://www.nu.edu.pk/images/campus.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/5a/FAST_NUCES_logo.png",
    admissions: "1.0",
    map: {
      address: "A.K. Brohi Road, H-11/4, Islamabad",
      lat: 33.6802,
      long: 72.9875,
      location: "Islamabad",
    },
    deadline: "November 2024",
    admission: "Open",
  },
  {
    id: "pk11",
    title: "Government College University Lahore",
    city: "Lahore",
    province: "Punjab",
    degree: "BS English Literature",
    discipline: "Arts",
    fee: 32000,
    merit: 78.0,
    ranking: 10,
    status: 1,
    contact: "(042) 9921-3340",
    info: "info@gcu.edu.pk",
    web: "https://www.gcu.edu.pk/",
    url: "https://www.gcu.edu.pk/images/campus.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/en/d/d7/Government_College_University_Lahore_logo.png",
    admissions: "1.0",
    map: {
      address: "Katchery Road, Lahore 54000",
      lat: 31.5615,
      long: 74.3235,
      location: "Lahore",
    },
    deadline: "December 2024",
    admission: "Open",
  },
];

const RankingSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedUniversity, setSearchedUniversity] = useState<University | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Top 5 universities by ranking
  const top5Universities = useMemo(() => {
    return [...universities].sort((a, b) => a.ranking - b.ranking).slice(0, 5);
  }, []);

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

                    {/* Rank Icon */}
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
