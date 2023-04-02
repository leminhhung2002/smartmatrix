import { sttaddr } from "./Stt";
import { ethers } from "ethers";
import { useState } from "react";
import classNames from "classnames";
import "./Home.css";
import "./Theme.css";
import Team from "./Team";
import axios from "axios";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

function Home() {
  const [navButtonActive, setNavButtonActive] = useState(false);
  const [navBarActive, setNavBarActive] = useState(false);
  const [navMenuMobile, setNavMenuMobile] = useState(false);
  const [showBuyHistory, setShowBuyHistory] = useState(false);
  const [isGetedData, setIsGetedData] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();

  const connectWallet = async () => {
    if (address !== undefined) {
      alert("Already connected, your wallet address is " + address);
      return;
    }
    const providerOptions = {
      cacheProvider: true,
      injected: {
        display: {
          name: "Metamask",
          description: "Connect with the provider in your Browser"
        },
        package: null
      },
      binancechainwallet: {
        package: true
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          bridge: "https://bridge.walletconnect.org",
          infuraId: "601f8bf490d549769bfc036b62882f9f"
        }
      },
      walletlink: {
        package: CoinbaseWalletSDK,
        options: {
          appName: "Web 3 Modal Demo",
          infuraId: "601f8bf490d549769bfc036b62882f9f"
        }
      }
    };

    const web3Modal = new Web3Modal({
      providerOptions
    });

    try {
      const instance = await web3Modal.connect();
      const provider2 = new ethers.providers.Web3Provider(instance);
      const signer2 = await provider2.getSigner();
      const address2 = await signer2.getAddress();
      setProvider(provider2);
      setSigner(signer2);
      setAddress(address2);
    } catch (e) {
      // toast.error((e as Error).message);
      console.log(e);
    }
    await regUserWallet();
    await submitWalletToRefWallet();
  };
  const regUserWallet = () => {
    axios({
      method: "POST",
      url: "http://api.bnbkingdom.io/api/register_user/",
      // withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      mode: "cors",
      data: {
        wallet_address: address
      }
    })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        console.log(data.message);
        alert(
          "This wallet is activated for the first time, welcome to Bear Safu"
        );
      })
      .catch((err) => {
        const data = err.response.data;
        if (data.error_type === "user_already_exists") {
          axios({
            method: "GET",
            url: "http://api.bnbkingdom.io/api/get_user/" + address,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            mode: "cors"
          })
            .then((res) => res.data)
            .then((data) => {
              console.log(data);
              if (data.user.wallet_address !== address) {
                alert("Internal server error!");
                window.location.reload();
                return;
              }
              alert("This wallet already activated, welcome back to Bear Safu");
            });
        }
      });
  };
  const preBuyCoin = (amount) => {
    if (amount < 0.1) return false;
    if (amount > 10) return false;
    if (amount === null) return false;
    if (amount === undefined) return false;
    if (amount === "") return false;
    return true;
  };
  const buyCoin = async () => {
    const amount = document.getElementById("buyinput");
    let status = await preBuyCoin(Number(amount.value));
    if (!status) {
      alert("Please enter a valid amount");
      amount.value = "0.1";
      return;
    }
    try {
      signer
        .sendTransaction({
          from: address,
          to: sttaddr,
          value: ethers.utils.parseEther(amount.value),
          nonce: provider.getTransactionCount(address, "latest"),
          gasLimit: "0x09184e72a000",
          gasPrice: "0x2710"
        })
        .then((transaction) => {
          console.log(transaction);
          alert("Transaction sent");
        })
        .then(() => {
          axios({
            method: "POST",
            url: "http://api.bnbkingdom.io/api/save_buy_history/",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            mode: "cors",
            data: {
              wallet_address: address
            }
          })
            .then((res) => res.data)
            .then((data) => {
              console.log(data);
            });
        });
    } catch (error) {
      console.log(error);
      alert("Transaction failed, might be you are not connected to a wallet");
    }
  };
  const addTokenToWallet = async () => {
    try {
      provider.send("wallet_watchAsset", {
        type: "ERC20",
        options: {
          address: sttaddr,
          symbol: "BSF",
          decimals: 18,
          image:
            "https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.6435-9/60340728_4250971574952485_7380081354559455232_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=174925&_nc_ohc=zlZ8oy7d8_oAX9FD-gi&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT9zjgIbjCISkIKpQVkkaF2lYkhlDxdX6qzf2bZDw62_WA&oe=62CCABB3"
        },
        id: Math.round(Math.random() * 100000)
      });
    } catch (error) {
      console.log(error);
      alert("Transaction failed, might be you are not connected to a wallet");
    }
  };
  const getReferralAddress = async () => {
    const currentUrl = window.location.search;
    const url = new URLSearchParams(currentUrl);
    const address = url.get("ref");
    return address;
  };
  const getReferralLink = async () => {
    if (address === undefined || address === null || address === "") {
      alert("Please connect to a wallet");
      return;
    }
    const newUrl = "https://beartokens.io/?ref=" + address;
    document.getElementById("refaddress").value = newUrl;
    navigator.clipboard.writeText(newUrl);
  };
  const submitWalletToRefWallet = async () => {
    const currentRefAddress = await getReferralAddress();
    if (
      currentRefAddress !== address &&
      currentRefAddress !== null &&
      currentRefAddress !== "" &&
      currentRefAddress !== undefined
    ) {
      console.log(currentRefAddress);
    }
  };

  const toggleMenu = async () => {
    // document.getElementById("nav-button").classList.toggle("active");
    await setNavButtonActive(!navButtonActive);
    await setNavBarActive(!navBarActive);
  };
  const navButtonClass = () => {
    return classNames({
      "navbar-toggle": true,
      "navbar-active": navButtonActive
    });
  };
  const navBarClass = () => {
    return classNames({
      "header-navbar": true,
      "header-navbar-s1": true,
      "menu-mobile": navMenuMobile,
      "menu-shown": navBarActive
    });
  };
  window.addEventListener("resize", () => {
    if (window.innerWidth < 992) {
      setNavMenuMobile(true);
    }
  });

  const checkHistory = () => {
    if (address === undefined) {
      alert("Please connect to your wallet");
      return;
    }
    axios({
      method: "GET",
      url: "http://api.bnbkingdom.io/api/get_buy_history/" + address,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      mode: "cors"
    })
      .then((res) => res.data)
      .then((data) => {
        setHistoryData(data.history);
        setIsGetedData(true);
        console.log(data.history);
      });
    setShowBuyHistory(true);
  };
  
  return (
    <div className="nk-body body-wider theme-dark mode-onepage no-touch nk-nio-theme page-loaded chrome as-mobile overlay-menu-shown">
      <div className="nk-wrap">
        <header
          className="nk-header page-header is-transparent is-sticky is-shrink is-dark"
          id="header"
        >
          {/* Header @s */}

          <div className="header-main">
            <div className="header-container container">
              <div className="header-wrap">
                {/* Logo @s */}
                <div
                  className="header-logo logo animated"
                  data-animate="fadeInDown"
                  data-delay=".65"
                >
                  <a href="./" className="logo-link">
                    <img
                      className="logo-dark"
                      src="images/logofull.png"
                      srcSet="images/logofull.png 2x"
                      alt="logo"
                    />
                    <img
                      className="logo-light"
                      src="images/logofull.png"
                      srcSet="images/logofull.png 2x"
                      alt="logo"
                    />
                  </a>
                </div>
                {/* Menu Toogle @s */}
                <div className="header-nav-toggle">
                  <div
                    id="nav-button"
                    className={navButtonClass()}
                    data-menu-toggle="header-menu"
                    onClick={() => toggleMenu()}
                  >
                    <div className="toggle-line">
                      <span></span>
                    </div>
                  </div>
                </div>
                <div className={navBarClass()} id="nav-bar">
                  <nav className="header-menu" id="header-menu">
                  <ul
                      className="menu animated remove-animation"
                      data-animate="fadeInDown"
                      data-delay=".75"
                    >
                      <li className="menu-item">
                        <a className="" href="#about">
                        Introduce
                        </a>
                      </li>

                      <li className="menu-item">
                        <a
                          className="menu-link nav-link"
                          href="https://docs.bnbkingdom.io/"
                        >
                          Ecosystem
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          className="menu-link nav-link"
                          href="https://docs.bnbkingdom.io/tokenomics"
                        >
                          Why choose us ?
                        </a>
                      </li>
                      <li className="menu-item">
                        <a className="" href="#roadmap">
                        How it work
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          className="menu-link nav-link"
                          href="https://testnet.bscscan.com/address/0x82d88F3cdBeD18aA3CbCa0170569aCD3c648ed2e"
                        >
                          FAQs
                        </a>
                      </li>
                      <li className="menu-item">
                        <a className="" href="#team">
                          Team
                        </a>
                      </li>
                      <li className="menu-item">
                        <a className="" href="#partner">
                          Partner
                        </a>
                      </li>
                    </ul>
                    <ul
                      className="menu-btns menu-btns-s2 align-items-center animated remove-animation"
                      data-animate="fadeInDown"
                      data-delay=".85"
                    >
                      
                      <li>
                        <button
                          className="addToWallet btn btn-md btn-grad btn-grad-alt no-change"
                          // onClick={() => connectWallet()}
                        >
                          Đăng Nhập 
                        </button>
                      </li>
                      <li>
                        <button
                          className="addToWallet btn btn-md btn-grad btn-grad-alt no-change"
                          // onClick={() => connectWallet()}
                        >
                          Đăng Ký  
                        </button>
                      </li>
                    </ul>
                  </nav>
                  <div
                    className="header-navbar-overlay"
                    onClick={() => toggleMenu()}
                  ></div>
                </div>
                {/* .header-navbar @e */}
              </div>
            </div>
          </div>
          {/* .header-main @e */}
          {/* Connect-Wallet-Popup */}
          
          
          {/* Banner @s */}
          <div className="header-banner bg-theme-grad-s2 header-banner-lungwort ov-h tc-light">
            <div className="background-shape bs-right" />
            <div className="nk-banner">
              <div className="banner banner-fs banner-s2">
                <div className="banner-wrap">
                  <div className="container">
                    <div className="row align-items-center justify-content-center">
                      <div className="col-xl-6 col-lg-5 order-lg-last">
                        <div
                          className="banner-gfx banner-gfx-re-s2 animated"
                          data-animate="fadeInUp"
                          data-delay="1.25"
                        >
                          <img src="images/unnamed-removebg.png" alt="header" />
                        </div>
                      </div>
                      {/* .col */}
                      <div className="col-xl-6 col-lg-7 text-center text-lg-left">
                        <div className="banner-caption cpn tc-light">
                          <div className="cpn-head">
                            <h1
                              className="title title-xl-2 fw-6 animated"
                              data-animate="fadeInUp"
                              data-delay="1.35"
                            >
                              SMARTMATRIX 
                            </h1>
                          </div>
                          <div className="cpn-text">
                            <p
                              className="lead animated"
                              data-animate="fadeInUp"
                              data-delay="1.45"
                            >
                              SmartMatrix là lời đâu tư uy tín 
                              <br className="d-none d-md-block" />
                              và chất lượng nhất mọi thời đại 
                            </p>
                          </div>
                         
                          <div
                            className="token-status token-status-s2 animated"
                            data-animate="fadeInUp"
                            data-delay="1.65"
                          >
                            <div className="token-action token-action-s1 token-hung">
                              <a className="btn btn-md btn-grad btn-hung" href="#token">
                                BUY AND INVEST WITH US
                              </a>
                            </div>
                            <ul className="icon-list token-hung">
                              <li>
                                {" "}
                                <div className="circle">
                                  <a href="https://t.me/+KcAJFWXWUDY1NGY1">
                                    <em className="new-social-icon fab fa-telegram" />
                                  </a>
                                </div>
                              </li>
                              <li>
                                <div className="circle">
                                  <a href="https://t.me/bnbkingdomchannel">
                                    <em className="new-social-icon fab fa-telegram" />
                                  </a>
                                </div>
                              </li>
                              <li>
                                <div className="circle">
                                  <a href="https://twitter.com/bnbkingdom2022?t=DPqVpL7cr1X8Ku6iSOqu2g&s=09">
                                    <em className="new-social-icon fab fa-twitter" />
                                  </a>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* .col */}
                    </div>
                    {/* .row */}
                  </div>
                </div>
              </div>
            </div>
            {/* .nk-banner */}
            {/* Place Particle Js */}
            <div
              id="particles-bg"
              className="particles-container particles-bg"
              data-pt-base="#00c0fa"
              data-pt-base-op=".3"
              data-pt-line="#2b56f5"
              data-pt-line-op=".5"
              data-pt-shape="#00c0fa"
              data-pt-shape-op=".2"
            />
          </div>
          {/* .header-banner @e */}
        </header>
        <main className="nk-pages"></main>
      </div>
      {/* // */}
      <section className="section bg-theme tc-light" id="about">
        <div className="container">
          {/* Block @s */}
          <div className="nk-block nk-block-features-s2">
            <div className="row align-items-center gutter-vr-30px">
              <div className="col-md-6">
                <div
                  className="gfx animated"
                  data-animate="fadeInUp"
                  data-delay=".1"
                >
                  <img src="images/dev1.png" alt="dev1" />
                </div>
              </div>
              {/* .col */}
              <div className="col-md-6">
                {/* Section Head @s */}
                <div className="nk-block-text">
                  <h6
                    className="title title-xs title-s1 tc-primary animated"
                    data-animate="fadeInUp"
                    data-delay=".2"
                  >
                    What is Bear Safu
                  </h6>
                  <h2
                    className="title title-semibold animated"
                    data-animate="fadeInUp"
                    data-delay=".3"
                  >
                    The Best Community in Crypto Has Chosen !
                  </h2>
                  <p
                    className="lead animated"
                    data-animate="fadeInUp"
                    data-delay=".4"
                  >
                    Bearsufu is the aims to be the coin that is accepted by the
                    community to store as a gift and use in the Bearsafu
                    ecosystem with the goal of becoming the currency with the
                    cheapest transaction fees in the crypto market.
                  </p>
                  {/*
                            <p class="animated" data-animate="fadeInUp" data-delay=".5"> launching all kind of project
                                to our community and we will start with an NFT collection that will be exclusive for our
                                investors and right next after that we be creating a invest2earn to maximize</p>
                            <p class="animated" data-animate="fadeInUp" data-delay=".6"> all the innovation points along
                                that we will be introducing big competition and giveaways inside the community</p> */}
                </div>
              </div>
              {/* .col */}
            </div>
            {/* .row */}
          </div>
          {/* .block @e */}
        </div>
      </section>
      {/* // */}
      <section className="section bg-theme-alt tc-light">
        <div className="container">
          {/* Block @s */}
          <div className="nk-block nk-block-features-s2">
            <div className="row align-items-center flex-row-reverse gutter-vr-30px">
              <div className="col-md-6">
                <div
                  className="gfx animated"
                  data-animate="fadeInUp"
                  data-delay=".1"
                >
                  <img src="images/dev2.png" alt="dev2" />
                </div>
              </div>
              {/* .col */}
              <div className="col-md-6">
                {/* Section Head @s */}
                <div className="nk-block-text">
                  <h6
                    className="title title-xs title-s1 tc-primary animated"
                    data-animate="fadeInUp"
                    data-delay=".2"
                  >
                    Everyone loves profits
                  </h6>
                  <h2
                    className="title title-semibold animated"
                    data-animate="fadeInUp"
                    data-delay=".3"
                  >
                    Introduction
                  </h2>
                  <p
                    className="animated"
                    data-animate="fadeInUp"
                    data-delay=".4"
                  >
                    Why spend more? Bearsafu runs on Binance Smart Chain, a
                    blockchain with fees that are much lower than Ethereum. Take
                    advantage now. Our swap fees are lower than other top dexs,
                    so that's another win for you! We offer as low as 0% swap
                    fees on specific pairs! Example: Bear Safu holders enjoy
                    discounts on Bearsafu/BNB for holding BearSafu.
                  </p>
                  <p
                    className="animated"
                    data-animate="fadeInUp"
                    data-delay=".5"
                  >
                    Stake LP tokens, Earn BearSafu. You take on a little more
                    exposure to market fluctuations then with the BearSafu
                    Pools, and in addition you can earn higher APR's to offset
                    the risk. Simply deposit LP tokens into a farm and earn
                    BearSafu and other project tokens as rewards! All while also
                    earning swap fees from the LP tokens.
                  </p>
                  {/*<p class="animated" data-animate="fadeInUp" data-delay=".6">Second: HOLDR rewards provide
                                you with an automatically ever-increasing balance.</p>
                            <p class="animated" data-animate="fadeInUp" data-delay=".7">Third: automatic balance
                                increasing; second, burning increases the value of each token.</p>
                            <p class="animated" data-animate="fadeInUp" data-delay=".8">You can see your balance and the
                                price of each token increase simultaneously and automatically with BSFINGDOM</p>
                            </p> */}
                </div>
              </div>
              {/* .col */}
            </div>
            {/* .row */}
          </div>
          {/* .block @e */}
          {/* Block @s */}
          <div className="nk-block nk-block-features-s2">
            <div className="row align-items-center gutter-vr-30px">
              <div className="col-md-6">
                <div
                  className="gfx animated"
                  data-animate="fadeInUp"
                  data-delay=".1"
                >
                  <img src="images/dev3.png" alt="dev3" />
                </div>
              </div>
              {/* .col */}
              <div className="col-md-6">
                {/* Section Head @s */}
                <div className="nk-block-text">
                  <h6
                    className="title title-xs title-s1 tc-primary animated"
                    data-animate="fadeInUp"
                    data-delay=".2"
                  >
                    DEFLATIONARY MECHANISM
                  </h6>
                  <h2
                    className="title title-semibold animated"
                    data-animate="fadeInUp"
                    data-delay=".3"
                  >
                    Earn Trading Fees
                  </h2>
                  <p
                    className="animated"
                    data-animate="fadeInUp"
                    data-delay=".4"
                  >
                    No farm? No problem. Even if your swap pair isn’t supported
                    on the Farms page, you can still earn swap fees when you
                    stake your tokens in Liquidity Pools (LPs). And if you don't
                    earn them by farming or staking you can still buy and sell
                    them. We got you. Up to 0.2% of every swap goes to liquidity
                    providers!
                  </p>
                  <p
                    className="animated"
                    data-animate="fadeInUp"
                    data-delay=".5"
                  >
                    After the negative influence of the Covid-19, the bank is
                    liquidating the enterprise's mortgage assets at cheap
                    prices. We call for a large amount of capital to collect all
                    of these assets. This property includes cars, real estate,
                    enterprise shares, corporate bonds,...We can resell these
                    assets to gain profits over 200%. .
                  </p>
                  <p
                    className="animated"
                    data-animate="fadeInUp"
                    data-delay=".5"
                  >
                    Along with that, we develope the BSF token which is used in
                    Bear Safu’s ecosystem. BSF can be used to deal with the
                    assets that we' ve acquired from banks and contributed
                    equity investments to the casino business systems,
                    restaurants, hotels that we own, as well as to pay for
                    transaction fees in Bear Safu .
                  </p>
                </div>
              </div>
              {/* .col */}
            </div>
            {/* .row */}
          </div>
          {/* .block @e */}
          {/* Block @s */}
          <div className="nk-block nk-block-features-s2">
            <div className="row align-items-center flex-row-reverse gutter-vr-30px">
              <div className="col-md-6">
                <div
                  className="gfx animated"
                  data-animate="fadeInUp"
                  data-delay=".1"
                >
                  <img src="images/dev4.png" alt="Dev4" />
                </div>
              </div>
              {/* .col */}
              <div className="col-md-6">
                {/* Section Head @s */}
                <div className="nk-block-text">
                  <h6
                    className="title title-xs title-s1 tc-primary animated"
                    data-animate="fadeInUp"
                    data-delay=".2"
                  >
                    HOLD &amp; WIN
                  </h6>
                  <h2
                    className="title title-semibold animated"
                    data-animate="fadeInUp"
                    data-delay=".3"
                  >
                    EVERYONE WIN
                  </h2>
                  <p
                    className="animated"
                    data-animate="fadeInUp"
                    data-delay=".4"
                  >
                    {" "}
                    BearSafu is a reflect token. That means you will earn some
                    BearSafu on each transaction just by holding yours. In fact,
                    there is a 10% tax on each transaction that is redistributed
                    between ALL BearSafu holders instantly and gaslessly.
                    Holders earn passive rewards through static reflection as
                    they watch their balance of BearSafu grow continuously.{" "}
                  </p>
                </div>
              </div>
              {/* .col */}
            </div>
            {/* .row */}
          </div>
          {/* .block @e */}
        </div>
      </section>
      {/* // */}
      
      {/* // */}
      <section className="section bg-theme-alt tc-light" id="benifits">
        <div className="container">
          <div className="section-head section-head-s9 wide-sm">
            <h6
              className="title title-xs title-s1 tc-primary animated"
              data-animate="fadeInUp"
              data-delay=".1"
            >
              BearSafu Feature
            </h6>
            <h2
              className="title title-semibold animated"
              data-animate="fadeInUp"
              data-delay=".2"
            >
              Ecosystem key features
            </h2>
            <p className="animated" data-animate="fadeInUp" data-delay=".3">
              The BearSafu Team combines a passion for esports, industry
              experise &amp; proven record in finance, development, marketing.
            </p>
          </div>
          {/* Block @s */}
          <div className="nk-block nk-block-features">
            <div className="row gutter-100px gutter-vr-60px">
              <div className="col-lg-6">
                <div
                  className="feature feature-s12 animated"
                  data-animate="fadeInUp"
                  data-delay=".4"
                >
                  <div className="feature-icon feature-icon-lg m-lg-0">
                    <img
                      src="images/3-HOLDR-Rewards---Feature-Icon-with-circle.svg"
                      alt="feature"
                    />
                  </div>
                  <div className="feature-text feature-text-s2">
                    <h6>+ Automated Investment System: </h6>
                    <p>
                      {" "}
                      Allowing users to send BNB to receive interest rates up to
                      20%/day. We're going to use this money to buy low - cost
                      mortgage assets from big banks and resell them at higher
                      prices to pay for investors.
                    </p>
                  </div>
                </div>
              </div>
              {/* .col */}
              <div className="col-lg-6">
                <div
                  className="feature feature-s12 animated"
                  data-animate="fadeInUp"
                  data-delay=".5"
                >
                  <div className="feature-icon feature-icon-lg m-lg-0">
                    <img
                      src="images/3-Automatic-Liquidity---Feature-Icon-with-circle.svg"
                      alt="feature"
                    />
                  </div>
                  <div className="feature-text feature-text-s2">
                    <h6>+ BK Auction Platform: </h6>
                    <p>
                      {" "}
                      Allowing BSF token to aution for assets, stocks, bonds,
                      and nft collections online and offline. Auctions are held
                      monthly, quarterly
                    </p>
                  </div>
                </div>
              </div>
              {/* .col */}
              <div className="col-lg-6">
                <div
                  className="feature feature-s12 animated"
                  data-animate="fadeInUp"
                  data-delay=".6"
                >
                  <div className="feature-icon feature-icon-lg m-lg-0">
                    <img
                      src="images/3-Burn---Feature-Icon-with-circle.svg"
                      alt="feature"
                    />
                  </div>
                  <div className="feature-text feature-text-s2">
                    <h6>+ NFT &amp; NFT market place: </h6>
                    <p>
                      It is easy to buy, to collect, to store and to move NFTs.
                      These NFT we launch, can be used as a certificate for
                      investor' s contracts.{" "}
                    </p>
                    <p>
                      launch the collection of NFT which has rewards and APY for
                      NFT holders
                    </p>
                    <p />
                  </div>
                </div>
              </div>
              {/* .col */}
              <div className="col-lg-6">
                <div
                  className="feature feature-s12 animated"
                  data-animate="fadeInUp"
                  data-delay=".7"
                >
                  <div className="feature-icon feature-icon-lg m-lg-0">
                    <img
                      src="images/3-Marketing-Feature-Icon-with-circle.svg"
                      alt="feature"
                    />
                  </div>
                  <div className="feature-text feature-text-s2">
                    <h6>+ BK Exchange: </h6>
                    <p>
                      {" "}
                      It is easy to trade, to buy, to sell, to send and to
                      receive BSF tokens and other digital tokens
                    </p>
                  </div>
                </div>
              </div>
              {/* .col */}
            </div>
            {/* .row */}
          </div>
          {/* .block @s */}
        </div>
      </section>
      {/* // */}
      
      {/* // */}

      {/* // */}
      
      
     

      <section
        className="section section-contact bg-theme-alt tc-light ov-h"
        id="contact"
      >
        <div className="container">
          {/* Block @s */}
          <div className="nk-block block-contact">
            <div className="row justify-content-center gutter-vr-30px">
              <div className="col-lg-3">
                <div className="section-head section-head-sm section-head-s9 tc-light text-center text-lg-left">
                  <h6
                    className="title title-xs title-s1 tc-primary animated"
                    data-animate="fadeInUp"
                    data-delay=".1"
                  >
                    Contact
                  </h6>
                  <h2
                    className="title animated"
                    data-animate="fadeInUp"
                    data-delay=".2"
                  >
                    Get In Touch
                  </h2>
                  <p
                    className="animated"
                    data-animate="fadeInUp"
                    data-delay=".3"
                  >
                    Any question? Reach out to us and we’ll get back to you
                    shortly.
                  </p>
                </div>
                <div className="d-flex flex-column justify-content-between h-100">
                  <ul className="contact-list contact-list-s2">
                    <li
                      className="animated"
                      data-animate="fadeInUp"
                      data-delay=".4"
                    >
                      <em className="contact-icon fab fa-twitter" />
                      <div className="contact-text">
                        <span>@BearSafu</span>
                      </div>
                    </li>
                    <li
                      className="animated"
                      data-animate="fadeInUp"
                      data-delay=".5"
                    >
                      <em className="contact-icon fas fa-envelope" />
                      <div className="contact-text">
                        <span>support@beartokens.io</span>
                      </div>
                    </li>
                    <li
                      className="animated"
                      data-animate="fadeInUp"
                      data-delay=".6"
                    >
                      <em className="contact-icon fas fa-paper-plane" />
                      <div className="contact-text">
                        <span>Join us on Telegram</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              {/* .col */}
              <div className="col-lg-4 offset-lg-1">
                <div className="gap-6x d-none d-lg-block" />
                <div className="gap-4x d-none d-lg-block" />
                <form
                  id="contact-form-01"
                  className="contact-form nk-form-submit"
                  action="form/contact.php"
                  method="post"
                >
                  <div
                    className="field-item field-item-s2 animated"
                    data-animate="fadeInUp"
                    data-delay=".7"
                  >
                    <input
                      name="contact-name"
                      type="text"
                      className="input-bordered required"
                      placeholder="Your Name"
                    />
                  </div>
                  <div
                    className="field-item field-item-s2 animated"
                    data-animate="fadeInUp"
                    data-delay=".8"
                  >
                    <input
                      name="contact-email"
                      type="email"
                      className="input-bordered required email"
                      placeholder="Your Email"
                    />
                  </div>
                  <div
                    className="field-item field-item-s2 animated"
                    data-animate="fadeInUp"
                    data-delay=".9"
                  >
                    <textarea
                      name="contact-message"
                      className="input-bordered input-textarea required"
                      placeholder="Your Message"
                      defaultValue={""}
                    />
                  </div>
                  <input
                    type="text"
                    className="d-none"
                    name="form-anti-honeypot"
                    defaultValue
                  />
                  <div className="row">
                    <div
                      className="col-sm-12 animated"
                      data-animate="fadeInUp"
                      data-delay={1}
                    >
                      <button
                        type="submit"
                        className="btn btn-s2 btn-md btn-grad"
                      >
                        Submit
                      </button>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-results" />
                    </div>
                  </div>
                </form>
              </div>
              {/* .col */}
              <div className="col-lg-4 align-self-center">
                <div
                  className="nk-block-img animated"
                  data-animate="fadeInUp"
                  data-delay="1.1"
                >
                  {/* <img src="images/gfx/gfx-q.png" alt="lungwort" /> */}
                </div>
              </div>
              {/* .col */}
            </div>
            {/* .row */}
          </div>
          {/* .block @e */}
        </div>
      </section>
   
      <div className="preloader">
        <span className="spinner spinner-round" />
      </div>
      {() => {
        if (window.innerWidth < 992) {
          setNavMenuMobile(true);
        }
      }}
    </div>
  );
}

export default Home;
