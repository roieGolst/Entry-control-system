import Joi from "joi";
import { LoginAtributs, UserAtributs } from "../utils/db/user";
import magicNumbers from "../config/magicNumbers.json";

const createUserSchema = Joi.object({

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

    password: Joi.string()
        .min(magicNumbers.MIN_PASSWORD_LENGTH)
        .required()
});

export function creataUserValidate(data: UserAtributs) {
    return  createUserSchema.validate(data);
}

const loginUserSchema = Joi.object({
    armyId: Joi.string()
        .min(magicNumbers.ARMY_ID_LENGTH)
        .max(magicNumbers.ARMY_ID_LENGTH)
        .required(),

    password: Joi.string()
        .min(magicNumbers.MIN_PASSWORD_LENGTH)
        .required()
});

export function loginUserValidate(date: LoginAtributs) {
    return loginUserSchema.validate(date)
}