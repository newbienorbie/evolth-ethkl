// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StoreFraction is ERC1155, Ownable {
    struct Store {
        string name;
        uint256 totalFractions; // Total fractions available for this store
        uint256 pricePerFraction; // Price per fraction in wei
    }

    mapping(uint256 => Store) public stores; // Mapping from store ID to Store struct
    uint256 public storeCount; // Keeps track of the number of stores

    constructor() ERC1155("") Ownable(msg.sender) {
        // Predefine the stores with fractions, initially owned by the app owner
        _addStore("Store A", 100, 1 ether); // 100 fractions, 1 ETH each
        _addStore("Store B", 200, 0.5 ether); // 200 fractions, 0.5 ETH each
        _addStore("Store C", 150, 0.75 ether); // 150 fractions, 0.75 ETH each
    }

    function _addStore(string memory _name, uint256 _totalFractions, uint256 _pricePerFraction) internal {
        storeCount += 1;
        stores[storeCount] = Store(_name, _totalFractions, _pricePerFraction);
        _mint(owner(), storeCount, _totalFractions, ""); // Mint total fractions to the app owner
    }

    // Buy fractions of a store
    function buyFractions(uint256 _storeId, uint256 _fractionAmount) external payable {
        Store storage store = stores[_storeId];
        require(store.totalFractions >= _fractionAmount, "Not enough fractions available");
        require(msg.value == store.pricePerFraction * _fractionAmount, "Incorrect payment amount");

        store.totalFractions -= _fractionAmount; // Decrease available fractions
        _safeTransferFrom(owner(), msg.sender, _storeId, _fractionAmount, ""); // Transfer fractions from app owner to buyer
    }

    // Sell fractions back to the app owner
    function sellFractions(uint256 _storeId, uint256 _fractionAmount) external {
        require(balanceOf(msg.sender, _storeId) >= _fractionAmount, "Not enough fractions to sell");

        Store storage store = stores[_storeId];
        uint256 paymentAmount = store.pricePerFraction * _fractionAmount;

        _safeTransferFrom(msg.sender, owner(), _storeId, _fractionAmount, ""); // Transfer fractions back to app owner
        store.totalFractions += _fractionAmount; // Increase available fractions

        payable(msg.sender).transfer(paymentAmount); // Pay the seller
    }

    // Get details of a store
    function getStoreDetails(uint256 _storeId) external view returns (string memory name, uint256 totalFractions, uint256 pricePerFraction) {
        Store memory store = stores[_storeId];
        return (store.name, store.totalFractions, store.pricePerFraction);
    }

    // Function to see what fractions a user owns
    function getUserFractions(address user, uint256 _storeId) external view returns (uint256) {
        return balanceOf(user, _storeId); // Returns the number of fractions the user owns for a specific store
    }
}
