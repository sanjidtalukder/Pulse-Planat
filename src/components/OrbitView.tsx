import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Thermometer, 
  Wind, 
  Droplet, 
  TreePine, 
  Recycle,
  Satellite,
  Users,
  MapPin,
  Clock,
  AlertCircle,
  Zap,
  Globe,
  MessageCircle,
  User,
  ThumbsUp,
  Eye,
  X,
  Send
} from "lucide-react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Enhanced mock data with more user report details
const mockMapData = {
  nasaLayers: {
    heat: { 
      active: true, 
      intensity: "High in downtown, moderate in suburbs",
      value: "32°C",
      trend: "rising"
    },
    air: { 
      active: false, 
      intensity: "Good overall, some pollution near highways",
      value: "45 AQI",
      trend: "stable"
    },
    flood: { 
      active: false, 
      intensity: "Low risk, drainage systems functional",
      value: "Low Risk",
      trend: "stable"
    },
    green: { 
      active: true, 
      intensity: "68% coverage, concentrated in parks",
      value: "68%",
      trend: "improving"
    },
    waste: { 
      active: false, 
      intensity: "85% recycling rate, efficient collection",
      value: "85%",
      trend: "improving"
    }
  },
  citizenReports: {
    total: 47,
    recent: [
      { 
        id: 1, 
        type: "heat", 
        location: "Downtown Plaza", 
        time: "2 min ago", 
        severity: "high",
        user: "Sarah Chen",
        avatar: "SC",
        description: "Extreme heat making it difficult to walk outside. Need more shaded areas.",
        likes: 12,
        comments: 3,
        verified: true,
        liked: false,
        commentsList: [
          { id: 1, user: "City Official", text: "We're installing new shade structures next week.", time: "1 min ago" },
          { id: 2, user: "Local Business", text: "We offer free water and AC during peak hours.", time: "30 min ago" },
          { id: 3, user: "Community Member", text: "Thanks for raising this issue!", time: "1 hour ago" }
        ]
      },
      { 
        id: 2, 
        type: "green", 
        location: "Riverside Park", 
        time: "15 min ago", 
        severity: "low",
        user: "Miguel Rodriguez",
        avatar: "MR",
        description: "Beautiful new trees planted near the playground. Great initiative!",
        likes: 24,
        comments: 7,
        verified: true,
        liked: false,
        commentsList: [
          { id: 1, user: "Park Manager", text: "Thank you! We plan to plant 100 more trees this season.", time: "10 min ago" }
        ]
      },
      { 
        id: 3, 
        type: "air", 
        location: "Industrial Ave", 
        time: "1 hr ago", 
        severity: "medium",
        user: "Alex Thompson",
        avatar: "AT",
        description: "Strong chemical smell near the factory. Concerned about air quality.",
        likes: 8,
        comments: 2,
        verified: false,
        liked: false,
        commentsList: []
      },
      { 
        id: 4, 
        type: "flood", 
        location: "Canal Street", 
        time: "3 hrs ago", 
        severity: "low",
        user: "Priya Patel",
        avatar: "PP",
        description: "Minor water accumulation after rain. Drains seem clogged.",
        likes: 5,
        comments: 1,
        verified: true,
        liked: false,
        commentsList: []
      },
      { 
        id: 5, 
        type: "air", 
        location: "Tech Park", 
        time: "18 hrs ago", 
        severity: "medium",
        user: "James Wilson",
        avatar: "JW",
        description: "Noticing increased smog levels during morning commute.",
        likes: 15,
        comments: 4,
        verified: true,
        liked: false,
        commentsList: []
      },
      { 
        id: 6, 
        type: "green", 
        location: "Central Garden", 
        time: "1 day ago", 
        severity: "low",
        user: "Emma Davis",
        avatar: "ED",
        description: "Community garden thriving! Volunteers needed for weekend maintenance.",
        likes: 32,
        comments: 9,
        verified: true,
        liked: false,
        commentsList: []
      },
      { 
        id: 7, 
        type: "heat", 
        location: "Market Square", 
        time: "1 day ago", 
        severity: "high",
        user: "David Kim",
        avatar: "DK",
        description: "Temperature readings show 38°C in direct sunlight. Urgent need for cooling stations.",
        likes: 18,
        comments: 5,
        verified: true,
        liked: false,
        commentsList: []
      }
    ]
  },
  cityStats: {
    population: "8.9M",
    area: "306.4 km²",
    lastUpdate: "Just now"
  }
};

