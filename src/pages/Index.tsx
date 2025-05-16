
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Trophy, CalendarDays, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gaming-dark">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-6 md:px-0">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gaming-gradient-text mb-6">
                  Bid Tac Toe Arena
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto md:mx-0">
                  A strategic bidding variant of the classic game Tic-Tac-Toe. Compete in tournaments and climb the leaderboards!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link to="/tournaments">
                    <Button className="bg-gaming-primary hover:bg-gaming-secondary text-lg px-8 py-6">
                      Enter Tournaments
                    </Button>
                  </Link>
                  <Link to="/rules">
                    <Button variant="outline" className="border-gaming-primary/50 text-gaming-primary text-lg px-8 py-6">
                      Learn Rules
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="md:w-1/2 relative">
                <div className="grid grid-cols-3 grid-rows-3 gap-2 md:gap-4 max-w-sm mx-auto">
                  {Array.from({ length: 9 }).map((_, index) => {
                    const symbol = index % 3 === 0 ? 'X' : index % 3 === 1 ? 'O' : '';
                    const bgClass = index % 3 === 0 
                      ? 'bg-gaming-primary/20 border-gaming-primary/40' 
                      : index % 3 === 1 
                      ? 'bg-gaming-secondary/20 border-gaming-secondary/40' 
                      : 'bg-gaming-dark border-gaming-primary/20';
                    return (
                      <div 
                        key={index}
                        className={`${bgClass} border-2 aspect-square flex items-center justify-center text-2xl md:text-4xl font-bold rounded-md transition-all hover:scale-105`}
                      >
                        {symbol}
                      </div>
                    );
                  })}
                  {/* Bid overlay */}
                  <div className="absolute -bottom-6 -right-6 bg-gaming-dark border border-gaming-primary/30 p-3 rounded-lg shadow-lg">
                    <div className="text-sm text-muted-foreground mb-1">Current Bid</div>
                    <div className="text-2xl font-bold gaming-gradient-text">$45</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-6 bg-gradient-to-b from-gaming-primary/10 to-transparent">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-12">
              Strategic Bidding. Tactical Placement. Economic Victory.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="gaming-card p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center bg-gaming-primary/20">
                  <Trophy className="text-gaming-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Tournaments</h3>
                <p className="text-muted-foreground">
                  Compete in massive tournaments with up to 1,000 players. Advance through rounds and claim victory!
                </p>
              </div>
              
              <div className="gaming-card p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center bg-gaming-primary/20">
                  <CalendarDays className="text-gaming-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Weekly Events</h3>
                <p className="text-muted-foreground">
                  Join special themed competitions with unique rules and challenges every week.
                </p>
              </div>
              
              <div className="gaming-card p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center bg-gaming-primary/20">
                  <Users className="text-gaming-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Community</h3>
                <p className="text-muted-foreground">
                  Connect with other strategic bidders, share tactics, and make friends in our growing community.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Current Tournament */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Current Tournament</h2>
              <Link to="/tournaments">
                <Button variant="outline" className="border-gaming-primary/50 text-gaming-primary">
                  View All Tournaments
                </Button>
              </Link>
            </div>
            
            <div className="gaming-card p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="mb-2">
                    <span className="text-sm bg-gaming-primary/20 text-gaming-primary px-3 py-1 rounded-full">
                      In Progress
                    </span>
                    <span className="text-sm ml-2 bg-gaming-dark px-3 py-1 rounded-full">
                      Round 3 of 10
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">Bid Tac Toe Championship</h3>
                  <p className="text-muted-foreground mb-4 max-w-xl">
                    The biggest tournament of the year with 1,000 players competing for a $10,000 prize pool. Currently in Round 3!
                  </p>
                  
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-muted-foreground" />
                      <span>964/1000 Players</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy size={18} className="text-muted-foreground" />
                      <span>$10,000 Prize</span>
                    </div>
                  </div>
                  
                  <Link to="/tournaments/tournament-1">
                    <Button className="bg-gaming-primary hover:bg-gaming-secondary">
                      View Tournament
                    </Button>
                  </Link>
                </div>
                
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gaming-primary/20 animate-pulse-soft absolute -left-4 -top-4 -z-10"></div>
                    <div className="w-32 h-32 rounded-full bg-gaming-secondary/10 absolute -right-6 -bottom-6 -z-10"></div>
                    <div className="bg-gaming-dark/60 border border-gaming-primary/30 backdrop-blur-md rounded-lg p-6">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">Upcoming Match</div>
                        <div className="font-bold mb-4">Semifinals</div>
                        
                        <div className="flex items-center gap-4 justify-between mb-4">
                          <div className="text-right">
                            <div className="font-semibold">Player 4</div>
                            <div className="text-xs text-muted-foreground">W5 L0</div>
                          </div>
                          <span className="text-lg font-bold">vs</span>
                          <div className="text-left">
                            <div className="font-semibold">Player 5</div>
                            <div className="text-xs text-muted-foreground">W4 L1</div>
                          </div>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          May 18, 2025 • 3:00 PM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto text-center">
            <div className="gaming-card p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-gaming-primary rounded-full blur-3xl"></div>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gaming-secondary rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Test Your Strategy?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                  Join the Bid Tac Toe Arena and compete against players worldwide in this unique strategic bidding game.
                </p>
                <Link to="/tournaments">
                  <Button className="bg-gaming-primary hover:bg-gaming-secondary text-lg px-8 py-6">
                    Join Tournament Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gaming-primary/20 py-8 px-6 mt-auto">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold gaming-gradient-text">Bid Tac Toe</div>
            <div className="text-sm text-muted-foreground">© 2025 Bid Tac Toe Arena. All rights reserved.</div>
          </div>
          
          <div className="flex gap-6">
            <Link to="/tournaments" className="text-sm text-muted-foreground hover:text-gaming-primary transition-colors">
              Tournaments
            </Link>
            <Link to="/rules" className="text-sm text-muted-foreground hover:text-gaming-primary transition-colors">
              Rules
            </Link>
            <Link to="/leaderboard" className="text-sm text-muted-foreground hover:text-gaming-primary transition-colors">
              Leaderboard
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-gaming-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
