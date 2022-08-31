import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import db from "../initDb";

let date = new Date();

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare Admin: CreationOptional<boolean>
    declare armyId: number;
    declare name: string;
    declare lastname: string;
    declare phoneNumber: string;
    declare level: number;
    declare password: CreationOptional<string>;
    declare expiraionDate: string;
};

User.init(
    {
        Admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },

        armyId: {
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(15),
        },

        lastname: {
            type: DataTypes.STRING(30),
            allowNull: false
        },

        phoneNumber: {
            type: DataTypes.STRING(10)
        },
        
        level: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        
        password: {
            type: DataTypes.STRING(64),
            allowNull: true
        },
        
        expiraionDate: {
            type: DataTypes.DATE,
        }
    },

    {
        sequelize: db,
        tableName: "Users",
        timestamps: false,
    }
);