
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Thermometer, 
  Wind, 
  Droplet, 
  TreePine, 
  Recycle,
  ToggleLeft,
  ToggleRight,
  Layers,
  Satellite,
  Users
} from "lucide-react";

// Mock map data
const mockMapData = {
  nasaLayers: {
    heat: { active: true, intensity: "High in downtown, moderate in suburbs" },
    air: { active: false, intensity: "Good overall, some pollution near highways" },
    flood: { active: false, intensity: "Low risk, drainage systems functional" },
    green: { active: true, intensity: "68% coverage, concentrated in parks" },
    waste: { active: false, intensity: "85% recycling rate, efficient collection" }
  },
  citizenReports: {
    total: 47,
    recent: [
      { type: "heat", location: "Downtown Plaza", time: "2 min ago" },
      { type: "green", location: "Riverside Park", time: "15 min ago" },
      { type: "air", location: "Industrial Ave", time: "1 hr ago" }
    ]
  }
};

const layerIcons = {
  heat: Thermometer,
  air: Wind,
  flood: Droplet,
  green: TreePine,
  waste: Recycle
};

export const OrbitView = () => {
  const [viewMode, setViewMode] = useState<"nasa" | "citizen">("nasa");
  const [activeLayers, setActiveLayers] = useState<string[]>(["heat", "green"]);

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

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <header className="text-center pt-4 animate-fade-in">
        <h1 className="text-2xl font-bold text-neon-primary mb-2">
          OrbitView
        </h1>
        <p className="text-muted-foreground text-sm">
          The Dual Reality Map
        </p>
      </header>

      {/* Reality Toggle */}
      <section className="flex justify-center animate-slide-up">
        <div className="bg-card border border-card-border rounded-xl p-4 w-full max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Satellite className="w-4 h-4 text-neon-primary" />
              <span className="text-sm font-medium">NASA Data</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleViewMode}
              className="p-1"
            >
              {viewMode === "nasa" ? 
                <ToggleLeft className="w-6 h-6 text-neon-primary" /> : 
                <ToggleRight className="w-6 h-6 text-neon-citizen" />
              }
            </Button>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-neon-citizen" />
              <span className="text-sm font-medium">Citizen Reports</span>
              <Badge variant="secondary" className="text-xs">
                {mockMapData.citizenReports.total}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Map Simulation */}
      <section className="animate-slide-up delay-200">
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-card-border h-96 overflow-hidden">
          {/* Map overlay effect */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          
          {/* NASA Data View */}
          {viewMode === "nasa" && (
            <div className="absolute inset-0 p-4">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Satellite Data View
                </p>
              </div>
              
              {/* Simulated data points */}
              <div className="space-y-3">
                {Object.entries(mockMapData.nasaLayers).map(([layer, data]) => {
                  if (!data.active) return null;
                  const Icon = layerIcons[layer as keyof typeof layerIcons];
                  return (
                    <div 
                      key={layer}
                      className="flex items-center space-x-3 p-3 bg-black/30 rounded-lg"
                    >
                      <Icon className={`w-5 h-5 text-neon-${layer}`} />
                      <div>
                        <p className="text-sm font-medium capitalize text-foreground">{layer} Layer</p>
                        <p className="text-xs text-muted-foreground">{data.intensity}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Citizen Reports View */}
          {viewMode === "citizen" && (
            <div className="absolute inset-0 p-4">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Community Reports View
                </p>
              </div>
              
              {/* Recent reports visualization */}
              <div className="space-y-3">
                {mockMapData.citizenReports.recent.map((report, index) => {
                  const Icon = layerIcons[report.type as keyof typeof layerIcons];
                  return (
                    <div 
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-black/30 rounded-lg"
                    >
                      <Icon className={`w-5 h-5 text-neon-${report.type}`} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{report.location}</p>
                        <p className="text-xs text-muted-foreground">{report.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="absolute bottom-4 left-4">
                <Badge variant="secondary">
                  {mockMapData.citizenReports.total} Active Reports
                </Badge>
              </div>
            </div>
          )}

          {/* Mode indicator */}
          <div className="absolute top-4 right-4">
            <Badge variant={viewMode === "nasa" ? "default" : "secondary"}>
              {viewMode === "nasa" ? "🛰️ Satellite" : "👥 Community"}
            </Badge>
          </div>
        </div>
      </section>

      {/* Layer Controls */}
      <section className="space-y-4 animate-slide-up delay-400">
        <div className="flex items-center space-x-2 mb-3">
          <Layers className="w-4 h-4 text-neon-primary" />
          <h3 className="font-medium text-foreground">Active Layers</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(layerIcons).map(([layer, Icon]) => (
            <Button
              key={layer}
              variant={activeLayers.includes(layer) ? "default" : "outline"}
              onClick={() => toggleLayer(layer)}
              className={`justify-start space-x-2 ${
                activeLayers.includes(layer) ? `bg-neon-${layer}/10 border-neon-${layer} text-neon-${layer}` : ''
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="capitalize">{layer}</span>
            </Button>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="space-y-4 animate-slide-up delay-600">
        <h3 className="font-medium text-foreground">Recent Reports</h3>
        <div className="space-y-2">
          {mockMapData.citizenReports.recent.map((report, index) => {
            const Icon = layerIcons[report.type as keyof typeof layerIcons];
            return (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-card border border-card-border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 text-neon-${report.type}`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{report.location}</p>
                    <p className="text-xs text-muted-foreground">{report.time}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {report.type}
                </Badge>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
