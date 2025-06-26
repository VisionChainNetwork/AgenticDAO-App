import { useState } from "react";
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

interface ProposalCardProps {
  proposal: {
    id: number;
    title: string;
    description: string;
    status: "active" | "passed" | "failed";
    votesFor: number;
    votesAgainst: number;
    votesAbstain: number;
    totalVotes: number;
    timeLeft: string;
    proposer: string;
    created: string;
    category: string;
  };
}

const ProposalCard = ({ proposal }: ProposalCardProps) => {
  const [selectedVote, setSelectedVote] = useState<
    "for" | "against" | "abstain" | null
  >(null);
  const [isVoting, setIsVoting] = useState(false);

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

  const handleVote = async (voteType: "for" | "against" | "abstain") => {
    setIsVoting(true);
    // Simulate voting process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSelectedVote(voteType);
    setIsVoting(false);
  };

  const isActive = proposal.status === "active";

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
                {isActive && (
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
              {proposal.totalVotes} votes
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Voting Progress */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Voting Results</span>
              <span className="text-sm text-muted-foreground">
                {proposal.totalVotes} total votes
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
                  <span>{proposal.votesFor}%</span>
                </div>
                <Progress value={proposal.votesFor} className="h-2 bg-muted">
                  <div
                    className="h-full bg-dao-success transition-all duration-300"
                    style={{ width: `${proposal.votesFor}%` }}
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
                  <span>{proposal.votesAgainst}%</span>
                </div>
                <Progress
                  value={proposal.votesAgainst}
                  className="h-2 bg-muted"
                >
                  <div
                    className="h-full bg-dao-danger transition-all duration-300"
                    style={{ width: `${proposal.votesAgainst}%` }}
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
                  <span>{proposal.votesAbstain}%</span>
                </div>
                <Progress
                  value={proposal.votesAbstain}
                  className="h-2 bg-muted"
                >
                  <div
                    className="h-full bg-muted-foreground transition-all duration-300"
                    style={{ width: `${proposal.votesAbstain}%` }}
                  />
                </Progress>
              </div>
            </div>
          </div>

          <Separator />

          {/* Voting Buttons */}
          {isActive && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 hover:bg-dao-success/10 hover:border-dao-success hover:text-dao-success"
                      onClick={() => setSelectedVote("for")}
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
                      <Button variant="outline">Cancel</Button>
                      <Button
                        onClick={() => handleVote("for")}
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
                      onClick={() => setSelectedVote("against")}
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
                        onClick={() => handleVote("against")}
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
                      onClick={() => setSelectedVote("abstain")}
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
                        onClick={() => handleVote("abstain")}
                        disabled={isVoting}
                        variant="secondary"
                      >
                        {isVoting ? "Voting..." : "Confirm Abstain"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {selectedVote && (
                <div className="p-3 rounded-lg bg-dao-success/10 border border-dao-success/30 text-center">
                  <p className="text-sm text-dao-success font-medium">
                    ✓ You voted {selectedVote.toUpperCase()} on this proposal
                  </p>
                </div>
              )}
            </div>
          )}

          {!isActive && (
            <div className="text-center py-2">
              <p className="text-sm text-muted-foreground">
                Voting has ended for this proposal
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalCard;
