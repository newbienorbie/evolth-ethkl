import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Button from "../../components/Button/Button";
import "./Main.styles.css";

const Main = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(
    "0x7585B9A8Eb2c7d778A1bC110AEA166262e803788"
  );

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        console.log("window.ethereum is detected:", window.ethereum);
        const provider = new window.ethers.providers.Web3Provider(
          window.ethereum
        );
        console.log("Provider initialized:", provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log("Account address:", address);
        setAccount(address);
        setIsConnected(true);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("MetaMask is not installed");
    }
  };

  useEffect(() => {
    const testProvider = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          console.log("Test provider initialized:", provider);
        } catch (error) {
          console.error("Error in provider initialization:", error);
        }
      } else {
        console.error("window.ethereum is not available.");
      }
    };
    testProvider();
  }, []);

  return (
    <div>
      {" "}
      <Header />
      <main className='main-content'>
        <div className='phone-image'>
          <img
            src='/phone-mockup.png'
            alt='Phone'
          />
        </div>
        <div className='text-content'>
          <h1>Lorem ipsum odor amet</h1>
          <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Vulputate
            mattis molestie gravida mollis vel dictumst leo.
          </p>
          {isConnected ? (
            <div className='buttons'>
              <Button onClick={() => alert(`Viewing profile of ${account}`)}>
                View Profile
              </Button>
              <Button onClick={() => alert("Exploring franchise")}>
                Explore Franchise
              </Button>
            </div>
          ) : (
            <Button
              className='buttons'
              onClick={connectWallet}
            >
              Connect to Wallet
            </Button>
          )}

          {isConnected && <p>Connected as: {account}</p>}
        </div>
      </main>
    </div>
  );
};

export default Main;
