import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';

export interface ISequelizeConfig {
    user: string;
    password: string;
    host: string;
    database: string;
    dialect: Dialect;
}

export const createSequelizeInstance = (configuration: ISequelizeConfig, logging: boolean | ((sql: string, timing?: number) => void)) : Sequelize => {
    if (!configuration) throw new Error('There is no sequelize configuration!');
    return new Sequelize(configuration.database, configuration.user, configuration.password, {
        dialect: configuration.dialect,
        models: [__dirname + '/models/**/*.model.ts'],
        logging 
    })
}