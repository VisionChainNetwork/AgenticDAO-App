import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ThumbsUp,
  ThumbsDown,
  Minus,
  Clock,
  User,
  Calendar,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import { ethers } from "ethers";
import { formatUnits } from "ethers";
import { DAO_ABI } from "../contracts/daoAbi";

interface ProposalCardProps {
  proposal: {
    id: string;
    title: string;
    description: string;
    status: string;
    votesFor: number;
    votesAgainst: number;
    votesAbstain: number;
    totalVotes: number;
    proposer: string;
    created: string;
    category: string;
    hasVoted?: boolean;
    endTime: number;
    targets: string[];
    values: string[];
    calldatas: string[];
    executed?: boolean;
  };
  onVote: (proposalId: string, voteType: number) => Promise<void>;
  onExecute: (proposalId: string) => Promise<void>;
}

// const CONTRACT_ADDRESS = "0xfcD20928f417Dd81456183fBeD5776C608ECe6C3";
const CONTRACT_ADDRESS = "0x2EF22f0a1F2fFf6a03DD612954773386fDC87f95"; //new
const RPC_URL = "http://10.10.10.66:40000";

const ProposalCard = ({ proposal, onVote, onExecute }: ProposalCardProps) => {
  const [isVoting, setIsVoting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedVote, setSelectedVote] = useState<number | null>(null);
  const [deadlines, setDeadlines] = useState({}); // { [proposalId]: deadline }
  const [proposals, setProposals] = useState([]);
  const [userVotes, setUserVotes] = useState<{ [proposalId: string]: boolean }>({});
  const [proposalStates, setProposalStates] = useState<{ [id: string]: number }>({});

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-dao-primary text-white";
      case "passed":
        return "bg-dao-success text-white";
      case "failed":
        return "bg-dao-danger text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Treasury: "bg-dao-warning/20 text-dao-warning",
      Agent: "bg-dao-secondary/20 text-dao-secondary",
      Security: "bg-dao-danger/20 text-dao-danger",
      Governance: "bg-dao-primary/20 text-dao-primary",
      Integration: "bg-dao-success/20 text-dao-success",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  const handleVoteClick = (voteType: number) => {
    console.log("Vote clicked:", { voteType, proposalId: proposal.id });
    setSelectedVote(voteType);
    setShowConfirmation(true);
  };

  const handleConfirmVote = async () => {
    if (selectedVote === null) return;
    
    console.log("Confirming vote:", {
      proposalId: proposal.id,
      voteType: selectedVote
    });

    setIsVoting(true);
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();

      

      // 1. Check on-chain if the user has already voted
      const contract = new ethers.Contract(CONTRACT_ADDRESS, DAO_ABI, provider);
      const alreadyVoted = await contract.hasVoted(proposal.id, signerAddress);
      if (alreadyVoted) {
        alert("You have already voted on this proposal.");
        return;
      }

      await onVote(proposal.id, selectedVote);
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error in handleConfirmVote:", error);
    } finally {
      setIsVoting(false);
      setSelectedVote(null);
    }
  };

  // Calculate vote percentages
  const votesForTokens = Number(formatUnits(proposal.votesFor.toString(), 18));
  const votesAgainstTokens = Number(formatUnits(proposal.votesAgainst.toString(), 18));
  const votesAbstainTokens = Number(formatUnits(proposal.votesAbstain.toString(), 18));
  const totalVotesTokens = votesForTokens + votesAgainstTokens + votesAbstainTokens;
  const forPercent = totalVotesTokens > 0 ? (votesForTokens / totalVotesTokens) * 100 : 0;
  const againstPercent = totalVotesTokens > 0 ? (votesAgainstTokens / totalVotesTokens) * 100 : 0;
  const abstainPercent = totalVotesTokens > 0 ? (votesAbstainTokens / totalVotesTokens) * 100 : 0;

  const handleExecute = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, DAO_ABI, signer);

      const tx = await contract.execute(
        proposal.targets,
        proposal.values,
        proposal.calldatas,
        ethers.keccak256(ethers.toUtf8Bytes(proposal.description))
      );
      await tx.wait();

      if (onExecute) {
        await onExecute(proposal.id);
      }

      alert("Proposal executed!");
    } catch (err) {
      alert("Error executing proposal: " + (err as any).message);
    }
  };

  const now = Date.now();
  const canExecute = now > Number(proposal.endTime);

  useEffect(() => {
    const fetchDeadlines = async () => {
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, DAO_ABI, provider);

      const newDeadlines = {};
      for (const proposal of proposals) {
        const proposalDeadline = await contract.proposalDeadline(proposal.id);
        console.log("proposalDeadline", proposalDeadline);
        const endTime = Number(proposalDeadline) * 1000;
        console.log("endTime", endTime);
        newDeadlines[proposal.id] = endTime;
      }
      setDeadlines(newDeadlines);
    };

    fetchDeadlines();
  }, [proposals]);

  useEffect(() => {
    const fetchVotes = async () => {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, DAO_ABI, provider);

      const votes: { [proposalId: string]: boolean } = {};
      for (const proposal of proposals) {
        // Replace with your contract's method
        const receipt = await contract.getReceipt(proposal.id, userAddress);
        votes[proposal.id] = receipt.hasVoted; // or adjust as needed
      }
      setUserVotes(votes);
    };

    fetchVotes();
  }, [proposals]);

  useEffect(() => {
    const fetchStates = async () => {
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, DAO_ABI, provider);
      const states: { [id: string]: number } = {};
      for (const proposal of proposals) {
        states[proposal.id] = await contract.state(proposal.id);
      }
      setProposalStates(states);
    };
    fetchStates();
  }, [proposals]);

  return (
    <div className="group">
      <Card className="glass-card glow-border overflow-hidden">
        <CardHeader className="space-y-4">
          {/* Header with badges */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge className={getStatusColor(proposal.status)}>
                  {proposal.status.toUpperCase()}
                </Badge>
                <Badge
                  variant="outline"
                  className={getCategoryColor(proposal.category)}
                >
                  {proposal.category}
                </Badge>
                {proposal.status === "active" && (
                  <Badge
                    variant="outline"
                    className="text-dao-warning border-dao-warning/30"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {proposal.timeLeft}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg group-hover:text-dao-primary transition-colors">
                {proposal.title}
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            {proposal.description}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {proposal.proposer}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {proposal.created}
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {formatUnits(proposal.totalVotes.toString(), 18)} total votes
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Voting Progress */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Voting Results</span>
              <span className="text-sm text-muted-foreground">
                {formatUnits(proposal.totalVotes.toString(), 18)} total votes
              </span>
            </div>

            <div className="space-y-2">
              {/* For */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-dao-success flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    For
                  </span>
                  <span>For: {forPercent.toFixed(2)}%</span>
                </div>
                <Progress value={forPercent} className="h-2 bg-muted">
                  <div
                    className="h-full bg-dao-success transition-all duration-300"
                    style={{ width: `${forPercent}%` }}
                  />
                </Progress>
              </div>

              {/* Against */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-dao-danger flex items-center gap-1">
                    <ThumbsDown className="w-3 h-3" />
                    Against
                  </span>
                  <span>Against: {againstPercent.toFixed(2)}%</span>
                </div>
                <Progress
                  value={againstPercent}
                  className="h-2 bg-muted"
                >
                  <div
                    className="h-full bg-dao-danger transition-all duration-300"
                    style={{ width: `${againstPercent}%` }}
                  />
                </Progress>
              </div>

              {/* Abstain */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Minus className="w-3 h-3" />
                    Abstain
                  </span>
                  <span>Abstain: {abstainPercent.toFixed(2)}%</span>
                </div>
                <Progress
                  value={abstainPercent}
                  className="h-2 bg-muted"
                >
                  <div
                    className="h-full bg-muted-foreground transition-all duration-300"
                    style={{ width: `${abstainPercent}%` }}
                  />
                </Progress>
              </div>
            </div>
          </div>

          <Separator />

          {/* Voting Buttons */}
          {proposal.status === "active" && !userVotes[proposal.id] && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 hover:bg-dao-success/10 hover:border-dao-success hover:text-dao-success"
                      onClick={() => handleVoteClick(1)}
                    >
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Vote For
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Your Vote</DialogTitle>
                      <DialogDescription>
                        You are about to vote <strong>FOR</strong> this
                        proposal: "{proposal.title}"
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowConfirmation(false)}>Cancel</Button>
                      <Button
                        onClick={handleConfirmVote}
                        disabled={isVoting}
                        className="bg-dao-success hover:bg-dao-success/90"
                      >
                        {isVoting ? "Voting..." : "Confirm Vote"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 hover:bg-dao-danger/10 hover:border-dao-danger hover:text-dao-danger"
                      onClick={() => handleVoteClick(0)}
                    >
                      <ThumbsDown className="w-4 h-4 mr-2" />
                      Vote Against
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Your Vote</DialogTitle>
                      <DialogDescription>
                        You are about to vote <strong>AGAINST</strong> this
                        proposal: "{proposal.title}"
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button
                        onClick={handleConfirmVote}
                        disabled={isVoting}
                        className="bg-dao-danger hover:bg-dao-danger/90"
                      >
                        {isVoting ? "Voting..." : "Confirm Vote"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="hover:bg-muted/50"
                      onClick={() => handleVoteClick(2)}
                    >
                      <Minus className="w-4 h-4 mr-1" />
                      Abstain
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Your Vote</DialogTitle>
                      <DialogDescription>
                        You are about to <strong>ABSTAIN</strong> from voting on
                        this proposal: "{proposal.title}"
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button
                        onClick={handleConfirmVote}
                        disabled={isVoting}
                        variant="secondary"
                      >
                        {isVoting ? "Voting..." : "Confirm Abstain"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {selectedVote !== null && (
                <div className="p-3 rounded-lg bg-dao-success/10 border border-dao-success/30 text-center">
                  <p className="text-sm text-dao-success font-medium">
                    ✓ You voted {selectedVote === 1 ? "For" : selectedVote === 0 ? "Against" : "Abstain"} on this proposal
                  </p>
                </div>
              )}
            </div>
          )}

          {!proposal.status === "active" && (
            <div className="text-center py-2">
              <p className="text-sm text-muted-foreground">
                Voting has ended for this proposal
              </p>
            </div>
          )}

          {Date.now() > proposal.endTime && !proposal.executed && (
            <Button onClick={handleExecute}>
              Execute
            </Button>
          )}

          {proposal.executed && (
            <Badge className="bg-dao-success text-white">Executed</Badge>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalCard;
