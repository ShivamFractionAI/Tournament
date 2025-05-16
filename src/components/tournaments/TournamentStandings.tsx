
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Award } from "lucide-react";
import { ReactNode } from "react";

interface Player {
  id: string;
  rank: number;
  name: string;
  wins: number;
  losses: number;
  balance: number;
  status: string;
}

interface TournamentStandingsProps {
  players: Player[];
  roundNumber: number;
  filterControls?: ReactNode;
}

const TournamentStandings = ({ players, roundNumber, filterControls }: TournamentStandingsProps) => {
  return (
    <div className="gaming-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Tournament Standings</h3>
        {filterControls}
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gaming-primary/20">
              <TableHead className="text-foreground">Rank</TableHead>
              <TableHead className="text-foreground">Player</TableHead>
              <TableHead className="text-foreground">W/L</TableHead>
              <TableHead className="text-foreground">Balance</TableHead>
              <TableHead className="text-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player) => (
              <TableRow 
                key={player.id} 
                className={`border-b border-gaming-primary/10 ${
                  player.rank <= 3 ? "bg-gaming-primary/10" : ""
                }`}
              >
                <TableCell className="font-medium">
                  {player.rank === 1 ? (
                    <div className="flex items-center">
                      <Trophy size={16} className="mr-1 text-yellow-500" /> 
                      {player.rank}
                    </div>
                  ) : player.rank <= 3 ? (
                    <div className="flex items-center">
                      <Award size={16} className="mr-1 text-gaming-primary" /> 
                      {player.rank}
                    </div>
                  ) : (
                    player.rank
                  )}
                </TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.wins}/{player.losses}</TableCell>
                <TableCell>${player.balance}</TableCell>
                <TableCell>
                  <span 
                    className={`px-2 py-0.5 rounded text-xs ${
                      player.status === "Active" 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {player.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TournamentStandings;
