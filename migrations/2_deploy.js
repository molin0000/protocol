const HybridExchange = artifacts.require('HybridExchange');
const Proxy = artifacts.require('Proxy');
const TestToken = artifacts.require('TestToken');
const WethToken = artifacts.require('WethToken');


module.exports = async (deployer, network) => {
    let hotAddress;

    // for development & test
    await deployer.deploy(TestToken, "MoLin coins in wanchain", "WML", 18);
    hot = await TestToken.deployed();
    
    await deployer.deploy(Proxy);
    proxy = await Proxy.deployed();

    await deployer.deploy(HybridExchange, proxy, hot);

    await deployer.deploy(WethToken);
};
