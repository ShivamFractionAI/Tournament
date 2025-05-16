
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useEffect, useRef, ReactNode } from "react";

interface MatchProps {
  id: string;
  player1: {
    name: string;
    score?: number;
  };
  player2: {
    name: string;
    score?: number;
  };
  winner?: 1 | 2;
  nextMatchId?: string;
}

interface RoundProps {
  round: number;
  matches: MatchProps[];
}

interface TournamentBracketProps {
  rounds: RoundProps[];
  searchControls?: ReactNode;
}

const TournamentBracket = ({ rounds, searchControls }: TournamentBracketProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const bracketRef = useRef<HTMLDivElement>(null);

  // Draw connections between matches
  useEffect(() => {
    if (!svgRef.current || !bracketRef.current) return;

    const svg = svgRef.current;
    // Clear existing lines
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // Create a mapping of match IDs to their DOM elements
    const matchElements: Record<string, HTMLElement> = {};
    bracketRef.current.querySelectorAll("[data-match-id]").forEach((el) => {
      const matchId = el.getAttribute("data-match-id");
      if (matchId) {
        matchElements[matchId] = el as HTMLElement;
      }
    });

    // Draw lines from each match to its next match
    rounds.forEach((round) => {
      round.matches.forEach((match) => {
        if (match.nextMatchId && matchElements[match.id] && matchElements[match.nextMatchId]) {
          const sourceElement = matchElements[match.id];
          const targetElement = matchElements[match.nextMatchId];

          // Get positions
          const sourceRect = sourceElement.getBoundingClientRect();
          const targetRect = targetElement.getBoundingClientRect();
          const bracketRect = bracketRef.current!.getBoundingClientRect();

          // Calculate positions relative to the bracket container
          const sourceX = sourceRect.right - bracketRect.left;
          const sourceY = sourceRect.top + sourceRect.height / 2 - bracketRect.top;
          const targetX = targetRect.left - bracketRect.left;
          const targetY = targetRect.top + targetRect.height / 2 - bracketRect.top;

          // Create path
          const midX = sourceX + (targetX - sourceX) / 2;
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          
          // Determine the Y position based on winner
          const winner = match.winner === 1 ? 
                        sourceRect.top + sourceRect.height / 4 - bracketRect.top : 
                        sourceRect.top + 3 * sourceRect.height / 4 - bracketRect.top;
          
          // Draw a curved path with control points
          path.setAttribute(
            "d",
            `M ${sourceX} ${winner} C ${midX} ${winner}, ${midX} ${targetY}, ${targetX} ${targetY}`
          );
          path.setAttribute("fill", "none");
          path.setAttribute("stroke", "hsl(var(--gaming-primary) / 0.4)");
          path.setAttribute("stroke-width", "2");
          
          svg.appendChild(path);
        }
      });
    });
  }, [rounds]);

  return (
    <Card className="gaming-card overflow-hidden relative">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Tournament Bracket</CardTitle>
          <CardDescription>
            Follow the bracket to see how the tournament progresses
          </CardDescription>
        </div>
        {searchControls}
      </CardHeader>
      <CardContent className="relative">
        <ScrollArea className="h-[500px] w-full pr-4">
          <div className="flex min-w-max gap-4 pb-8" ref={bracketRef}>
            {rounds.map((round) => (
              <div
                key={round.round}
                className="flex flex-col gap-4"
              >
                <div className="text-center font-semibold">
                  {round.round === rounds.length ? "Final" : `Round ${round.round}`}
                </div>
                <div className="flex flex-col gap-16">
                  {round.matches.map((match) => (
                    <BracketMatch key={match.id} match={match} />
                  ))}
                </div>
              </div>
            ))}
            
            {/* SVG overlay for drawing connection lines */}
            <svg 
              ref={svgRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none" 
              style={{ zIndex: -1 }}
            />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const BracketMatch = ({ match }: { match: MatchProps }) => {
  const handleViewSession = () => {
    console.log(`Viewing session for match ${match.id}: ${match.player1.name} vs ${match.player2.name}`);
    // In a real app, this would navigate to a session replay page or open a modal
  };

  return (
    <div 
      className="flex flex-col w-60 border border-gaming-primary/30 rounded-lg overflow-hidden backdrop-blur-sm bg-gaming-dark/50"
      data-match-id={match.id}
    >
      <div
        className={`flex justify-between p-3 border-b border-gaming-primary/30 ${
          match.winner === 1 ? "bg-gaming-primary/20" : ""
        }`}
      >
        <span className="font-medium">{match.player1.name}</span>
        {match.player1.score !== undefined && (
          <span className="font-mono">{match.player1.score}</span>
        )}
      </div>
      <div
        className={`flex justify-between p-3 ${
          match.winner === 2 ? "bg-gaming-primary/20" : ""
        }`}
      >
        <span className="font-medium">{match.player2.name}</span>
        {match.player2.score !== undefined && (
          <span className="font-mono">{match.player2.score}</span>
        )}
      </div>
      <div className="p-2 bg-gaming-dark/70 border-t border-gaming-primary/30">
        <Button 
          onClick={handleViewSession}
          variant="outline" 
          size="sm"
          className="w-full bg-gaming-primary/10 border-gaming-primary/30 hover:bg-gaming-primary/20 text-white flex items-center justify-center gap-2"
        >
          <Eye className="h-4 w-4" />
          View Session
        </Button>
      </div>
    </div>
  );
};

export default TournamentBracket;
