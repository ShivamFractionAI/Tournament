
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";

interface RegistrationFormProps {
  tournamentId: string;
  tournamentTitle: string;
  spotsLeft: number;
  startDate: string;
}

const RegistrationForm = ({ tournamentId, tournamentTitle, spotsLeft, startDate }: RegistrationFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsRegistering(true);
    
    // Simulate registration request
    setTimeout(() => {
      toast.success("Successfully registered for the tournament!");
      setIsRegistering(false);
      setUsername("");
      setEmail("");
    }, 1000);
  };
  
  return (
    <Card className="gaming-card border-gaming-primary/30">
      <CardHeader>
        <CardTitle>Register for Tournament</CardTitle>
        <CardDescription>
          Secure your spot in the {tournamentTitle} tournament
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              placeholder="Enter your username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gaming-dark/60 border-gaming-primary/30"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gaming-dark/60 border-gaming-primary/30"
              required
            />
          </div>
          
          <div className="flex items-center justify-between bg-gaming-primary/10 rounded-md px-3 py-2">
            <span className="text-sm">Starting Balance</span>
            <span className="font-semibold">$100</span>
          </div>

          <div className="text-sm text-muted-foreground">
            Tournament starts on {startDate}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button 
          className="w-full bg-gaming-primary hover:bg-gaming-secondary"
          disabled={isRegistering || spotsLeft === 0}
          onClick={handleRegister}
        >
          {isRegistering ? "Registering..." : spotsLeft === 0 ? "Tournament Full" : "Register Now"}
        </Button>
        
        <div className="text-sm text-center text-muted-foreground">
          {spotsLeft > 0 ? (
            <span>Only <span className="text-gaming-primary font-medium">{spotsLeft}</span> spots remaining</span>
          ) : (
            <span>No spots remaining</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegistrationForm;
