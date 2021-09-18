require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const Web3 = require('web3');
const GenericERC20 = require('./contracts/GenericERC20.json').abi;
const MegaWallet = require('./contracts/MegaWallet.json').abi;
const ERC20Wallet = require('./contracts/ERC20Wallet.json').abi;
const StakingERC20Token = require('./contracts/StakingERC20Token.json').abi;
const BackingERC20Token = require('./contracts/BackingERC20Token.json').abi;
const DelegateBackingERC20Token = require('./contracts/DelegateBackingERC20Token.json')
  .abi;

// const NODE_API_KEY = process.env.REACT_APP_RIVET_KEY;
const NODE_API_KEY = process.env.REACT_APP_INFURA_KEY;
const tokenAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS;

const TETHTokenAddress = process.env.REACT_APP_TETH_TOKEN_CONTRACT_ADDRESS;
const TUSDCTokenAddress = process.env.REACT_APP_TUSDC_TOKEN_CONTRACT_ADDRESS;
const TUSDTTokenAddress = process.env.REACT_APP_TUSDT_TOKEN_CONTRACT_ADDRESS;
const TDAITokenAddress = process.env.REACT_APP_TDAI_TOKEN_CONTRACT_ADDRESS;
const AETHTokenAddress = process.env.REACT_APP_AETH_TOKEN_CONTRACT_ADDRESS;
const AUSDCTokenAddress = process.env.REACT_APP_AUSDC_TOKEN_CONTRACT_ADDRESS;
const AUSDTTokenAddress = process.env.REACT_APP_AUSDT_TOKEN_CONTRACT_ADDRESS;
const ADAITokenAddress = process.env.REACT_APP_ADAI_TOKEN_CONTRACT_ADDRESS;
const METHTokenAddress = process.env.REACT_APP_METH_TOKEN_CONTRACT_ADDRESS;
const MUSDCTokenAddress = process.env.REACT_APP_MUSDC_TOKEN_CONTRACT_ADDRESS;
const MUSDTTokenAddress = process.env.REACT_APP_MUSDT_TOKEN_CONTRACT_ADDRESS;
const MDAITokenAddress = process.env.REACT_APP_MDAI_TOKEN_CONTRACT_ADDRESS;
const DLNTokenAddress = process.env.REACT_APP_DLN_TOKEN_CONTRACT_ADDRESS;
const DLNGTokenAddress = process.env.REACT_APP_DLNG_TOKEN_CONTRACT_ADDRESS;
const TestWalletAddr = process.env.REACT_APP_TEST_WALLET_ADDRESS;
const TreasuryWalletAddr = process.env.REACT_APP_TREASURY_WALLET_ADDRESS;
const TestDMMWalletAddr = process.env.REACT_APP_TEST_DMM_WALLET_ADDRESS;
const StakingAddress = '0xe8C198Ee95a96d9B62e7F31989F33d4fE9E89A7B';
const BackingAddress = '0x39f4BC11f59DfB9aC096c16a2a15c5Eb8ea2AA2C';
const DelegateBackingAddress = '0xE77D10275099d6044C7a1Bdb5607F7456fBeE151';
// const DelegateBackingAddress = '0x3D002487Bde5140844Ae4c3fa50CF3420B289f4b';

const factoryAddress = process.env.REACT_APP_FACTORY_CONTRACT_ADDRESS;
const depositAddress = process.env.REACT_APP_DEPOSIT_WALLET_ADDRESS;
const depositFINAddress = process.env.REACT_APP_DEPOSIT_FIN_WALLET_ADDRESS;
const apiKey = process.env.REACT_APP_API_KEY;

const custodian = {
  public: process.env.REACT_APP_PUBLIC_KEY,
  private: [process.env.REACT_APP_PRIVATE_KEY],
};

const rinkebyNodeUrl = 'https://rinkeby.infura.io/v3/' + NODE_API_KEY;
// const rinkebyNodeUrl = `https://${NODE_API_KEY}.rinkeby.rpc.rivet.cloud/`;
const provider = new HDWalletProvider(custodian.private, rinkebyNodeUrl);

const web3 = new Web3(provider.engine);

const MegaWalletContract = new web3.eth.Contract(MegaWallet, factoryAddress)
  .methods;

const StakingERC20TokenContract = new web3.eth.Contract(
  StakingERC20Token,
  StakingAddress
).methods;

const BackingERC20TokenContract = new web3.eth.Contract(
  BackingERC20Token,
  BackingAddress
).methods;

const DelegateBackingERC20TokenContract = new web3.eth.Contract(
  DelegateBackingERC20Token,
  DelegateBackingAddress
).methods;

const GenericERC20Contract = (tokenAddress) =>
  new web3.eth.Contract(GenericERC20, tokenAddress).methods;

const DepositWalletContract = (depositAddress) =>
  new web3.eth.Contract(ERC20Wallet, depositAddress).methods;

const GAS_PRICE = 1000000000;
const GAS_AMOUNT = 3000000;
const MINT_AMOUNT = '1000000000000000000000000000';
const TRANSFER_AMOUNT = 100000;

module.exports = {
  web3,
  custodian,
  apiKey,
  tokenAddress,
  TETHTokenAddress,
  TUSDCTokenAddress,
  TUSDTTokenAddress,
  TDAITokenAddress,
  AETHTokenAddress,
  AUSDCTokenAddress,
  AUSDTTokenAddress,
  ADAITokenAddress,
  DLNTokenAddress,
  DLNGTokenAddress,
  METHTokenAddress,
  MUSDCTokenAddress,
  MUSDTTokenAddress,
  MDAITokenAddress,
  factoryAddress,
  depositAddress,
  TestWalletAddr,
  TreasuryWalletAddr,
  TestDMMWalletAddr,
  depositFINAddress,
  MegaWalletContract,
  StakingERC20TokenContract,
  BackingERC20TokenContract,
  DelegateBackingERC20TokenContract,
  GenericERC20Contract,
  DepositWalletContract,
  GAS_PRICE,
  GAS_AMOUNT,
  MINT_AMOUNT,
  TRANSFER_AMOUNT,
};
