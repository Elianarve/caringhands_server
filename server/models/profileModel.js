import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import UsersModel from "./userModel.js";

const ProfileModel = connection_db.define('profile', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UsersModel,
            key: 'id'
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    steps: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'profile',
    timestamps: false
});

UsersModel.hasOne(ProfileModel, { foreignKey: 'userId' });

export default ProfileModel;