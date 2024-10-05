import React, { useState } from "react";
import storeData from "./FranchiseList.data";
import Button from "../Button/Button";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";
import "./FranchiseList.styles.css";

const StoreList = () => {
  const [currentPage, setCurrentPage] = useState(0);
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
            <Button className='view-details-button'>Details</Button>
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
    </div>
  );
};

export default StoreList;
