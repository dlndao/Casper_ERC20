import { blockchain } from 'Assets/img';

const {
  web3,
  custodian,
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
  depositAddress,
  MegaWalletContract,
  GenericERC20Contract,
  DepositWalletContract,
  GAS_PRICE,
  GAS_AMOUNT,
  MINT_AMOUNT,
  TRANSFER_AMOUNT,
} = require('./config');

const owner = custodian.public;

export const getWallets = async () =>
  await MegaWalletContract.getWallets().call();

export const getTokenBalance = async (walletAddr, tokenAddress) => {
  const balance = await DepositWalletContract(walletAddr)
    .tokenBalance(tokenAddress)
    .call();
  console.log(balance);
  return balance;
};

export const mint = async (tokenAddress, amount) => {
  amount = amount || MINT_AMOUNT;

  await GenericERC20Contract.mint(tokenAddress, amount).send({
    from: depositAddress,
    gas: GAS_AMOUNT,
    gasPrice: GAS_PRICE,
  });

  const mintedAmount = await GenericERC20Contract.balanceOf(
    depositAddress
  ).call();

  console.log(mintedAmount);
  return mintedAmount;
};

export const createWallet = async (ownerAddr, tokenAddress) => {
  await MegaWalletContract.createWallet(tokenAddress).send({
    from: ownerAddr,
    gas: GAS_AMOUNT,
    gasPrice: GAS_PRICE,
  });

  const wallets = await getWallets();
  console.log(wallets);
  return wallets[wallets.length];
};

export const transfer = async (ownerAddr) => {
  const gasDefaults = {
    from: owner,
    gas: GAS_AMOUNT,
    gasPrice: GAS_PRICE,
  };
  const promise = GenericERC20Contract.transfer(
    depositAddress,
    TRANSFER_AMOUNT
  );
  await promise.send(gasDefaults);

  const destinationBalance = await GenericERC20Contract.balanceOf(
    depositAddress
  ).call();
  console.log(destinationBalance);

  const sourceBalance = await GenericERC20Contract.balanceOf(owner).call();
  console.log(sourceBalance);
};

export const sweep = async (token, to, amount) => {
  const balanceBefore = await GenericERC20Contract.balanceOf(
    depositAddress
  ).call();
  console.log(balanceBefore);

  const wallets = await getWallets();
  console.log(wallets);

  await DepositWalletContract(depositAddress)
    .sweepWallet(token, to, amount)
    .send({
      from: owner,
      gas: GAS_AMOUNT,
      gasPrice: GAS_PRICE,
    });

  const balanceAfter = await GenericERC20Contract.balanceOf(owner).call();
  console.log(balanceAfter);
};

export const withdraw = async (address, amount) => {
  const balanceBf = await getBalance(depositAddress);
  if (balanceBf >= amount && amount > 0) {
    amount = web3.utils.toWei(amount, 'ether');
    const { receipt } = await DepositWalletContract(depositAddress)
      .withdraw(address, amount)
      .send({
        from: owner,
        gas: GAS_AMOUNT,
        gasPrice: GAS_PRICE,
      });

    return receipt;
  }
};

export const getBalance = async (tokenAddress, ownerAddress) => {
  const balance = await GenericERC20Contract(tokenAddress)
    .balanceOf(ownerAddress)
    .call();
  // console.log(balance);
  return balance;
};

export const faucet = async (walletAddr, _token, _to, _amount) => {
  const balanceBefore = await getBalance(_token, _to);
  console.log(balanceBefore);
  _amount = web3.utils.toWei(_amount, 'ether');
  const faucetTrans = await DepositWalletContract(walletAddr)
    .sweepWallet(_token, _to, _amount)
    .send({
      from: owner,
      gas: GAS_AMOUNT,
      gasPrice: GAS_PRICE,
    });

  const balanceAfter = await await getBalance(_token, _to);
  console.log(balanceAfter);
  console.log(faucetTrans);

  return faucetTrans.transactionHash;
};

export const swap = async (
  ownerToken,
  walletToken,
  ownerAddr,
  walletAddr,
  amount
) => {
  amount = web3.utils.toWei(amount, 'ether');

  let ownerBalance = await getBalance(ownerToken, ownerAddr);
  let walletBalance = await getBalance(walletToken, walletAddr);
  console.log(web3.utils.fromWei(ownerBalance, 'ether'));
  console.log(web3.utils.fromWei(walletBalance, 'ether'));

  const addOwnerTokenToWallet = await GenericERC20Contract(ownerToken)
    .transfer(walletAddr, amount)
    .send({
      from: owner,
      gas: GAS_AMOUNT,
      gasPrice: GAS_PRICE,
    });
  // console.log(addOwnerTokenToWallet);
  const addWalletTokenToOwner = await DepositWalletContract(walletAddr)
    .sweepWallet(walletToken, ownerAddr, amount)
    .send({
      from: owner,
      gas: GAS_AMOUNT,
      gasPrice: GAS_PRICE,
    });
  // console.log(addWalletTokenToOwner);

  ownerBalance = await getBalance(ownerToken, ownerAddr);
  walletBalance = await getBalance(walletToken, walletAddr);
  console.log(web3.utils.fromWei(ownerBalance, 'ether'));
  console.log(web3.utils.fromWei(walletBalance, 'ether'));
};

export const swapTokens = async (
  walletAddr,
  tokenA,
  tokenB,
  from,
  to,
  amount
) => {
  await DepositWalletContract(walletAddr)
    .swapTokens(tokenA, tokenB, from, to, amount)
    .send({
      from: owner,
      gas: GAS_AMOUNT,
      gasPrice: GAS_PRICE,
    });

  const fromTokenABalance = await getBalance(tokenA, from);
  const toTokenBBalance = await await getBalance(tokenB, to);

  return { fromTokenABalance, toTokenBBalance };
};

export const tokens = {
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
  DLNAssets: [
    {
      address: AETHTokenAddress,
      tokenSymbol: 'aETH',
      map: 'ETH',
      tokenDecimal: '18',
    },
    {
      address: AUSDCTokenAddress,
      tokenSymbol: 'aUSDC',
      map: 'USDC',
      tokenDecimal: '18',
    },
    {
      address: AUSDTTokenAddress,
      tokenSymbol: 'aUSDT',
      map: 'USDT',
      tokenDecimal: '18',
    },
    {
      address: ADAITokenAddress,
      tokenSymbol: 'aDAI',
      map: 'DAI',
      tokenDecimal: '18',
    },
    {
      address: DLNTokenAddress,
      tokenSymbol: 'DLN',
      map: '',
      tokenDecimal: '18',
    },
    {
      address: DLNGTokenAddress,
      tokenSymbol: 'DLNG',
      map: '',
      tokenDecimal: '18',
    },
  ],
};

export const getTokensBalances = async (walletAddr) => {
  for (const token of tokens) {
    const balance = await getTokenBalance(walletAddr, token.address);
    token['balance'] = balance;
  }
  console.log(tokens);
  return tokens;
};
