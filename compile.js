const path = require('path');
const fs = require('fs');
const solc = require('solc');
const campaignPath = path.resolve(__dirname , 'contracts', 'Campaign.sol');
const proxyPath = path.resolve(__dirname, 'contracts', 'Proxy.sol');
const campaignSource = fs.readFileSync(campaignPath, 'utf-8');
const proxySource = fs.readFileSync(proxyPath, 'utf-8');

const input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol': {
            'content': campaignSource,
        },
        'Proxy.sol': {
            'content': proxySource
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

module.exports = {
    campaignData: {
        interface: output.contracts['Campaign.sol'].Campaign.abi, 
        bytecode: output.contracts['Campaign.sol'].Campaign.evm.bytecode.object
    },
    proxyData: {
        interface: output.contracts['Proxy.sol'].Proxy.abi, 
        bytecode: output.contracts['Proxy.sol'].Proxy.evm.bytecode.object
    }
};