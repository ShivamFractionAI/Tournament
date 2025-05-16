
import TournamentDetails from "./TournamentDetails";
import Navbar from "@/components/layout/Navbar";

const TournamentDetailsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gaming-dark">
      <Navbar />
      <div className="flex-1">
        <TournamentDetails />
      </div>
    </div>
  );
};

export default TournamentDetailsPage;
