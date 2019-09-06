const HybridExchange = artifacts.require('HybridExchange');
const ProxySol = artifacts.require('Proxy');
const TestToken = artifacts.require('TestToken');
const WethToken = artifacts.require('WethToken');


module.exports = async (deployer, network) => {

    await deployer.deploy(ProxySol);
};
