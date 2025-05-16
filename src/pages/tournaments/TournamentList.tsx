
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TournamentCard from "@/components/tournaments/TournamentCard";
import TournamentFilters from "@/components/tournaments/TournamentFilters";

// Mock tournaments data
const tournamentsData = [
  {
    id: "tournament-1",
    title: "Bid Tac Toe Championship",
    status: "ongoing" as const,
    participants: {
      current: 964,
      total: 1000,
    },
    currentRound: 3,
    totalRounds: 10,
    startDate: "May 15, 2025",
    prize: {
      guaranteed: "$10,000",
      maximum: "$15,000",
    },
    entryFee: "$25",
    firstPrize: "$2,500",
    winnersPercentage: "Top 20%",
    maxEntries: 3,
    gameType: "bid-tac-toe",
  },
  {
    id: "tournament-2",
    title: "Bid Tac Toe Weekly",
    status: "upcoming" as const,
    participants: {
      current: 356,
      total: 500,
    },
    currentRound: 0,
    totalRounds: 7,
    startDate: "May 22, 2025",
    prize: {
      guaranteed: "$5,000",
      maximum: "$7,500",
    },
    entryFee: "$15",
    firstPrize: "$1,000",
    winnersPercentage: "Top 15%",
    maxEntries: 5,
    gameType: "bid-tac-toe",
  },
  {
    id: "tournament-3",
    title: "Bid Tac Toe Open",
    status: "completed" as const,
    participants: {
      current: 500,
      total: 500,
    },
    currentRound: 7,
    totalRounds: 7,
    startDate: "May 5, 2025",
    prize: {
      guaranteed: "$3,000",
    },
    entryFee: "$10",
    firstPrize: "$800",
    winnersPercentage: "Top 25%",
    maxEntries: 2,
    gameType: "bid-tac-toe",
  },
  {
    id: "tournament-4",
    title: "Bid Tac Toe Masters",
    status: "upcoming" as const,
    participants: {
      current: 150,
      total: 1000,
    },
    currentRound: 0,
    totalRounds: 10,
    startDate: "June 1, 2025",
    prize: {
      guaranteed: "$15,000",
      maximum: "$25,000",
    },
    entryFee: "$50",
    firstPrize: "$5,000",
    winnersPercentage: "Top 10%",
    maxEntries: 1,
    gameType: "bid-tac-toe",
  },
];

const TournamentList = () => {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<'all' | 'ongoing' | 'upcoming' | 'completed'>('all');
  const [filteredTournaments, setFilteredTournaments] = useState(tournamentsData);
  
  const gameParam = searchParams.get('game') || 'bid-tac-toe';
  const gameTitle = gameParam.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  useEffect(() => {
    let filtered = tournamentsData.filter(tournament => tournament.gameType === gameParam);
    
    if (activeFilter !== 'all') {
      filtered = filtered.filter(tournament => tournament.status === activeFilter);
    }
    
    setFilteredTournaments(filtered);
  }, [activeFilter, gameParam]);

  return (
    <div className="container mx-auto py-8 px-4">
      <TournamentFilters 
        gameType={gameTitle} 
        setFilter={setActiveFilter} 
        activeFilter={activeFilter} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTournaments.map((tournament) => (
          <TournamentCard
            key={tournament.id}
            {...tournament}
          />
        ))}
      </div>
      
      {filteredTournaments.length === 0 && (
        <div className="bg-gaming-primary/10 rounded-lg p-8 text-center my-8">
          <h3 className="text-xl font-bold mb-2">No Tournaments Found</h3>
          <p className="text-muted-foreground">
            There are no {activeFilter !== 'all' ? activeFilter : ''} tournaments available for {gameTitle} at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default TournamentList;
