'use client'

import { PropsWithChildren } from 'react';

import { siweClient } from '@/utils/siweClient';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { WagmiConfig, createConfig } from 'wagmi';

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    appName: 'My ConnectKit App',
  })
);

export default function ConnectKitConfig({ children }: PropsWithChildren) {
  return (
    <WagmiConfig config={config}>
      <siweClient.Provider>
        <ConnectKitProvider>
          {children}
        </ConnectKitProvider>
      </siweClient.Provider>
    </WagmiConfig>
  );
}
