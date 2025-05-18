
import { Button } from "@/components/ui/button";
import { Users, Trophy, Clock, DollarSign } from "lucide-react";

interface TournamentHeroProps {
  title: string;
  description: string;
  status: "upcoming" | "ongoing" | "completed";
  participants: {
    current: number;
    total: number;
  };
  currentRound: number;
  totalRounds: number;
  startDate: string;
  prize: string;
  id: string;
  entryFee: string;
  onJoinClick?: () => void;
  remainingTime?: string;
}

const TournamentHero = ({
  title,
  description,
  participants,
  prize,
  entryFee,
  onJoinClick,
  remainingTime
}: TournamentHeroProps) => {
  return (
    <div className="gaming-card p-6 relative overflow-hidden w-full">
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gaming-primary rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gaming-secondary rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h1 className="text-3xl md:text-4xl font-bold gaming-gradient-text flex items-center gap-3">
            {title}
            {remainingTime && (
              <span className="text-sm font-medium bg-gaming-primary/20 text-gaming-primary px-3 py-1 rounded-full flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {remainingTime}
              </span>
            )}
          </h1>
          
          {onJoinClick && (
            <Button 
              onClick={onJoinClick}
              className="bg-gaming-primary hover:bg-gaming-secondary flex items-center gap-2"
            >
              <span>Join for</span>
              <span className="flex items-center">
                <DollarSign className="h-4 w-4" />
                {entryFee.replace('$', '')}
              </span>
            </Button>
          )}
        </div>
        
        <p className="text-muted-foreground max-w-3xl mb-6">
          {description}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gaming-primary/20">
              <Users size={20} className="text-gaming-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Participants</p>
              <p className="font-semibold">{participants.current}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gaming-primary/20">
              <Trophy size={20} className="text-gaming-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Prize Pool</p>
              <p className="font-semibold">{prize}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gaming-primary/20">
              <Trophy size={20} className="text-gaming-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">1st Prize</p>
              <p className="font-semibold">$3,000</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gaming-primary/20">
              <Users size={20} className="text-gaming-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Winners</p>
              <p className="font-semibold">567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentHero;
