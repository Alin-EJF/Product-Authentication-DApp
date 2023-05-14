/* This contract will track the location and status of products as they move through the supply chain.
 It will store the product's status (e.g., In transit, Delivered, etc.)
 and location (e.g., GPS coordinates, warehouse, etc.)*/


 /*
pragma solidity ^0.5.0;

contract ProductTracking {
    struct Location {
        uint256 productId;
        string location;
        string status;
        uint256 timestamp;
    }

    mapping(uint256 => Location[]) public productLocations;

    function updateLocation(uint256 _productId, string memory _location, string memory _status) public {
        productLocations[_productId].push(Location(_productId, _location, _status, now));
    }
}

 */