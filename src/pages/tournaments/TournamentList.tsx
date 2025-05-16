
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TournamentCard from "@/components/tournaments/TournamentCard";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const tournamentsMock = [
  {
    id: "tournament-1",
    title: "Bid Tac Toe Championship",
    status: "ongoing" as const,
    participants: {
      current: 964,
      total: 1000,
    },
    currentRound: 3,
    totalRounds: 10,
    startDate: "May 15, 2025",
    prize: "$10,000",
  },
  {
    id: "tournament-2",
    title: "Weekend Bidding Blitz",
    status: "upcoming" as const,
    participants: {
      current: 482,
      total: 500,
    },
    currentRound: 0,
    totalRounds: 8,
    startDate: "May 20, 2025",
    prize: "$5,000",
  },
  {
    id: "tournament-3",
    title: "Tactical Masters Cup",
    status: "upcoming" as const,
    participants: {
      current: 128,
      total: 256,
    },
    currentRound: 0,
    totalRounds: 8,
    startDate: "May 22, 2025",
    prize: "$2,500",
  },
  {
    id: "tournament-4",
    title: "Spring Showdown",
    status: "completed" as const,
    participants: {
      current: 1000,
      total: 1000,
    },
    currentRound: 10,
    totalRounds: 10,
    startDate: "April 5, 2025",
    prize: "$8,000",
  },
  {
    id: "tournament-5",
    title: "Rookie Challenge",
    status: "upcoming" as const,
    participants: {
      current: 78,
      total: 128,
    },
    currentRound: 0,
    totalRounds: 7,
    startDate: "May 25, 2025",
    prize: "$1,000",
  },
  {
    id: "tournament-6",
    title: "Strategic Bidders Invitational",
    status: "completed" as const,
    participants: {
      current: 64,
      total: 64,
    },
    currentRound: 6,
    totalRounds: 6,
    startDate: "April 15, 2025",
    prize: "$3,000",
  },
];

const TournamentList = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");
  
  const filteredTournaments = tournamentsMock.filter((tournament) => {
    // Filter by search query
    const matchesSearch = tournament.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = 
      currentFilter === "all" || 
      (currentFilter === "upcoming" && tournament.status === "upcoming") ||
      (currentFilter === "ongoing" && tournament.status === "ongoing") ||
      (currentFilter === "completed" && tournament.status === "completed");
    
    return matchesSearch && matchesStatus;
  });
  
  const handleSubscribe = () => {
    toast({
      title: "Successfully subscribed!",
      description: "You'll receive notifications about new tournaments.",
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold gaming-gradient-text mb-2">Bid Tac Toe Tournaments</h1>
          <p className="text-muted-foreground">
            Compete against players worldwide in strategic bidding battles
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="border-gaming-primary/50 text-gaming-primary"
            onClick={handleSubscribe}
          >
            Subscribe to Updates
          </Button>
          <Button className="bg-gaming-primary hover:bg-gaming-secondary">
            Create Tournament
          </Button>
        </div>
      </div>
      
      <div className="gaming-card p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/3">
            <Label htmlFor="search" className="text-sm mb-2 block">
              Search Tournaments
            </Label>
            <Input 
              id="search"
              placeholder="Search by tournament name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gaming-dark/60 border-gaming-primary/30"
            />
          </div>
          
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="all" onValueChange={setCurrentFilter}>
              <TabsList className="grid grid-cols-4 bg-gaming-dark/60">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
      
      {filteredTournaments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => (
            <TournamentCard
              key={tournament.id}
              {...tournament}
            />
          ))}
        </div>
      ) : (
        <div className="gaming-card p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No tournaments found</h3>
          <p className="text-muted-foreground mb-4">
            Try changing your search criteria or check back later for new tournaments.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery("");
              setCurrentFilter("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default TournamentList;