const layerIcons = {
  heat: Thermometer,
  air: Wind,
  flood: Droplet,
  green: TreePine,
  waste: Recycle
};

const layerColors = {
  heat: "text-orange-500",
  air: "text-blue-500",
  flood: "text-cyan-500",
  green: "text-green-500",
  waste: "text-yellow-500"
};

const layerBgColors = {
  heat: "bg-orange-500/10",
  air: "bg-blue-500/10",
  flood: "bg-cyan-500/10",
  green: "bg-green-500/10",
  waste: "bg-yellow-500/10"
};

const severityColors = {
  high: "bg-red-500/20 text-red-500 border-red-500/30",
  medium: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  low: "bg-green-500/20 text-green-500 border-green-500/30"
};

const severityIcons = {
  high: AlertCircle,
  medium: AlertCircle,
  low: AlertCircle
};

// Types for our data
interface Comment {
  id: number;
  user: string;
  text: string;
  time: string;
}

interface Report {
  id: number;
  type: string;
  location: string;
  time: string;
  severity: string;
  user: string;
  avatar: string;
  description: string;
  likes: number;
  comments: number;
  verified: boolean;
  liked: boolean;
  commentsList: Comment[];
}

export const OrbitView = () => {
  const [viewMode, setViewMode] = useState<"nasa" | "citizen">("nasa");
  const [activeLayers, setActiveLayers] = useState<string[]>(["heat", "green"]);
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>(mockMapData.citizenReports.recent as Report[]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const toggleLayer = (layer: string) => {
    setActiveLayers(prev => 
      prev.includes(layer) 
        ? prev.filter(l => l !== layer)
        : [...prev, layer]
    );
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === "nasa" ? "citizen" : "nasa");
  };

  // Like functionality
  const handleLike = (reportId: number) => {
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === reportId 
          ? { 
              ...report, 
              likes: report.liked ? report.likes - 1 : report.likes + 1,
              liked: !report.liked
            }
          : report
      )
    );
  };

  // View Details functionality
  const handleViewDetails = (report: Report) => {
    setSelectedReport(report);
    setIsDetailModalOpen(true);
  };

  // Open Comment Modal
  const handleOpenComments = (report: Report) => {
    setSelectedReport(report);
    setIsCommentModalOpen(true);
  };

  // Add new comment
  const handleAddComment = () => {
    if (!selectedReport || !newComment.trim()) return;

    const newCommentObj: Comment = {
      id: selectedReport.commentsList.length + 1,
      user: "You",
      text: newComment,
      time: "Just now"
    };

    setReports(prevReports => 
      prevReports.map(report => 
        report.id === selectedReport.id 
          ? { 
              ...report, 
              comments: report.comments + 1,
              commentsList: [...report.commentsList, newCommentObj]
            }
          : report
      )
    );

    setNewComment("");
  };

  useEffect(() => {
    if (viewMode === "nasa" && mapContainerRef.current && !mapRef.current) {
      setIsLoading(true);

      const map = L.map(mapContainerRef.current).setView([23.8103, 90.4125], 11);
      mapRef.current = map;

      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}', {
        attribution: 'Tiles © Esri',
        maxZoom: 18
      }).addTo(map);

      L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        opacity: 0.3,
        attribution: 'Map data: © OpenTopoMap'
      }).addTo(map);

      const locations = [
        { lat: 23.8103, lng: 90.4125, name: "Dhaka Center", type: "heat" },
        { lat: 23.7500, lng: 90.4000, name: "Green Park", type: "green" },
        { lat: 23.8300, lng: 90.4200, name: "Industrial Zone", type: "air" },
        { lat: 23.7800, lng: 90.3500, name: "River Side", type: "flood" },
      ];

      locations.forEach(location => {
        const customIcon = L.divIcon({
          html: `<div class="w-6 h-6 rounded-full bg-${
            location.type === 'heat' ? 'red' : 
            location.type === 'green' ? 'green' :
            location.type === 'air' ? 'blue' : 'cyan'
          }-500 border-2 border-white shadow-lg animate-pulse"></div>`,
          className: 'custom-marker',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        L.marker([location.lat, location.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(`
            <div class="p-2">
              <h3 class="font-bold">${location.name}</h3>
              <p class="text-sm">Type: ${location.type}</p>
              <p class="text-xs text-gray-600">Active monitoring</p>
            </div>
          `);
      });

      map.whenReady(() => {
        setIsLoading(false);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [viewMode]);

  useEffect(() => {
    if (viewMode === "nasa" && mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 100);
    }
  }, [viewMode]);

  const UserReportCard = ({ report }: { report: Report }) => {
    const Icon = layerIcons[report.type as keyof typeof layerIcons];
    const colorClass = layerColors[report.type as keyof typeof layerColors];
    const severityClass = severityColors[report.severity as keyof typeof severityColors];
    const SeverityIcon = severityIcons[report.severity as keyof typeof severityIcons];
    
    return (
      <Card className="bg-slate-800/30 border-slate-700/50 hover:border-green-500/30 transition-all duration-300 group hover:scale-[1.01]">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${layerBgColors[report.type as keyof typeof layerBgColors]}`}>
                <Icon className={`w-4 h-4 ${colorClass}`} />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">{report.location}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={`text-xs ${severityClass}`}>
                    <SeverityIcon className="w-3 h-3 mr-1" />
                    {report.severity} severity
                  </Badge>
                  <span className="text-slate-400 text-xs flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {report.time}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <span className="text-green-400 text-sm font-bold">{report.avatar}</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-white text-sm font-medium">{report.user}</span>
                {report.verified && (
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 text-xs px-1 py-0">
                    Verified
                  </Badge>
                )}
              </div>
              <span className="text-slate-400 text-xs">Community Member</span>
            </div>
          </div>

          {/* Report Description */}
          <p className="text-slate-200 text-sm mb-3 leading-relaxed">
            {report.description}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-8 px-2 ${report.liked ? 'text-green-400' : 'text-slate-400'} hover:text-green-400`}
                onClick={() => handleLike(report.id)}
              >
                <ThumbsUp className={`w-4 h-4 mr-1 ${report.liked ? 'fill-current' : ''}`} />
                {report.likes}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-slate-400 hover:text-blue-400"
                onClick={() => handleOpenComments(report)}
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                {report.comments}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-slate-400 hover:text-purple-400"
                onClick={() => handleViewDetails(report)}
              >
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </Button>
            </div>
            <Badge variant="outline" className="bg-slate-700/50 text-slate-300 capitalize">
              {report.type}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-4 space-y-6">
      {/* Enhanced Header */}
      <header className="text-center pt-4 animate-fade-in">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <Globe className="w-8 h-8 text-cyan-400 animate-spin-slow" />
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            OrbitView
          </h1>
          <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
        </div>
        <p className="text-cyan-200/80 text-sm md:text-base">
          Dual Reality Urban Intelligence Platform
        </p>
        <div className="flex justify-center items-center space-x-4 mt-3 text-xs text-cyan-300/60">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>Last update: {mockMapData.cityStats.lastUpdate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>Pop: {mockMapData.cityStats.population}</span>
          </div>
        </div>
      </header>

      {/* Enhanced Reality Toggle */}
      <section className="flex justify-center animate-slide-up">
        <Card className="w-full max-w-md bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Satellite className="w-5 h-5 text-cyan-400" />
                <Label htmlFor="view-mode" className="text-sm font-medium text-cyan-200">
                  Satellite View
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="view-mode"
                  checked={viewMode === "citizen"}
                  onCheckedChange={toggleViewMode}
                  className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-cyan-500"
                />
                <div className="w-12 text-right">
                  <span className={`text-sm font-medium transition-all duration-300 ${
                    viewMode === "citizen" ? "text-green-400" : "text-cyan-400/60"
                  }`}>
                    {viewMode === "citizen" ? "ON" : "OFF"}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="view-mode" className="text-sm font-medium text-green-200">
                  Community View
                </Label>
                <Users className="w-5 h-5 text-green-400" />
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                  {mockMapData.citizenReports.total}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Main Content Area - Map OR Community Reports */}
      <section className="animate-slide-up delay-200">
        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-sm font-medium">
              <div className="flex items-center space-x-2">
                {viewMode === "nasa" ? (
                  <>
                    <Satellite className="w-4 h-4 text-cyan-400" />
                    <span className="text-cyan-200">Satellite Data Overview</span>
                  </>
                ) : (
                  <>
                    <Users className="w-4 h-4 text-green-400" />
                    <span className="text-green-200">Live Community Reports</span>
                  </>
                )}
              </div>
              <Badge variant="outline" className={
                viewMode === "nasa" 
                  ? "bg-cyan-500/20 text-cyan-400" 
                  : "bg-green-500/20 text-green-400"
              }>
                {viewMode === "nasa" ? "🛰️ NASA Data" : "👥 Community Reports"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {viewMode === "nasa" ? (
              /* NASA View - Map with Satellite Data */
              <div className="relative h-80 md:h-96 lg:h-[500px]">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 z-10">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-3"></div>
                      <p className="text-cyan-200/80 text-sm">Loading satellite data...</p>
                    </div>
                  </div>
                )}

                <div 
                  ref={mapContainerRef}
                  className="w-full h-full rounded-b-lg"
                />

                {/* NASA Data Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(mockMapData.nasaLayers)
                      .filter(([_, data]) => data.active)
                      .map(([layer, data]) => {
                        const Icon = layerIcons[layer as keyof typeof layerIcons];
                        const colorClass = layerColors[layer as keyof typeof layerColors];
                        const bgClass = layerBgColors[layer as keyof typeof layerBgColors];
                        
                        return (
                          <div 
                            key={layer}
                            className={`${bgClass} backdrop-blur-sm rounded-lg p-3 border border-white/10 animate-fade-in`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Icon className={`w-4 h-4 ${colorClass}`} />
                                <span className="text-white text-sm font-medium capitalize">{layer}</span>
                              </div>
                              <Badge variant="outline" className="text-xs bg-black/30">
                                {data.value}
                              </Badge>
                            </div>
                            <p className="text-white/70 text-xs mt-1">{data.intensity}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            ) : (
              /* Community View - User Reports List (NO MAP) */
              <div className="p-4 min-h-[500px]">
                {/* <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-green-400 text-xl font-bold flex items-center space-x-2">
                        <Users className="w-6 h-6" />
                        <span>Community Reports Feed</span>
                      </h3>
                      <p className="text-slate-400 text-sm mt-1">
                        Real-time reports from {mockMapData.cityStats.population} citizens
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 text-lg py-1">
                      {reports.length} Active Reports
                    </Badge>
                  </div> */}
                  
                  {/* Quick Stats */}
                  {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="bg-slate-800/30 rounded-lg p-3 text-center">
                      <div className="text-green-400 font-bold text-lg">{mockMapData.citizenReports.total}</div>
                      <div className="text-slate-400 text-xs">Total Reports</div>
                    </div>
                    <div className="bg-slate-800/30 rounded-lg p-3 text-center">
                      <div className="text-blue-400 font-bold text-lg">32</div>
                      <div className="text-slate-400 text-xs">Verified Users</div>
                    </div>
                    <div className="bg-slate-800/30 rounded-lg p-3 text-center">
                      <div className="text-yellow-400 font-bold text-lg">89%</div>
                      <div className="text-slate-400 text-xs">Response Rate</div>
                    </div>
                    <div className="bg-slate-800/30 rounded-lg p-3 text-center">
                      <div className="text-purple-400 font-bold text-lg">15min</div>
                      <div className="text-slate-400 text-xs">Avg. Response</div>
                    </div>
                  </div> */}
                {/* </div> */}

                {/* Community Reports List */}
                {/* <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {reports.map((report) => (
                    <UserReportCard key={report.id} report={report} />
                  ))}
                </div> */}

                 {/* Community View - User Reports List (NO MAP)  */}
<div className="p-4 min-h-[500px] flex flex-col">
  <div className="mb-6 flex-shrink-0">
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3 className="text-green-400 text-xl font-bold flex items-center space-x-2">
          <Users className="w-6 h-6" />
          <span>Community Reports Feed</span>
        </h3>
        <p className="text-slate-400 text-sm mt-1">
          Real-time reports from {mockMapData.cityStats.population} citizens
        </p>
      </div>
      <Badge variant="secondary" className="bg-green-500/20 text-green-400 text-lg py-1">
        {reports.length} Active Reports
      </Badge>
    </div>
    
    {/* Quick Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      <div className="bg-slate-800/30 rounded-lg p-3 text-center">
        <div className="text-green-400 font-bold text-lg">{mockMapData.citizenReports.total}</div>
        <div className="text-slate-400 text-xs">Total Reports</div>
      </div>
      <div className="bg-slate-800/30 rounded-lg p-3 text-center">
        <div className="text-blue-400 font-bold text-lg">32</div>
        <div className="text-slate-400 text-xs">Verified Users</div>
      </div>
      <div className="bg-slate-800/30 rounded-lg p-3 text-center">
        <div className="text-yellow-400 font-bold text-lg">89%</div>
        <div className="text-slate-400 text-xs">Response Rate</div>
      </div>
      <div className="bg-slate-800/30 rounded-lg p-3 text-center">
        <div className="text-purple-400 font-bold text-lg">15min</div>
        <div className="text-slate-400 text-xs">Avg. Response</div>
      </div>
    </div>
  </div>

  {/* Scrollable Reports Area */}
  <div className="flex-1 min-h-0">
    <div className="h-full overflow-y-auto pr-2">
      <div className="space-y-4 pb-2"> {/* Added padding bottom */}
        {reports.map((report) => (
          <UserReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  </div>
</div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Enhanced Layer Controls */}
      <section className="animate-slide-up delay-400">
        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-sm font-medium text-cyan-200">
              <Zap className="w-4 h-4" />
              <span>Active Data Layers</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {Object.entries(layerIcons).map(([layer, Icon]) => {
                const isActive = activeLayers.includes(layer);
                const colorClass = layerColors[layer as keyof typeof layerColors];
                const bgClass = layerBgColors[layer as keyof typeof layerBgColors];
                
                return (
                  <Button
                    key={layer}
                    variant={isActive ? "default" : "outline"}
                    onClick={() => toggleLayer(layer)}
                    className={`h-auto py-3 px-4 transition-all duration-300 ${
                      isActive 
                        ? `${bgClass} border-current scale-105 shadow-lg` 
                        : "bg-slate-800/50 border-slate-600 hover:scale-102"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Icon className={`w-5 h-5 ${isActive ? colorClass : "text-slate-400"}`} />
                      <span className={`text-xs font-medium ${isActive ? "text-white" : "text-slate-300"}`}>
                        {layer.charAt(0).toUpperCase() + layer.slice(1)}
                      </span>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Activity Summary */}
      <section className="animate-slide-up delay-600">
        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sm font-medium text-cyan-200">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Recent Activity Summary</span>
              </div>
              <Badge variant="outline" className="bg-cyan-500/20 text-cyan-400">
                Last 24 Hours
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {reports.slice(0, 4).map((report) => {
                const Icon = layerIcons[report.type as keyof typeof layerIcons];
                const colorClass = layerColors[report.type as keyof typeof layerColors];
                
                return (
                  <div key={report.id} className="flex items-center space-x-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-700/40 transition-colors">
                    <div className={`p-2 rounded-full ${layerBgColors[report.type as keyof typeof layerBgColors]}`}>
                      <Icon className={`w-4 h-4 ${colorClass}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{report.location}</p>
                      <p className="text-slate-400 text-xs">{report.time}</p>
                    </div>
                    <Badge className={`text-xs ${severityColors[report.severity as keyof typeof severityColors]}`}>
                      {report.severity}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 animate-fade-in">
        <p className="text-slate-500 text-sm">
          OrbitView • Connecting Satellite Intelligence with Community Insights • Making Cities Smarter
        </p>
      </footer>

      {/* Report Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-purple-400" />
              <span>Report Details</span>
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Detailed view of community report
            </DialogDescription>
          </DialogHeader>
          
          {selectedReport && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                <div className={`p-3 rounded-full ${layerBgColors[selectedReport.type as keyof typeof layerBgColors]}`}>
                  {React.createElement(layerIcons[selectedReport.type as keyof typeof layerIcons], { 
                    className: `w-6 h-6 ${layerColors[selectedReport.type as keyof typeof layerColors]}` 
                  })}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{selectedReport.location}</h3>
                  <p className="text-slate-400">{selectedReport.time} • {selectedReport.user}</p>
                </div>
                <Badge className={`ml-auto ${severityColors[selectedReport.severity as keyof typeof severityColors]}`}>
                  {selectedReport.severity} severity
                </Badge>
              </div>

              <div className="p-4 bg-slate-800/30 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Description</h4>
                <p className="text-slate-200">{selectedReport.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-800/30 rounded-lg">
                  <h4 className="text-white font-semibold text-sm">Engagement</h4>
                  <div className="flex space-x-4 mt-2">
                    <div className="text-center">
                      <div className="text-green-400 font-bold">{selectedReport.likes}</div>
                      <div className="text-slate-400 text-xs">Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 font-bold">{selectedReport.comments}</div>
                      <div className="text-slate-400 text-xs">Comments</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-slate-800/30 rounded-lg">
                  <h4 className="text-white font-semibold text-sm">Report Type</h4>
                  <Badge variant="outline" className="mt-2 capitalize bg-slate-700/50">
                    {selectedReport.type}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Comment Modal */}
      <Dialog open={isCommentModalOpen} onOpenChange={setIsCommentModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-blue-400" />
              <span>Comments</span>
              {selectedReport && (
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                  {selectedReport.comments} comments
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedReport && (
            <>
              {/* Comments List */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {selectedReport.commentsList.length > 0 ? (
                  selectedReport.commentsList.map((comment) => (
                    <div key={comment.id} className="p-3 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="text-white font-medium text-sm">{comment.user}</span>
                          {comment.user === "You" && (
                            <Badge variant="secondary" className="bg-green-500/20 text-green-400 text-xs px-1">
                              You
                            </Badge>
                          )}
                        </div>
                        <span className="text-slate-400 text-xs">{comment.time}</span>
                      </div>
                      <p className="text-slate-200 text-sm">{comment.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </div>

              {/* Add Comment Form */}
              <div className="border-t border-slate-700 pt-4 mt-4">
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="bg-slate-800 border-slate-600 text-white resize-none"
                    rows={2}
                  />
                  <Button 
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};