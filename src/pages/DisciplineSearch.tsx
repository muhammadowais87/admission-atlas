import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GraduationCap,
  BookOpen,
  Award,
  MapPin,
  TrendingUp,
  ArrowLeft,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
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
    id: "pk8",
    title: "University of Peshawar",
    city: "Peshawar",
    province: "KPK",
    degree: "BS Economics",
    discipline: "Social Sciences",
    fee: 28000,
    merit: 70.0,
    ranking: 15,
    status: 1,
    contact: "(091) 921-6700",
    info: "info@uop.edu.pk",
    web: "https://www.uop.edu.pk/",
    url: "https://www.uop.edu.pk/images/campus.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/79/University_of_Peshawar_logo.png",
    admissions: "1.0",
    map: {
      address: "University Road, Peshawar 25120",
      lat: 34.0081,
      long: 71.5249,
      location: "Peshawar",
    },
    deadline: "December 2024",
    admission: "Open",
  },
  {
    id: "pk9",
    title: "University of Balochistan, Quetta",
    city: "Quetta",
    province: "Balochistan",
    degree: "BS Chemistry",
    discipline: "Sciences",
    fee: 22000,
    merit: 65.0,
    ranking: 28,
    status: 1,
    contact: "(081) 921-1267",
    info: "info@uob.edu.pk",
    web: "https://www.uob.edu.pk/",
    url: "https://www.uob.edu.pk/images/campus.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/07/University_of_Balochistan_logo.png",
    admissions: "1.0",
    map: {
      address: "Sariab Road, Quetta 87300",
      lat: 30.1575,
      long: 66.9977,
      location: "Quetta",
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
  {
    id: "pk12",
    title: "Islamabad Medical and Dental College",
    city: "Islamabad",
    province: "Punjab",
    degree: "MBBS",
    discipline: "Medical",
    fee: 8500,
    merit: 45.0,
    ranking: 85,
    status: 1,
    contact: "(051) 2243322",
    info: "info@imdc.edu.pk",
    web: "https://www.imdc.edu.pk/",
    url: "https://firebasestorage.googleapis.com/v0/b/campusfinder-6c74d.appspot.com/o/university_listing%2Fdownload%20(1).jpeg?alt=media&token=5339f81e-2e01-4460-bc48-d00888d984eb",
    logo: "https://www.imdc.edu.pk/logo.png",
    admissions: "1.0",
    map: {
      address: "Main Murree Road, Bharakahu, Islamabad",
      lat: 33.7294,
      long: 73.1422,
      location: "Islamabad",
    },
    deadline: "February 2025",
    admission: "Open",
  },
  {
    id: "pk13",
    title: "Riphah International University - Medical Campus",
    city: "Islamabad",
    province: "Punjab",
    degree: "MBBS",
    discipline: "Medical",
    fee: 9500,
    merit: 50.0,
    ranking: 72,
    status: 1,
    contact: "(051) 8446000",
    info: "info@riphah.edu.pk",
    web: "https://www.riphah.edu.pk/",
    url: "https://www.riphah.edu.pk/images/campus.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/3d/Riphah_International_University_logo.png",
    admissions: "1.0",
    map: {
      address: "7th Avenue, Sector G-7/4, Islamabad",
      lat: 33.7100,
      long: 73.0551,
      location: "Islamabad",
    },
    deadline: "January 2025",
    admission: "Open",
  },
];

const disciplines = [...new Set(universities.map((u) => u.discipline))];

const DisciplineSearch = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState("");

  // Filter universities by discipline
  const filteredUniversities = useMemo(() => {
    if (!selectedDiscipline) return [];
    return universities
      .filter((u) => u.discipline === selectedDiscipline)
      .sort((a, b) => a.ranking - b.ranking);
  }, [selectedDiscipline]);

  const getRankingBadge = (ranking: number) => {
    if (ranking <= 5) return { variant: "accent" as const, label: "Top 5" };
    if (ranking <= 10) return { variant: "success" as const, label: "Top 10" };
    if (ranking <= 25) return { variant: "info" as const, label: "Top 25" };
    return { variant: "muted" as const, label: `#${ranking}` };
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
            <BookOpen className="h-4 w-4" />
            <span>Browse by Discipline</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Universities by <span className="text-gradient">Discipline</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Select your field of interest to discover all universities offering programs in that discipline
          </p>
        </div>

        {/* Discipline Selector */}
        <div className="max-w-md mx-auto mb-12">
          <Select value={selectedDiscipline} onValueChange={setSelectedDiscipline}>
            <SelectTrigger className="h-14 text-base rounded-2xl border-2 border-border bg-card shadow-card focus:border-secondary focus:shadow-card-hover transition-all">
              <SelectValue placeholder="Select a Discipline" />
            </SelectTrigger>
            <SelectContent>
              {disciplines.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        {selectedDiscipline && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                {selectedDiscipline} Universities
              </h2>
              <Badge variant="secondary" className="text-sm">
                {filteredUniversities.length} Found
              </Badge>
            </div>

            {filteredUniversities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredUniversities.map((university, index) => {
                  const rankingBadge = getRankingBadge(university.ranking);
                  return (
                    <Card
                      key={university.id}
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
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

                        {/* Top Actions */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <Badge variant={rankingBadge.variant}>
                            <Award className="h-3 w-3 mr-1" />
                            {rankingBadge.label}
                          </Badge>
                          {university.admission === "Open" && (
                            <Badge variant="success">Admissions Open</Badge>
                          )}
                        </div>

                        {/* Bottom Info Overlay */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="flex items-center gap-2 text-primary-foreground/90">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm font-medium truncate">
                              {university.city}, {university.province}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <CardHeader className="pb-2">
                        <h3 className="font-bold text-lg text-foreground line-clamp-2 min-h-[3.5rem] group-hover:text-secondary transition-colors">
                          {university.title}
                        </h3>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Degree & Discipline */}
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary">
                            <GraduationCap className="h-3 w-3 mr-1" />
                            {university.degree}
                          </Badge>
                        </div>

                        {/* Key Stats */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-muted/50">
                            <div className="text-xs text-muted-foreground mb-1">Merit</div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4 text-secondary" />
                              <span className="font-bold text-foreground">
                                {university.merit}%
                              </span>
                            </div>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50">
                            <div className="text-xs text-muted-foreground mb-1">Fee/Year</div>
                            <div className="font-bold text-foreground">
                              {university.fee.toLocaleString()}
                              <span className="text-xs font-normal text-muted-foreground ml-1">
                                PKR
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-lg text-muted-foreground">
                  No universities found for {selectedDiscipline}
                </p>
              </div>
            )}
          </div>
        )}

        {/* No Selection State */}
        {!selectedDiscipline && (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Select a Discipline
            </h3>
            <p className="text-muted-foreground">
              Choose a discipline from the dropdown above to see all available universities
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DisciplineSearch;
