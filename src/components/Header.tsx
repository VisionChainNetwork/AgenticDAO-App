import { Button } from "@/components/ui/button";
import { Bell, Search, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-end px-6 lg:px-8">

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-dao-danger text-xs">
            3
          </Badge>
        </Button>

        {/* Wallet Connect */}
         <ConnectButton />
        {/* <Button className="bg-gradient-to-r from-dao-primary to-dao-secondary hover:from-dao-primary/90 hover:to-dao-secondary/90 gap-2">
          <Wallet className="w-4 h-4" />
          <span className="hidden sm:inline">0x1234...5678</span>
          <span className="sm:hidden">Connected</span>
        </Button> */}
      </div>
    </header>
  );
};

export default Header;
