import { Model } from 'sequelize';

export class Borrow extends Model {
  public id!: number;
  public address!: string;
  public description!: string;
  public title?: string;
  public term?: string;
  public startDate?: string;
  public createDate?: string;
  public updateDate?: string;
  public amount?: number;
  public currentBalance?: number;
  public monthsToRepay: number;
  public status: number;
}
