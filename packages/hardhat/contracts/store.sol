// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StoreFraction is ERC20, Ownable {

    struct Store {
        string name;
        uint256 totalFractions; // Total fractions available for this store
        uint256 pricePerFraction; // Price per fraction in wei
    }

    mapping(uint256 => Store) public stores;
    uint256 public storeCount; // Keeps track of the number of stores

    constructor() ERC20("Store Fraction Token", "SFT") {
        // Predefine the stores with fractions, initially owned by the app owner
        _addStore("Store A", 100, 1 ether); // 100 fractions, 1 ETH each
        _addStore("Store B", 200, 0.5 ether); // 200 fractions, 0.5 ETH each
        _addStore("Store C", 150, 0.75 ether); // 150 fractions, 0.75 ETH each
    }

    function _addStore(string memory _name, uint256 _totalFractions, uint256 _pricePerFraction) internal {
        storeCount += 1;
        stores[storeCount] = Store(_name, _totalFractions, _pricePerFraction);
        _mint(owner(), _totalFractions); // Mint the total fractions to the app owner
    }

    // Buy fractions of a store
    function buyFractions(uint256 _storeId, uint256 _fractionAmount) external payable {
        Store memory store = stores[_storeId];
        require(store.totalFractions >= _fractionAmount, "Not enough fractions available");
        require(msg.value == store.pricePerFraction * _fractionAmount, "Incorrect payment amount");

        stores[_storeId].totalFractions -= _fractionAmount;
        _transfer(owner(), msg.sender, _fractionAmount); // Transfer fractions from app owner to buyer
    }

    // Sell fractions back to the app owner
    function sellFractions(uint256 _storeId, uint256 _fractionAmount) external {
        require(balanceOf(msg.sender) >= _fractionAmount, "Not enough fractions to sell");

        Store memory store = stores[_storeId];
        uint256 paymentAmount = store.pricePerFraction * _fractionAmount;

        // Transfer fractions from the seller to the app owner
        _transfer(msg.sender, owner(), _fractionAmount);
        stores[_storeId].totalFractions += _fractionAmount;

        payable(msg.sender).transfer(paymentAmount); // Pay the seller
    }

    // Get details of a store
    function getStoreDetails(uint256 _storeId) external view returns (string memory name, uint256 totalFractions, uint256 pricePerFraction) {
        Store memory store = stores[_storeId];
        return (store.name, store.totalFractions, store.pricePerFraction);
    }
}
