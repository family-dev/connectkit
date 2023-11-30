import { WalletProps } from '../wallet';

import Logos from '../../assets/logos';

import { isFrame } from '../../utils/wallets';

export const frame = (): WalletProps => {
  const isInstalled = isFrame();

  return {
    id: 'frame',
    name: 'Frame',
    icon: <Logos.Frame />,
    iconBackground: '#fff',
    scannable: false,
    downloadUrls: {
      download: 'https://connect.family.co/v0/download/frame',
      website: 'https://frame.sh',
      chrome:
        'https://chrome.google.com/webstore/detail/frame-companion/ldcoohedfbjoobcadoglnnmmfbdlmmhf',
      firefox: 'https://addons.mozilla.org/en-US/firefox/addon/frame-extension',
      brave:
        'https://chrome.google.com/webstore/detail/frame-companion/ldcoohedfbjoobcadoglnnmmfbdlmmhf',
    },
    installed: isInstalled,
    createUri: (uri: string) => uri,
  };
};
