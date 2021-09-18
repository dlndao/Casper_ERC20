import { Model } from 'sequelize';

export class NFT extends Model {
  public id!: number;
  public tokenId!: number;
  public address!: string;
  public isNFTMemberEnabled?: boolean;
  public isNFTAdminEnabled?: boolean;
}
