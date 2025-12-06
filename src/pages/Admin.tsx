import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  GraduationCap,
  Building,
  Plus,
  ArrowLeft,
  Trash2,
  Edit,
  Eye,
  Save,
  X,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Award,
  TrendingUp,
  Users,
  BarChart,
  ArrowUp,
} from "lucide-react";

// University interface
interface University {
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

// Disciplines and provinces options
const disciplines = [
  "Medical",
  "Engineering",
  "Computer Science",
  "Business",
  "Law",
  "Arts",
  "Sciences",
  "Social Sciences",
  "Agriculture",
  "Pharmacy",
];

const provinces = [
  "Punjab",
  "Sindh",
  "KPK",
  "Balochistan",
  "Gilgit-Baltistan",
  "AJK",
];

const cities = [
  "Islamabad",
  "Lahore",
  "Karachi",
  "Peshawar",
  "Quetta",
  "Faisalabad",
  "Rawalpindi",
  "Multan",
  "Hyderabad",
  "Gujranwala",
];

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for universities list (simulated - would come from database)
  const [universities, setUniversities] = useState<University[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState<University | null>(null);
  const [viewingUniversity, setViewingUniversity] = useState<University | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Partial<University>>({
    title: "",
    city: "",
    province: "",
    degree: "",
    discipline: "",
    fee: 0,
    merit: 0,
    ranking: 0,
    status: 1,
    contact: "",
    info: "",
    web: "",
    url: "",
    logo: "",
    admissions: "1.0",
    map: {
      address: "",
      lat: 0,
      long: 0,
      location: "",
    },
    deadline: "",
    admission: "Open",
  });

  // Stats data
  const stats = [
    {
      title: "Total Universities",
      value: universities.length,
      change: 12,
      trend: "up",
      period: "from last month",
      icon: Building,
    },
    {
      title: "Active Admissions",
      value: universities.filter((u) => u.admission === "Open").length,
      change: 8,
      trend: "up",
      period: "from last month",
      icon: Users,
    },
    {
      title: "Avg Merit Score",
      value: universities.length > 0
        ? Math.round(universities.reduce((sum, u) => sum + u.merit, 0) / universities.length)
        : 0,
      change: 3,
      trend: "up",
      period: "from last year",
      icon: TrendingUp,
    },
    {
      title: "Total Disciplines",
      value: new Set(universities.map((u) => u.discipline)).size,
      change: 2,
      trend: "up",
      period: "new this month",
      icon: Award,
    },
  ];

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      city: "",
      province: "",
      degree: "",
      discipline: "",
      fee: 0,
      merit: 0,
      ranking: 0,
      status: 1,
      contact: "",
      info: "",
      web: "",
      url: "",
      logo: "",
      admissions: "1.0",
      map: {
        address: "",
        lat: 0,
        long: 0,
        location: "",
      },
      deadline: "",
      admission: "Open",
    });
    setEditingUniversity(null);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.city || !formData.discipline) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Title, City, Discipline)",
        variant: "destructive",
      });
      return;
    }

    if (editingUniversity) {
      // Update existing university
      setUniversities((prev) =>
        prev.map((u) =>
          u.id === editingUniversity.id
            ? { ...u, ...formData, id: u.id }
            : u
        )
      );
      toast({
        title: "University Updated",
        description: `${formData.title} has been updated successfully.`,
      });
    } else {
      // Add new university
      const newUniversity: University = {
        ...formData,
        id: `pk${Date.now()}`,
        map: formData.map || { address: "", lat: 0, long: 0, location: formData.city || "" },
      } as University;
      
      setUniversities((prev) => [...prev, newUniversity]);
      toast({
        title: "University Added",
        description: `${formData.title} has been added successfully.`,
      });
    }

    resetForm();
    setShowAddForm(false);
  };

  // Handle edit
  const handleEdit = (university: University) => {
    setFormData(university);
    setEditingUniversity(university);
    setShowAddForm(true);
  };

  // Handle delete
  const handleDelete = (id: string) => {
    setUniversities((prev) => prev.filter((u) => u.id !== id));
    toast({
      title: "University Deleted",
      description: "University has been removed successfully.",
    });
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">Open</Badge>;
      case "Closed":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">CampusFinder</h1>
                  <p className="text-xs text-muted-foreground">Admin Portal</p>
                </div>
              </div>
            </div>
            <Button
              onClick={() => {
                resetForm();
                setShowAddForm(true);
              }}
              className="gradient-hero text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add University
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Page Title */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">Admin Dashboard</h2>
          <p className="text-muted-foreground mt-1">Manage universities and admission data</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                    {stat.change}%
                    <ArrowUp className="h-3 w-3" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  {stat.change}% {stat.trend} {stat.period}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Universities Table */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Universities</CardTitle>
              <CardDescription>Manage all registered universities</CardDescription>
            </div>
            <Badge variant="outline" className="text-muted-foreground">
              {universities.length} Total
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="text-foreground font-semibold">University</TableHead>
                    <TableHead className="text-foreground font-semibold hidden md:table-cell">City</TableHead>
                    <TableHead className="text-foreground font-semibold hidden lg:table-cell">Discipline</TableHead>
                    <TableHead className="text-foreground font-semibold hidden lg:table-cell">Merit</TableHead>
                    <TableHead className="text-foreground font-semibold hidden md:table-cell">Fee</TableHead>
                    <TableHead className="text-foreground font-semibold">Status</TableHead>
                    <TableHead className="text-foreground font-semibold w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {universities.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-32 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Building className="h-8 w-8 text-muted-foreground/50" />
                          <p className="text-muted-foreground">No universities added yet</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              resetForm();
                              setShowAddForm(true);
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add First University
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    universities.map((university) => (
                      <TableRow key={university.id} className="hover:bg-muted/30">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
                              {university.logo ? (
                                <img
                                  src={university.logo}
                                  alt={university.title}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = "none";
                                  }}
                                />
                              ) : (
                                <GraduationCap className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-foreground line-clamp-1">
                                {university.title}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {university.degree}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {university.city}
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge variant="secondary" className="text-xs">
                            {university.discipline}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="font-medium text-primary">{university.merit}%</span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="text-muted-foreground">
                            PKR {university.fee.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>{getStatusBadge(university.admission)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-primary"
                              onClick={() => setViewingUniversity(university)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-accent"
                              onClick={() => handleEdit(university)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => handleDelete(university.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Add/Edit University Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              {editingUniversity ? "Edit University" : "Add New University"}
            </DialogTitle>
            <DialogDescription>
              {editingUniversity
                ? "Update university information"
                : "Fill in the details to add a new university to the database"}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-180px)] pr-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Building className="h-4 w-4 text-primary" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="title" className="text-foreground">
                      University Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., National University of Sciences and Technology"
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="degree" className="text-foreground">Degree Program</Label>
                    <Input
                      id="degree"
                      value={formData.degree}
                      onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                      placeholder="e.g., MBBS, BS Computer Science"
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discipline" className="text-foreground">
                      Discipline <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.discipline}
                      onValueChange={(value) => setFormData({ ...formData, discipline: value })}
                    >
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select discipline" />
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
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Location
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-foreground">
                      City <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          city: value,
                          map: { ...formData.map!, location: value },
                        })
                      }
                    >
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="province" className="text-foreground">Province</Label>
                    <Select
                      value={formData.province}
                      onValueChange={(value) => setFormData({ ...formData, province: value })}
                    >
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-1 space-y-2">
                    <Label htmlFor="ranking" className="text-foreground">Ranking</Label>
                    <Input
                      id="ranking"
                      type="number"
                      value={formData.ranking}
                      onChange={(e) => setFormData({ ...formData, ranking: parseInt(e.target.value) || 0 })}
                      placeholder="e.g., 5"
                      className="bg-background border-border"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-foreground">Full Address</Label>
                  <Textarea
                    id="address"
                    value={formData.map?.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        map: { ...formData.map!, address: e.target.value },
                      })
                    }
                    placeholder="Complete address of the university"
                    className="bg-background border-border resize-none"
                    rows={2}
                  />
                </div>
              </div>

              {/* Admission Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  Admission Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="merit" className="text-foreground">Merit Score (%)</Label>
                    <Input
                      id="merit"
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={formData.merit}
                      onChange={(e) => setFormData({ ...formData, merit: parseFloat(e.target.value) || 0 })}
                      placeholder="e.g., 85.5"
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fee" className="text-foreground">Fee (PKR)</Label>
                    <Input
                      id="fee"
                      type="number"
                      value={formData.fee}
                      onChange={(e) => setFormData({ ...formData, fee: parseInt(e.target.value) || 0 })}
                      placeholder="e.g., 150000"
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline" className="text-foreground">Deadline</Label>
                    <Input
                      id="deadline"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      placeholder="e.g., January 2025"
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admission" className="text-foreground">Status</Label>
                    <Select
                      value={formData.admission}
                      onValueChange={(value) => setFormData({ ...formData, admission: value })}
                    >
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                        <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-foreground">Phone</Label>
                    <Input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="e.g., (051) 9064-3000"
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="info" className="text-foreground">Email</Label>
                    <Input
                      id="info"
                      type="email"
                      value={formData.info}
                      onChange={(e) => setFormData({ ...formData, info: e.target.value })}
                      placeholder="e.g., info@university.edu.pk"
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="web" className="text-foreground">Website</Label>
                    <Input
                      id="web"
                      value={formData.web}
                      onChange={(e) => setFormData({ ...formData, web: e.target.value })}
                      placeholder="e.g., https://www.university.edu.pk"
                      className="bg-background border-border"
                    />
                  </div>
                </div>
              </div>

              {/* Media */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  Media
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="logo" className="text-foreground">Logo URL</Label>
                    <Input
                      id="logo"
                      value={formData.logo}
                      onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                      placeholder="https://..."
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="url" className="text-foreground">Campus Image URL</Label>
                    <Input
                      id="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://..."
                      className="bg-background border-border"
                    />
                  </div>
                </div>
              </div>
            </form>
          </ScrollArea>

          <DialogFooter className="gap-2 border-t border-border pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                setShowAddForm(false);
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="gradient-hero text-primary-foreground">
              <Save className="h-4 w-4 mr-2" />
              {editingUniversity ? "Update University" : "Save University"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View University Dialog */}
      <Dialog open={!!viewingUniversity} onOpenChange={() => setViewingUniversity(null)}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-3">
              {viewingUniversity?.logo && (
                <img
                  src={viewingUniversity.logo}
                  alt=""
                  className="h-10 w-10 rounded-lg object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
              {viewingUniversity?.title}
            </DialogTitle>
            <DialogDescription>{viewingUniversity?.degree}</DialogDescription>
          </DialogHeader>

          {viewingUniversity && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Location</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      {viewingUniversity.city}, {viewingUniversity.province}
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      {viewingUniversity.map?.address}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Admission Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Merit Score</span>
                      <span className="font-medium text-primary">{viewingUniversity.merit}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fee</span>
                      <span className="font-medium text-foreground">
                        PKR {viewingUniversity.fee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deadline</span>
                      <span className="text-foreground">{viewingUniversity.deadline || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Status</span>
                      {getStatusBadge(viewingUniversity.admission)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-foreground">
                      <Phone className="h-4 w-4 text-primary" />
                      {viewingUniversity.contact || "N/A"}
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <Mail className="h-4 w-4 text-primary" />
                      {viewingUniversity.info || "N/A"}
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <Globe className="h-4 w-4 text-primary" />
                      <a
                        href={viewingUniversity.web}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline truncate"
                      >
                        {viewingUniversity.web || "N/A"}
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Additional Info</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ranking</span>
                      <span className="text-foreground">#{viewingUniversity.ranking}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discipline</span>
                      <Badge variant="secondary">{viewingUniversity.discipline}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingUniversity(null)}>
              Close
            </Button>
            <Button
              onClick={() => {
                if (viewingUniversity) {
                  handleEdit(viewingUniversity);
                  setViewingUniversity(null);
                }
              }}
              className="gradient-hero text-primary-foreground"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit University
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
