import { useInjectedConnector } from '../useConnectors';
import useDefaultWallets from '../../wallets/useDefaultWallets';
import { WalletProps } from '../../wallets/wallet';
import Logos from '../../assets/logos';

export const useInjectedWallet = () => {
  const wallets = useDefaultWallets();
  const connector = useInjectedConnector();

  const getInjectedNames = () => {
    if (!connector) return [];

    let names = connector.name.split(/[(),]+/);
    names.shift(); // remove "Injected" from array
    names = names
      .map((x) => x.trim())
      .filter((x) => x !== '')
      .filter((x) => x !== 'Injected');
    return names;
  };
  const shouldShow = () => {
    if (!(typeof window !== 'undefined' && window?.ethereum)) return false;

    const names = getInjectedNames();
    if (
      names.length === 1 &&
      (names[0] === 'MetaMask' || names[0] === 'Coinbase Wallet')
    ) {
      return false;
    }
    if (
      names.length === 2 &&
      names.includes('MetaMask') &&
      names.includes('Coinbase Wallet')
    ) {
      return false;
    }
    return true;
  };

  const getWallet = () => {
    const installedWallets = wallets.filter((wallet) => wallet.installed);
    if (installedWallets.length > 0) {
      return installedWallets[0];
    } else {
      const wallet: WalletProps = {
        id: 'injected',
        name: getInjectedNames()?.[0] ?? 'Browser Wallet',
        shortName: getInjectedNames()?.[0]?.replace(' Wallet', '') ?? 'Browser',
        logos: {
          default: <Logos.Injected />,
        },
      }
      return wallet;
    }
  };

  const wallet = getWallet();
  return {
    wallet,
    enabled: shouldShow() && wallet !== null,
  };
};
