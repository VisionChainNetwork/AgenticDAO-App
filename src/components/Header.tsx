import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Search, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ethers } from "ethers";

const Header = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      // Use MetaMask for signing
      const injectedProvider = new ethers.BrowserProvider(window.ethereum);
      await injectedProvider.send("eth_requestAccounts", []);
      const signer = await injectedProvider.getSigner();
      const addr = await signer.getAddress();
      setAddress(addr);

      // Use your custom node for reading
      const customProvider = new ethers.JsonRpcProvider("http://10.10.10.66:40000");
      const networkInfo = await customProvider.getNetwork();
      setNetwork(networkInfo.name);

      const bal = await customProvider.getBalance(addr);
      setBalance(ethers.formatEther(bal));
    } else {
      alert("MetaMask is not installed!");
    }
  };

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
        <Button
          className="bg-gradient-to-r from-dao-primary to-dao-secondary hover:from-dao-primary/90 hover:to-dao-secondary/90 gap-2"
          onClick={connectWallet}
        >
          <Wallet className="w-4 h-4" />
          <span className="hidden sm:inline">
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
          </span>
          <span className="sm:hidden">{address ? "Connected" : "Connect"}</span>
        </Button>

        {/* Show network and balance if connected */}
        {address && (
          <div className="flex flex-col items-end ml-4 text-xs">
            {/* <span>Network: {network ?? "Loading..."}</span> */}
            <span>Balance: {balance ? `${balance} ETH` : "Loading..."}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
