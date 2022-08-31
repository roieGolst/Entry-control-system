import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import db from "../initDb";

export default class Devices extends Model<InferAttributes<Devices>, InferCreationAttributes<Devices>> {
    declare serialNumber: string;
    declare location: string;
    declare gateType: number;
    declare level: CreationOptional<number>;
};

Devices.init (
    {
        serialNumber: {
            type: DataTypes.STRING(100),
            primaryKey: true,
            allowNull: false
        },

        location: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
         
        gateType: {
            type: DataTypes.TINYINT,
            allowNull: false
        },

        level: {
            type: DataTypes.TINYINT,
            allowNull: true
        }
    },

    {
        sequelize: db,
        tableName: "Devices",
        timestamps: false
    }

)