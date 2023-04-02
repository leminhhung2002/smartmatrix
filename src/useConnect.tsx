import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { useEthers } from "@usedapp/core";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { toast } from "react-toastify";
import Web3Modal from "web3modal";

export function useConnect() {
  const {
    activateBrowserWallet,
    active,
    activate,
    deactivate,
    account,
    chainId,
  } = useEthers();

  const connect = async () => {
    //activateBrowserWallet();
    activeProvider();
  };

  const activeProvider = async (): Promise<void> => {
    const providerOptions = {
      injected: {
        display: {
          name: "Metamask",
          description: "Connect with the provider in your Browser",
        },
        package: null,
      },
      binancechainwallet: {
        package: true,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          bridge: "https://bridge.walletconnect.org",
          infuraId: "d8df2cb7844e4a54ab0a782f608749dd",
        },
      },
      walletlink: {
        package: CoinbaseWalletSDK,
        options: {
          appName: "Web 3 Modal Demo",
          infuraId: "d8df2cb7844e4a54ab0a782f608749dd",
        },
      },
    };

    const web3Modal = new Web3Modal({
      providerOptions,
      theme: "dark",
    });
    try {
      const provider = await web3Modal.connect();
      await activate(provider);
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  return { connect, deactivate, activeProvider, active, account, chainId };
}
