import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import db from "../initDb";
import magicNumbers from "../../config/magicNumbers.json";


export default class Logs extends Model<InferAttributes<Logs>, InferCreationAttributes<Logs>> {
    declare hash: CreationOptional<string>
    declare type: string
    declare armyId: number;
    declare deviceSerial: string;
    declare date: string;
    declare status: boolean;
    declare response: string;
};

Logs.init (
    {
        hash: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },

        type: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        armyId: {
            type: DataTypes.STRING(magicNumbers.ARMY_ID_LENGTH),
            allowNull: false
        },

        deviceSerial: {
            type: DataTypes.STRING(magicNumbers.MAX_SERIAL_NUMBER_LENGTH),
            allowNull: false
        },

        date: {
            type: DataTypes.DATE,
            allowNull: false
        },

        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        
        response: {
            type: DataTypes.STRING(magicNumbers.MAX_RESPONSE_LENGTH),
            allowNull: false
        }
    },

    {
        sequelize: db,
        tableName: "Logs",
        timestamps: false
    }

);