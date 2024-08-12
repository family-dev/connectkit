import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
  Types,
  ConnectKitButton,
  Avatar,
  SIWEButton,
  ChainIcon,
  SIWESession,
  useChains,
  useModal,
  useSIWE,
} from 'connectkit';

import {
  useAccount,
  useBalance,
  useSendTransaction,
  useSignMessage,
  useSignTypedData,
  useConnect,
  useDisconnect,
} from 'wagmi';
import * as wagmiChains from 'wagmi/chains';

import { useTestBench } from '../TestbenchProvider';
import { Checkbox, Textbox, Select, SelectProps } from '../components/inputs';

import CustomAvatar from '../components/CustomAvatar';
import CustomSIWEButton from '../components/CustomSIWEButton';
import { Address } from 'viem';

const allChains = Object.keys(wagmiChains).map(
  (key) => wagmiChains[key as keyof typeof wagmiChains]
);

/** TODO: import this data from the connectkit module */
const themes: SelectProps[] = [
  { label: 'Auto', value: 'auto' },
  { label: 'Web95', value: 'web95' },
  { label: 'Retro', value: 'retro' },
  { label: 'Soft', value: 'soft' },
  { label: 'Minimal', value: 'minimal' },
  { label: 'Rounded', value: 'rounded' },
  { label: 'Midnight', value: 'midnight' },
  { label: 'Nouns', value: 'nouns' },
];
const modes: SelectProps[] = [
  { label: 'Auto', value: 'auto' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
];
const languages: SelectProps[] = [
  { label: 'English (US)', value: 'en-US' },
  { label: 'Arabic', value: 'ar-AE' },
  { label: 'Catalan', value: 'ca-AD' },
  { label: 'Chinese', value: 'zh-CN' },
  { label: 'Dutch', value: 'nl-NL' },
  { label: 'Estonian', value: 'ee-EE' },
  { label: 'French', value: 'fr-FR' },
  { label: 'Japanese', value: 'ja-JP' },
  { label: 'Persian', value: 'fa-IR' },
  { label: 'Portuguese', value: 'pt-BR' },
  { label: 'Russian', value: 'ru-RU' },
  { label: 'Spanish', value: 'es-ES' },
  { label: 'Turkish', value: 'tr-TR' },
  { label: 'Vietnamese', value: 'vi-VN' },
];

const AccountInfo = () => {
  const {
    address,
    connector,
    isConnected,
    isConnecting,
    isDisconnected,
    isReconnecting,
  } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const { chain } = useAccount();
  const chains = useChains();

  const { isSignedIn, signOut } = useSIWE({
    onSignIn: (data?: SIWESession) => {
      console.log('onSignIn', data);
    },
    onSignOut: () => {
      console.log('onSignOut');
    },
  });

  return (
    <div className="panel">
      <h2>Wallet Info</h2>
      {isConnecting && <p>Connecting...</p>}
      {isReconnecting && <p>Reconnecting...</p>}
      {isDisconnected && <p>Disconnected</p>}
      {isConnected && (
        <table>
          <tbody>
            <tr>
              <td>Chain ID</td>
              <td>{chain?.id}</td>
            </tr>
            <tr>
              <td>Chain Name</td>
              <td>{chain?.name}</td>
            </tr>
            <tr>
              <td>Chain Supported</td>
              <td>{chains.some((x) => x.id === chain?.id) ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{address}</td>
            </tr>
            <tr>
              <td>Balance</td>
              <td>{balanceData?.formatted}</td>
            </tr>
            <tr>
              <td>Connector</td>
              <td>{connector?.id}</td>
            </tr>
            <tr>
              <td>SIWE session</td>
              <td>
                {isSignedIn ? 'yes' : 'no'}{' '}
                {isSignedIn && <button onClick={signOut}>sign out</button>}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

const Actions = () => {
  const { isConnected, address } = useAccount();

  const {
    signMessage,
    isPending: signMessageIsLoading,
    isError: signMessageIsError,
  } = useSignMessage();
  const {
    signTypedData,
    isPending: signTypedDataIsLoading,
    isError: signTypedDataIsError,
  } = useSignTypedData();
  const {
    sendTransaction,
    isPending: sendTransactionIsLoading,
    isError: sendTransactionIsError,
  } = useSendTransaction();

  const testSignMessage = () => {
    signMessage({
      message: 'fam token wen',
    });
  };
  const testSignTypedData = () => {
    signTypedData({
      // All properties on a domain are optional
      domain: {
        name: 'Ether Mail',
        version: '1',
        chainId: 1,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      },
      // The named list of all type definitions
      types: {
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallet', type: 'address' },
        ],
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person' },
          { name: 'contents', type: 'string' },
        ],
      },
      primaryType: 'Mail',
      message: {
        from: {
          name: 'Cow',
          wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
        },
        to: {
          name: 'Bob',
          wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
        },
        contents: 'Hello, Bob!',
      },
    });
  };
  const testSendTransaction = () => {
    sendTransaction({
      to: (address as Address) ?? '',
      value: 0n,
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        flexWrap: 'wrap',
      }}
    >
      <h2>Actions {!isConnected && `(connect to test)`}</h2>
      <button disabled={!isConnected} onClick={testSignMessage}>
        {signMessageIsError
          ? 'Error. Check console'
          : signMessageIsLoading
          ? 'Waiting...'
          : 'Sign message'}
      </button>
      <button disabled={!isConnected} onClick={testSignTypedData}>
        {signTypedDataIsError
          ? 'Error. Check console'
          : signTypedDataIsLoading
          ? 'Waiting...'
          : 'Sign typed data'}
      </button>
      <button disabled={!isConnected} onClick={testSendTransaction}>
        {sendTransactionIsError
          ? 'Error. Check console'
          : sendTransactionIsLoading
          ? 'Waiting...'
          : 'Send transaction'}
      </button>
    </div>
  );
};

const Home: NextPage = () => {
  const {
    theme,
    setTheme,
    customTheme,
    setCustomTheme,
    mode,
    setMode,
    options,
    setOptions,
    label,
    setLabel,
    hideAvatar,
    setHideAvatar,
    hideBalance,
    setHideBalance,
  } = useTestBench();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { open, setOpen, openSIWE, openAbout } = useModal({
    onConnect: () => {
      console.log('onConnect Hook');
    },
    onDisconnect: () => {
      console.log('onDisconnect Hook');
    },
  });

  const { reset } = useConnect();
  const { isConnected, isConnecting, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const chains = useChains();

  const handleDisconnect = () => {
    disconnect();
    reset();
  };

  if (!mounted) return null;

  return (
    <>
      <main>
        <div className="panel">
          <h2>Connect Button</h2>
          <ConnectKitButton label={label} />
          {isConnected && (
            <button onClick={handleDisconnect}>Disconnect</button>
          )}
        </div>

        <div className="panel">
          <h2>Sign In With Ethereum</h2>
          <SIWEButton
            showSignOutButton
            onSignIn={(data?: SIWESession) => {
              console.log('onSignIn SIWEButton', data);
            }}
            onSignOut={() => {
              console.log('onSignOut SIWEButton');
            }}
          />
          <CustomSIWEButton />
          <Link href="/siwe/token-gated">Token-gated page &rarr;</Link>
        </div>

        <div className="panel">
          <h2>useModal Hook</h2>
          <p>open: {open.toString()}</p>
          <button onClick={() => setOpen(true)}>Open modal</button>
          <button onClick={() => openAbout()}>Open to About</button>
          <button onClick={() => openSIWE(true)}>Open to SIWE</button>
        </div>

        <AccountInfo />

        <div className="panel">
          <h2>Chains</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <ChainIcon id={chain?.id} />
            <ChainIcon id={1} size={64} radius={6} />
            <ChainIcon id={1337} size={32} radius={0} />
            <ChainIcon id={2} unsupported />
          </div>
          <h2>dApps configured chains</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            {chains.map((chain) => (
              <ChainIcon key={chain.id} id={chain.id} />
            ))}
          </div>
          <Link href="/chains">Chains Testbench &rarr;</Link>
        </div>

        <div className="panel">
          <h2>Avatars</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <Avatar name="lochie.eth" />
            <Avatar name="pugson.eth" size={64} radius={6} />
            <Avatar name="benjitaylor.eth" size={32} radius={0} />
            <Avatar
              address="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
              size={12}
            />
          </div>
        </div>
      </main>
      <aside>
        <ConnectKitButton.Custom>
          {({ isConnected, isConnecting, show, address, ensName, chain }) => {
            return (
              <button onClick={show}>
                {isConnected ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    {chain?.name}
                    <ChainIcon id={chain?.id} />
                    <Avatar address={address} size={12} />
                    {ensName ?? address}
                  </div>
                ) : (
                  <div>
                    Custom Connect {isConnecting ? 'connecting...' : ''}
                  </div>
                )}
              </button>
            );
          }}
        </ConnectKitButton.Custom>

        <p>isConnecting: {isConnecting.toString()}</p>

        <Actions />
        <h2>ConnectKitButton props</h2>
        <Textbox
          label="ConnectKitButton Label"
          value={label}
          onChange={(e: any) => {
            setLabel(e.target.value);
          }}
        />
        <Checkbox
          label="hideAvatar"
          value="hideAvatar"
          checked={hideAvatar}
          onChange={() => setHideAvatar(!hideAvatar)}
        />
        <Checkbox
          label="hideBalance"
          value="hideBalance"
          checked={hideBalance}
          onChange={() => setHideBalance(!hideBalance)}
        />
        <h2>ConnectKitProvider props</h2>
        <Select
          label="Theme"
          value={theme ?? themes[0].value}
          options={themes}
          onChange={(e) => setTheme(e.target.value as Types.Theme)}
        />
        <Select
          label="Mode"
          value={mode ?? modes[0].value}
          options={modes}
          onChange={(e) => setMode(e.target.value as Types.Mode)}
        />
        <Select
          label="Language"
          value={options.language ?? languages[0].value}
          options={languages}
          onChange={(e) =>
            setOptions({
              ...options,
              language: e.target.value as Types.Languages,
            })
          }
        />
        <h3>options</h3>
        <Textbox
          label="disclaimer"
          value={options.disclaimer as string}
          onChange={(e: any) => {
            setOptions({ ...options, disclaimer: e.target.value });
          }}
        />
        <Textbox
          label="walletConnectName"
          value={options.walletConnectName as string}
          onChange={(e: any) => {
            setOptions({ ...options, walletConnectName: e.target.value });
          }}
        />
        <Checkbox
          label="customAvatar"
          value="customAvatar"
          checked={options.customAvatar !== undefined}
          onChange={() =>
            setOptions({
              ...options,
              customAvatar: options.customAvatar ? undefined : CustomAvatar,
            })
          }
        />
        <Checkbox
          label="Custom Font"
          value="customFont"
          checked={customTheme['--ck-font-family'] !== undefined}
          onChange={() => {
            const name = '--ck-font-family';
            if (customTheme[name] !== undefined) {
              const { [name]: _, ...rest } = customTheme;
              setCustomTheme(rest);
            } else {
              setCustomTheme({
                ...customTheme,
                [name]: 'monospace',
              });
            }
          }}
        />
        <Select
          label={'Custom Accent'}
          value={customTheme['--ck-accent-color'] ?? ''}
          onChange={(e) => {
            const name = '--ck-accent-color';
            setCustomTheme({
              ...customTheme,
              [name]: e.target.value,
            });
          }}
          options={[
            { label: 'none', value: '' },
            { label: 'red', value: 'red' },
            { label: 'blue', value: 'blue' },
            { label: 'green', value: 'green' },
            { label: 'yellow', value: 'yellow' },
            { label: 'purple', value: 'purple' },
            { label: 'orange', value: 'orange' },
          ]}
        />
        <Checkbox
          label="reduceMotion"
          value="reduceMotion"
          checked={options.reducedMotion as boolean}
          onChange={() =>
            setOptions({ ...options, reducedMotion: !options.reducedMotion })
          }
        />
        <Checkbox
          label="truncateLongENSAddress"
          value="truncateLongENSAddress"
          checked={options.truncateLongENSAddress as boolean}
          onChange={() =>
            setOptions({
              ...options,
              truncateLongENSAddress: !options.truncateLongENSAddress,
            })
          }
        />
        <Checkbox
          label="hideBalance"
          value="hideBalance"
          checked={options.hideBalance as boolean}
          onChange={() =>
            setOptions({
              ...options,
              hideBalance: !options.hideBalance,
            })
          }
        />
        <Checkbox
          label="hideTooltips"
          value="hideTooltips"
          checked={options.hideTooltips as boolean}
          onChange={() =>
            setOptions({ ...options, hideTooltips: !options.hideTooltips })
          }
        />
        <Checkbox
          label="hideQuestionMarkCTA"
          value="hideQuestionMarkCTA"
          checked={options.hideQuestionMarkCTA as boolean}
          onChange={() =>
            setOptions({
              ...options,
              hideQuestionMarkCTA: !options.hideQuestionMarkCTA,
            })
          }
        />
        <Checkbox
          label="hideNoWalletCTA"
          value="hideNoWalletCTA"
          checked={options.hideNoWalletCTA as boolean}
          onChange={() =>
            setOptions({
              ...options,
              hideNoWalletCTA: !options.hideNoWalletCTA,
            })
          }
        />
        <Checkbox
          label="avoidLayoutShift"
          value="avoidLayoutShift"
          checked={options.avoidLayoutShift as boolean}
          onChange={() =>
            setOptions({
              ...options,
              avoidLayoutShift: !options.avoidLayoutShift,
            })
          }
        />
        <Checkbox
          label="disableSiweRedirect"
          value="disableSiweRedirect"
          checked={options.disableSiweRedirect as boolean}
          onChange={() =>
            setOptions({
              ...options,
              disableSiweRedirect: !options.disableSiweRedirect,
            })
          }
        />
        <Checkbox
          disabled
          label="embedGoogleFonts"
          value="embedGoogleFonts"
          checked={options.embedGoogleFonts as boolean}
          onChange={() =>
            setOptions({
              ...options,
              embedGoogleFonts: !options.embedGoogleFonts,
            })
          }
        />
        <Checkbox
          disabled
          label="bufferPolyfill"
          value="bufferPolyfill"
          checked={options.bufferPolyfill as boolean}
          onChange={() =>
            setOptions({
              ...options,
              bufferPolyfill: !options.bufferPolyfill,
            })
          }
        />
        <Select
          label="walletConnectCTA"
          value={options.walletConnectCTA as string}
          options={[
            { label: 'modal', value: 'modal' },
            { label: 'link', value: 'link' },
            { label: 'both', value: 'both' },
          ]}
          onChange={(e) =>
            setOptions({
              ...options,
              walletConnectCTA: e.target.value as any,
            })
          }
        />
        <label htmlFor="overlayBlur">
          overlayBlur <code>{options.overlayBlur}</code>
        </label>
        <input
          id="overlayBlur"
          type="range"
          min="0"
          max="50"
          value={options.overlayBlur}
          onChange={(e) => {
            setOptions({
              ...options,
              overlayBlur: parseInt(e.target.value),
            });
          }}
        />
      </aside>
    </>
  );
};

export default Home;
