var PrivateKeyProvider = require('truffle-privatekey-provider');

module.exports = {
    networks: {
        development: {
            host: '127.0.0.1',
            port: 8545,
            network_id: '*',
            gas: 10000000,
            gasPrice: 1
        },
        production: {
            provider: () => new PrivateKeyProvider(process.env.PK, 'https://mainnet.infura.io'),
            network_id: 1,
            gasPrice: 10000000000,
            gas: 4000000
        },
        ropsten: {
            provider: () => new PrivateKeyProvider(process.env.PK, 'https://ropsten.infura.io'),
            network_id: 3,
            gasPrice: 10000000000
        },
        coverage: {
            host: 'localhost',
            network_id: '*',
            port: 6545,
            gas: 0xfffffffffff,
            gasPrice: 0x01
        },
        test3: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*", // Match any network id
            // gas: 4712388,
            // gasPrice: 200000000000,
            //from: "0xbf12c73ccc1f7f670bf80d0bba93fe5765df9fec",
            from: "0x06f6B911A07E73E90FD9Dcb56C970cdBaA7E4e52"
          },
          test4: {
            host: "192.168.1.19",
            port: 3333,
            network_id: "*", // Match any network id
            gas: 4712388,
            gasPrice: 180000000000,
            from: "0xbf12c73ccc1f7f670bf80d0bba93fe5765df9fec",
            //from: "0x06f6B911A07E73E90FD9Dcb56C970cdBaA7E4e52"
          },
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 1000000
        }
    },
    mocha: {
        enableTimeouts: false
    }
};
