import React, { useState, useEffect } from "react";
import "./UserProfile.styles.css";
import Button from "../Button/Button";
import users from "./UserProfile.data";
import { GoEyeClosed } from "react-icons/go";

const UserProfile = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getRandomUser = () => {
      const randomIndex = Math.floor(Math.random() * users.length);
      return users[randomIndex];
    };

    setTimeout(() => {
      const randomUser = getRandomUser();
      setSelectedUser(randomUser);
    }, 10);
  }, []);

  if (!selectedUser) {
    return <div>Loading data...</div>;
  }

  const ownershipCount = selectedUser.ownership.length;

  return (
    <div className='profile-container'>
      <div className='profile-header'>
        <img
          src={selectedUser.image}
          alt={`${selectedUser.name}'s profile`}
          className='profile-picture'
        />
        <div className='profile-info'>
          <div className='top'>
            <h1>{selectedUser.name}</h1>
            <p className='verified'>Verified</p>
          </div>
          <div className='middle'>
            <p>UID: {selectedUser.uid}</p>
            <p>Email: {selectedUser.email}</p>
          </div>
          <p>
            Account Balance <GoEyeClosed className='eye-icon' />{" "}
            <div className='amount'>{selectedUser.balance}</div>{" "}
          </p>
        </div>
      </div>

      {/* Ownership Section */}
      <div className='ownership-section'>
        <h2>Franchise Holdings</h2>
        <div
          className={`investment-cards ${
            ownershipCount <= 2 ? "small-item" : ""
          }`}
        >
          {selectedUser.ownership.map((item) => (
            <div
              key={item.id}
              className='investment-card-item'
            >
              <img
                src={item.logo}
                alt={item.title}
                className='franchise-logo'
              />

              <h3 className='title'>{item.title}</h3>
              <p
                className={`status ${item.status
                  .toLowerCase()
                  .replace(/\s/g, "-")}`}
              >
                {item.status}
              </p>

              {item.status.toLowerCase() !== "sold" ? (
                <>
                  <p>Fraction Holding: {item.fractionHolding}</p>
                  <p>Value: {item.value}</p>
                </>
              ) : (
                <>
                  <p className='placeholder'>&nbsp;</p>
                  <p className='placeholder'>&nbsp;</p>
                </>
              )}
              <div
                className={`card-actions ${
                  item.status === "Sold" || item.status === "On Sale"
                    ? "center-actions"
                    : ""
                }`}
              >
                {item.status === "On Sale" && (
                  <>
                    <Button className='cancel-sale'>Cancel Sale</Button>
                    <Button className='details-button'>Details</Button>
                  </>
                )}

                {item.status === "Sold" && (
                  <>
                    <Button className='buy-again'>Buy Again</Button>
                    <Button className='details-button'>Details</Button>
                  </>
                )}

                {item.status === "Active" && (
                  <>
                    <Button className='buy-more'>Buy More</Button>
                    <Button className='details-button'>Details</Button>
                    <Button className='sell-button'>Sell</Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
