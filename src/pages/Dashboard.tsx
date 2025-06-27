import Layout from "@/components/Layout";
import DashboardCards from "@/components/DashboardCards";
import { TreasuryCard } from "@/components/DashboardCards";
import { VotingStatsCard } from "@/components/DashboardCards";
import { AgentActivityCard } from "@/components/DashboardCards";
import { RecentEventsCard } from "@/components/DashboardCards";
import { QuickActionsCard } from "@/components/DashboardCards";

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-4">
              VisionChain Agent DAO
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              The Future of Decentralized Autonomous Organizations
            </p>
          </div>

          {/* What is DAO Section */}
          <div className="glass-card glow-border p-8 text-left max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4 gradient-text">
                  What is a DAO?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A <strong>Decentralized Autonomous Organization (DAO)</strong>{" "}
                  is a blockchain-based organization governed entirely by smart
                  contracts and community votes. Unlike traditional companies
                  with centralized leadership, DAOs operate through collective
                  decision-making where every token holder has a voice.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-dao-success rounded-full" />
                    <span>Transparent governance through blockchain</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-dao-success rounded-full" />
                    <span>Community-driven decision making</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-dao-success rounded-full" />
                    <span>No single point of control</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 gradient-text">
                  VisionChain Innovation
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong>VisionChain</strong> revolutionizes DAO governance by
                  integrating
                  <strong> autonomous AI agents</strong> that can execute
                  complex tasks, analyze data, and even participate in
                  governance decisions. Our platform combines human wisdom with
                  AI efficiency to create the most advanced DAO ecosystem.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-dao-primary rounded-full" />
                    <span>AI-powered decision support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-dao-primary rounded-full" />
                    <span>Automated task execution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-dao-primary rounded-full" />
                    <span>Intelligent governance optimization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How it Works Section */}
          <div className="glass-card glow-border p-8 text-left max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 gradient-text text-center">
              How VisionChain Works
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-dao-primary to-dao-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="font-semibold mb-2">Propose & Vote</h3>
                <p className="text-sm text-muted-foreground">
                  Community members create proposals for DAO improvements, new
                  agent deployments, or treasury management. Vote with your
                  tokens.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-dao-secondary to-dao-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="font-semibold mb-2">AI Agent Execution</h3>
                <p className="text-sm text-muted-foreground">
                  Approved proposals trigger autonomous agents that execute
                  tasks like trading, data analysis, or smart contract
                  interactions.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-dao-primary to-dao-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="font-semibold mb-2">Continuous Optimization</h3>
                <p className="text-sm text-muted-foreground">
                  Agents learn from outcomes, report results transparently, and
                  suggest improvements to enhance DAO performance.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="glass-card glow-border p-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 gradient-text text-center">
              Why Choose VisionChain?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-dao-success text-2xl mb-2">⚡</div>
                <h4 className="font-semibold text-sm">24/7 Efficiency</h4>
                <p className="text-xs text-muted-foreground">
                  Agents work around the clock
                </p>
              </div>
              <div>
                <div className="text-dao-primary text-2xl mb-2">🔒</div>
                <h4 className="font-semibold text-sm">Transparent Security</h4>
                <p className="text-xs text-muted-foreground">
                  All actions on blockchain
                </p>
              </div>
              <div>
                <div className="text-dao-secondary text-2xl mb-2">🧠</div>
                <h4 className="font-semibold text-sm">Smart Decisions</h4>
                <p className="text-xs text-muted-foreground">
                  AI-enhanced governance
                </p>
              </div>
              <div>
                <div className="text-dao-warning text-2xl mb-2">🌐</div>
                <h4 className="font-semibold text-sm">Global Access</h4>
                <p className="text-xs text-muted-foreground">
                  Participate from anywhere
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Original Stats Section with new title */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            DAO Overview & Analytics
          </h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <TreasuryCard />
          <VotingStatsCard />
          <QuickActionsCard />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <AgentActivityCard />
          <RecentEventsCard />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
