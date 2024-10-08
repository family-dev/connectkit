import { getDefaultConfig } from 'connectkit';
import { createConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, rootstock } from 'wagmi/chains';

export const config = createConfig(
  getDefaultConfig({
    appName: 'ConnectKit Next.js demo',
    chains: [mainnet, polygon, optimism, arbitrum, rootstock],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
