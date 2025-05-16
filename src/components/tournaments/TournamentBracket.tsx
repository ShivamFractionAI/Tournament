
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface BracketMatch {
  id: string;
  player1: {
    name: string;
    score?: number;
  } | null;
  player2: {
    name: string;
    score?: number;
  } | null;
  winner?: 1 | 2;
  nextMatchId?: string;
}

interface RoundBracketData {
  round: number;
  matches: BracketMatch[];
}

interface TournamentBracketProps {
  rounds: RoundBracketData[];
}

const TournamentBracket = ({ rounds }: TournamentBracketProps) => {
  const [hoveredMatch, setHoveredMatch] = useState<string | null>(null);

  return (
    <div className="gaming-card p-6">
      <h3 className="text-xl font-bold mb-6">Tournament Bracket</h3>
      
      <ScrollArea orientation="horizontal" className="w-full pb-4">
        <div className="flex gap-8 min-w-max pb-4">
          {rounds.map((round) => (
            <div key={round.round} className="flex-shrink-0">
              <div className="text-sm font-semibold mb-4 text-center p-2 border-b border-gaming-primary/20">
                Round {round.round}
              </div>
              
              <div className="flex flex-col gap-8">
                {round.matches.map((match) => (
                  <div 
                    key={match.id} 
                    className={`relative w-[200px] h-[80px] border ${
                      hoveredMatch === match.id
                        ? "border-gaming-primary"
                        : "border-gaming-primary/30"
                    } rounded-md overflow-hidden`}
                    onMouseEnter={() => setHoveredMatch(match.id)}
                    onMouseLeave={() => setHoveredMatch(null)}
                  >
                    {/* Connection lines to next match */}
                    {match.nextMatchId && (
                      <div className="absolute top-1/2 right-0 w-8 h-[2px] bg-gaming-primary/30 translate-x-full" />
                    )}
                    
                    <div className="flex flex-col h-full">
                      <div className={`flex items-center justify-between px-3 py-2 ${
                        match.winner === 1 ? "bg-gaming-primary/20" : ""
                      }`}>
                        <span className="font-medium text-sm truncate flex-1">
                          {match.player1?.name || "TBD"}
                        </span>
                        {match.player1?.score !== undefined && (
                          <span className="text-xs px-2 py-0.5 rounded bg-gaming-dark">
                            ${match.player1.score}
                          </span>
                        )}
                      </div>
                      
                      <div className="h-[1px] bg-gaming-primary/30"></div>
                      
                      <div className={`flex items-center justify-between px-3 py-2 ${
                        match.winner === 2 ? "bg-gaming-primary/20" : ""
                      }`}>
                        <span className="font-medium text-sm truncate flex-1">
                          {match.player2?.name || "TBD"}
                        </span>
                        {match.player2?.score !== undefined && (
                          <span className="text-xs px-2 py-0.5 rounded bg-gaming-dark">
                            ${match.player2.score}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TournamentBracket;
