import { WellbeingGauge } from "./WellbeingGauge";
import { MetricCard, MetricType } from "./MetricCard";
import { Button } from "@/components/ui/button";
import { 
  Thermometer, 
  Wind, 
  Droplet, 
  TreePine, 
  Recycle,
  AlertTriangle
} from "lucide-react";

// Mock data - in real app this would come from API
const mockData = {
  wellbeingScore: 73,
  metrics: [
    {
      type: "heat" as MetricType,
      icon: Thermometer,
      title: "Heat Index",
      value: "82°F",
      status: "fair" as const,
      description: "Temperature feels warm but manageable. Heat islands detected in downtown area."
    },
    {
      type: "air" as MetricType,
      icon: Wind,
      title: "Air Quality",
      value: "Good",
      status: "good" as const,
      description: "Clean air today! Wind patterns are dispersing pollutants effectively."
    },
    {
      type: "flood" as MetricType,
      icon: Droplet,
      title: "Flood Risk",
      value: "Low",
      status: "good" as const,
      description: "Drainage systems are clear. Rain forecast shows no significant risk."
    },
    {
      type: "green" as MetricType,
      icon: TreePine,
      title: "Green Cover",
      value: "68%",
      status: "good" as const,
      description: "Tree canopy is healthy. New plantings in riverside park are thriving."
    },
    {
      type: "waste" as MetricType,
      icon: Recycle,
      title: "Resources",
      value: "85%",
      status: "good" as const,
      description: "Recycling rate is excellent. Water usage remains within sustainable limits."
    }
  ],
  alert: {
    message: "Heat advisory in effect for downtown area. Stay hydrated and seek shade.",
    severity: "moderate"
  }
};

export const StreetPulse = () => {
  const handleMetricClick = (type: MetricType) => {
    console.log(`Opening mini-map for ${type} metric`);
    // In real app: navigate to OrbitView with specific layer
  };

  const handleReportClick = () => {
    console.log("Opening citizen report form");
    // In real app: navigate to VeracityMissions
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <header className="text-center pt-4 animate-fade-in">
        <h1 className="text-2xl font-bold text-neon-primary mb-2">
          StreetPulse
        </h1>
        <p className="text-muted-foreground text-sm">
          Your Neighborhood's Vital Signs
        </p>
      </header>

      {/* Wellbeing Score */}
      <section className="flex justify-center animate-slide-up">
        <WellbeingGauge score={mockData.wellbeingScore} />
      </section>

      {/* Risk Matrix */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-center text-foreground">
          City Health Metrics
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {mockData.metrics.map((metric, index) => (
            <MetricCard
              key={metric.type}
              type={metric.type}
              icon={metric.icon}
              title={metric.title}
              value={metric.value}
              status={metric.status}
              description={metric.description}
              onClick={() => handleMetricClick(metric.type)}
              className={`animate-slide-up delay-${index * 100}`}
            />
          ))}
        </div>
      </section>

      {/* Alert & Action */}
      <section className="space-y-4 animate-slide-up delay-700">
        {/* Alert Card */}
        <div className="bg-card border border-card-border rounded-xl p-4 border-orange-500/20 bg-gradient-to-br from-card via-card to-orange-500/5">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-medium text-foreground mb-1">
                Local Alert
              </h3>
              <p className="text-sm text-muted-foreground">
                {mockData.alert.message}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={handleReportClick}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
        >
          Does this feel right? Report what you see
        </Button>
      </section>

      {/* Mission Control Footer */}
      <footer className="text-center pt-6 pb-4 animate-fade-in delay-1000">
        <p className="text-xs text-muted-foreground">
          Data updated 2 minutes ago • NASA Earth Observatory + Citizens
        </p>
      </footer>
    </div>
  );
};