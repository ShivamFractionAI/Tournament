
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

interface GameCategoryProps {
  id: string;
  title: string;
  description: string;
  prizePool: string;
  image?: string;
}

const GameCategory = ({ id, title, description, prizePool, image }: GameCategoryProps) => {
  return (
    <div className="gaming-card p-6 h-full flex flex-col">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="bg-gaming-primary/20 rounded-lg p-3 flex-shrink-0">
          {image ? (
            <img src={image} alt={title} className="w-16 h-16" />
          ) : (
            <Trophy size={32} className="text-gaming-primary" />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-3">{description}</p>
          <div className="text-sm font-medium mb-4">
            <span className="text-gaming-primary">Prize Pool: </span>
            <span>{prizePool}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Link to={`/tournaments?game=${id}`}>
          <Button className="w-full bg-gaming-primary hover:bg-gaming-secondary">
            View Tournaments
          </Button>
        </Link>
      </div>
    </div>
  );
};

const categories: GameCategoryProps[] = [
  {
    id: "bid-tac-toe",
    title: "Bid Tac Toe",
    description: "A strategic bidding variant of the classic game. Place bids to secure your moves on the board.",
    prizePool: "$25,000",
  },
  {
    id: "btc-tradewars",
    title: "BTC TradeWars",
    description: "Trade virtual cryptocurrencies in this fast-paced market simulation game.",
    prizePool: "$15,000",
  },
  {
    id: "burning-colloseum",
    title: "Burning Colloseum",
    description: "Arena-style tactical combat with character progression and resource management.",
    prizePool: "$18,000",
  },
  {
    id: "rap-battle",
    title: "Rap Battle",
    description: "Test your lyrical skills in this turn-based wordplay competition.",
    prizePool: "$12,000",
  }
];

const GameCategories = () => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Game Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <GameCategory key={category.id} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameCategories;
