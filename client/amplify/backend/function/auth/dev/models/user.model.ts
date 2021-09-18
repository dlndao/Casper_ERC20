import { Model } from 'sequelize';

export class User extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public nonce!: number;
  public publicAddress!: string;
  public username?: string;
  public firstName?: string;
  public lastName?: string;
  public phone?: string;
  public email?: string;
  public facebook?: string;
  public twitter?: string;
  public instagram?: string;
  public telegram?: string;
  public country?: string;
  public city?: string;
  public ip?: string;
  public os?: string;
  public browser?: string;
  public geolocation?: string;
  public gender?: string;
  public age?: string;
  public myReferralCode?: string;
  public referredByCode?: string;
  public referredByCount?: number;
  public isAdmin?: boolean;
  public isNFTMemberEnabled?: boolean;
  public isNFTAdminEnabled?: boolean;
}
