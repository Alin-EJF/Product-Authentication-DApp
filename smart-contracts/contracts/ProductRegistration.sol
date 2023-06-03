pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

contract ProductRegistration {
    struct Product {
        uint256 id;
        string productName;
        string productDescription;
        uint256 dateOfRegistration;
        string geoLocation;
        string batch;
        uint256 price;
        string[] certifications;
        bool isRegistered;
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount = 0;

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
            certifications1
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
            certifications2
        );
    }

    function registerProduct(
        string memory productName,
        string memory productDescription,
        string memory geoLocation,
        string memory batch,
        uint256 price,
        string[] memory certifications
    ) public {
        require(bytes(productName).length > 0, "Product name is required");
        require(
            bytes(productDescription).length <= 500,
            "Product description is too long"
        );

        productCount++;
        products[productCount] = Product(
            productCount,
            productName,
            productDescription,
            block.timestamp,
            geoLocation,
            batch,
            price,
            certifications,
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

    function getProduct(uint256 id) public view returns (Product memory) {
        require(products[id].isRegistered, "Product not found");
        return products[id];
    }
}
