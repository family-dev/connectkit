import { useState, useEffect } from 'react';

import { Connector, useAccount } from 'wagmi';
import { useConnect } from './../useConnect';
import { useContext } from '../../components/ConnectKit';
import { useMetaMaskConnector } from './../useConnectors';

type Props = {
  enabled?: boolean;
};

export function useMetaMaskUri(
  { enabled }: Props = {
    enabled: true,
  }
) {
  const { log } = useContext();

  const [uri, setUri] = useState<string | undefined>(undefined);

  const connector = useMetaMaskConnector();

  const { isConnected } = useAccount();
  const { connectAsync } = useConnect();

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.mmsdk) return;
    if (window.mmsdk?.isExtensionActive()) return;
    if (!enabled) return;

    async function handleMessage(message) {
      const { type, data } = message;
      log('MM Message', message);
      if (type === 'display_uri') {
        setUri(data);
      }
    }
    async function handleDisconnect() {
      log('MM Disconnect');

      if (connector) connect(connector);
    }

    async function connect(connector: Connector) {
      console.log('connect');
      const result = await connectAsync({ connector });
      if (result) return result;
      return false;
    }

    async function tryConnect(connector: Connector) {
      console.log('tryConnect');
      try {
        await connect(connector);
      } catch (error: any) {
        log('catch error');
        log(error);
        if (error.code) {
          switch (error.code) {
            case 4001:
              log('error.code - User rejected');
              break;
            default:
              log('error.code - Unknown Error');
              break;
          }
        } else {
          // Sometimes the error doesn't respond with a code
          log('MetaMask Wallet cannot connect.', error);
        }
      }
    }

    if (!connector || uri) return;
    if (connector && !isConnected) {
      tryConnect(connector);
      connector.emitter.on('message', handleMessage);
      connector.emitter.on('disconnect', handleDisconnect);
      return () => {
        connector.emitter.off('message', handleMessage);
        connector.emitter.off('disconnect', handleDisconnect);
      };
    }
  }, [enabled, connector, isConnected]);

  return {
    uri,
  };
}
