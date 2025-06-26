import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Vote, Bot, Users, Settings, Zap } from "lucide-react";
import visionchain from "../visionchain.svg"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Proposals", href: "/proposals", icon: Vote },
  { name: "Agents", href: "/agents", icon: Bot },
  { name: "Members", href: "/members", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0 z-50">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12  to-dao-secondary rounded-xl flex items-center justify-center">
            <img src = {visionchain}/>
          </div>
          <div>
            <h1 className="font-bold text-lg gradient-text">VisionChain</h1>
            <p className="text-xs text-muted-foreground">Agent DAO</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-dao-primary to-dao-secondary rounded-lg" />
                  )}
                  <div className="relative z-10 flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                  {isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="glass-card p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-dao-success rounded-full animate-pulse" />
            <span className="text-sm font-medium">Network Status</span>
          </div>
          <p className="text-xs text-muted-foreground">Connected to Mainnet</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
