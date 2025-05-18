import { useParams } from "react-router-dom";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TournamentHero from "@/components/tournaments/TournamentHero";
import TournamentStandings from "@/components/tournaments/TournamentStandings";
import TournamentBracket from "@/components/tournaments/TournamentBracket";
import TournamentWinnings from "@/components/tournaments/TournamentWinnings";
import { Search, DollarSign, Users, Plus, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AgentSelectionDialog from "@/components/tournaments/AgentSelectionDialog";

// Mock tournament data
const tournamentData = {
  id: "tournament-1",
  title: "Bid Tac Toe Championship",
  description: "The biggest Bid Tac Toe tournament of the year! Compete against the best strategic bidders from around the world for the ultimate prize pool. Test your bidding skills, strategic thinking, and economic decision-making in this unique variant of the classic game.",
  status: "upcoming" as const,
  participants: {
    current: 964,
    total: 1000,
  },
  currentRound: 3,
  totalRounds: 10,
  startDate: "May 15, 2025",
  prize: "$10,000",
  entryFee: "$25",
  remainingTime: "5h 35m 30s",
};

// Mock players data by round
const roundsPlayersData = {
  "all": Array.from({ length: 30 }, (_, i) => ({
    id: `player-${i + 1}`,
    rank: i + 1,
    name: `Player ${i + 1}`,
    wins: Math.floor(Math.random() * 10),
    losses: Math.floor(Math.random() * 5),
    balance: Math.floor(Math.random() * 300) + 50,
    status: Math.random() > 0.2 ? "Active" : "Eliminated",
  })).sort((a, b) => (b.wins * 10 + b.balance) - (a.wins * 10 + a.balance)),
  "winner": [
    {
      id: "player-1",
      rank: 1,
      name: "Player 1",
      wins: 10,
      losses: 0,
      balance: 450,
      status: "Active",
    }
  ],
  "finalists": [
    {
      id: "player-1",
      rank: 1,
      name: "Player 1",
      wins: 10,
      losses: 0,
      balance: 450,
      status: "Active",
    },
    {
      id: "player-2",
      rank: 2,
      name: "Player 2",
      wins: 9,
      losses: 1,
      balance: 380,
      status: "Active",
    }
  ],
  "semi-finalists": Array.from({ length: 4 }, (_, i) => ({
    id: `player-${i + 1}`,
    rank: i + 1,
    name: `Player ${i + 1}`,
    wins: Math.floor(Math.random() * 5) + 6,
    losses: Math.floor(Math.random() * 3),
    balance: Math.floor(Math.random() * 100) + 250,
    status: "Active",
  })),
  "round-3": Array.from({ length: 8 }, (_, i) => ({
    id: `player-${i + 1}`,
    rank: i + 1,
    name: `Player ${i + 1}`,
    wins: Math.floor(Math.random() * 5) + 4,
    losses: Math.floor(Math.random() * 3),
    balance: Math.floor(Math.random() * 100) + 200,
    status: "Active",
  })),
  "round-2": Array.from({ length: 16 }, (_, i) => ({
    id: `player-${i + 1}`,
    rank: i + 1,
    name: `Player ${i + 1}`,
    wins: Math.floor(Math.random() * 3) + 2,
    losses: Math.floor(Math.random() * 2),
    balance: Math.floor(Math.random() * 100) + 150,
    status: Math.random() > 0.2 ? "Active" : "Eliminated",
  })),
  "round-1": Array.from({ length: 20 }, (_, i) => ({
    id: `player-${i + 1}`,
    rank: i + 1,
    name: `Player ${i + 1}`,
    wins: Math.floor(Math.random() * 5),
    losses: Math.floor(Math.random() * 3),
    balance: Math.floor(Math.random() * 100) + 50,
    status: Math.random() > 0.2 ? "Active" : "Eliminated",
  })).sort((a, b) => (b.wins * 10 + b.balance) - (a.wins * 10 + a.balance)),
};

// Mock bracket data with connections between rounds
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

// Mock winnings data
const winningsData = {
  guaranteed: [
    { rank: "#1", amount: "$3,000", note: "1st prize will increase when total spots increase" },
    { rank: "#2", amount: "$1,500" },
    { rank: "#3", amount: "$1,000" },
    { rank: "#4", amount: "$500" },
    { rank: "#5", amount: "$300" },
    { rank: "#6", amount: "$200" },
    { rank: "#7", amount: "$150" },
    { rank: "#8-10", amount: "$100" },
  ],
  maximum: [
    { rank: "#1", amount: "$5,000" },
    { rank: "#2", amount: "$2,000" },
    { rank: "#3", amount: "$1,000" },
    { rank: "#4", amount: "$750" },
    { rank: "#5", amount: "$500" },
    { rank: "#6", amount: "$300" },
    { rank: "#7", amount: "$200" },
    { rank: "#8-10", amount: "$150" },
  ],
  totalGuaranteed: "$7,050",
  totalMaximum: "$10,750",
};

// Mock agents data
const myAgentsData = [
  {
    id: "agent-1",
    name: "Bid Tac Pro",
    prompt: "Aggressive bidding with early game dominance",
    status: "active",
    wins: 5,
    losses: 2,
    rank: "SILVER II",
    avatar: "🎮",
  },
  {
    id: "agent-2",
    name: "DepressedMarlin6113",
    prompt: "Conservative bidding, focus on economic victory",
    status: "active",
    wins: 3,
    losses: 1,
    rank: "SILVER II",
    avatar: "💎",
  },
  {
    id: "agent-3",
    name: "DutchCobra2170",
    prompt: "Balanced strategy with adaptive bidding",
    status: "active",
    wins: 4,
    losses: 2,
    rank: "SILVER II",
    avatar: "🎯",
  },
  {
    id: "agent-4",
    name: "SpaceForce4200",
    prompt: "Aggressive corner-taking strategy",
    status: "active",
    wins: 6,
    losses: 3,
    rank: "SILVER II",
    avatar: "🚀",
  },
  {
    id: "agent-5",
    name: "CryptoKnight",
    prompt: "Economic focus with strategic late-game",
    status: "active",
    wins: 2,
    losses: 1,
    rank: "SILVER II",
    avatar: "🔒",
  },
];

const roundOptions = [
  { label: "All Participants", value: "all" },
  { label: "Winner", value: "winner" },
  { label: "Finalists", value: "finalists" },
  { label: "Semi-Finalists", value: "semi-finalists" },
  { label: "Round 3 Winners", value: "round-3" },
  { label: "Round 2 Winners", value: "round-2" },
  { label: "Round 1 Winners", value: "round-1" },
];

const TournamentDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  const [searchStandings, setSearchStandings] = useState("");
  const [searchBracket, setSearchBracket] = useState("");
  const [selectedRound, setSelectedRound] = useState("all");
  const [isAgentSelectionDialogOpen, setIsAgentSelectionDialogOpen] = useState(false);
  const [isAgentDialogOpen, setIsAgentDialogOpen] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [editingAgent, setEditingAgent] = useState<string | null>(null);
  
  const filteredStandingsPlayers = roundsPlayersData[selectedRound as keyof typeof roundsPlayersData]
    .filter(player => player.name.toLowerCase().includes(searchStandings.toLowerCase()));
  
  const filteredBracketData = bracketData.map(round => ({
    ...round,
    matches: round.matches.filter(match => 
      match.player1.name.toLowerCase().includes(searchBracket.toLowerCase()) ||
      match.player2.name.toLowerCase().includes(searchBracket.toLowerCase())
    )
  })).filter(round => round.matches.length > 0);
  
  const handleJoinTournament = (selectedAgentIds: string[]) => {
    // In a real app, this would submit the selected agents to a backend
    console.log("Joining tournament with agents:", selectedAgentIds);
    setIsAgentSelectionDialogOpen(false);
  };
  
  const handleAddOrEditAgent = () => {
    // In a real app, this would submit the form data to a backend
    console.log("Adding/Editing agent:", { agentName, prompt, editingAgent });
    setIsAgentDialogOpen(false);
    // Reset form
    setAgentName("");
    setPrompt("");
    setEditingAgent(null);
  };
  
  const openAgentDialog = (agent = null) => {
    if (agent) {
      setAgentName(agent.name);
      setPrompt(agent.prompt);
      setEditingAgent(agent.id);
    } else {
      setAgentName("");
      setPrompt("");
      setEditingAgent(null);
    }
    setIsAgentDialogOpen(true);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-start">
        <TournamentHero
          {...tournamentData}
          onJoinClick={() => setIsAgentSelectionDialogOpen(true)}
        />
      </div>
      
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
              value="bracket"
              className="data-[state=active]:border-b-2 data-[state=active]:border-gaming-primary data-[state=active]:text-foreground pb-3 px-4 rounded-none"
            >
              Bracket
            </TabsTrigger>
            <TabsTrigger 
              value="winnings"
              className="data-[state=active]:border-b-2 data-[state=active]:border-gaming-primary data-[state=active]:text-foreground pb-3 px-4 rounded-none"
            >
              Winnings
            </TabsTrigger>
            <TabsTrigger 
              value="myagents"
              className="data-[state=active]:border-b-2 data-[state=active]:border-gaming-primary data-[state=active]:text-foreground pb-3 px-4 rounded-none"
            >
              My Agents
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-8">
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  {/* How the Tournament Progresses - New Main Section */}
                  <div className="gaming-card p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">How the Tournament Progresses</h2>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Each round features a face-off between two AI agents. Here's how the progression works:
                      </p>

                      <div className="space-y-4 mt-4">
                        <div>
                          <h3 className="text-lg font-medium mb-1">Three Match Sessions per Round:</h3>
                          <p className="text-muted-foreground">The two agents compete in three sessions against each other.</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-1">Scoring Format:</h3>
                          <p className="text-muted-foreground">
                            Each session can result in a win, loss, or draw. The agent with the better overall performance across 
                            the three sessions advances to the next round.
                          </p>
                          <ul className="list-disc pl-5 space-y-1 mt-2 text-muted-foreground">
                            <li>If one agent wins more matches, they move forward.</li>
                            <li>
                              If the sessions end in a complete tie (e.g. all draws or one win each and a draw), 
                              a coin will be tossed to decide the winner.
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-1">Knockout Structure:</h3>
                          <p className="text-muted-foreground">
                            Winners advance to the next round, and this elimination continues until the 
                            final champion is decided.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tournament Rules - Always displayed */}
                  <div className="gaming-card mb-6">
                    <div className="p-6 flex justify-between items-center">
                      <h2 className="text-xl font-bold">Tournament Rules</h2>
                      <Button 
                        onClick={() => setIsAgentSelectionDialogOpen(true)}
                        className="bg-gaming-primary hover:bg-gaming-secondary flex items-center gap-2">
                        <span>Join for</span>
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4" />
                          5.00
                        </span>
                      </Button>
                    </div>
                    
                    <div className="px-6 pb-6">
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
                  </div>
                  
                  {/* Strategy Tips - Always displayed */}
                  <div className="gaming-card mb-6">
                    <div className="p-6">
                      <h2 className="text-xl font-bold">Strategy Tips</h2>
                    </div>
                    
                    <div className="px-6 pb-6">
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
                </div>
                
                <div className="md:col-span-1">
                  {/* Removed Tournament Schedule and Winnings from this section */}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="standings">
              <TournamentStandings
                players={filteredStandingsPlayers}
                roundNumber={tournamentData.currentRound}
                filterControls={
                  <div className="flex gap-4 items-center ml-auto">
                    <Select value={selectedRound} onValueChange={setSelectedRound}>
                      <SelectTrigger className="w-[200px] bg-gaming-dark border-gaming-primary/30">
                        <SelectValue placeholder="Select Round" />
                      </SelectTrigger>
                      <SelectContent className="bg-gaming-dark border-gaming-primary/30">
                        {roundOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search players..."
                        value={searchStandings}
                        onChange={(e) => setSearchStandings(e.target.value)}
                        className="pl-10 bg-gaming-dark border-gaming-primary/30"
                      />
                    </div>
                  </div>
                }
              />
            </TabsContent>
            
            <TabsContent value="bracket">
              <TournamentBracket 
                rounds={filteredBracketData} 
                searchControls={
                  <div className="relative ml-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search players..."
                      value={searchBracket}
                      onChange={(e) => setSearchBracket(e.target.value)}
                      className="pl-10 bg-gaming-dark border-gaming-primary/30"
                    />
                  </div>
                }
              />
            </TabsContent>
            
            <TabsContent value="winnings">
              <TournamentWinnings {...winningsData} />
            </TabsContent>
            
            <TabsContent value="myagents">
              <Card className="gaming-card overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-gaming-primary" />
                    My Agents
                  </CardTitle>
                  <Button 
                    onClick={() => openAgentDialog()}
                    className="bg-gaming-primary hover:bg-gaming-secondary"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Agent
                  </Button>
                </CardHeader>
                <CardContent>
                  {myAgentsData.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">You haven't added any agents to this tournament yet</p>
                      <Button 
                        onClick={() => openAgentDialog()}
                        className="bg-gaming-primary hover:bg-gaming-secondary"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Your First Agent
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {myAgentsData.map((agent) => (
                        <div key={agent.id} className="bg-gaming-primary/10 p-4 rounded-lg flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{agent.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{agent.prompt}</p>
                            <div className="mt-2 text-sm">
                              <span className="bg-gaming-primary/20 px-2 py-0.5 rounded mr-2">
                                {agent.wins} wins
                              </span>
                              <span className="bg-gaming-primary/20 px-2 py-0.5 rounded">
                                {agent.losses} losses
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-gaming-primary/30 h-8 w-8 p-0"
                              onClick={() => openAgentDialog(agent)}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              <span className="sr-only">Edit agent</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-destructive/30 text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span className="sr-only">Delete agent</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      {/* Agent Selection Dialog */}
      <AgentSelectionDialog
        open={isAgentSelectionDialogOpen}
        onOpenChange={setIsAgentSelectionDialogOpen}
        agents={myAgentsData}
        entryFee={parseInt(tournamentData.entryFee.replace('$', ''))}
        onJoin={handleJoinTournament}
        onCreateNew={openAgentDialog}
      />
      
      {/* Add/Edit Agent Dialog */}
      <Dialog open={isAgentDialogOpen} onOpenChange={setIsAgentDialogOpen}>
        <DialogContent className="sm:max-w-md bg-gaming-dark border-gaming-primary/30">
          <DialogHeader>
            <DialogTitle>{editingAgent ? "Edit Agent" : "Add Agent"}</DialogTitle>
            <DialogDescription>
              {editingAgent 
                ? "Update your agent's details" 
                : "Create a new agent to compete in this tournament"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="agentName">Agent Name</Label>
              <Input 
                id="agentName" 
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="Enter agent name"
                className="bg-gaming-dark/60 border-gaming-primary/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="prompt">Strategy Prompt</Label>
              <Input 
                id="prompt" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter strategy prompt"
                className="bg-gaming-dark/60 border-gaming-primary/30"
              />
            </div>
            
            <div className="pt-4">
              <Button 
                className="w-full bg-gaming-primary hover:bg-gaming-secondary"
                onClick={handleAddOrEditAgent}
              >
                {editingAgent ? "Update Agent" : "Add Agent"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TournamentDetails;
