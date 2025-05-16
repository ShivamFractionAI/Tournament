
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TournamentHero from "@/components/tournaments/TournamentHero";
import TournamentStandings from "@/components/tournaments/TournamentStandings";
import MatchesSchedule from "@/components/tournaments/MatchesSchedule";
import RoundStatistics from "@/components/tournaments/RoundStatistics";
import TournamentBracket from "@/components/tournaments/TournamentBracket";
import RegistrationForm from "@/components/tournaments/RegistrationForm";

// Mock tournament data
const tournamentData = {
  id: "tournament-1",
  title: "Bid Tac Toe Championship",
  description: "The biggest Bid Tac Toe tournament of the year! Compete against the best strategic bidders from around the world for the ultimate prize pool. Test your bidding skills, strategic thinking, and economic decision-making in this unique variant of the classic game.",
  status: "ongoing" as const,
  participants: {
    current: 964,
    total: 1000,
  },
  currentRound: 3,
  totalRounds: 10,
  startDate: "May 15, 2025",
  prize: "$10,000",
};

// Mock players data
const playersData = Array.from({ length: 20 }, (_, i) => ({
  id: `player-${i + 1}`,
  rank: i + 1,
  name: `Player ${i + 1}`,
  wins: Math.floor(Math.random() * 5),
  losses: Math.floor(Math.random() * 3),
  balance: Math.floor(Math.random() * 100) + 50,
  status: Math.random() > 0.2 ? "Active" : "Eliminated",
})).sort((a, b) => (b.wins * 10 + b.balance) - (a.wins * 10 + a.balance));

