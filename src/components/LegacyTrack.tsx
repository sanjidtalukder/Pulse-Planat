import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Trophy,
  Target,
  Thermometer,
  Droplet,
  TreePine,
  Recycle,
  Share2,
  TrendingUp,
  Users,
  Calendar,
  Award,
  MapPin,
  ArrowRight,
  Download
} from "lucide-react";

// Mock user impact data
const userStats = {
  totalMissions: 47,
  zonesValidated: 12,
  wasteReduced: "2.3 tons",
  temperatureCooled: "4.7°F",
  treesPlanted: 23,
  floodsPrevented: 3,
  co2Offset: "1.2 tons",
  impactScore: 890
};

const achievements = [
  { id: 1, title: "Heat Detective", description: "Completed 10 temperature missions", icon: "🔥", unlocked: true },
  { id: 2, title: "Green Guardian", description: "Planted or protected 20+ trees", icon: "🌳", unlocked: true },
  { id: 3, title: "Water Watcher", description: "Prevented flood damage", icon: "💧", unlocked: true },
  { id: 4, title: "Waste Warrior", description: "Diverted 1+ ton from landfills", icon: "♻️", unlocked: true },
  { id: 5, title: "Climate Champion", description: "Offset 1+ ton CO2", icon: "🏆", unlocked: true },
  { id: 6, title: "Community Leader", description: "Top 1% of contributors", icon: "👑", unlocked: false }
];

const microStories = [
  {
    id: 1,
    title: "Downtown Plaza Cooling",
    location: "Main Street Plaza",
    before: "Heat island causing 95°F+ temperatures",
    after: "New tree canopy reduced temps to 88°F",
    impact: "-7°F cooling",
    date: "2 weeks ago",
    type: "heat"
  },
  {
    id: 2,
    title: "Riverside Flood Prevention", 
    location: "Riverside District",
    before: "Frequent flooding during heavy rain",
    after: "Smart drainage system installed",
    impact: "0 floods this season",
    date: "1 month ago", 
    type: "flood"
  },
  {
    id: 3,
    title: "Community Garden Growth",
    location: "Elm Street",
    before: "Empty lot with 0% green cover",
    after: "Thriving community garden",
    impact: "+45% local green cover",
    date: "3 months ago",
    type: "green"
  }
];

