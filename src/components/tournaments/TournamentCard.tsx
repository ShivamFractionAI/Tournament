
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Users, DollarSign } from "lucide-react";
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
  
  const statusText = {
    upcoming: "Upcoming",
    ongoing: "In Progress",
    completed: "Completed",
  };
  
  const progressValue = (participants.current / participants.total) * 100;
  const spotsLeft = participants.total - participants.current;
  
  return (
    <div className="gaming-card overflow-hidden">
      <div className="bg-gaming-primary/10 px-6 py-3 flex items-center justify-between">
        <h3 className="text-lg font-bold">{title}</h3>
        <span className={`text-sm font-medium ${statusColor[status]}`}>
          {statusText[status]}
        </span>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="mb-1 text-sm text-muted-foreground">Guaranteed Prize Pool</div>
            <div className="text-2xl font-bold">{prize.guaranteed}</div>
            {prize.maximum && (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-xs text-gaming-primary underline mt-1">
                    Max {prize.maximum}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0">
                  <div className="p-4 border-b border-border">
                    <h4 className="font-semibold mb-1">Prize Pool Details</h4>
                    <p className="text-sm text-muted-foreground">
                      Prize pool increases as more players join the tournament
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Guaranteed Prize</span>
                      <span>{prize.guaranteed}</span>
                    </div>
                    <div className="flex justify-between mb-2 text-sm font-semibold">
                      <span>Maximum Prize</span>
                      <span>{prize.maximum}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full mt-2 border-gaming-primary/30 text-gaming-primary"
                    >
                      Check Winning Breakup
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
          
          <div className="text-right">
            <div className="mb-1 text-sm text-muted-foreground">Entry Fee</div>
            <Button 
              size="sm"
              variant="outline"
              className="bg-gaming-primary/10 border-gaming-primary/30 hover:bg-gaming-primary/20 text-white"
            >
              <DollarSign className="h-4 w-4 mr-1" />
              {entryFee.replace('$', '')}
            </Button>
          </div>
        </div>
        
        <div className="bg-gaming-primary/5 rounded-lg p-3 mb-6">
          <div className="flex justify-between items-center mb-1 text-sm">
            <span>{participants.current} spots filled</span>
            <span>{spotsLeft} spots left</span>
          </div>
          <Progress value={progressValue} className="h-1.5 bg-muted" />
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">First Prize</div>
            <div className="font-bold">{firstPrize}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Winners</div>
            <div className="font-bold">{winnersPercentage}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Max Entries</div>
            <div className="font-bold">{maxEntries}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm">
            {status === "upcoming" ? (
              <span>Starting: {startDate}</span>
            ) : status === "ongoing" ? (
              <span>Round {currentRound} of {totalRounds}</span>
            ) : (
              <span>Tournament ended</span>
            )}
          </div>
          
          <Link to={`/tournaments/${id}`}>
            <Button 
              className="bg-gaming-primary hover:bg-gaming-secondary"
              disabled={status === "completed"}
            >
              {status === "upcoming" 
                ? "Join Now"
                : status === "ongoing"
                ? "View Details"
                : "View Results"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