// Mock matches data
const matchesData = Array.from({ length: 15 }, (_, i) => ({
  id: `match-${i + 1}`,
  playerOne: {
    name: `Player ${i * 2 + 1}`,
    balance: Math.floor(Math.random() * 100) + 50,
  },
  playerTwo: {
    name: `Player ${i * 2 + 2}`,
    balance: Math.floor(Math.random() * 100) + 50,
  },
  time: `${Math.floor(Math.random() * 12 + 1)}:${Math.random() > 0.5 ? '00' : '30'} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
  status: i < 5 ? "completed" as const : i < 8 ? "in-progress" as const : "scheduled" as const,
  result: i < 5 ? {
    winner: Math.random() > 0.5 ? "playerOne" as const : "playerTwo" as const,
    winType: ["standard", "economic", "bankruptcy"][Math.floor(Math.random() * 3)] as "standard" | "economic" | "bankruptcy",
  } : undefined,
}));

// Mock bid statistics data
const bidStatisticsData = {
  averageBid: 23,
  highestBid: 75,
  lowestBid: 5,
  totalBids: 1928,
};

// Mock position data
const positionData = {
  centerMoves: 325,
  cornerMoves: 487,
  edgeMoves: 216,
};

// Mock bracket data
const bracketData = [
  {
    round: 1,
    matches: [
      {
        id: "m1r1",
        player1: { name: "Player 1", score: 87 },
        player2: { name: "Player 2", score: 45 },
        winner: 1 as const,
        nextMatchId: "m1r2",
      },
      {
        id: "m2r1",
        player1: { name: "Player 3", score: 23 },
        player2: { name: "Player 4", score: 56 },
        winner: 2 as const,
        nextMatchId: "m1r2",
      },
      {
        id: "m3r1",
        player1: { name: "Player 5", score: 76 },
        player2: { name: "Player 6", score: 32 },
        winner: 1 as const,
        nextMatchId: "m2r2",
      },
      {
        id: "m4r1",
        player1: { name: "Player 7", score: 44 },
        player2: { name: "Player 8", score: 67 },
        winner: 2 as const,
        nextMatchId: "m2r2",
      },
    ],
  },
  {
    round: 2,
    matches: [
      {
        id: "m1r2",
        player1: { name: "Player 1", score: 65 },
        player2: { name: "Player 4", score: 78 },
        winner: 2 as const,
        nextMatchId: "m1r3",
      },
      {
        id: "m2r2",
        player1: { name: "Player 5", score: 54 },
        player2: { name: "Player 8", score: 32 },
        winner: 1 as const,
        nextMatchId: "m1r3",
      },
    ],
  },
  {
    round: 3,
    matches: [
      {
        id: "m1r3",
        player1: { name: "Player 4" },
        player2: { name: "Player 5" },
        nextMatchId: undefined,
      },
    ],
  },
];

const TournamentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const spotsLeft = tournamentData.participants.total - tournamentData.participants.current;
  
  return (
    <div className="container mx-auto py-8 px-4">
      <TournamentHero
        {...tournamentData}
      />
      
      <div className="mt-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none gap-4 bg-transparent h-auto p-0">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:border-b-2 data-[state=active]:border-gaming-primary data-[state=active]:text-foreground pb-3 px-4 rounded-none"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="standings"
              className="data-[state=active]:border-b-2 data-[state=active]:border-gaming-primary data-[state=active]:text-foreground pb-3 px-4 rounded-none"
            >
              Standings
            </TabsTrigger>
            <TabsTrigger 
              value="matches"
              className="data-[state=active]:border-b-2 data-[state=active]:border-gaming-primary data-[state=active]:text-foreground pb-3 px-4 rounded-none"
            >
              Matches
            </TabsTrigger>
            <TabsTrigger 
              value="statistics"
              className="data-[state=active]:border-b-2 data-[state=active]:border-gaming-primary data-[state=active]:text-foreground pb-3 px-4 rounded-none"
            >
              Statistics
            </TabsTrigger>
            <TabsTrigger 
              value="bracket"
              className="data-[state=active]:border-b-2 data-[state=active]:border-gaming-primary data-[state=active]:text-foreground pb-3 px-4 rounded-none"
            >
              Bracket
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-8">
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="gaming-card p-6 mb-8">
                    <h2 className="text-xl font-bold mb-4">Tournament Rules</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Game Setup</h3>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                          <li>Each player starts with $100</li>
                          <li>The board is a standard 3×3 Tic-Tac-Toe grid</li>
                          <li>One player is assigned X, the other O</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Gameplay Rules</h3>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                          <li>Before each move, both players place a secret bid</li>
                          <li>The higher bidder gets to place their mark on the board</li>
                          <li>Both players lose their bid amount regardless of who wins the bid</li>
                          <li>If bids are tied, winner is decided by coin toss</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Winning Conditions</h3>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                          <li><span className="font-medium text-foreground">Standard Win:</span> Get three of your marks in a row (horizontally, vertically, or diagonally)</li>
                          <li><span className="font-medium text-foreground">Economic Win:</span> Have more money than your opponent when the board fills</li>
                          <li><span className="font-medium text-foreground">Bankruptcy:</span> If your opponent can't place a bid (has $0), you win</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="gaming-card p-6">
                    <h2 className="text-xl font-bold mb-4">Strategy Tips</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gaming-primary/10 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Economy Management</h3>
                        <p className="text-sm text-muted-foreground">Balance your bids - don't spend too much too early. Watch your opponent's money and adjust your strategy accordingly.</p>
                      </div>
                      
                      <div className="bg-gaming-primary/10 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Position Value</h3>
                        <p className="text-sm text-muted-foreground">Corner and center positions provide most strategic value. Sometimes it's worth losing a bid to preserve funds for later rounds.</p>
                      </div>
                      
                      <div className="bg-gaming-primary/10 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Bluffing</h3>
                        <p className="text-sm text-muted-foreground">Make your opponent overspend on less valuable positions by placing higher bids initially, then conserve for crucial moves.</p>
                      </div>
                      
                      <div className="bg-gaming-primary/10 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Endgame Focus</h3>
                        <p className="text-sm text-muted-foreground">In the final moves, consider your remaining balance. Sometimes an economic victory is easier than a standard win.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-1">
                  <RegistrationForm
                    tournamentId={tournamentData.id}
                    tournamentTitle={tournamentData.title}
                    spotsLeft={spotsLeft}
                    startDate={tournamentData.startDate}
                  />
                  
                  <div className="gaming-card p-6 mt-8">
                    <h2 className="text-xl font-bold mb-4">Tournament Schedule</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-gaming-primary/20 pb-2">
                        <span className="font-medium">Registration Opens</span>
                        <span className="text-muted-foreground">May 10, 2025</span>
                      </div>
                      
                      <div className="flex justify-between items-center border-b border-gaming-primary/20 pb-2">
                        <span className="font-medium">Registration Closes</span>
                        <span className="text-muted-foreground">May 14, 2025</span>
                      </div>
                      
                      <div className="flex justify-between items-center border-b border-gaming-primary/20 pb-2">
                        <span className="font-medium">Tournament Starts</span>
                        <span className="text-muted-foreground">May 15, 2025</span>
                      </div>
                      
                      <div className="flex justify-between items-center border-b border-gaming-primary/20 pb-2">
                        <span className="font-medium">Finals</span>
                        <span className="text-muted-foreground">May 25, 2025</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Prize Distribution</span>
                        <span className="text-muted-foreground">May 26, 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="standings">
              <TournamentStandings
                players={playersData}
                roundNumber={tournamentData.currentRound}
              />
            </TabsContent>
            
            <TabsContent value="matches">
              <MatchesSchedule 
                matches={matchesData}
                roundNumber={tournamentData.currentRound}
              />
            </TabsContent>
            
            <TabsContent value="statistics">
              <RoundStatistics 
                roundNumber={tournamentData.currentRound}
                bidData={bidStatisticsData}
                positionData={positionData}
              />
            </TabsContent>
            
            <TabsContent value="bracket">
              <TournamentBracket rounds={bracketData} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default TournamentDetails;
