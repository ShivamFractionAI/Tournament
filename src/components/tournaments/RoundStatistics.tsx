
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart } from "@/components/ui/chart";

interface RoundStatisticsProps {
  roundNumber: number;
  bidData: {
    averageBid: number;
    highestBid: number;
    lowestBid: number;
    totalBids: number;
  };
  positionData: {
    centerMoves: number;
    cornerMoves: number;
    edgeMoves: number;
  };
}

const RoundStatistics = ({ roundNumber, bidData, positionData }: RoundStatisticsProps) => {
  const bidChartData = [
    {
      name: "Average Bid",
      value: bidData.averageBid,
    },
    {
      name: "Highest Bid",
      value: bidData.highestBid,
    },
    {
      name: "Lowest Bid",
      value: bidData.lowestBid,
    },
  ];

  const positionChartData = [
    {
      name: "Center",
      value: positionData.centerMoves,
    },
    {
      name: "Corner",
      value: positionData.cornerMoves,
    },
    {
      name: "Edge",
      value: positionData.edgeMoves,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="gaming-card">
        <CardHeader>
          <CardTitle>Round {roundNumber} Bid Statistics</CardTitle>
          <CardDescription>Analysis of player bidding behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart
            data={bidChartData}
            index="name"
            categories={["value"]}
            colors={["#9b87f5"]}
            valueFormatter={(value) => `$${value}`}
            className="h-[200px]"
          />
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col items-center p-2 rounded-md bg-gaming-primary/10">
              <span className="text-muted-foreground">Total Bids</span>
              <span className="text-xl font-bold">{bidData.totalBids}</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-md bg-gaming-primary/10">
              <span className="text-muted-foreground">Average Bid</span>
              <span className="text-xl font-bold">${bidData.averageBid}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="gaming-card">
        <CardHeader>
          <CardTitle>Position Analysis</CardTitle>
          <CardDescription>Most contested board positions</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart
            data={positionChartData}
            index="name"
            categories={["value"]}
            colors={["#7E69AB"]}
            valueFormatter={(value) => `${value} moves`}
            className="h-[200px]"
          />
          <div className="mt-4">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="flex flex-col items-center p-2 rounded-md bg-gaming-primary/10">
                <span className="text-muted-foreground">Center</span>
                <span className="text-lg font-bold">{positionData.centerMoves}</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-md bg-gaming-primary/10">
                <span className="text-muted-foreground">Corner</span>
                <span className="text-lg font-bold">{positionData.cornerMoves}</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-md bg-gaming-primary/10">
                <span className="text-muted-foreground">Edge</span>
                <span className="text-lg font-bold">{positionData.edgeMoves}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoundStatistics;
