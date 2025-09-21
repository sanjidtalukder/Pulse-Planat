import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Thermometer, 
  Droplet, 
  TreePine, 
  Recycle,
  Camera,
  MapPin,
  Trophy,
  Target,
  Users,
  CheckCircle,
  X,
  RotateCcw,
  Download
} from "lucide-react";

// Mock missions data
const missions = [
  {
    id: "heat-patrol",
    title: "Heat Patrol",
    description: "Document temperature hotspots in your area",
    icon: Thermometer,
    type: "heat",
    points: 50,
    difficulty: "Easy",
    estimated: "5 min",
    active: 23,
    completed: 847
  },
  {
    id: "flood-watch",
    title: "Flood Watch", 
    description: "Report drainage issues and water accumulation",
    icon: Droplet,
    type: "flood",
    points: 75,
    difficulty: "Medium",
    estimated: "10 min",
    active: 12,
    completed: 432
  },
  {
    id: "canopy-quest",
    title: "Canopy Quest",
    description: "Map tree coverage and green spaces",
    icon: TreePine,
    type: "green",
    points: 60,
    difficulty: "Easy",
    estimated: "7 min",
    active: 34,
    completed: 1203
  },
  {
    id: "eco-watch",
    title: "EcoWatch",
    description: "Track waste, water usage, and energy patterns",
    icon: Recycle,
    type: "waste",
    points: 80,
    difficulty: "Hard",
    estimated: "15 min", 
    active: 8,
    completed: 267
  }
];

const userStats = {
  level: 7,
  totalPoints: 2450,
  completedMissions: 34,
  rank: 156,
  badges: ["Heat Detective", "Green Guardian", "Water Watcher"]
};

