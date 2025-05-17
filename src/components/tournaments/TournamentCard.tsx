
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Users, DollarSign, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface TournamentCardProps {
  id: string;
  title: string;
  status: "upcoming" | "ongoing" | "completed";
  participants: {
    current: number;
    total: number;
  };
  currentRound: number;
  totalRounds: number;
  startDate: string;
  prize: {
    guaranteed: string;
    maximum?: string;
  };
  entryFee: string;
  firstPrize: string;
  winnersPercentage: string;
  maxEntries: number;
}

const TournamentCard = ({
  id,
  title,
  status,
  participants,
  currentRound,
  totalRounds,
  startDate,
  prize,
  entryFee,
  firstPrize,
  winnersPercentage,
  maxEntries,
}: TournamentCardProps) => {
  
  const statusColor = {
    upcoming: "text-gaming-accent2",
    ongoing: "text-gaming-primary animate-pulse-soft",
    completed: "text-gaming-accent1",
  };
  
  const progressValue = (participants.current / participants.total) * 100;
  const spotsLeft = participants.total - participants.current;
  
  return (
    <div className="gaming-card overflow-hidden">
      <div className="bg-gaming-primary/10 px-4 py-2 flex items-center justify-between">
        <h3 className="text-base font-bold">{title}</h3>
        <span className={`text-xs font-medium ${statusColor[status]}`}>
          {status === "upcoming" && <Clock className="h-3.5 w-3.5 inline mr-1" />}
          {status === "upcoming" ? "2d 14h" : status === "ongoing" ? "In Progress" : "Completed"}
        </span>
      </div>
      
      <div className="p-4">
        {/* Prize and Entry Fee */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-xs text-muted-foreground">Guaranteed Prize</div>
            <div className="text-xl font-bold">{prize.guaranteed}</div>
          </div>
          
          <Button 
            size="sm"
            variant="outline"
            className="bg-gaming-primary/10 border-gaming-primary/30 hover:bg-gaming-primary/20 text-white h-8"
          >
            <DollarSign className="h-3.5 w-3.5 mr-1" />
            {entryFee.replace('$', '')}
          </Button>
        </div>
        
        {/* Participants Progress Bar */}
        <div className="bg-gaming-primary/5 rounded px-2 py-1.5 mb-3">
          <div className="flex justify-between items-center mb-1 text-xs">
            <span className="flex items-center">
              <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              {participants.current}
            </span>
            <span>{spotsLeft} spots left</span>
          </div>
          <Progress value={progressValue} className="h-1.5 bg-muted" />
        </div>
        
        {/* Key Tournament Info */}
        <div className="flex justify-between items-center mb-3 text-sm">
          <div className="flex items-center">
            <Trophy className="h-3.5 w-3.5 mr-1 text-gaming-accent1" />
            <span>{firstPrize}</span>
          </div>
          <div className="text-xs px-2 py-1 bg-gaming-primary/10 rounded">
            Top {winnersPercentage.replace('Top ', '')}
          </div>
          <div className="text-xs">
            Max {maxEntries}
          </div>
        </div>
        
        {/* Call to action */}
        <div className="flex items-center justify-between">
          {status !== "completed" && (
            <div className="text-xs">
              <span>{status === "upcoming" 
                ? status === "ongoing" 
                ? `Round ${currentRound}/${totalRounds}`
                : ""
                : ""}</span>
            </div>
          )}
          
          <Link to={`/tournaments/${id}`} className="ml-auto">
            <Button 
              size="sm"
              className="bg-gaming-primary hover:bg-gaming-secondary h-8"
              disabled={status === "completed"}
            >
              {status === "upcoming" 
                ? "Join Now"
                : status === "ongoing"
                ? "View"
                : "Results"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
