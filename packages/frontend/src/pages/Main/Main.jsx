import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Button from "../../components/Button/Button";
import "./Main.styles.css";

const Main = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(""); // Initially empty account
  const [showPopup, setShowPopup] = useState(false);

  // Function to simulate wallet connection
  const connectWallet = () => {
    const mockAccount = "0x7585B9A8Eb2c7d778A1bC110AEA166262e803788";
    setAccount(mockAccount);
    setIsConnected(true);
    setShowPopup(true); // Show popup when connected
    localStorage.setItem("isConnected", "true");
    localStorage.setItem("account", mockAccount);

    // Hide the popup after 3 seconds
    setTimeout(() => setShowPopup(false), 3000);
  };

  // New function to disconnect wallet
  const disconnectWallet = () => {
    setIsConnected(false); // Set isConnected to false
    setAccount(""); // Clear the account address
    localStorage.removeItem("isConnected"); // Remove from localStorage
    localStorage.removeItem("account"); // Remove account from localStorage
    setShowPopup(true); // Show popup when disconnected

    // Hide the popup after 3 seconds
    setTimeout(() => setShowPopup(false), 3000);
  };

  useEffect(() => {
    // Check if user is already connected when component mounts
    const storedConnection = localStorage.getItem("isConnected");
    const storedAccount = localStorage.getItem("account");
    if (storedConnection === "true" && storedAccount) {
      setIsConnected(true);
      setAccount(storedAccount);
    }
  }, []);

  return (
    <div>
      {/* Pass props to Header */}
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
              {/* <-- Show different messages */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Main;
