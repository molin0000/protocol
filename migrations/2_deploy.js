const HybridExchange = artifacts.require('HybridExchange');
const Proxy = artifacts.require('Proxy');
const TestToken = artifacts.require('TestToken');
const WethToken = artifacts.require('WethToken');


module.exports = async (deployer, network) => {
    let hotAddress;

    const deployHydroMainContract = async hotAddress => {

        await deployer.deploy(AssemblyCall);
        await deployer.link(AssemblyCall, CollateralAccounts)
        await deployer.link(AssemblyCall, Discount)
        await deployer.link(AssemblyCall, BatchActions)
        await deployer.link(AssemblyCall, Auctions)

        await deployer.deploy(Transfer);
        await deployer.link(Transfer, CollateralAccounts)
        await deployer.link(Transfer, Discount)
        await deployer.link(Transfer, BatchActions)
        await deployer.link(Transfer, Auctions)
        await deployer.link(Transfer, Exchange)




        await deployer.deploy(CollateralAccounts);
        await deployer.link(CollateralAccounts, BatchActions);
        await deployer.link(CollateralAccounts, Auctions);
        await deployer.link(CollateralAccounts, Exchange);



        await deployer.deploy(BatchActions);
        await deployer.deploy(Auctions);
        await deployer.deploy(OperationsComponent);

        await deployer.deploy(Discount);
        await deployer.link(Discount, Exchange);

        await deployer.deploy(Signature);
        await deployer.link(Signature, Exchange);


        await deployer.deploy(Exchange);


        await deployer.link(BatchActions, Hydro);
        await deployer.link(OperationsComponent, Hydro);
        await deployer.link(Auctions, Hydro);

        await deployer.link(Discount, Hydro);
        await deployer.link(Exchange, Hydro);
        await deployer.link(Signature, Hydro);
        await deployer.link(CollateralAccounts, Hydro);
        await deployer.link(AssemblyCall, Hydro);
        await deployer.link(Transfer, Hydro);



        await deployer.deploy(Hydro, hotAddress);
    };

    // for development & test
    await deployer.deploy(TestToken, "MoLin coins in wanchain", "WML", 18);
    hot = await TestToken.deployed();
    
    await deployer.deploy(WethToken);

    await deployer.deploy(Proxy);
    proxy = await Proxy.deployed();

    await deployer.deploy(HybridExchange, proxy, hot);

};
