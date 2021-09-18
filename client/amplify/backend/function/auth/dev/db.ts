import os from 'os';
import path from 'path';
import { INTEGER, Sequelize, STRING, BOOLEAN, Op, DATE, NOW } from 'sequelize';

import { User } from './models';
import { NFT } from './models';
import { Borrow } from './models';
import { TreasuryPolicy } from './models';
import { MFI } from './models';

const sequelize: any = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
    define: {
      timestamps: false,
    },
  }
);

// Init all models
User.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nonce: {
      allowNull: false,
      type: INTEGER.UNSIGNED, // mysql will use INTEGER
      defaultValue: (): number => Math.floor(Math.random() * 10000), // Initialize with a random nonce
    },
    publicAddress: {
      allowNull: false,
      type: STRING,
      unique: true,
      validate: { isLowercase: true },
    },
    username: {
      type: STRING(64),
      unique: true,
      allowNull: true,
    },
    firstName: {
      type: STRING(64),
      allowNull: true,
    },
    lastName: {
      type: STRING(64),
      allowNull: true,
    },
    phone: {
      type: STRING(16),
      allowNull: true,
      unique: true,
    },
    email: {
      type: STRING(64),
      allowNull: true,
      unique: true,
    },
    facebook: {
      type: STRING,
      allowNull: true,
    },
    twitter: {
      type: STRING,
      allowNull: true,
    },
    instagram: {
      type: STRING,
      allowNull: true,
    },
    telegram: {
      type: STRING,
      allowNull: true,
    },
    country: {
      type: STRING(64),
      allowNull: true,
    },
    city: {
      type: STRING(64),
      allowNull: true,
    },
    ip: {
      type: STRING(64),
      allowNull: true,
    },
    os: {
      type: STRING(64),
      allowNull: true,
    },
    browser: {
      type: STRING(64),
      allowNull: true,
    },
    geolocation: {
      type: STRING(64),
      allowNull: true,
    },
    gender: {
      type: STRING(16),
      allowNull: true,
    },
    age: {
      type: STRING(16),
      allowNull: true,
    },
    myReferralCode: {
      type: STRING(16),
      allowNull: true,
    },
    referredByCode: {
      type: STRING(16),
      allowNull: true,
    },
    isAdmin: {
      type: BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    isNFTMemberEnabled: {
      type: BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    isNFTAdminEnabled: {
      type: BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    modelName: 'user',
    sequelize, // This bit is important
    timestamps: false,
  }
);

NFT.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      allowNull: false,
      type: STRING,
    },
    tokenId: {
      type: INTEGER,
      allowNull: false,
    },
    isNFTMemberEnabled: {
      type: BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    isNFTAdminEnabled: {
      type: BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    modelName: 'nft',
    sequelize,
    timestamps: false,
  }
);

TreasuryPolicy.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      allowNull: false,
      type: STRING,
    },
    value: {
      type: INTEGER,
      allowNull: true,
    },
    active: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    modelName: 'treasuryInvestmentPolicy',
    sequelize,
    timestamps: false,
  }
);

Borrow.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      allowNull: false,
      type: STRING,
    },
    description: {
      allowNull: false,
      type: STRING,
    },
    term: {
      allowNull: true,
      type: STRING,
    },
    title: {
      allowNull: true,
      type: STRING,
    },
    amount: {
      type: INTEGER,
      allowNull: true,
    },
    currentBalance: {
      type: INTEGER,
      allowNull: true,
    },
    createDate: {
      type: DATE,
      defaultValue: NOW,
      allowNull: false,
    },
    updateDate: {
      type: DATE,
      allowNull: true,
    },
    startDate: {
      type: DATE,
      allowNull: true,
    },
    monthsToRepay: {
      type: INTEGER,
      allowNull: true,
    },
    status: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  },
  {
    modelName: 'borrow',
    sequelize,
    timestamps: false,
  }
);

MFI.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      allowNull: true,
      type: STRING,
    },
    website: {
      allowNull: true,
      type: STRING,
    },
    phone: {
      allowNull: true,
      type: STRING,
    },
    email: {
      allowNull: true,
      type: STRING,
    },
    logo: {
      allowNull: true,
      type: STRING,
    }
  },
  {
    modelName: 'mfi',
    sequelize,
    timestamps: false,
  }
);

// Create new tables
// sequelize.sync({ force: true });

export { sequelize, Op };
