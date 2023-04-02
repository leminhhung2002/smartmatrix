import { MetaMask } from "@web3-react/metamask";
import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { WalletConnect } from "@web3-react/walletconnect";
import { initializeConnector } from "@web3-react/core";

const [metaMask, metaMaskHooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask(actions)
);

const [coinbaseWallet, coinbaseWalletHooks] =
  initializeConnector<CoinbaseWallet>(
    (actions) =>
      new CoinbaseWallet(actions, {
        appName: "bnbkingdom",
        reloadOnDisconnect: true,
        url: "https://bsc-dataseed.binance.org/",
        appLogoUrl:
          "https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.6435-9/60340728_4250971574952485_7380081354559455232_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=174925&_nc_ohc=zlZ8oy7d8_oAX9FD-gi&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT9zjgIbjCISkIKpQVkkaF2lYkhlDxdX6qzf2bZDw62_WA&oe=62CCABB3"
      })
  );

const [walletConnect, walletConnectHooks] = initializeConnector<WalletConnect>(
  (actions) => new WalletConnect(actions, [
    {
      rpc: { 1: "https://bsc-dataseed.binance.org/"},
    },
  ])
);

const getMetaMask = () => {
  return [metaMask, metaMaskHooks];
};
const getCoinbaseWallet = () => {
  return [coinbaseWallet, coinbaseWalletHooks];
};

const getWalletConnect = () => {
  return [walletConnect, walletConnectHooks];
}

export { getMetaMask, getCoinbaseWallet, getWalletConnect };
