var ProductRegistration = artifacts.require("./ProductRegistration.sol");

module.exports = function(deployer) {
  deployer.deploy(ProductRegistration);
};