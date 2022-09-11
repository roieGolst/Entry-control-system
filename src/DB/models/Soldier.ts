import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import db from "../initDb";
import magicNumber from "../../config/magicNumbers.json";

export default class Soldier extends Model<InferAttributes<Soldier>, InferCreationAttributes<Soldier>> {
    declare armyId: number;
    declare name: string;
    declare lastname: string;
    declare phoneNumber: string;
    declare level: number;
    declare expiraionDate: string;
};

Soldier.init(
    {
        armyId: {
            type: DataTypes.STRING(magicNumber.ARMY_ID_LENGTH),
            allowNull: false,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(magicNumber.MAX_NAME_LENGTH),
        },

        lastname: {
            type: DataTypes.STRING(magicNumber.MAX_LASTNAME_LENGTH),
            allowNull: false
        },

        phoneNumber: {
            type: DataTypes.STRING(magicNumber.PHONE_NUMBER_LENGTH)
        },
        
        level: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: magicNumber.LOWER_LEVEL
        },
        
        expiraionDate: {
            type: DataTypes.DATE,
        }
    },

    {
        sequelize: db,
        tableName: "Soldiers",
        timestamps: false,
    }
);