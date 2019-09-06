const Hydro = artifacts.require('Hydro');
const PriceOracle = artifacts.require('./helper/PriceOracle');
const HydroToken = artifacts.require('HydroToken');
const FeedPriceOracle = artifacts.require('FeedPriceOracle');
const TestToken = artifacts.require('TestToken');
const ConstPriceOracle = artifacts.require('ConstPriceOracle');
const DefaultInterestModel = artifacts.require('DefaultInterestModel');
const StableCoinInterestModel = artifacts.require('StableCoinInterestModel');
const CommonInterestModel = artifacts.require('CommonInterestModel');
const Signature = artifacts.require('Signature');
const Discount = artifacts.require('Discount');
const Exchange = artifacts.require('Exchange');
const CollateralAccounts = artifacts.require('CollateralAccounts');
const AssemblyCall = artifacts.require('AssemblyCall');
const Transfer = artifacts.require('Transfer');




const Auctions = artifacts.require('Auctions');
const BatchActions = artifacts.require('BatchActions');
const OperationsComponent = artifacts.require('OperationsComponent');

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

    if (network == 'production') {
        hotAddress = '0x9af839687f6c94542ac5ece2e317daae355493a1';
        await deployHydroMainContract(hotAddress);
        await deployer.deploy(StableCoinInterestModel);
        await deployer.deploy(CommonInterestModel);
    } else if (network == 'kovan') {
        hotAddress = '0x16c4f3DcFcC23fAA9fc8e3E849BDf966953beE91';
        await deployHydroMainContract(hotAddress);
        await deployer.deploy(StableCoinInterestModel);
        await deployer.deploy(CommonInterestModel);
        // use Price Oracle for test
        await deployer.deploy(PriceOracle);
    } else if (network == 'ropsten') {
        hotAddress = '0x9568e9Eaf8076230A39f173A85FA38CC9776BC25';
        await deployer.deploy(TestToken, 'Test Ethereum', 'tETH', 18);
        await deployHydroMainContract(hotAddress);
        await deployer.deploy(StableCoinInterestModel);
        await deployer.deploy(CommonInterestModel);
    } else {
        // for development & test
        await deployer.deploy(HydroToken);
        hot = await HydroToken.deployed();
        await deployHydroMainContract(hot.address);
        await deployer.deploy(DefaultInterestModel);
        await deployer.deploy(PriceOracle);
    }
};
