/*This contract manages the ownership and transfer of products between different parties.
 It can include functions for transferring ownership, 
 verifying the current owner, and maintaining a history of ownership transfers.
  You might consider implementing an ERC721 token for this purpose, as it allows for unique,
   non-fungible tokens to represent individual products. 
This approach has the advantage of leveraging existing standards
 and tools within the Ethereum ecosystem.*/

pragma solidity ^0.8.0;

contract ProductOwnership {
    struct Ownership {
        uint256 productId;
        address owner;
        uint256 timestamp;
    }

    mapping(uint256 => Ownership[]) public ownershipHistory;

    function transferOwnership(uint256 _productId, address _newOwner) public {
        ownershipHistory[_productId].push(Ownership(_productId, _newOwner, now));
    }
}