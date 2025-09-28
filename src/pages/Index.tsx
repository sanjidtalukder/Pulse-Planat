import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StreetPulse } from "@/components/StreetPulse";
import { OrbitView } from "@/components/OrbitView";
import { VeracityMissions } from "@/components/VeracityMissions";
import { CivicBlueprint } from "@/components/CivicBlueprint";
import { LegacyTrack } from "@/components/LegacyTrack";
import { 
  Activity, 
  Globe, 
  Target, 
  Building, 
  TrendingUp,
  LogOut
} from "lucide-react";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [user, setUser] = useState(null); // ✅ any সরিয়ে দিন
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  // Listen for user state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        // If no user, redirect to login
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]); // ✅ auth dependency সরিয়ে দিন

  // Google login (if needed for quick login from main page)
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
      navigate("/login");
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <Tabs defaultValue="pulse" className="w-full">
        {/* Navigation */}
        <div className="sticky w-full top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border flex justify-between items-center">
          <TabsList className="grid grid-cols-5 flex-1 rounded-none bg-transparent p-0">
            <TabsTrigger 
              value="pulse" 
              className="flex-col py-3 px-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <Activity className="w-4 h-4 mb-1" />
              <span className="text-xs">Pulse</span>
            </TabsTrigger>
            <TabsTrigger 
              value="orbit"
              className="flex-col py-3 px-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <Globe className="w-4 h-4 mb-1" />
              <span className="text-xs">Orbit</span>
            </TabsTrigger>
            <TabsTrigger 
              value="missions"
              className="flex-col py-3 px-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <Target className="w-4 h-4 mb-1" />
              <span className="text-xs">Missions</span>
            </TabsTrigger>
            <TabsTrigger 
              value="blueprint"
              className="flex-col py-3 px-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <Building className="w-4 h-4 mb-1" />
              <span className="text-xs">Blueprint</span>
            </TabsTrigger>
            <TabsTrigger 
              value="legacy"
              className="flex-col py-3 px-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <TrendingUp className="w-4 h-4 mb-1" />
              <span className="text-xs">Legacy</span>
            </TabsTrigger>
          </TabsList>

          {/* User Info & Logout */}
          <div className="px-3 flex flex-col items-center gap-1">
            <div className="flex flex-col items-center gap-1 text-sm">
              <img 
                src={user?.photoURL || "https://static.vecteezy.com/system/resources/previews/024/183/535/original/male-avatar-portrait-of-a-young-man-with-glasses-illustration-of-male-character-in-modern-color-style-vector.jpg"}  // ✅ optional chaining ব্যবহার করুন
                alt={user?.displayName || "User"} 
                className="w-6 h-6  rounded-full "
              />
              <span className="hidden sm:inline">{user?.displayName || user?.email}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-md hover:bg-primary/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <TabsContent value="pulse" className="m-0">
          <StreetPulse user={user} />
        </TabsContent>
        <TabsContent value="orbit" className="m-0">
          <OrbitView user={user} />
        </TabsContent>
        <TabsContent value="missions" className="m-0">
          <VeracityMissions user={user} />
        </TabsContent>
        <TabsContent value="blueprint" className="m-0">
          <CivicBlueprint user={user} />
        </TabsContent>
        <TabsContent value="legacy" className="m-0">
          <LegacyTrack user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;