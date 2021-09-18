import { Model } from 'sequelize';

export class TreasuryPolicy extends Model {
  public id!: number;
  public description!: string;
  public value?: number;
  public active!: boolean;
}
