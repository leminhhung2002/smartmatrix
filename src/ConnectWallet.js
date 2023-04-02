// import { ethers } from "ethers";
// import { useState } from "react";
// import axios from "axios";
// import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import Web3Modal from "web3modal";

// function ConnectWallet() {
//   const [provider, setProvider] = useState();
//   const [address, setAddress] = useState();
//   const [signer, setSigner] = useState();
//   const connectWallet = async () => {
//     const providerOptions = {
//       injected: {
//         display: {
//           name: "Metamask",
//           description: "Connect with the provider in your Browser"
//         },
//         package: null
//       },
//       binancechainwallet: {
//         package: true
//       },
//       walletconnect: {
//         package: WalletConnectProvider,
//         options: {
//           bridge: "https://bridge.walletconnect.org",
//           infuraId: "d8df2cb7844e4a54ab0a782f608749dd"
//         }
//       },
//       walletlink: {
//         package: CoinbaseWalletSDK,
//         options: {
//           appName: "Web 3 Modal Demo",
//           infuraId: "d8df2cb7844e4a54ab0a782f608749dd"
//         }
//       }
//     };

//     const web3Modal = new Web3Modal({
//       providerOptions
//     });

//     try {
//       const instance = await (web3Modal.connect());
//       setProvider(new ethers.providers.Web3Provider(instance));
//       setSigner(provider.getSigner());
//       setAddress(provider.getAddress());
//     } catch (e) {
//       // toast.error((e as Error).message);
//       console.log(e);
//     }
//   };

//   const regUserWallet = () => {
//     axios({
//       method: "POST",
//       url: "http://api.bnbkingdom.io/api/register_user/",
//       // withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*"
//       },
//       mode: "cors",
//       data: {
//         wallet_address: address
//       }
//     })
//       .then((res) => res.data)
//       .then((data) => {
//         console.log(data);
//         console.log(data.message);
//         alert(
//           "This wallet is activated for the first time, welcome to BNB Kingdom"
//         );
//       })
//       .catch((err) => {
//         const data = err.response.data;
//         if (data.error_type === "user_already_exists") {
//           axios({
//             method: "GET",
//             url: "http://api.bnbkingdom.io/api/get_user/" + address,
//             headers: {
//               "Content-Type": "application/json",
//               "Access-Control-Allow-Origin": "*"
//             },
//             mode: "cors"
//           })
//             .then((res) => res.data)
//             .then((data) => {
//               console.log(data);
//               if (data.user.wallet_address !== address) {
//                 alert("Internal server error!");
//                 window.location.reload();
//                 return;
//               }
//               alert(
//                 "This wallet already activated, welcome back to BNB Kingdom"
//               );
//             });
//         }
//       });
//   };

//   return (
//     <div>
//       <button onClick={() => connectWallet()}>Connect Wallet </button>
//     </div>
//   );
// }

// export default ConnectWallet;
