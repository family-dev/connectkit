import { ReactNode, useContext, useEffect, useState } from 'react';
import { useAccount, useAccountEffect, useSignMessage } from 'wagmi';
import { getAddress } from 'viem';
import { useQuery } from '@tanstack/react-query';

import { Context as ConnectKitContext } from './../components/ConnectKit';
import {
  SIWEContext,
  SIWEConfig,
  StatusState,
  SIWESession,
} from './SIWEContext';

type Props = SIWEConfig & {
  children: ReactNode;
  onSignIn?: (data?: SIWESession) => void;
  onSignOut?: () => void;
};

export const SIWE_NONCE_QUERY_KEY = 'ckSiweNonce';
export const SIWE_SESSION_QUERY_KEY = 'ckSiweSession';

export const SIWEProvider = ({
  children,
  enabled = true,
  nonceRefetchInterval = 1000 * 60 * 5,
  sessionRefetchInterval = 1000 * 60 * 5,
  signOutOnDisconnect = true,
  signOutOnAccountChange = true,
  signOutOnNetworkChange = true,
  onSignIn,
  onSignOut,
  ...siweConfig
}: Props) => {
  const [status, setStatus] = useState<StatusState>(StatusState.READY);
  const resetStatus = () => setStatus(StatusState.READY);

  // Only allow for mounting SIWEProvider once, so we avoid weird global state
  // collisions.
  if (useContext(SIWEContext)) {
    throw new Error(
      'Multiple, nested usages of SIWEProvider detected. Please use only one.'
    );
  }
  // SIWEProvider must be wrapped outside of ConnectKitProvider so that the
  // ConnectKitButton and other UI can use SIWE context values.
  if (useContext(ConnectKitContext)) {
    throw new Error('ConnectKitProvider must be mounted inside SIWEProvider.');
  }

  const nonce = useQuery({
    queryKey: [SIWE_NONCE_QUERY_KEY],
    queryFn: () => siweConfig.getNonce(),
    refetchInterval: nonceRefetchInterval,
  });

  const session = useQuery({
    queryKey: [SIWE_SESSION_QUERY_KEY],
    queryFn: () => siweConfig.getSession(),
    refetchInterval: sessionRefetchInterval,
  });

  const sessionData = session.data;

  const signOutAndRefetch = async () => {
    if (!sessionData) return false; // No session to sign out of
    setStatus(StatusState.LOADING);
    if (!(await siweConfig.signOut())) {
      throw new Error('Failed to sign out.');
    }
    await Promise.all([session.refetch(), nonce.refetch()]);
    setStatus(StatusState.READY);
    onSignOut?.();
    return true;
  };

  const { address: connectedAddress } = useAccount();
  useAccountEffect({
    onDisconnect: () => {
      if (signOutOnDisconnect) {
        // For security reasons we sign out the user when a wallet disconnects.
        signOutAndRefetch();
      }
    },
  });

  const { address, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const onError = (error: any) => {
    console.error('signIn error', error, error.message);
    switch (error.code) {
      case -32000: // WalletConnect: user rejected
      case 4001: // MetaMask: user rejected
      case 'ACTION_REJECTED': // MetaMask: user rejected
        setStatus(StatusState.REJECTED);
        break;
      default:
        setStatus(StatusState.ERROR);
    }
  };

  const signIn = async () => {
    try {
      if (!siweConfig) {
        throw new Error('SIWE not configured');
      }

      if (!address) throw new Error('No address found');
      if (!chainId) throw new Error('No chainId found');

      if (!nonce.data) {
        throw new Error('Could not fetch nonce');
      }

      setStatus(StatusState.LOADING);

      const message = await siweConfig.createMessage({
        address,
        chainId,
        nonce: nonce?.data,
      });

      // Ask user to sign message with their wallet
      const signature = await signMessageAsync({
        message,
      });

      // Verify signature
      if (!(await siweConfig.verifyMessage({ message, signature }))) {
        throw new Error('Error verifying SIWE signature');
      }

      const data = await session.refetch().then((res) => {
        onSignIn?.(res?.data ?? undefined);
        return res?.data;
      });

      setStatus(StatusState.READY);
      return data as SIWESession;
    } catch (error) {
      onError(error);
      return false;
    }
  };

  useEffect(() => {
    // Skip if we're still fetching session state from backend
    if (!sessionData || !sessionData.address || !sessionData.chainId) return;
    // Skip if wallet isn't connected (i.e. initial page load)
    if (!connectedAddress || !chainId) return;

    // If SIWE session no longer matches connected account, sign out
    if (
      signOutOnAccountChange &&
      getAddress(sessionData.address) !== getAddress(connectedAddress)
    ) {
      console.warn('Wallet account changed, signing out of SIWE session');
      signOutAndRefetch();
    }
    // The SIWE spec includes a chainId parameter for contract-based accounts,
    // so we're being extra cautious about keeping the SIWE session and the
    // connected account/network in sync. But this can be disabled when
    // configuring the SIWEProvider.
    else if (signOutOnNetworkChange && sessionData.chainId !== chainId) {
      console.warn('Wallet network changed, signing out of SIWE session');
      signOutAndRefetch();
    }
  }, [sessionData, connectedAddress, chainId]);

  return (
    <SIWEContext.Provider
      value={{
        enabled,
        nonceRefetchInterval,
        sessionRefetchInterval,
        signOutOnDisconnect,
        signOutOnAccountChange,
        signOutOnNetworkChange,
        ...siweConfig,
        nonce,
        session,
        signIn,
        signOut: signOutAndRefetch,
        status,
        resetStatus,
      }}
    >
      {children}
    </SIWEContext.Provider>
  );
};
