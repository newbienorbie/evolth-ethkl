import React, { useState } from "react";
import storeData from "./FranchiseList.data";
import Button from "../Button/Button";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";
import "./FranchiseList.styles.css";

const StoreList = () => {
  const [currentPage, setCurrentPage] = useState(0); // No type annotations
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [tokenAmount, setTokenAmount] = useState(""); // No number type annotation

  const storesPerPage = 6;

  const startIndex = currentPage * storesPerPage;
  const endIndex = startIndex + storesPerPage;
  const currentStores = storeData.slice(startIndex, endIndex);

  const handleNext = () => {
    if (endIndex < storeData.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleBuyClick = (storeName) => {
    setSelectedStore(storeName);
    setIsPopupVisible(true);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // Allows only numbers
      setTokenAmount(value); // Storing the input as a string
    }
  };

  const handleConfirmPurchase = () => {
    if (tokenAmount && selectedStore) {
      alert(
        `You have successfully bought ${tokenAmount} tokens for ${selectedStore}`
      );
      setIsPopupVisible(false);
      setTokenAmount("");
      setSelectedStore(null);
    } else {
      alert("Please enter a valid token amount.");
    }
  };

  return (
    <div className='store-page'>
      <div className='store-list-container'>
        {currentStores.map((store) => (
          <div
            key={store.id}
            className='store-card'
          >
            <img
              src={store.logo}
              alt={`${store.name} logo`}
              className='store-logo'
            />
            <h3>{store.name}</h3>
            <p>Location: {store.location}</p>
            <p>Industry: {store.storeType}</p>
            <Button
              className='view-details-button'
              onClick={() => handleBuyClick(store.name)}
            >
              Buy
            </Button>
          </div>
        ))}
      </div>
      <div className='pagination-buttons'>
        <Button
          className='prev-button'
          onClick={handlePrevious}
          disabled={startIndex === 0}
        >
          <span className='back-icon'>
            <GrFormPreviousLink />
          </span>
          Previous
        </Button>
        <Button
          className='next-button'
          onClick={handleNext}
          disabled={endIndex >= storeData.length}
        >
          Next{" "}
          <span className='next-icon'>
            <GrFormNextLink />
          </span>
        </Button>
      </div>

      {/* Popup for token input */}
      {isPopupVisible && (
        <div className='popup-overlay'>
          <div className='popup'>
            <h2>How many tokens do you want to buy?</h2>
            <input
              type='text'
              value={tokenAmount}
              onChange={handleInputChange}
              placeholder='Enter number of tokens'
              className='token-input'
            />
            <div className='popup-buttons'>
              <Button
                className='confirm'
                onClick={handleConfirmPurchase}
              >
                Confirm
              </Button>
              <Button
                className='cancel'
                onClick={() => setIsPopupVisible(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreList;
