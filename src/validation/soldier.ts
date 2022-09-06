import Joi from "joi";
import { SoldierAtributs } from "../utils/db/soldier";
import magicNumbers from "../config/magicNumbers.json";

const createSoldierSchema = Joi.object({

    armyId: Joi.string()
        .min(magicNumbers.ARMY_ID_LENGTH)
        .required(),

    name: Joi.string()
        .min(magicNumbers.MIN_NAME_LENGTH)
        .max(magicNumbers.MAX_NAME_LENGTH)
        .required(),

    lastname: Joi.string()
        .min(magicNumbers.MIN_NAME_LENGTH)
        .max(magicNumbers.MAX_LASTNAME_LENGTH)
        .required(),

    phoneNumber: Joi.string()
        .min(magicNumbers.PHONE_NUMBER_LENGTH)
        .max(magicNumbers.PHONE_NUMBER_LENGTH)
        .required(),

    level: Joi.string()
        .min(magicNumbers.LEVEL_LENGTH)
        .max(magicNumbers.LEVEL_LENGTH)
        .optional(),
});

export function creataSoldierValidate(data: SoldierAtributs) {
    return  createSoldierSchema.validate(data);
}