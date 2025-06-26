import { useState } from "react";
import Layout from "@/components/Layout";
import ProposalCard from "@/components/ProposalCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Plus } from "lucide-react";

const mockProposals = [
  {
    id: 1,
    title: "Increase Agent Reward Pool by 25%",
    description:
      "Proposal to increase the weekly reward pool for active agents from 1000 ETH to 1250 ETH to incentivize better performance and attract new high-quality agents.",
    status: "active",
    votesFor: 67.3,
    votesAgainst: 24.1,
    votesAbstain: 8.6,
    totalVotes: 1247,
    timeLeft: "2 days 14 hours",
    proposer: "0x1234...5678",
    created: "3 days ago",
    category: "Treasury",
  },
  {
    id: 2,
    title: "Deploy New Market Making Agent",
    description:
      "Deploy a sophisticated market making agent to provide liquidity across multiple DEXs and improve trading efficiency for the DAO treasury.",
    status: "active",
    votesFor: 45.2,
    votesAgainst: 32.8,
    votesAbstain: 22.0,
    totalVotes: 892,
    timeLeft: "5 days 8 hours",
    proposer: "0xABCD...EFGH",
    created: "1 day ago",
    category: "Agent",
  },
  {
    id: 3,
    title: "Emergency Protocol Update v2.1",
    description:
      "Critical security update to the emergency pause protocol. This update fixes potential vulnerabilities and improves response times.",
    status: "passed",
    votesFor: 89.4,
    votesAgainst: 7.2,
    votesAbstain: 3.4,
    totalVotes: 2156,
    timeLeft: "Ended",
    proposer: "0x9999...1111",
    created: "1 week ago",
    category: "Security",
  },
  {
    id: 4,
    title: "Governance Token Distribution",
    description:
      "Propose new token distribution mechanism for better decentralization and community participation in governance decisions.",
    status: "failed",
    votesFor: 23.7,
    votesAgainst: 68.9,
    votesAbstain: 7.4,
    totalVotes: 1834,
    timeLeft: "Ended",
    proposer: "0x5555...7777",
    created: "2 weeks ago",
    category: "Governance",
  },
  {
    id: 5,
    title: "Integration with Chainlink Oracle",
    description:
      "Integrate Chainlink price feeds for more accurate asset valuation and improved decision making for trading agents.",
    status: "active",
    votesFor: 78.1,
    votesAgainst: 15.3,
    votesAbstain: 6.6,
    totalVotes: 1456,
    timeLeft: "1 day 3 hours",
    proposer: "0x2222...4444",
    created: "2 days ago",
    category: "Integration",
  },
];

const Proposals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProposals = mockProposals.filter((proposal) => {
    const matchesSearch = proposal.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || proposal.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || proposal.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const statusCounts = {
    all: mockProposals.length,
    active: mockProposals.filter((p) => p.status === "active").length,
    passed: mockProposals.filter((p) => p.status === "passed").length,
    failed: mockProposals.filter((p) => p.status === "failed").length,
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Proposals</h1>
            <p className="text-muted-foreground mt-1">
              Vote on proposals that shape the future of VisionChain DAO
            </p>
          </div>
          <Button className="bg-gradient-to-r from-dao-primary to-dao-secondary hover:from-dao-primary/90 hover:to-dao-secondary/90 gap-2">
            <Plus className="w-4 h-4" />
            Create Proposal
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search proposals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-border/50"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Treasury">Treasury</SelectItem>
                <SelectItem value="Agent">Agent</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="Governance">Governance</SelectItem>
                <SelectItem value="Integration">Integration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Status Overview */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {Object.entries(statusCounts).map(([status, count]) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className="flex-shrink-0 capitalize"
            >
              {status} ({count})
            </Button>
          ))}
        </div>

        {/* Proposals Grid */}
        <div className="grid gap-6">
          {filteredProposals.length > 0 ? (
            filteredProposals.map((proposal, index) => (
              <div key={proposal.id}>
                <ProposalCard proposal={proposal} />
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No proposals found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setCategoryFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Proposals;
