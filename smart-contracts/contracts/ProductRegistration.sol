// SPDX-License-Identifier: MIT

pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

contract ProductRegistration {
    struct Product {
        uint256 id;
        string productName;
        string productDescription;
        uint256 dateOfRegistration;
        string[] geoLocations;
        string batch;
        uint256[] prices;
        string[] certifications;
        string manufacturer;
        string distributor;
        string retailer;
        address owner;
        bool isRegistered;
    }

    mapping(uint256 => Product) public products;
    mapping(uint256 => address) public lastUpdatedBy;
    uint256 public productCount = 0;

    event ProductUpdated(
        uint256 indexed id,
        string geoLocation,
        uint256 dateOfRegistration,
        uint256 price,
        address updatedBy
    );

    event ProductRegistered(
        uint256 indexed id,
        string indexed productName,
        string productDescription,
        uint256 dateOfRegistration,
        string geoLocation,
        string batch,
        uint256 price,
        string[] certifications
    );

    constructor() public {
        string[] memory certifications1 = new string[](2);
        certifications1[0] = "Certification1";
        certifications1[1] = "Certification2";

        registerProduct(
            "Product1",
            "Product Description 1",
            "Location1",
            "Batch1",
            100,
            certifications1,
            "Manufacturer1",
            "Distributor1",
            "Retailer1"
        );

        string[] memory certifications2 = new string[](2);
        certifications2[0] = "Certification3";
        certifications2[1] = "Certification4";

        registerProduct(
            "Product2",
            "Product Description 2",
            "Location2",
            "Batch2",
            200,
            certifications2,
            "Manufacturer2",
            "Distributor2",
            "Retailer2"
        );
    }

    function registerProduct(
        string memory productName,
        string memory productDescription,
        string memory geoLocation,
        string memory batch,
        uint256 price,
        string[] memory certifications,
        string memory manufacturer,
        string memory distributor,
        string memory retailer
    ) public {
        require(bytes(productName).length > 0, "Product name is required");
        require(bytes(manufacturer).length > 0, "Manufacturer is required");
        require(
            bytes(productDescription).length > 0,
            "Product description is required"
        );
        require(bytes(batch).length > 0, "Batch is required");

        productCount++;

        string[] memory geoLocations = new string[](1);
        geoLocations[0] = geoLocation;

        uint256[] memory prices = new uint256[](1);
        prices[0] = price;

        products[productCount] = Product(
            productCount,
            productName,
            productDescription,
            block.timestamp,
            geoLocations,
            batch,
            prices,
            certifications,
            manufacturer,
            distributor,
            retailer,
            msg.sender, // set the owner to be the address from which the contract is called
            true
        );
        emit ProductRegistered(
            productCount,
            productName,
            productDescription,
            block.timestamp,
            geoLocation,
            batch,
            price,
            certifications
        );
    }

    function updateProduct(
        uint256 id,
        string memory geoLocation,
        uint256 price,
        string[] memory certifications,
        string memory distributor,
        string memory retailer
    ) public {
        require(products[id].isRegistered, "Product not found");

        products[id].geoLocations.push(geoLocation);
        products[id].dateOfRegistration = block.timestamp;
        if (bytes(distributor).length > 0) {
            products[id].distributor = distributor;
        }
        if (bytes(retailer).length > 0) {
            products[id].retailer = retailer;
        }
        if (price > 0) {
            products[id].prices.push(price);
        }

        // append new certifications
        for (uint i = 0; i < certifications.length; i++) {
            products[id].certifications.push(certifications[i]);
        }

        lastUpdatedBy[id] = msg.sender;

        emit ProductUpdated(
            id,
            geoLocation, // It should take the last inserted geoLocation
            block.timestamp,
            price, // It should take the last inserted price
            msg.sender
        );
    }

    function addOwner(uint256 id, address newOwner) public {
        require(products[id].isRegistered, "Product not found");
        products[id].owner = newOwner;
    }

    function getProduct(uint256 id) public view returns (Product memory) {
        require(products[id].isRegistered, "Product not found");
        return products[id];
    }
}
