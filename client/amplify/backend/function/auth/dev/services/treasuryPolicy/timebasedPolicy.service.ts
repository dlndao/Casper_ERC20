require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const Web3 = require('web3');

const GenericERC20 = require('./abi/GenericERC20.json').abi;
const ERC20Wallet = require('./abi/ERC20Wallet.json').abi;

const NODE_API_KEY = process.env.INFURA_KEY;

const custodian = {
  public: process.env.PUBLIC_KEY,
  private: [process.env.PRIVATE_KEY],
};

const rinkebyNodeUrl = 'https://rinkeby.infura.io/v3/' + NODE_API_KEY;
const provider = new HDWalletProvider(custodian.private, rinkebyNodeUrl);

const web3 = new Web3(provider.engine);

const TETHTokenAddress = process.env.TETH_TOKEN_CONTRACT_ADDRESS;
const TUSDCTokenAddress = process.env.TUSDC_TOKEN_CONTRACT_ADDRESS;
const TUSDTTokenAddress = process.env.TUSDT_TOKEN_CONTRACT_ADDRESS;
const TDAITokenAddress = process.env.TDAI_TOKEN_CONTRACT_ADDRESS;
const METHTokenAddress = process.env.METH_TOKEN_CONTRACT_ADDRESS;
const MUSDCTokenAddress = process.env.MUSDC_TOKEN_CONTRACT_ADDRESS;
const MUSDTTokenAddress = process.env.MUSDT_TOKEN_CONTRACT_ADDRESS;
const MDAITokenAddress = process.env.MDAI_TOKEN_CONTRACT_ADDRESS;
const TreasuryWalletAddr = process.env.TREASURY_WALLET_ADDRESS;
const TestDMMWalletAddr = process.env.TEST_DMM_WALLET_ADDRESS;

const _DepositWalletContract = (depositAddress) =>
  new web3.eth.Contract(ERC20Wallet, depositAddress).methods;

const GenericERC20Contract = (tokenAddress) =>
  new web3.eth.Contract(GenericERC20, tokenAddress).methods;

const GAS_PRICE = 1000000000;
const GAS_AMOUNT = 3000000;

const owner = '0x5be0d5da30daf9a8c581cd6f46432f9e1f478102';

const getBalance = async (tokenAddress, ownerAddress) => {
  const balance = await GenericERC20Contract(tokenAddress)
    .balanceOf(ownerAddress)
    .call();
  return balance;
};

const tokens = {
  testAssets: [
    {
      address: TETHTokenAddress,
      tokenSymbol: 'tETH',
      map: 'ETH',
      tokenDecimal: '18',
    },
    {
      address: TUSDCTokenAddress,
      tokenSymbol: 'tUSDC',
      map: 'USDC',
      tokenDecimal: '18',
    },
    {
      address: TUSDTTokenAddress,
      tokenSymbol: 'tUSDT',
      map: 'USDT',
      tokenDecimal: '18',
    },
    {
      address: TDAITokenAddress,
      tokenSymbol: 'tDAI',
      map: 'DAI',
      tokenDecimal: '18',
    },
  ],
  DMMAssets: [
    {
      address: METHTokenAddress,
      map: 'ETH',
      tokenSymbol: 'mETH',
      tokenDecimal: '18',
    },
    {
      address: MUSDCTokenAddress,
      map: 'USDC',
      tokenSymbol: 'mUSDC',
      tokenDecimal: '18',
    },
    {
      address: MUSDTTokenAddress,
      map: 'USDT',
      tokenSymbol: 'mUSDT',
      tokenDecimal: '18',
    },
    {
      address: MDAITokenAddress,
      map: 'DAI',
      tokenSymbol: 'mDAI',
      tokenDecimal: '18',
    },
  ],
};

const addDMMTokenToTreasury = async () => {
  for (const token of tokens.DMMAssets) {
    const balance = await getBalance(token.address, TestDMMWalletAddr);
    console.log(balance);

    const addDMMWalletTokenToTreasuryWallet = await _DepositWalletContract(
      TestDMMWalletAddr
    )
      .sweepWallet(token.address, TreasuryWalletAddr, balance)
      .send({
        from: owner,
        gas: GAS_AMOUNT,
        gasPrice: GAS_PRICE,
      });
    console.log(addDMMWalletTokenToTreasuryWallet);
  }
};

const addTreasuryTokenToDMM = async () => {
  for (const token of tokens.testAssets) {
    const balance = await getBalance(token.address, TreasuryWalletAddr);
    console.log(balance);
    const addTreasuryWalletTokenToDMM = await _DepositWalletContract(
      TreasuryWalletAddr
    )
      .sweepWallet(token.address, TestDMMWalletAddr, balance)
      .send({
        from: owner,
        gas: GAS_AMOUNT,
        gasPrice: GAS_PRICE,
      });
    console.log(addTreasuryWalletTokenToDMM);
  }
};

export const invest = async () => {
  await addDMMTokenToTreasury();
  await addTreasuryTokenToDMM();
};
