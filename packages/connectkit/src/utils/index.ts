import React from 'react';
import { detect } from 'detect-browser';

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

const truncateEthAddress = (address?: string, separator: string = '••••') => {
  if (!address) return '';
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}${separator}${match[2]}`;
};

const truncateENSAddress = (ensName: string, maxLength: number) => {
  if (ensName.length > maxLength) {
    return ensName.replace('.eth', '').slice(0, maxLength) + '...';
  } else {
    return ensName;
  }
};

const nFormatter = (num: number, digits: number = 2) => {
  if (num < 10000) return num.toFixed(2);
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'm' },
    { value: 1e9, symbol: 'b' },
    { value: 1e12, symbol: 't' },
    { value: 1e15, symbol: 'p' },
    { value: 1e18, symbol: 'e' },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
};

const detectBrowser = () => {
  const browser = detect();
  return browser?.name ?? '';
};
const detectOS = () => {
  const browser = detect();
  return browser?.os ?? '';
};

const isIOS = () => {
  const os = detectOS();
  return os.toLowerCase().includes('ios');
};
const isAndroid = () => {
  const os = detectOS();
  return os.toLowerCase().includes('android');
};
const isMobile = () => {
  return isAndroid() || isIOS();
};

type ReactChildArray = ReturnType<typeof React.Children.toArray>;
function flattenChildren(children: React.ReactNode): ReactChildArray {
  const childrenArray = React.Children.toArray(children);
  return childrenArray.reduce((flatChildren: ReactChildArray, child) => {
    if ((child as React.ReactElement<any>).type === React.Fragment) {
      return flatChildren.concat(
        flattenChildren((child as React.ReactElement<any>).props.children)
      );
    }
    flatChildren.push(child);
    return flatChildren;
  }, []);
}

export const isWalletConnectConnector = (connectorId?: string) =>
  connectorId === 'walletConnect';

export const isMetaMaskConnector = (connectorId?: string) =>
  connectorId === 'metaMaskSDK';

export const isCoinbaseWalletConnector = (connectorId?: string) =>
  connectorId === 'coinbaseWalletSDK';

export const isLedgerConnector = (connectorId?: string) =>
  connectorId === 'ledger';

export const isSafeConnector = (connectorId?: string) => connectorId === 'safe';

export const isInjectedConnector = (connectorId?: string) =>
  connectorId === 'injected';

export {
  nFormatter,
  truncateEthAddress,
  truncateENSAddress,
  isMobile,
  isAndroid,
  detectBrowser,
  detectOS,
  flattenChildren,
};
