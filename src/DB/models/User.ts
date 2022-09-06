import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import db from "../initDb";
import magicNumbers from "../../config/magicNumbers.json";

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare armyId: number;
    declare name: string;
    declare lastname: string;
    declare phoneNumber: string;
    declare level: number;
    declare password: string;
    declare expiraionDate: string;
};

User.init(
    {
        armyId: {
            type: DataTypes.STRING(magicNumbers.ARMY_ID_LENGTH),
            allowNull: false,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(magicNumbers.MAX_NAME_LENGTH),
        },

        lastname: {
            type: DataTypes.STRING(magicNumbers.MAX_LASTNAME_LENGTH),
            allowNull: false
        },

        phoneNumber: {
            type: DataTypes.STRING(magicNumbers.PHONE_NUMBER_LENGTH)
        },
        
        level: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: magicNumbers.LOWER_LEVEL
        },
        
        password: {
            type: DataTypes.STRING(magicNumbers.MAX_NAME_LENGTH),
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