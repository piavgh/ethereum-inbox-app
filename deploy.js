require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const {
    interface,
    bytecode
} = require('./compile');

const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    'https://rinkeby.infura.io/v3/ebaf1785cc1b4f319e0ff07f26cadae8'
);

const web3 = new Web3(provider);

try {
    (async () => {
        const accounts = await web3.eth.getAccounts();

        console.log("Account", accounts[0]);

        const result = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({
                data: '0x' + bytecode,
                arguments: ['My name is Hoang']
            })
            .send({
                from: accounts[0],
                gas: '2000000'
            });

        console.log('Contract deployed to', result.options.address);
    })();
} catch (err) {
    console.log(err);
}