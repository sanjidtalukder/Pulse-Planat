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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  // Listen for user state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      // Remove the automatic redirect to login
      // if (!currentUser) {
      //   navigate("/login");
      // }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Google login function
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      // User will be set automatically via onAuthStateChanged
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // User state will be cleared automatically via onAuthStateChanged
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

  // Show login screen if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-purple-900 to-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white font-bold text-2xl">AC</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Astra Command</h1>
            <p className="text-white/70">Sign in to access your dashboard</p>
          </div>
          
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 hover:bg-gray-100 font-medium py-3 px-4 rounded-xl transition-all duration-200 border border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="w-5 h-5"
            />
            {loading ? "Signing in..." : "Sign in with Google"}
          </button>

          <div className="mt-6 text-center">
            <p className="text-white/50 text-sm">
              By signing in, you agree to our Terms of Service
            </p>
          </div>
        </div>
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
                src={user.photoURL || "https://static.vecteezy.com/system/resources/previews/024/183/535/original/male-avatar-portrait-of-a-young-man-with-glasses-illustration-of-male-character-in-modern-color-style-vector.jpg"}
                alt={user.displayName || "User"} 
                className="w-6 h-6 rounded-full"
              />
              <span className="hidden sm:inline">{user.displayName || user.email}</span>
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