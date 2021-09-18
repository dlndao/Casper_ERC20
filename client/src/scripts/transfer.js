// const Web3 = require('web3');
// const provider = new Web3.providers.HttpProvider(
//   'https://rinkeby.infura.io/v3/83fb83d143d2426f9c550449c23a58f3'
// );
// const web3 = new Web3(provider);

// /* NETWORK AND LIB VERSION CHECKS*/
// web3.eth.net
//   .isListening()
//   .then(() => console.log('web3 is connected'))
//   .catch((e) => console.log('Wow. Something went wrong'));
var Tx = require('ethereumjs-tx').Transaction;
const { web3 } = require('./wallet/config');
// NFTKeyContractAddress   this is the NFT used as a key to unlock the transactions.
var contractAddress = '0x96606aeA94d255EC47C576605E4E2800FcbB8Ec8';

// valutWalletWalletContractAddress, used to securly store the assets and owned by the contract, nt the external wallet.
const walletContractAddress = '0xC5002636bb11840e5acc4bC8fe5bbC23faF0ACE3';
var abiArray = require('./abi.json');
const walletAbi = require('./wallet.json');

var contract = new web3.eth.Contract(abiArray, contractAddress);
const walletContract = new web3.eth.Contract(walletAbi, walletContractAddress);

export const transfer = async (address) => {
  console.log(`web3 version: ${web3.version}`);

  /* ADDRESSES */
  // NFTKeyMinterAddress, the address that minted the original NFTKey
  var myAddress = '0x6ba55bd54688b8dd81747876c84c6aaafe314311';
  var destAddress = address;

  // 1.Nonce: Determine the nonce
  var count = await web3.eth.getTransactionCount(myAddress);
  console.log(`num transactions so far: ${count}`);

  // 2.token amount - token is divisible to 0 decimals hence 1 = 1 token
  // var transferAmount = 1;

  // How many tokens do I have before sending?
  var balance = await contract.methods.balanceOf(myAddress).call();
  console.log(`Balance before send: ${balance}`);

  const ownerTokenIds = await checkNftOwner(myAddress);

  // I chose gas price and gas limit based on what ethereum wallet was recommending for a similar transaction. You may need to change the gas price!
  var rawTransaction = {
    from: myAddress,
    // contractAddress,
    nonce: '0x' + count.toString(16),
    // gasPrice: web3.utils.toHex(10),
    gasPrice: '0x003B9ACA00',
    // gasLimit: web3.utils.toHex(90000),
    gasLimit: '0x250CA',
    to: contractAddress,
    value: '0x00',
    // value: '0x09',
    data: contract.methods
      .transferFrom(myAddress, destAddress, ownerTokenIds && ownerTokenIds[0])
      .encodeABI(),
    chainId: 3,
  };

  const privKey_ =
    '1d326781104cc704bed09b835d56002a7831c6d433523a023c46b281e3abc91d';
  const privKey = new Buffer.from(privKey_, 'hex');
  const tx = new Tx(rawTransaction, { chain: 'rinkeby' });
  //var tx = new Tx(rawTransaction,{chain:'rinkeby', hardfork: 'petersburg'} ); // https://ethereum.stackexchange.com/questions/61771/error-returned-error-invalid-sender
  tx.sign(privKey);
  var serializedTx = tx.serialize();

  console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}`);
  var receipt = await web3.eth
    .sendSignedTransaction('0x' + serializedTx.toString('hex'))
    .catch((err) => err);
  console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);

  // The balance may not be updated yet, but let's check
  balance = await contract.methods.balanceOf(myAddress).call();
  console.log(`Balance after send: ${balance}`);
  return {
    receipt,
  };
};

export const checkNftOwner = async (address) => {
  return await contract.methods.tokensOfOwner(address).call();
};

export const withdraw = async (address) => {
  // Get the list of NFTKey(s) in the calling address
  const ownerTokenIds = await checkNftOwner(address);
  console.log(ownerTokenIds);
  // Check if the NFTKey list length is more that 0, which means the calling wallet address owns one ore more.
  if (ownerTokenIds.length) {
    const trans = await walletContract.methods.withdraw().send();
    console.log(trans);
    return trans;
  } else {
    // NFTKey proof of ownership NOT met, disallow transaction :-(
    alert(
      'The NFTKey is not present in the calling address, withdraw forbidden'
    );
  }
};
