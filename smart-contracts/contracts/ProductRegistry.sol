/*This contract is responsible for managing the registration of products,
 including their unique identifiers, descriptions, and other relevant information.
*/

pragma solidity ^0.8.0;

contract ProductRegistry {
    struct Product {
        uint256 id;
        address provider;
        string name;
        string description;
        uint256 timestamp;
        bool isRegistered;
        //more..
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount;

    event ProductRegistered(uint256 indexed id, address indexed provider, string name, string description, uint256 timestamp);//successfully registered 

    function registerProduct(string memory name, string memory description) public {
        productCount++;
        products[productCount] = Product(productCount, msg.sender, name, description, block.timestamp, true);
        emit ProductRegistered(productCount, msg.sender, name, description, block.timestamp); //notify success
    }

    function getProduct(uint256 id) public view returns (Product memory) {
        require(products[id].isRegistered, "Product not found");
        return products[id];
    }
}

/*
contract ProductRegistration {
    struct Product {
        uint256 id;
        string name;
        string description;
        string image;
    }

    mapping(uint256 => Product) public products;
    uint256 public nextProductId;

    function registerProduct(string memory _name, string memory _description, string memory _image) public {
        products[nextProductId] = Product(nextProductId, _name, _description, _image);
        nextProductId++;
    }
}
*/