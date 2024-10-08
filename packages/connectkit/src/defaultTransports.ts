/**
 * TODO: Automate transports based on configured chains
 *
 * Developers using this causes loss of granular control over a dapps transports,
 * but for simple use cases, it's nice to have and saves a lot of boilerplate.
 *
 */

import { fallback, http, webSocket } from 'wagmi';
import { type CreateConfigParameters } from '@wagmi/core';
import { type Chain, mainnet, polygon, optimism, arbitrum, rootstock } from 'wagmi/chains';
import { type HttpTransport, type WebSocketTransport } from 'viem';

import { chainConfigs } from './constants/chainConfigs';

const createTransport = ({
  chain,
  provider = 'public',
  apiKey,
}: {
  chain: Chain;
  provider: 'alchemy' | 'infura' | 'public';
  apiKey: string;
}): HttpTransport | WebSocketTransport => {
  const supportedChain = chainConfigs.find((c) => c.id === chain.id);
  if (supportedChain?.rpcUrls) {
    if (provider === 'alchemy') {
      if (supportedChain.rpcUrls?.alchemy?.http) {
        return http(supportedChain.rpcUrls?.alchemy?.http + apiKey);
      } else {
        return webSocket(supportedChain.rpcUrls?.alchemy?.webSocket + apiKey);
      }
    } else if (provider === 'infura') {
      if (supportedChain.rpcUrls?.infura?.http) {
        return http(supportedChain.rpcUrls?.infura?.http + apiKey);
      } else {
        return webSocket(supportedChain.rpcUrls?.infura?.webSocket + apiKey);
      }
    }
  }
  return http();
};

type GetDefaultTransportsProps = {
  chains?: CreateConfigParameters['chains'];
  alchemyId?: string;
  infuraId?: string;
};

export const getDefaultTransports = ({
  chains = [mainnet, polygon, optimism, arbitrum, rootstock],
  alchemyId,
  infuraId,
}: GetDefaultTransportsProps): CreateConfigParameters['transports'] => {
  const transports: CreateConfigParameters['transports'] = {};
  Object.keys(chains).forEach((key, index) => {
    const chain = chains[index];
    const urls: (HttpTransport | WebSocketTransport)[] = [];
    if (alchemyId)
      urls.push(
        createTransport({ chain, provider: 'alchemy', apiKey: alchemyId })
      );
    if (infuraId)
      urls.push(
        createTransport({ chain, provider: 'infura', apiKey: infuraId })
      );

    urls.push(http());

    transports[chain.id] = fallback(urls);
  });

  return transports;
};
