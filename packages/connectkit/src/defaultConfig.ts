import { http } from 'wagmi';
import { type CreateConfigParameters } from '@wagmi/core';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { CoinbaseWalletParameters } from 'wagmi/connectors';

import defaultConnectors from './defaultConnectors';

// TODO: Move these to a provider rather than global variable
let globalAppName: string;
let globalAppIcon: string;
export const getAppName = () => globalAppName;
export const getAppIcon = () => globalAppIcon;

type DefaultConfigProps = {
  appName: string;
  appIcon?: string;
  appDescription?: string;
  appUrl?: string;

  // WC 2.0 requires a project ID (get one here: https://cloud.walletconnect.com/sign-in)
  walletConnectProjectId: string;
  // Coinbase Wallet preference
  coinbaseWalletPreference?: CoinbaseWalletParameters<'4'>['preference'];
  safeWalletAllowedDomains?: RegExp[];
} & Partial<CreateConfigParameters>;

const defaultConfig = ({
  appName = 'ConnectKit',
  appIcon,
  appDescription,
  appUrl,
  walletConnectProjectId,
  coinbaseWalletPreference,
  safeWalletAllowedDomains,
  chains = [mainnet, polygon, optimism, arbitrum],
  client,
  ...props
}: DefaultConfigProps): CreateConfigParameters => {
  globalAppName = appName;
  if (appIcon) globalAppIcon = appIcon;

  // TODO: nice to have, automate transports based on chains, but for now just provide public if not provided
  const transports: CreateConfigParameters['transports'] =
    props?.transports ??
    Object.fromEntries(chains.map((chain) => [chain.id, http()]));

  const connectors: CreateConfigParameters['connectors'] =
    props?.connectors ??
    defaultConnectors({
      app: {
        name: appName,
        icon: appIcon,
        description: appDescription,
        url: appUrl,
      },
      walletConnectProjectId,
      coinbaseWalletPreference,
      safeWalletAllowedDomains
    });

  const config: CreateConfigParameters<any, any> = {
    ...props,
    chains,
    connectors,
    transports,
  };

  return config;
};

export default defaultConfig;
