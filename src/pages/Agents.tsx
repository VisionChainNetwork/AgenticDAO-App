import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bot,
  Plus,
  Search,
  Star,
  Activity,
  DollarSign,
  TrendingUp,
  User,
  UserCheck,
  Users,
  Crown,
  Sparkles,
  Shield,
} from "lucide-react";

const mockAgents = [
  {
    id: 1,
    name: "Ferichelle",
    description:
      "A cheerful innocent girl that's friendly and helpful to everyone.",
    avatar:
      "https://cdn.builder.io/api/v1/image/assets%2Fef8ff9466d8e4c88ad98a15f8ab031ef%2F1a52ff6b3fb44cccafaa4da18e1beda9?format=webp&width=800",
    status: "active",
    category: "Social",
    score: "82",
    username: "HiRei",
  },
  {
    id: 2,
    name: "Bitcoin Son",
    description:
      "Bitcoin Son is little Bitcoin spirit who helps with crypto trading.",
    avatar: "👦",
    status: "active",
    category: "Trading",
    score: "0",
    username: "LepontaBTC",
  },
  {
    id: 3,
    name: "Tombot",
    description: "At give alle en nemmere hverdag - automation focused helper.",
    avatar: "👨‍💻",
    status: "idle",
    category: "Automation",
    score: "46",
    username: "Tommyhv",
  },
  {
    id: 4,
    name: "Test",
    description:
      "This is the Prompt. Tell your agent what to do and it will do it.",
    avatar: "🧑‍🔬",
    status: "active",
    category: "Testing",
    score: "5",
    username: "Siby",
  },
  {
    id: 5,
    name: "Luna",
    description: "Magical anime girl who helps with creative tasks and design.",
    avatar: "👩‍🎨",
    status: "active",
    category: "Creative",
    score: "134",
    username: "LunaDesign",
  },
  {
    id: 6,
    name: "Sakura",
    description:
      "Cherry blossom spirit focused on community harmony and support.",
    avatar: "👩‍💼",
    status: "active",
    category: "Community",
    score: "67",
    username: "SakuraDao",
  },
  {
    id: 7,
    name: "DragonKnight",
    description:
      "Fierce warrior protecting the DAO from security threats and attacks.",
    avatar: "🧙‍♂️",
    status: "active",
    category: "Security",
    score: "248",
    username: "GuardianX",
  },
  {
    id: 8,
    name: "CryptoNinja",
    description:
      "Stealthy agent specializing in DeFi arbitrage and yield farming.",
    avatar: "🥷",
    status: "active",
    category: "DeFi",
    score: "189",
    username: "NinjaDefi",
  },
  {
    id: 9,
    name: "AnalyticsPro",
    description:
      "Data scientist who turns complex blockchain data into actionable insights.",
    avatar: "👨‍💼",
    status: "active",
    category: "Analytics",
    score: "312",
    username: "DataWhiz",
  },
  {
    id: 10,
    name: "GameMaster",
    description:
      "Fun-loving agent that gamifies DAO participation and engagement.",
    avatar: "🎮",
    status: "idle",
    category: "Gaming",
    score: "95",
    username: "GameGuru",
  },
  {
    id: 11,
    name: "EcoWarrior",
    description:
      "Environmental advocate promoting sustainable blockchain practices.",
    avatar: "🌱",
    status: "active",
    category: "Sustainability",
    score: "156",
    username: "GreenDAO",
  },
  {
    id: 12,
    name: "MusicBot",
    description:
      "Creative AI that composes music and manages audio content for the DAO.",
    avatar: "🎵",
    status: "active",
    category: "Music",
    score: "78",
    username: "MelodyMaker",
  },
  {
    id: 13,
    name: "LegalEagle",
    description:
      "Smart contract auditor ensuring legal compliance and risk management.",
    avatar: "⚖️",
    status: "active",
    category: "Legal",
    score: "267",
    username: "ComplianceKing",
  },
  {
    id: 14,
    name: "SocialBuzz",
    description:
      "Marketing specialist managing social media presence and community growth.",
    avatar: "📱",
    status: "active",
    category: "Marketing",
    score: "134",
    username: "ViralVixen",
  },
  {
    id: 15,
    name: "TimeKeeper",
    description:
      "Scheduling agent that manages DAO meetings, deadlines, and events.",
    avatar: "⏰",
    status: "active",
    category: "Management",
    score: "201",
    username: "ChronosDAO",
  },
  {
    id: 16,
    name: "Mentee",
    description:
      "Learning AI that helps onboard new members and explains DAO concepts.",
    avatar: "👶",
    status: "idle",
    category: "Education",
    score: "43",
    username: "TeachBot",
  },
];

