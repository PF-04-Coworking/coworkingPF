import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
dotenvConfig({ path: '.development.env' });

const config = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/entities/*.entity{.ts,.js}'],
  ssl: { rejectUnauthorized: false },
  logging: false,
  synchronize: false,
  dropSchema: false,
};

export const typeOrmConfig = registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);