export const LegacyTrack = () => {
  const [selectedStory, setSelectedStory] = useState<number | null>(null);

  const handleShare = () => {
    console.log("Opening share dialog");
    // In real app: open share modal with impact card
  };

  const handleDownloadReport = () => {
    console.log("Downloading impact report");
    // In real app: generate and download PDF report
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <header className="text-center pt-4 animate-fade-in">
        <h1 className="text-2xl font-bold text-neon-primary mb-2">
          LegacyTrack
        </h1>
        <p className="text-muted-foreground text-sm">
          See Your Impact
        </p>
      </header>

      {/* Impact Score */}
      <section className="animate-slide-up">
        <Card className="border-neon-primary/30 bg-gradient-to-br from-card via-card to-neon-primary/10">
          <CardHeader className="text-center pb-3">
            <div className="mx-auto w-16 h-16 rounded-full bg-neon-primary/20 flex items-center justify-center mb-3">
              <Trophy className="w-8 h-8 text-neon-primary" />
            </div>
            <CardTitle className="text-2xl text-neon-primary">{userStats.impactScore}</CardTitle>
            <p className="text-sm text-muted-foreground">Total Impact Score</p>
          </CardHeader>
        </Card>
      </section>

      {/* Stats Grid */}
      <section className="animate-slide-up delay-200">
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-neon-heat/20 bg-gradient-to-br from-card to-neon-heat/5">
            <CardContent className="p-4 text-center">
              <Thermometer className="w-6 h-6 text-neon-heat mx-auto mb-2" />
              <p className="text-lg font-bold text-neon-heat">{userStats.temperatureCooled}</p>
              <p className="text-xs text-muted-foreground">Temperature Cooled</p>
            </CardContent>
          </Card>

          <Card className="border-neon-green/20 bg-gradient-to-br from-card to-neon-green/5">
            <CardContent className="p-4 text-center">
              <TreePine className="w-6 h-6 text-neon-green mx-auto mb-2" />
              <p className="text-lg font-bold text-neon-green">{userStats.treesPlanted}</p>
              <p className="text-xs text-muted-foreground">Trees Impact</p>
            </CardContent>
          </Card>

          <Card className="border-neon-flood/20 bg-gradient-to-br from-card to-neon-flood/5">
            <CardContent className="p-4 text-center">
              <Droplet className="w-6 h-6 text-neon-flood mx-auto mb-2" />
              <p className="text-lg font-bold text-neon-flood">{userStats.floodsPrevented}</p>
              <p className="text-xs text-muted-foreground">Floods Prevented</p>
            </CardContent>
          </Card>

          <Card className="border-neon-waste/20 bg-gradient-to-br from-card to-neon-waste/5">
            <CardContent className="p-4 text-center">
              <Recycle className="w-6 h-6 text-neon-waste mx-auto mb-2" />
              <p className="text-lg font-bold text-neon-waste">{userStats.wasteReduced}</p>
              <p className="text-xs text-muted-foreground">Waste Diverted</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Stats */}
      <section className="animate-slide-up delay-300">
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-neon-primary">{userStats.totalMissions}</p>
                <p className="text-xs text-muted-foreground">Missions Completed</p>
              </div>
              <div>
                <p className="text-lg font-bold text-neon-citizen">{userStats.zonesValidated}</p>
                <p className="text-xs text-muted-foreground">Zones Validated</p>
              </div>
              <div>
                <p className="text-lg font-bold text-neon-green">{userStats.co2Offset}</p>
                <p className="text-xs text-muted-foreground">CO₂ Offset</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Achievements */}
      <section className="space-y-4 animate-slide-up delay-400">
        <h2 className="font-medium text-foreground flex items-center space-x-2">
          <Award className="w-4 h-4 text-neon-primary" />
          <span>Achievements</span>
        </h2>
        
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <Card 
              key={achievement.id}
              className={`transition-all duration-300 ${
                achievement.unlocked 
                  ? 'border-neon-primary/20 bg-gradient-to-br from-card to-neon-primary/5' 
                  : 'border-muted/20 bg-muted/10 opacity-60'
              }`}
            >
              <CardContent className="p-3 text-center">
                <div className="text-2xl mb-1">{achievement.icon}</div>
                <p className="text-sm font-medium text-foreground mb-1">{achievement.title}</p>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                {achievement.unlocked && (
                  <Badge variant="secondary" className="text-xs mt-2">
                    Unlocked
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Micro-Stories */}
      <section className="space-y-4 animate-slide-up delay-500">
        <h2 className="font-medium text-foreground flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-neon-primary" />
          <span>Your Impact Stories</span>
        </h2>

        <div className="space-y-3">
          {microStories.map((story) => (
            <Card 
              key={story.id}
              className={`cursor-pointer transition-all duration-300 hover-scale border-${story.type}/20 bg-gradient-to-br from-card to-neon-${story.type}/5`}
              onClick={() => setSelectedStory(story.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-foreground text-sm mb-1">{story.title}</h3>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{story.location}</span>
                      <span>•</span>
                      <Calendar className="w-3 h-3" />
                      <span>{story.date}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-xs text-neon-${story.type}`}>
                    {story.impact}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-xs">
                    <span className="text-muted-foreground mr-2">Before:</span>
                    <span className="text-foreground">{story.before}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neon-primary mx-auto" />
                  <div className="flex items-center text-xs">
                    <span className="text-muted-foreground mr-2">After:</span>
                    <span className="text-foreground">{story.after}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Action Buttons */}
      <section className="space-y-3 animate-slide-up delay-600">
        <Button 
          onClick={handleShare}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-xl"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Your Impact Card
        </Button>
        
        <Button 
          variant="outline"
          onClick={handleDownloadReport}
          className="w-full py-3 rounded-xl"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Impact Report
        </Button>
      </section>
    </div>
  );
};