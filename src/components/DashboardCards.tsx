import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DollarSign,
  TrendingUp,
  Users,
  Bot,
  Clock,
  Vote,
  Zap,
  Plus,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

export const TreasuryCard = () => (
  <Card className="glass-card glow-border">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">DAO Treasury</CardTitle>
      <DollarSign className="h-4 w-4 text-dao-success" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">$2,847,392</div>
      <div className="flex items-center gap-1 text-xs text-dao-success mt-1">
        <TrendingUp className="h-3 w-3" />
        +12.5% this month
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">ETH</span>
          <span>1,247 ETH</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">USDC</span>
          <span>850,000 USDC</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const VotingStatsCard = () => (
  <Card className="glass-card glow-border">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Active Proposals</CardTitle>
      <Vote className="h-4 w-4 text-dao-primary" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">7</div>
      <div className="text-xs text-muted-foreground mt-1">3 ending soon</div>
      <div className="mt-4 space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Participation Rate</span>
            <span>67%</span>
          </div>
          <Progress value={67} className="h-2" />
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-dao-success">4 Passed</span>
          <span className="text-dao-danger">2 Failed</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const QuickActionsCard = () => (
  <Card className="glass-card glow-border">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
      <Zap className="h-4 w-4 text-dao-warning" />
    </CardHeader>
    <CardContent className="space-y-3">
      <Button
        size="sm"
        className="w-full bg-dao-primary hover:bg-dao-primary/90 gap-2"
      >
        <Plus className="h-4 w-4" />
        Create Proposal
      </Button>
      <Button size="sm" variant="outline" className="w-full gap-2">
        <Bot className="h-4 w-4" />
        Deploy Agent
      </Button>
      <Button size="sm" variant="outline" className="w-full gap-2">
        <Users className="h-4 w-4" />
        Delegate Voting
      </Button>
    </CardContent>
  </Card>
);

export const AgentActivityCard = () => (
  <Card className="glass-card glow-border">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Bot className="h-5 w-5 text-dao-secondary" />
        Agent Activity
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[
          { name: "TradingBot Alpha", status: "active", reputation: 94 },
          { name: "Governance Assistant", status: "active", reputation: 87 },
          { name: "Market Analyzer", status: "idle", reputation: 91 },
          { name: "Risk Manager", status: "suspended", reputation: 76 },
        ].map((agent, index) => (
          <div
            key={agent.name}
            className="flex items-center justify-between p-3 rounded-lg bg-background/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-dao-primary to-dao-secondary rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">{agent.name}</p>
                <p className="text-xs text-muted-foreground">
                  Reputation: {agent.reputation}%
                </p>
              </div>
            </div>
            <Badge
              variant={
                agent.status === "active"
                  ? "default"
                  : agent.status === "idle"
                    ? "secondary"
                    : "destructive"
              }
              className="capitalize"
            >
              {agent.status}
            </Badge>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const RecentEventsCard = () => (
  <Card className="glass-card glow-border">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-dao-warning" />
        Recent Events
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[
          {
            type: "proposal_passed",
            title: "Increase Agent Rewards",
            time: "2 hours ago",
            icon: CheckCircle,
            color: "text-dao-success",
          },
          {
            type: "proposal_failed",
            title: "Emergency Protocol Update",
            time: "5 hours ago",
            icon: XCircle,
            color: "text-dao-danger",
          },
          {
            type: "agent_deployed",
            title: "New Trading Agent Deployed",
            time: "1 day ago",
            icon: Bot,
            color: "text-dao-secondary",
          },
          {
            type: "voting_started",
            title: "Treasury Allocation Vote",
            time: "2 days ago",
            icon: Vote,
            color: "text-dao-primary",
          },
        ].map((event, index) => {
          const Icon = event.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-background/50"
            >
              <Icon className={`w-5 h-5 ${event.color}`} />
              <div className="flex-1">
                <p className="font-medium text-sm">{event.title}</p>
                <p className="text-xs text-muted-foreground">{event.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </CardContent>
  </Card>
);

const DashboardCards = {
  TreasuryCard,
  VotingStatsCard,
  QuickActionsCard,
  AgentActivityCard,
  RecentEventsCard,
};

export default DashboardCards;
