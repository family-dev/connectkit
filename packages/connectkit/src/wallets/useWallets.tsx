import { Connector } from 'wagmi';

import { useConnectors } from '../hooks/useConnectors';
import { walletConfigs, WalletConfigProps } from './walletConfigs';
import { useContext } from '../components/ConnectKit';

export type WalletProps = {
  id: string;
  connector: Connector;
  isInstalled?: boolean;
} & WalletConfigProps;

export const useWallet = (id: string): WalletProps | null => {
  const wallets = useWallets();
  const wallet = wallets.find((c) => c.id === id);
  if (!wallet) return null;
  return wallet;
};
export const useWallets = (): WalletProps[] => {
  const connectors = useConnectors();
  const context = useContext();

  const wallets = connectors.map((connector): WalletProps => {
    // use overrides
    const walletId = Object.keys(walletConfigs).find(
      // where id is comma separated list
      (id) =>
        id
          .split(',')
          .map((i) => i.trim())
          .indexOf(connector.id) !== -1
    );

    const c: WalletProps = {
      id: connector.id,
      name: connector.name ?? connector.id ?? connector.type,
      icon: (
        <img
          src={connector.icon}
          alt={connector.name}
          width={'100%'}
          height={'100%'}
        />
      ),
      connector,
      iconShape: 'squircle',
      isInstalled: connector.type === 'injected' && connector.id !== 'metaMask',
    };

    if (walletId) {
      const wallet = walletConfigs[walletId];
      return {
        ...c,
        iconConnector: connector.icon ? (
          <img
            src={connector.icon}
            alt={connector.name}
            width={'100%'}
            height={'100%'}
          />
        ) : undefined,
        ...wallet,
      };
    }

    return c;
  });

  return (
    wallets
      // remove duplicate ids
      .filter(
        (wallet, index, self) =>
          self.findIndex((w) => w.id === wallet.id) === index
      )
      // Replace walletConnect's name with the one from options
      .map((wallet) => {
        if (wallet.id === 'walletConnect') {
          return {
            ...wallet,
            name: context.options?.walletConnectName || wallet.name,
            shortName: context.options?.walletConnectName || wallet.shortName,
          };
        }
        return wallet;
      })
      // remove wallet with id coinbaseWalletSDK if wallet with id 'com.coinbase.wallet' exists
      .filter(
        (wallet, index, self) =>
          !(
            wallet.id === 'coinbaseWalletSDK' &&
            self.find((w) => w.id === 'com.coinbase.wallet')
          )
      )
      // remove wallet with id io.metamask if wallet with id 'metaMask' exists
      .filter(
        (wallet, index, self) =>
          !(
            wallet.id === 'metaMask' &&
            self.find(
              (w) => w.id === 'io.metamask' || w.id === 'io.metamask.mobile'
            )
          )
      )
      // order by isInstalled
      .sort((a, b) => {
        if (a.isInstalled && !b.isInstalled) return -1;
        if (!a.isInstalled && b.isInstalled) return 1;
        return 0;
      })
      // move walletConnect to the end
      .sort((a, b) => {
        if (a.id === 'walletConnect') return 1;
        if (b.id === 'walletConnect') return -1;
        return 0;
      })
  );
};
