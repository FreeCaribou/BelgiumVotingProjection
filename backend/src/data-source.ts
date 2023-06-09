import { DataSource, DataSourceOptions } from "typeorm";
import { Municipality } from "./projections/entities/municipality.entity";
import { Party } from "./projections/entities/party.entity";
import { Projection } from "./projections/entities/projection.entity";

export function appDataSourceConfig(): DataSourceOptions {
  return {
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: +process.env.DATABASE_PORT || 3306,
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.NODE_ENV === 'prod' ?
      process.env.DATABASE_NAME :
      process.env.DATABASE_NAME_TEST,
    entities: [Municipality, Projection, Party],
    logging: true,
    synchronize: true,
  }
}

export function appDataSource(): DataSource {
  return new DataSource(appDataSourceConfig());
}