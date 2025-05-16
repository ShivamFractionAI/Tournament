
import TournamentList from "./TournamentList";
import Navbar from "@/components/layout/Navbar";

const TournamentsIndex = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gaming-dark">
      <Navbar />
      <TournamentList />
    </div>
  );
};

export default TournamentsIndex;
