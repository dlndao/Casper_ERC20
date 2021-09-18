import { Model } from 'sequelize';

export class MFI extends Model {
  public id!: number;
  public name: string;
  public website: string;
  public phone: string;
  public email: string;
  public logo: string;
}
