const HybridExchange = artifacts.require('HybridExchange');
const Proxy = artifacts.require('Proxy');
const TestToken = artifacts.require('TestToken');
const WethToken = artifacts.require('WethToken');


module.exports = async (deployer, network) => {
    await deployer.deploy(TestToken, "MoLin coins in wanchain", "WML", 18);
};
