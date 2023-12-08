import { WalletProps } from './../wallet';

import Logos from './../../assets/logos';
import { isBrave } from '../../utils/wallets';

export const brave = (): WalletProps => {
  const isInstalled = isBrave();

  return {
    id: 'brave',
    name: 'Brave Wallet',
    shortName: 'Brave',
    icon: <Logos.Brave />,
    scannable: false,
    downloadUrls: {},
    installed: isInstalled,
    createUri: (uri: string) => uri,
  };
};
