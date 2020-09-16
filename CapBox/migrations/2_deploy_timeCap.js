var timeCap = artifacts.require("./TimeCap.sol");

module.exports = function(deployer) {
    deployer.deploy(timeCap);
}