
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Check, Users } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  rank: string;
  avatar: string;
  prompt?: string;
  status?: string;
  wins?: number;
  losses?: number;
}

interface AgentSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agents: Agent[];
  entryFee: number;
  onJoin: (selectedAgentIds: string[]) => void;
  onCreateNew: () => void;
}

const AgentSelectionDialog = ({
  open,
  onOpenChange,
  agents,
  entryFee,
  onJoin,
  onCreateNew
}: AgentSelectionDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgentIds, setSelectedAgentIds] = useState<string[]>([]);
  
  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const toggleAgentSelection = (agentId: string) => {
    setSelectedAgentIds(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId) 
        : [...prev, agentId]
    );
  };
  
  const totalCost = entryFee * Math.max(selectedAgentIds.length, 1);
  
  const handleJoin = () => {
    onJoin(selectedAgentIds);
    setSelectedAgentIds([]);
    setSearchQuery("");
  };
  
  const handleCreateNew = () => {
    onOpenChange(false);
    onCreateNew();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md bg-[#1A1F2C] text-white border-none p-0 overflow-hidden"
        onInteractOutside={(e) => e.preventDefault()} // Prevent closing when clicking outside
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Select Agents</h2>
          
          <div className="flex gap-2 mb-4 h-11">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search Agent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#131722] border-none pl-10 h-11 text-white placeholder:text-gray-400"
              />
            </div>
            <Button 
              onClick={handleCreateNew}
              className="bg-[#5138ED] hover:bg-[#4128DD] text-white h-11"
            >
              <Plus className="h-5 w-5 mr-1" /> Create New
            </Button>
          </div>
          
          <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
            {filteredAgents.map((agent) => (
              <div 
                key={agent.id}
                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors
                  ${selectedAgentIds.includes(agent.id) 
                    ? 'bg-[#2A3043]' 
                    : 'bg-[#1F2537] hover:bg-[#2A3043]/70'
                  }`}
                onClick={() => toggleAgentSelection(agent.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center bg-[#2A3043] rounded-md text-xl">
                    {agent.avatar}
                  </div>
                  <div>
                    <div className="font-medium">{agent.name}</div>
                    <div className="text-xs text-gray-400">{agent.rank}</div>
                  </div>
                </div>
                <div className={`h-5 w-5 rounded-full flex items-center justify-center border ${
                  selectedAgentIds.includes(agent.id) 
                    ? 'bg-[#5138ED] border-[#5138ED]' 
                    : 'border-gray-400'
                }`}>
                  {selectedAgentIds.includes(agent.id) && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </div>
              </div>
            ))}

            {filteredAgents.length === 0 && (
              <div className="bg-[#1F2537] p-4 rounded-lg text-center">
                <p className="text-gray-400">No agents found</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4 border-t border-gray-700 mt-2">
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-blue-400" />
            <span>
              {selectedAgentIds.length} selected
            </span>
          </div>
          <Button 
            onClick={handleJoin}
            disabled={selectedAgentIds.length === 0}
            className="bg-[#5138ED] hover:bg-[#4128DD] text-white h-10"
          >
            {selectedAgentIds.length > 0
              ? `Join for $${totalCost}`
              : 'Join'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentSelectionDialog;