export const VeracityMissions = () => {
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraLoading, setCameraLoading] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const handleStartMission = (missionId: string) => {
    console.log(`Starting mission: ${missionId}`);
    // In real app: navigate to mission form/camera interface
  };

  const openCamera = async (missionId: string) => {
    console.log("Opening camera for mission:", missionId);
    setSelectedMission(missionId);
    setCameraLoading(true);
    setCameraError(null);
    
    // Check if browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Camera not supported in this browser");
      setCameraLoading(false);
      return;
    }
    
    try {
      // Test camera access
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Close the test stream immediately
      stream.getTracks().forEach(track => track.stop());
      
      setCameraActive(true);
    } catch (error) {
      console.error("Camera access error:", error);
      setCameraError("Camera access denied. Please check permissions.");
    } finally {
      setCameraLoading(false);
    }
  };

  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
      }
    }
  }, [webcamRef]);

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  const switchCamera = () => {
    setFacingMode(prevMode => prevMode === "user" ? "environment" : "user");
  };

  const submitPhoto = () => {
    if (capturedImage && selectedMission) {
      console.log(`Submitting photo for mission: ${selectedMission}`);
      // In real app: upload image and mission data to server
      closeCamera();
    }
  };

  const downloadPhoto = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = `veracity-mission-${selectedMission}-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const closeCamera = () => {
    setCameraActive(false);
    setCapturedImage(null);
    setSelectedMission(null);
    setCameraError(null);
    setCameraLoading(false);
  };

  const videoConstraints = {
    facingMode: facingMode,
    width: { ideal: 1280 },
    height: { ideal: 720 }
  };

  const handleUserMedia = () => {
    console.log("Camera accessed successfully");
    setCameraError(null);
  };

  const handleUserMediaError = (error: string | DOMException) => {
    console.error("Camera error:", error);
    setCameraError("Unable to access camera. Please check permissions.");
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6 relative">
      {/* Camera Overlay */}
      {cameraActive && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={closeCamera}
              className="bg-gray-800/70 text-white rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>
            
            {!capturedImage && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={switchCamera}
                className="bg-gray-800/70 text-white rounded-full"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            )}
          </div>
          
          <div className="flex-1 relative flex items-center justify-center">
            {cameraError ? (
              <div className="text-white text-center p-4">
                <p className="mb-4">{cameraError}</p>
                <Button onClick={closeCamera} className="bg-neon-primary">
                  Close
                </Button>
              </div>
            ) : capturedImage ? (
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  src={capturedImage} 
                  alt="Captured" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ) : (
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                forceScreenshotSourceSize={true}
                className="w-full h-full object-cover"
                screenshotQuality={1}
                onUserMedia={handleUserMedia}
                onUserMediaError={handleUserMediaError}
                mirrored={facingMode === "user"}
              />
            )}
          </div>
          
          {!cameraError && (
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              {capturedImage ? (
                <div className="flex space-x-4">
                  <Button 
                    onClick={retakePhoto}
                    className="bg-white/20 text-white rounded-full h-14 w-14"
                  >
                    <RotateCcw className="w-6 h-6" />
                  </Button>
                  <Button 
                    onClick={downloadPhoto}
                    className="bg-white/20 text-white rounded-full h-14 w-14"
                  >
                    <Download className="w-6 h-6" />
                  </Button>
                  <Button 
                    onClick={submitPhoto}
                    className="bg-neon-primary text-white rounded-full h-14 w-14"
                  >
                    <CheckCircle className="w-6 h-6" />
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={capturePhoto}
                  className="bg-white rounded-full h-14 w-14 border-4 border-gray-300"
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* Loading Overlay */}
      {cameraLoading && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="text-white text-center">
            <p>Requesting camera access...</p>
            <div className="mt-4 w-12 h-12 border-4 border-t-neon-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="text-center pt-4 animate-fade-in">
        <h1 className="text-2xl font-bold text-neon-primary mb-2">
          VeracityMissions
        </h1>
        <p className="text-muted-foreground text-sm">
          Become a Citizen Scientist
        </p>
      </header>

      {/* User Stats */}
      <section className="animate-slide-up">
        <Card className="border-neon-primary/20 bg-gradient-to-br from-card via-card to-neon-primary/5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-neon-primary" />
                <span className="font-medium text-foreground">Level {userStats.level}</span>
              </div>
              <Badge variant="secondary">
                Rank #{userStats.rank}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-neon-primary">{userStats.totalPoints}</p>
                <p className="text-xs text-muted-foreground">Points</p>
              </div>
              <div>
                <p className="text-lg font-bold text-neon-green">{userStats.completedMissions}</p>
                <p className="text-xs text-muted-foreground">Missions</p>
              </div>
              <div>
                <p className="text-lg font-bold text-neon-citizen">{userStats.badges.length}</p>
                <p className="text-xs text-muted-foreground">Badges</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Mission Carousel */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-neon-primary" />
          <h2 className="font-medium text-foreground">Active Missions</h2>
        </div>
        
        <div className="space-y-4">
          {missions.map((mission, index) => {
            const Icon = mission.icon;
            return (
              <Card 
                key={mission.id}
                className={`cursor-pointer transition-all duration-300 hover-scale animate-slide-up border-${mission.type}/20 bg-gradient-to-br from-card via-card to-neon-${mission.type}/5`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className={`p-2 rounded-lg bg-neon-${mission.type}/10 cursor-pointer`}
                        onClick={(e) => {
                          e.stopPropagation();
                          openCamera(mission.id);
                        }}
                      >
                        <Icon className={`w-5 h-5 text-neon-${mission.type}`} />
                      </div>
                      <div>
                        <CardTitle className="text-base">{mission.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{mission.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {mission.points} pts
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>⏱️ {mission.estimated}</span>
                    <span>📊 {mission.difficulty}</span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{mission.active} active</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3 text-neon-green" />
                      <span>{mission.completed} completed</span>
                    </div>
                    <Button 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartMission(mission.id);
                      }}
                      className={`bg-neon-${mission.type}/10 hover:bg-neon-${mission.type}/20 text-neon-${mission.type} border border-neon-${mission.type}/30`}
                    >
                      <Camera className="w-3 h-3 mr-1" />
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Quick Action */}
      <section className="animate-slide-up delay-600">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-xl">
          <MapPin className="w-4 h-4 mr-2" />
          Report Something Now
        </Button>
      </section>

      {/* Recent Badges */}
      <section className="space-y-3 animate-slide-up delay-700">
        <h3 className="font-medium text-foreground text-sm">Recent Badges</h3>
        <div className="flex space-x-2">
          {userStats.badges.map((badge, index) => (
            <Badge 
              key={index}
              variant="secondary"
              className="text-xs px-2 py-1"
            >
              🏆 {badge}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  );
};