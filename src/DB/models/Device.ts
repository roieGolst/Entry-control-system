import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import db from "../initDb";
import magicNumbers from "../../config/magicNumbers.json";

export default class Devices extends Model<InferAttributes<Devices>, InferCreationAttributes<Devices>> {
    declare serialNumber: string;
    declare location: string;
    declare gateType: number;
    declare level: CreationOptional<number>;
};

Devices.init (
    {
        serialNumber: {
            type: DataTypes.STRING(magicNumbers.MAX_SERIAL_NUMBER_LENGTH),
            primaryKey: true,
            allowNull: false
        },

        location: {
            type: DataTypes.STRING(magicNumbers.MAX_LOCATION_LENGTH),
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