import { getWallets } from './';
import { WalletProps } from './wallet';

import { useConnect } from 'wagmi';

function useDefaultWallets(): WalletProps[] {
  const { connectors } = useConnect();

  let defaultWallets: string[] = [];

  // If missing metamask or coinbasewallet connector from wagmi config, add them to this list
  if (!connectors.find((c) => c.id === 'metaMask'))
    defaultWallets.push('metaMask');
  if (!connectors.find((c) => c.id === 'coinbaseWallet'))
    defaultWallets.push('coinbaseWallet');

  // define the order of the wallets
  defaultWallets.push(
    'argent',
    'trust',
    'ledger',
    'infinityWallet',
    'family',
    'imToken',
    'rainbow',
    'unstoppable',
    'onto',
    'steak',
    'frontier',
    'zerion',
    'gnosisSafe',
    'brave',
    //'slope',
    'frame',
    'phantom',
    'dawn',
    'rabby',
    'talisman',
    'fordefi',
    'tokenPocket'
  );

  const wallets = getWallets();
  return wallets.filter((wallet) => defaultWallets.includes(wallet.id));
}

export default useDefaultWallets;
