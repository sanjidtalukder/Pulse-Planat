import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapPin,
  TreePine,
  Droplet,
  Recycle,
  Building,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Calendar,
  DollarSign,
  Users,
  Eye,
  CheckCircle2,
  Clock
} from "lucide-react";

// Mock proposals data
const proposals = [
  {
    id: "riverside-park",
    title: "Riverside Park Expansion",
    description: "Add 50 new trees and improve drainage in the eastern section",
    type: "green",
    location: "Riverside District",
    budget: "$125K",
    timeline: "6 months",
    status: "voting",
    votes: { up: 234, down: 12 },
    comments: 47,
    progress: 75,
    impact: "🌳 +15% green coverage, 🌡️ -2°F cooling"
  },
  {
    id: "flood-barriers",
    title: "Smart Flood Barriers",
    description: "Install IoT-enabled flood barriers in flood-prone areas",
    type: "flood",
    location: "Downtown Low Areas",
    budget: "$340K", 
    timeline: "12 months",
    status: "approved",
    votes: { up: 567, down: 89 },
    comments: 123,
    progress: 30,
    impact: "💧 -60% flood risk, 🏠 200+ homes protected"
  },
  {
    id: "recycling-hubs",
    title: "Community Recycling Hubs",
    description: "Build 5 new smart recycling centers with waste sorting AI",
    type: "waste",
    location: "Multiple Locations",
    budget: "$89K",
    timeline: "4 months", 
    status: "planning",
    votes: { up: 412, down: 34 },
    comments: 78,
    progress: 10,
    impact: "♻️ +25% recycling rate, 🗑️ -40% landfill waste"
  },
  {
    id: "cooling-stations", 
    title: "Public Cooling Stations",
    description: "Solar-powered cooling stations for extreme heat days",
    type: "heat",
    location: "Transit Hubs",
    budget: "$67K",
    timeline: "3 months",
    status: "review",
    votes: { up: 189, down: 45 },
    comments: 32,
    progress: 0,
    impact: "🌡️ Safe zones for 500+ people daily"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved": return "text-neon-green";
    case "voting": return "text-neon-primary";
    case "planning": return "text-neon-citizen";
    case "review": return "text-score-fair";
    default: return "text-muted-foreground";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "green": return TreePine;
    case "flood": return Droplet;
    case "waste": return Recycle;
    case "heat": return Building;
    default: return MapPin;
  }
};

export const CivicBlueprint = () => {
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);
  const [userVotes, setUserVotes] = useState<Record<string, 'up' | 'down' | null>>({});

  const handleVote = (proposalId: string, voteType: 'up' | 'down') => {
    setUserVotes(prev => ({
      ...prev,
      [proposalId]: prev[proposalId] === voteType ? null : voteType
    }));
  };

  const handleViewDetails = (proposalId: string) => {
    setSelectedProposal(proposalId);
    console.log(`Viewing details for: ${proposalId}`);
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <header className="text-center pt-4 animate-fade-in">
        <h1 className="text-2xl font-bold text-neon-primary mb-2">
          CivicBlueprint
        </h1>
        <p className="text-muted-foreground text-sm">
          Shape Your City's Future
        </p>
      </header>

      {/* Active Proposals */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-neon-primary" />
            <h2 className="font-medium text-foreground">City Proposals</h2>
          </div>
          <Badge variant="secondary" className="text-xs">
            {proposals.length} Active
          </Badge>
        </div>

        <div className="space-y-4">
          {proposals.map((proposal, index) => {
            const Icon = getTypeIcon(proposal.type);
            const statusColor = getStatusColor(proposal.status);
            const userVote = userVotes[proposal.id];
            
            return (
              <Card 
                key={proposal.id}
                className={`transition-all duration-300 hover-scale animate-slide-up border-${proposal.type}/20 bg-gradient-to-br from-card via-card to-neon-${proposal.type}/5`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg bg-neon-${proposal.type}/10 flex-shrink-0`}>
                        <Icon className={`w-4 h-4 text-neon-${proposal.type}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base mb-1">{proposal.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mb-2">{proposal.description}</p>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{proposal.location}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-xs ${statusColor}`}>
                      {proposal.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span>{proposal.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`bg-neon-${proposal.type} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${proposal.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="p-2 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Expected Impact:</p>
                    <p className="text-xs font-medium text-foreground">{proposal.impact}</p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-3 gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-3 h-3" />
                      <span>{proposal.budget}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{proposal.timeline}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{proposal.votes.up + proposal.votes.down} votes</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-muted/20">
                    {/* Voting */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleVote(proposal.id, 'up')}
                        className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${
                          userVote === 'up' 
                            ? 'bg-neon-green/20 text-neon-green' 
                            : 'text-muted-foreground hover:text-neon-green'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{proposal.votes.up}</span>
                      </button>
                      
                      <button
                        onClick={() => handleVote(proposal.id, 'down')}
                        className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${
                          userVote === 'down' 
                            ? 'bg-destructive/20 text-destructive' 
                            : 'text-muted-foreground hover:text-destructive'
                        }`}
                      >
                        <ThumbsDown className="w-3 h-3" />
                        <span>{proposal.votes.down}</span>
                      </button>

                      <button className="flex items-center space-x-1 px-2 py-1 rounded text-xs text-muted-foreground hover:text-foreground transition-colors">
                        <MessageSquare className="w-3 h-3" />
                        <span>{proposal.comments}</span>
                      </button>
                    </div>

                    {/* View Details */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(proposal.id)}
                      className="text-xs"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Transparency Log */}
      <section className="animate-slide-up delay-600">
        <Card className="border-neon-citizen/20 bg-gradient-to-br from-card via-card to-neon-citizen/5">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-neon-citizen" />
              <CardTitle className="text-base">Transparency Log</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Riverside Park proposal updated based on 47 community comments</p>
              <p>• Flood barriers design modified after citizen feedback</p>
              <p>• Budget transparency report published for all active projects</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Submit Proposal */}
      <section className="animate-slide-up delay-700">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-xl">
          <Building className="w-4 h-4 mr-2" />
          Submit New Proposal
        </Button>
      </section>
    </div>
  );
};