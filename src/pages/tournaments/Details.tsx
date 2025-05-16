
import TournamentDetails from "./TournamentDetails";
import Navbar from "@/components/layout/Navbar";

const TournamentDetailsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gaming-dark">
      <Navbar />
      <TournamentDetails />
    </div>
  );
};

export default TournamentDetailsPage;
