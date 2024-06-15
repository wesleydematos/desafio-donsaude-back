import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Colaborator } from './entities/colaborators.entity';

config();

const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'donsaude',
  entities: [Colaborator],
  synchronize: false,
  migrations: ['./src/database/migrations/*.ts'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
