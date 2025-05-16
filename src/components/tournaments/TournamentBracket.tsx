
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
}

const TournamentBracket = ({ rounds }: TournamentBracketProps) => {
  return (
    <Card className="gaming-card overflow-hidden">
      <CardHeader>
        <CardTitle>Tournament Bracket</CardTitle>
        <CardDescription>
          Follow the bracket to see how the tournament progresses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] w-full pr-4">
          <div className="flex min-w-max gap-4 pb-8">
            {rounds.map((round) => (
              <div
                key={round.round}
                className="flex flex-col gap-4"
              >
                <div className="text-center font-semibold">
                  {round.round === rounds.length ? "Final" : `Round ${round.round}`}
                </div>
                <div className="flex flex-col gap-4">
                  {round.matches.map((match) => (
                    <BracketMatch key={match.id} match={match} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const BracketMatch = ({ match }: { match: MatchProps }) => {
  return (
    <div className="flex flex-col w-60 border border-gaming-primary/30 rounded-lg overflow-hidden backdrop-blur-sm bg-gaming-dark/50">
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
    </div>
  );
};

export default TournamentBracket;
