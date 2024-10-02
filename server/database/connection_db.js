import { Sequelize } from "sequelize";
import { DB_DEV_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } from '../config.js';

const connection_db = new Sequelize(DB_DEV_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
});

export default connection_db;
