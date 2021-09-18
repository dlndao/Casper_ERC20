export const web3Config = () => {
  let web3;

  const setWeb3 = (data) => {
    web3 = data;
  };

  const getWeb3 = () => web3;

  return {
    setWeb3,
    getWeb3,
  };
};
