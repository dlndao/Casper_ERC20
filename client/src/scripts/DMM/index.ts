import axios from 'axios';

export const getDmmTokens = async () => {
  const baseUrl = 'https://api.defimoneymarket.com';
  const tokensList = await axios.get(`${baseUrl}/v1/dmm/tokens`);
  const tokens = tokensList.data;
  return tokens.data;
  // .reduce((map, token) => {
  //   token.dmmTokenId = token['dmm_token_id'];
  //   token.address = token['dmm_token_address'];
  //   token.imageUrl = token['image_url'];
  //   token.underlyingTokenAddress = token['underlying_token_address'];
  //   return { ...map, [token.underlyingTokenAddress]: token };
  // }, {});
};
