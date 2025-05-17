
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trophy, Users, Clock, Award, Percent } from "lucide-react";

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
  
  return (
    <div className="gaming-card overflow-hidden">
      <div className="bg-gaming-primary/10 px-4 py-2 flex items-center justify-between">
        <h3 className="text-base font-bold">{title}</h3>
        <span className={`text-xs font-medium ${statusColor[status]}`}>
          {status === "upcoming" && <Clock className="h-3.5 w-3.5 inline mr-1" />}
          {status === "upcoming" ? "2d 14h" : status === "ongoing" ? "In Progress" : "Completed"}
        </span>
      </div>
      
      <div className="p-3">
        {/* Prize and Entry Fee */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="text-xs text-muted-foreground">Guaranteed Prize</div>
            <div className="text-xl font-bold">{prize.guaranteed}</div>
          </div>
          
          <Button 
            size="sm"
            variant="outline"
            className="bg-gaming-primary/10 border-gaming-primary/30 hover:bg-gaming-primary/20 text-white h-8"
          >
            ${entryFee.replace('$', '')}
          </Button>
        </div>
        
        {/* Agents Registered */}
        <div className="mb-3 text-xs flex items-center">
          <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
          <span>{participants.current} Agents Registered</span>
        </div>
        
        {/* Key Tournament Info and CTA in one line */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <Trophy className="h-3.5 w-3.5 mr-1 text-gaming-accent1" />
              <span>{firstPrize}</span>
            </div>
            
            <div className="flex items-center">
              <Percent className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <span>{winnersPercentage.replace('Top ', '')}</span>
            </div>
            
            <div className="flex items-center">
              <Award className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <span>{maxEntries}</span>
            </div>
          </div>
          
          <Link to={`/tournaments/${id}`}>
            <Button 
              size="sm"
              className="bg-gaming-primary hover:bg-gaming-secondary h-8"
              disabled={status === "completed"}
            >
              {status === "upcoming" 
                ? "Join"
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
