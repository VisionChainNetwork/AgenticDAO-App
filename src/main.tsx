import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiConfig, createConfig, http } from "wagmi";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "wagmi/chains";

// const config = createConfig(
//   getDefaultConfig({
//     appName: "DAO-UI",
//     chains: [mainnet, sepolia],
//     transports: {
//       // [mainnet.id]: http(),
//       // [sepolia.id]: http(),
//     },
//     // ProjectId: "bf55f9e12c8cb21468ef23c7bf731907",
//   })
// );

const config = getDefaultConfig({
  appName: 'DAO-UI',
  projectId: 'bf55f9e12c8cb21468ef23c7bf731907',
  chains: [mainnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

// createRoot(document.getElementById("root")!).render(
//   <WagmiConfig config={config}>
//     <RainbowKitProvider chains={[mainnet, sepolia]}>
//       <App />
//     </RainbowKitProvider>
//   </WagmiConfig>
// );

createRoot(document.getElementById("root")!).render(<App />);
