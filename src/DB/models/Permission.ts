import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import db from "../initDb";


export default class Permission extends Model<InferAttributes<Permission>, InferCreationAttributes<Permission>> {
    declare armyId: number;
    declare deviceSerial: string;
    declare expirationDate: string;
};

Permission.init (
    {
        armyId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },

        deviceSerial: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
    },

    {
        sequelize: db,
        tableName: "Permission",
        timestamps: false
    }

);