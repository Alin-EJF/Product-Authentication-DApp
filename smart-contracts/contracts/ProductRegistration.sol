// SPDX-License-Identifier: MIT

pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

contract ProductRegistration {
    struct Product {
        uint256 id;
        string productName;
        string productDescription;
        uint256 dateOfRegistration;
        string[] locationOfRegistration;
        string[] locationsOfUpdates;
        uint256 dateOfUpdate;
        string batch;
        uint256[] prices;
        string[] certifications;
        string manufacturer;
        string distributor;
        string retailer;
        address[] owners;
        bool isRegistered;
    }

    mapping(uint256 => Product) public products;
    mapping(uint256 => address) public lastUpdatedBy;
    uint256 public productCount = 0;

    event ProductUpdated(
        uint256 indexed id,
        string locationOfUpdate,
        uint256 price,
        string certification,
        address updatedBy,
        uint256 dateOfUpdate
    );

    event ProductRegistered(
        uint256 indexed id,
        string productName,
        uint256 dateOfRegistration
    );

    constructor() public {
        registerProduct(
            "First product ever",
            "Product Description 1",
            "Location1",
            "Batch1",
            100,
            "certification1",
            "Manufacturer1",
            "Distributor1",
            "Retailer1"
        );
    }

    function generateRandomId() private view returns (uint256) {
        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.difficulty))
        ) % 1e12;
        return randomNumber;
    }

    function registerProduct(
        string memory productName,
        string memory productDescription,
        string memory locationOfRegistration,
        string memory batch,
        uint256 price,
        string memory certification,
        string memory manufacturer,
        string memory distributor,
        string memory retailer
    ) public {
        require(bytes(productName).length > 0, "Product name is required");
        require(
            bytes(productDescription).length > 0,
            "Product description is required"
        );
        require(
            bytes(locationOfRegistration).length > 0,
            "Location is required"
        );
        require(
            bytes(manufacturer).length > 0 || bytes(distributor).length > 0,
            "Provider name is required for registration"
        );
        require(bytes(batch).length > 0, "Batch is required");

        uint256 productId = generateRandomId();

        productCount++;
        if (productCount == 1) productId = 1;

        string[] memory locationOfRegistrations = new string[](1);
        locationOfRegistrations[0] = locationOfRegistration;

        uint256[] memory prices = new uint256[](1);
        prices[0] = price;

        string[] memory certifications = new string[](1);
        certifications[0] = certification;

        address[] memory owners = new address[](1);
        owners[0] = msg.sender;

        products[productId] = Product(
            productId,
            productName,
            productDescription,
            block.timestamp,
            locationOfRegistrations,
            new string[](0),
            0,
            batch,
            prices,
            certifications,
            manufacturer,
            distributor,
            retailer,
            owners,
            true
        );
        emit ProductRegistered(productId, productName, block.timestamp);
    }

    function updateProduct(
        uint256 id,
        string memory locationOfUpdate,
        uint256 price,
        string memory certification,
        string memory distributor,
        string memory retailer
    ) public {
        require(products[id].isRegistered, "Product not found");
        require(
            bytes(distributor).length > 0 || bytes(retailer).length > 0,
            "Provider is required for update"
        );

        products[id].locationsOfUpdates.push(locationOfUpdate);
        products[id].dateOfUpdate = block.timestamp;
        if (bytes(distributor).length > 0) {
            products[id].distributor = distributor;
        }
        if (bytes(retailer).length > 0) {
            products[id].retailer = retailer;
        }
        if (price > 0) {
            products[id].prices.push(price);
        }

        products[id].owners.push(msg.sender);
        products[id].certifications.push(certification);

        lastUpdatedBy[id] = msg.sender;

        emit ProductUpdated(
            id,
            locationOfUpdate,
            price,
            certification,
            lastUpdatedBy[id],
            block.timestamp
        );
    }

    //for "Add me as owner" button
    function addOwner(uint256 id) public {
        require(products[id].isRegistered, "Product not found");
        products[id].owners.push(msg.sender);
    }

    function getProduct(uint256 id) public view returns (Product memory) {
        require(products[id].isRegistered, "Product not found");
        return products[id];
    }
}
