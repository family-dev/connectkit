import { useContext } from 'react';
import { SIWEContext, StatusState } from './SIWEContext';

// Consumer-facing hook

export const useSIWE = () => {
  const siweContextValue = useContext(SIWEContext);
  if (!siweContextValue) {
    // If we throw an error here then this will break non-SIWE apps, so best to just respond with not signed in.
    //throw new Error('useSIWE hook must be inside a SIWEProvider.');
    return {
      signedIn: false,
    };
  }

  const {
    session,
    nonce,
    signOutAndRefetch: signOut,
    signIn,
    status,
  } = siweContextValue;
  const { address, chainId } = session.data || {};

  const currentStatus = address
    ? StatusState.SUCCESS
    : session.isLoading || nonce.isLoading
    ? StatusState.LOADING
    : status;

  const isLoading = currentStatus === StatusState.LOADING;
  const isSuccess = currentStatus === StatusState.SUCCESS;
  const isRejected = currentStatus === StatusState.REJECTED;
  const isError = currentStatus === StatusState.ERROR;

  const disabled = !address || nonce.isFetching || isLoading || isSuccess;

  return {
    address,
    chainId,
    signedIn: !!address,
    signIn,
    signOut,
    session,
    nonce,
    status: currentStatus,
  };
};
