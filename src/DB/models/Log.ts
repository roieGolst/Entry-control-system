import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import db from "../initDb";


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
            type: DataTypes.INTEGER,
            allowNull: false
        },

        deviceSerial: {
            type: DataTypes.STRING(100),
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
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },

    {
        sequelize: db,
        tableName: "Logs",
        timestamps: false
    }

);