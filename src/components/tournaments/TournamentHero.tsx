
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

interface TournamentHeroProps {
  title: string;
  description: string;
  status: "upcoming" | "ongoing" | "completed";
  participants: {
    current: number;
    total: number;
  };
  currentRound: number;
  totalRounds: number;
  startDate: string;
  prize: string;
  id: string;
}

const TournamentHero = ({
  title,
  description,
  status,
  participants,
  currentRound,
  totalRounds,
  startDate,
  prize,
  id
}: TournamentHeroProps) => {
  
  const statusText = {
    upcoming: "Registration Open",
    ongoing: "Tournament In Progress",
    completed: "Tournament Completed",
  };
  
  const statusColor = {
    upcoming: "bg-gaming-accent2/20 text-gaming-accent2",
    ongoing: "bg-gaming-primary/20 text-gaming-primary",
    completed: "bg-gaming-accent1/20 text-gaming-accent1",
  };
  
  return (
    <div className="gaming-card p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gaming-primary rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gaming-secondary rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${statusColor[status]}`}>
            {statusText[status]}
          </span>
          {status === "ongoing" && (
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-gaming-dark">
              Round {currentRound} of {totalRounds}
            </span>
          )}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-3 gaming-gradient-text">
          {title}
        </h1>
        
        <p className="text-muted-foreground max-w-2xl mb-6">
          {description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gaming-primary/20">
              <Users size={20} className="text-gaming-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Participants</p>
              <p className="font-semibold">
                {participants.current}/{participants.total}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gaming-primary/20">
              <Calendar size={20} className="text-gaming-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Start Date</p>
              <p className="font-semibold">{startDate}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gaming-primary/20">
              <Trophy size={20} className="text-gaming-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Prize</p>
              <p className="font-semibold">{prize}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {status === "upcoming" && participants.current < participants.total && (
            <>
              <Button 
                onClick={() => document.getElementById('join-tournament-dialog-trigger')?.click()} 
                className="bg-gaming-primary hover:bg-gaming-secondary flex items-center gap-2">
                <span>Join for</span>
                <span className="flex items-center">
                  <DollarSign className="h-4 w-4" />
                  5.00
                </span>
              </Button>
            </>
          )}
          
          {status === "ongoing" && (
            <Button className="bg-gaming-primary hover:bg-gaming-secondary">
              View Live Matches
            </Button>
          )}
          
          <Button variant="outline" className="border-gaming-primary/50 text-gaming-primary">
            Learn Game Rules
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TournamentHero;
