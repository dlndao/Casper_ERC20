# CasperLabs ERC20

Implementation of ERC20 token for the CasperLabs platform.

## tUSDT	
Test token representing USDT stable token, this is used to represent the USDT tokens a user may have. In the actual system on the main net, we will use the actual USDT.

### Deployed contract
https://testnet.cspr.live/deploy/fce03274cd46af79ed525f71a9605906ac317cb463e8f29f8d6384570de7fe87

## aUSDT	
To allow the user to have an indication of the stable token that the user has deposited. It is an internal token representing USDT stable token. In the next milestone, the mint and redeem facilities will be added.

### Deployed contract
https://testnet.cspr.live/deploy/cf5b5b8ab8c804678452c3142501757df1bd83b7f2e01b3fdc2ca1ce8d2811e5

## tUSDC	
Test token representing USDC stable token, this is used to represent the USDC tokens a user may have. In the actual system on the main net, we will use the actual USDC.

### Deployed contract
https://testnet.cspr.live/deploy/890e9fe4f3aa07091dfa5a312590a831c68dbfefeb9cc48aa1898dfcc4730ded

## aUSDC	
Internal token representing USDC stable token. The user will be able to mint aUSDC with their tUSDC on the test network, then using USDC on the mainnet.

### Deployed contract
https://testnet.cspr.live/deploy/eee902170a2e4fb310ee3be1be5a6332a9b614eefba9649f91a190fa871aa26b

## DLN	
The system needs an internal token representing the DLN stable token. At inception it is only piged to the USD to make the computations easier. 

### Deployed contract
https://testnet.cspr.live/deploy/59b56591cf5703b5e178628f8147a501a364cc06f551ea0fd21bd47e8ade9802

## DLNG 
This is the internal governance token, it will serve two purposes: governance and access to the protocol generated revenue.
In the final phase of the system rollout, the governance tokens will be generated. Upon backing of users or protocol, DLNG is emitted

### Deployed contract
https://testnet.cspr.live/deploy/0d19587b0466a254cfcd317d8eb809499776b38b8c93b7c86508769699b7ef3c


## Install
Make sure `wasm32-unknown-unknown` is installed.
```bash
$ make prepare
```

## Build Smart Contract
```bash
$ make build-contract
```

## Test
Test logic and smart contract.
```bash
$ make test
```
