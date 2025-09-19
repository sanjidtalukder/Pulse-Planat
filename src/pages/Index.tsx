import { useState } from "react";
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
  TrendingUp 
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Tabs defaultValue="pulse" className="w-full">
        {/* Navigation */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <TabsList className="grid w-full grid-cols-5 rounded-none bg-transparent p-0">
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
        </div>

        {/* Content */}
        <TabsContent value="pulse" className="m-0">
          <StreetPulse />
        </TabsContent>
        <TabsContent value="orbit" className="m-0">
          <OrbitView />
        </TabsContent>
        <TabsContent value="missions" className="m-0">
          <VeracityMissions />
        </TabsContent>
        <TabsContent value="blueprint" className="m-0">
          <CivicBlueprint />
        </TabsContent>
        <TabsContent value="legacy" className="m-0">
          <LegacyTrack />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
