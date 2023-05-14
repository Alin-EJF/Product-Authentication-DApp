/*To ensure that only authorized parties can interact with the other smart contracts, 
you may need an access control contract. 
This contract can manage roles and permissions for different users,
 such as manufacturers, distributors, retailers, and consumers. 
 It can include functions to grant and revoke access, 
 as well as to check whether a user has the necessary permissions to perform certain actions.
 */

 pragma solidity ^0.5.0;

contract AccessControl {
    mapping(address => string) public userRoles;

    function setUserRole(address _user, string memory _role) public {
        userRoles[_user] = _role;
    }

    function getUserRole(address _user) public view returns (string memory) {
        return userRoles[_user];
    }
}
