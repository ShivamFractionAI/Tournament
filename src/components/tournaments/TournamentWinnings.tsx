
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy } from "lucide-react";

interface WinningBreakupItem {
  rank: string;
  amount: string;
  note?: string;
}

interface TournamentWinningsProps {
  guaranteed: WinningBreakupItem[];
  maximum: WinningBreakupItem[];
  totalGuaranteed: string;
  totalMaximum: string;
}

const TournamentWinnings = ({
  guaranteed,
  maximum,
  totalGuaranteed,
  totalMaximum
}: TournamentWinningsProps) => {
  return (
    <Card className="gaming-card overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-gaming-primary" />
          <CardTitle>Winnings</CardTitle>
        </div>
        <CardDescription>
          Prize pool distribution for tournament winners
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="guaranteed" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gaming-dark/60">
            <TabsTrigger value="guaranteed">Guaranteed Breakup</TabsTrigger>
            <TabsTrigger value="maximum">Maximum Breakup</TabsTrigger>
          </TabsList>
          
          <TabsContent value="guaranteed" className="mt-4">
            <div className="text-xl font-bold mb-4 text-gaming-primary">
              {totalGuaranteed}
            </div>
            <WinningsTable items={guaranteed} />
          </TabsContent>
          
          <TabsContent value="maximum" className="mt-4">
            <div className="text-xl font-bold mb-4 text-gaming-primary">
              {totalMaximum}
            </div>
            <WinningsTable items={maximum} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const WinningsTable = ({ items }: { items: WinningBreakupItem[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-gaming-primary/30">
          <TableHead className="text-gaming-primary">Rank</TableHead>
          <TableHead className="text-gaming-primary text-right">Winnings</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index} className="border-b border-gaming-primary/30">
            <TableCell className="font-medium">
              {item.rank}
            </TableCell>
            <TableCell className="text-right font-bold">
              {item.amount}
              {item.note && (
                <div className="text-xs text-muted-foreground mt-1">{item.note}</div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TournamentWinnings;
