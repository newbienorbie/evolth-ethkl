import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Button from "../../components/Button/Button";
import "./Main.styles.css";

const Main = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();
        const account = await signer.getAddress();

        setAccount(account);
        setIsConnected(true);
        setShowPopup(true);
        localStorage.setItem("isConnected", "true");
        localStorage.setItem("account", account);

        setTimeout(() => setShowPopup(false), 3000);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert(
        "MetaMask is not installed. Please install it to use this feature."
      );
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount("");
    localStorage.removeItem("isConnected");
    localStorage.removeItem("account");

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  useEffect(() => {
    const storedConnection = localStorage.getItem("isConnected");
    const storedAccount = localStorage.getItem("account");

    if (storedConnection === "true" && storedAccount) {
      setIsConnected(true);
      setAccount(storedAccount);
    } else if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.listAccounts().then((accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          localStorage.setItem("isConnected", "true");
          localStorage.setItem("account", accounts[0]);
        }
      });
    }
  }, []);

  return (
    <div>
      <Header
        isConnected={isConnected}
        account={account}
        disconnectWallet={disconnectWallet}
      />
      <main className='main-content'>
        <div className='phone-image'>
          <img
            src='/phone-mockup.png'
            alt='Phone'
          />
        </div>
        <div className='text-content'>
          <h1>Lorem ipsum odor amet</h1>
          <p className='desc'>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Vulputate
            mattis molestie gravida mollis vel dictumst leo.
          </p>

          {isConnected ? (
            <div className='buttons'>
              <Link to='/profile'>
                <Button>View Profile</Button>
              </Link>
              <Link to='/franchise'>
                <Button>Explore Franchise</Button>
              </Link>
            </div>
          ) : (
            <Button
              className='buttons'
              onClick={connectWallet}
            >
              Connect to Wallet
            </Button>
          )}

          {showPopup && (
            <div className='popup'>
              <p>
                {isConnected
                  ? `Connected as: ${account}`
                  : "Wallet Disconnected"}
              </p>{" "}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Main;
