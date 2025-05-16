
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TournamentFiltersProps {
  gameType: string;
  setFilter: (status: 'all' | 'ongoing' | 'upcoming' | 'completed') => void;
  activeFilter: 'all' | 'ongoing' | 'upcoming' | 'completed';
}

const TournamentFilters = ({ 
  gameType, 
  setFilter, 
  activeFilter 
}: TournamentFiltersProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          {gameType} Tournaments
          <Badge variant="outline" className="ml-2 bg-gaming-primary/10 text-gaming-primary">
            4 Active
          </Badge>
        </h1>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Button 
          variant={activeFilter === 'all' ? 'default' : 'outline'}
          className={activeFilter === 'all' ? 
            'bg-gaming-primary hover:bg-gaming-secondary' : 
            'border-gaming-primary/30 text-muted-foreground hover:text-foreground'
          }
          onClick={() => setFilter('all')}
        >
          All Tournaments
        </Button>
        <Button 
          variant={activeFilter === 'ongoing' ? 'default' : 'outline'}
          className={activeFilter === 'ongoing' ? 
            'bg-gaming-primary hover:bg-gaming-secondary' : 
            'border-gaming-primary/30 text-muted-foreground hover:text-foreground'
          }
          onClick={() => setFilter('ongoing')}
        >
          Ongoing
        </Button>
        <Button 
          variant={activeFilter === 'upcoming' ? 'default' : 'outline'}
          className={activeFilter === 'upcoming' ? 
            'bg-gaming-primary hover:bg-gaming-secondary' : 
            'border-gaming-primary/30 text-muted-foreground hover:text-foreground'
          }
          onClick={() => setFilter('upcoming')}
        >
          Upcoming
        </Button>
        <Button 
          variant={activeFilter === 'completed' ? 'default' : 'outline'}
          className={activeFilter === 'completed' ? 
            'bg-gaming-primary hover:bg-gaming-secondary' : 
            'border-gaming-primary/30 text-muted-foreground hover:text-foreground'
          }
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};

export default TournamentFilters;
