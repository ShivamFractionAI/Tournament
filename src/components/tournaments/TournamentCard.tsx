
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";

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
  prize: string;
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
  
  const progressValue = (currentRound / totalRounds) * 100;
  
  return (
    <div className="gaming-card p-6 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <span className={`text-sm font-medium px-2 py-1 rounded ${statusColor[status]}`}>
          {statusText[status]}
        </span>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
        <Users size={16} />
        <span>
          {participants.current}/{participants.total} Players
        </span>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Trophy size={16} />
        <span>Prize: {prize}</span>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span>Round {currentRound}/{totalRounds}</span>
          <span>{progressValue.toFixed(0)}% Complete</span>
        </div>
        <Progress value={progressValue} className="h-1 bg-muted" />
      </div>
      
      <div className="text-sm text-muted-foreground mb-6">
        {status === "upcoming" ? (
          <span>Starting: {startDate}</span>
        ) : status === "ongoing" ? (
          <span>Round {currentRound} in progress</span>
        ) : (
          <span>Tournament ended</span>
        )}
      </div>
      
      <div className="mt-auto">
        <Link to={`/tournaments/${id}`}>
          <Button 
            className="w-full bg-gaming-primary hover:bg-gaming-secondary"
            disabled={status === "completed"}
          >
            {status === "upcoming" && participants.current < participants.total
              ? "Register"
              : status === "ongoing"
              ? "View Matches"
              : "View Results"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TournamentCard;
