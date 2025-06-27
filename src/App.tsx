// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { TooltipProvider } from '@/components/ui/tooltip';
// import { Toaster } from '@/components/ui/toaster';
// import { Toaster as Sonner } from '@/components/ui/sonner';

// import Dashboard from './pages/Dashboard';
// import Proposals from './pages/Proposals';
// import Agents from './pages/Agents';
// import Members from './pages/Members';
// import Settings from './pages/Settings';
// import NotFound from './pages/NotFound';

// import '@rainbow-me/rainbowkit/styles.css';
// import {
//   getDefaultWallets,
//   RainbowKitProvider,
// } from '@rainbow-me/rainbowkit';
// import {
//   WagmiConfig,
//   configureChains,
//   createConfig,
// } from 'wagmi';
// import { mainnet, polygon, arbitrum } from 'wagmi/chains';
// import { publicProvider } from 'wagmi/providers/public';

// const { chains, publicClient } = configureChains(
//   [mainnet, polygon, arbitrum],
//   [publicProvider()]
// );

// const { connectors } = getDefaultWallets({
//   appName: 'My DAO App',
//   projectId: 'demo', 
//   chains,
// });

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient,
// });

// const queryClient = new QueryClient();

// function App() {
//   return (
//     <WagmiConfig config={wagmiConfig}>
//       <RainbowKitProvider chains={chains}>
//         <QueryClientProvider client={queryClient}>
//           <TooltipProvider>
//             <Toaster />
//             <Sonner />
//             <BrowserRouter>
//               <Routes>
//                 <Route path="/" element={<Dashboard />} />
//                 <Route path="/proposals" element={<Proposals />} />
//                 <Route path="/agents" element={<Agents />} />
//                 <Route path="/members" element={<Members />} />
//                 <Route path="/settings" element={<Settings />} />
//                 <Route path="*" element={<NotFound />} />
//               </Routes>
//             </BrowserRouter>
//           </TooltipProvider>
//         </QueryClientProvider>
//       </RainbowKitProvider>
//     </WagmiConfig>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

import Dashboard from './pages/Dashboard';
import Proposals from './pages/Proposals';
import Agents from './pages/Agents';
import Members from './pages/Members';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  WagmiConfig,
  configureChains,
  createConfig,
} from 'wagmi';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';

const ALCHEMY_API_KEY = 'your-alchemy-api-key-here'; // Replace this

const { chains, publicClient } = configureChains(
  [mainnet, polygon, arbitrum],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY })]
);

const { connectors } = getDefaultWallets({
  appName: 'My DAO App',
  projectId: 'demo', // or your WalletConnect projectId
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/proposals" element={<Proposals />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/members" element={<Members />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
