
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays } from "lucide-react";

interface Match {
  id: string;
  playerOne: {
    name: string;
    balance: number;
  };
  playerTwo: {
    name: string;
    balance: number;
  };
  time: string;
  status: "scheduled" | "in-progress" | "completed";
  result?: {
    winner: "playerOne" | "playerTwo";
    winType: "standard" | "economic" | "bankruptcy";
  };
}

interface MatchesScheduleProps {
  matches: Match[];
  roundNumber: number;
}

const MatchesSchedule = ({ matches, roundNumber }: MatchesScheduleProps) => {
  return (
    <div className="gaming-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarDays size={20} className="text-gaming-primary" />
          <h3 className="text-xl font-bold">Round {roundNumber} Matches</h3>
        </div>
        <span className="text-sm text-muted-foreground">
          {matches.length} matches
        </span>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {matches.map((match) => (
            <div 
              key={match.id}
              className={`border ${
                match.status === "completed" 
                  ? "border-gaming-accent1/30 bg-gaming-accent1/5" 
                  : match.status === "in-progress"
                  ? "border-gaming-primary/30 bg-gaming-primary/5 animate-pulse-soft"
                  : "border-gaming-primary/20 bg-transparent"
              } rounded-lg p-4`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-gaming-dark">
                  {match.time}
                </span>
                <span className={`text-xs font-medium ${
                  match.status === "completed" 
                    ? "text-gaming-accent1" 
                    : match.status === "in-progress"
                    ? "text-gaming-primary"
                    : "text-muted-foreground"
                }`}>
                  {match.status === "completed" 
                    ? "Completed" 
                    : match.status === "in-progress"
                    ? "In Progress"
                    : "Scheduled"}
                </span>
              </div>
              
              <div className="flex items-center justify-between my-3">
                <div className="flex-1 text-center">
                  <p className={`font-semibold ${
                    match.status === "completed" && match.result?.winner === "playerOne"
                      ? "text-gaming-accent1" 
                      : ""
                  }`}>
                    {match.playerOne.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ${match.playerOne.balance}
                  </p>
                </div>
                
                <div className="px-4 py-2">
                  <span className="text-lg font-bold">vs</span>
                </div>
                
                <div className="flex-1 text-center">
                  <p className={`font-semibold ${
                    match.status === "completed" && match.result?.winner === "playerTwo"
                      ? "text-gaming-accent1" 
                      : ""
                  }`}>
                    {match.playerTwo.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ${match.playerTwo.balance}
                  </p>
                </div>
              </div>
              
              {match.status === "completed" && match.result && (
                <div className="text-center text-sm mb-3">
                  <span className="text-gaming-accent1 font-medium">
                    {match.result.winner === "playerOne" ? match.playerOne.name : match.playerTwo.name} won
                  </span>
                  <span className="text-muted-foreground ml-1">
                    ({match.result.winType} victory)
                  </span>
                </div>
              )}
              
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`w-full max-w-[200px] border-gaming-primary/50 text-gaming-primary ${
                    match.status === "completed" ? "opacity-50" : ""
                  }`}
                  disabled={match.status !== "in-progress"}
                >
                  {match.status === "completed" 
                    ? "View Replay" 
                    : match.status === "in-progress" 
                    ? "Watch Live" 
                    : "Match Details"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MatchesSchedule;
