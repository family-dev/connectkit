import { SIWEProvider } from 'connectkit';
import { ComponentProps, FunctionComponent } from 'react';
import { SiweMessage } from 'siwe';

type NextClientSIWEConfig = {
  apiRoutePrefix: string;
  statement?: string;
};

type NextSIWEProviderProps = Omit<
  ComponentProps<typeof SIWEProvider>,
  | 'getNonce'
  | 'createMessage'
  | 'verifyMessage'
  | 'getSession'
  | 'signOut'
  | 'data'
  | 'signIn'
  | 'status'
  | 'resetStatus'
>;

type ConfigureClientSIWEResult<TSessionData extends Object = {}> = {
  Provider: FunctionComponent<NextSIWEProviderProps>;
};

export const configureClientSIWE = <TSessionData extends Object = {}>({
  apiRoutePrefix,
  statement = 'Sign In With Ethereum.',
}: NextClientSIWEConfig): ConfigureClientSIWEResult<TSessionData> => {
  const NextSIWEProvider = (props: NextSIWEProviderProps) => {
    return (
      <SIWEProvider
        getNonce={async () => {
          const res = await fetch(`${apiRoutePrefix}/nonce`);
          if (!res.ok) {
            throw new Error('Failed to fetch SIWE nonce');
          }
          const nonce = await res.text();
          return nonce;
        }}
        createMessage={({ nonce, address, chainId }) =>
          new SiweMessage({
            version: '1',
            domain: window.location.host,
            uri: window.location.origin,
            address,
            chainId,
            nonce,
            statement,
          }).prepareMessage()
        }
        verifyMessage={({ message, signature }) =>
          fetch(`${apiRoutePrefix}/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, signature }),
          }).then((res) => res.ok)
        }
        getSession={async () => {
          const res = await fetch(`${apiRoutePrefix}/session`);
          if (!res.ok) {
            throw new Error('Failed to fetch SIWE session');
          }
          const { address, chainId } = await res.json();
          return address && chainId ? { address, chainId } : null;
        }}
        signOut={() => fetch(`${apiRoutePrefix}/logout`).then((res) => res.ok)}
        {...props}
      />
    );
  };

  return {
    Provider: NextSIWEProvider,
  };
};