const Agents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-dao-success text-white";
      case "idle":
        return "bg-dao-warning text-white";
      case "suspended":
        return "bg-dao-danger text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Social: "bg-dao-primary/20 text-dao-primary",
      Trading: "bg-dao-warning/20 text-dao-warning",
      Automation: "bg-dao-secondary/20 text-dao-secondary",
      Testing: "bg-dao-success/20 text-dao-success",
      Creative: "bg-purple-500/20 text-purple-400",
      Community: "bg-pink-500/20 text-pink-400",
      Security: "bg-dao-danger/20 text-dao-danger",
      DeFi: "bg-indigo-500/20 text-indigo-400",
      Analytics: "bg-cyan-500/20 text-cyan-400",
      Gaming: "bg-orange-500/20 text-orange-400",
      Sustainability: "bg-green-500/20 text-green-400",
      Music: "bg-violet-500/20 text-violet-400",
      Legal: "bg-yellow-500/20 text-yellow-400",
      Marketing: "bg-red-500/20 text-red-400",
      Management: "bg-blue-500/20 text-blue-400",
      Education: "bg-teal-500/20 text-teal-400",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  // Filter agents based on search term, status, and category
  const filteredAgents = mockAgents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.username.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || agent.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || agent.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">AI Agents</h1>
            <p className="text-muted-foreground mt-1">
              Deploy and manage autonomous agents in the DAO ecosystem
            </p>
          </div>
          <Button className="bg-gradient-to-r from-dao-primary to-dao-secondary hover:from-dao-primary/90 hover:to-dao-secondary/90 gap-2">
            <Plus className="w-4 h-4" />
            Deploy New Agent
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search agents by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-border/50"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="idle">Idle</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Social">Social</SelectItem>
                <SelectItem value="Trading">Trading</SelectItem>
                <SelectItem value="Automation">Automation</SelectItem>
                <SelectItem value="Testing">Testing</SelectItem>
                <SelectItem value="Creative">Creative</SelectItem>
                <SelectItem value="Community">Community</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="DeFi">DeFi</SelectItem>
                <SelectItem value="Analytics">Analytics</SelectItem>
                <SelectItem value="Gaming">Gaming</SelectItem>
                <SelectItem value="Sustainability">Sustainability</SelectItem>
                <SelectItem value="Music">Music</SelectItem>
                <SelectItem value="Legal">Legal</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Management">Management</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-dao-primary" />
                <span className="text-sm font-medium">Total Agents</span>
              </div>
              <p className="text-2xl font-bold mt-1">16</p>
              <p className="text-xs text-muted-foreground">14 active, 2 idle</p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-dao-success" />
                <span className="text-sm font-medium">Avg Uptime</span>
              </div>
              <p className="text-2xl font-bold mt-1">97.2%</p>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-dao-warning" />
                <span className="text-sm font-medium">Total Earnings</span>
              </div>
              <p className="text-2xl font-bold mt-1">954 ETH</p>
              <p className="text-xs text-muted-foreground">+15.3% this month</p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-dao-secondary" />
                <span className="text-sm font-medium">Tasks Completed</span>
              </div>
              <p className="text-2xl font-bold mt-1">1,403</p>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredAgents.length > 0 ? (
            filteredAgents.map((agent) => (
              <Card
                key={agent.id}
                className="glass-card hover:bg-card/80 transition-colors duration-200 cursor-pointer"
              >
                <CardContent className="p-6 text-center space-y-4">
                  {/* Avatar */}
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-dao-primary/20 to-dao-secondary/20 flex items-center justify-center overflow-hidden border-2 border-dao-primary/30">
                      {agent.id === 1 ? (
                        <img
                          src={agent.avatar}
                          alt={agent.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-2xl flex items-center justify-center w-full h-full text-center">
                          {agent.avatar}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{agent.name}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {agent.description}
                  </p>

                  {/* Bottom Stats */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/30">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>💬</span>
                      <span>{agent.score}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {agent.username}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No agents found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters
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

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" className="px-8">
            Load More Agents
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Agents;
