import Joi from "joi";
import { LoginAtributs, UserAtributs } from "../utils/db/user";


const createUserSchema = Joi.object({
    Admin: Joi.string()
        .optional()
        .min(1)
        .max(1),

    armyId: Joi.string()
        .min(7)
        .required(),

    name: Joi.string()
        .min(3)
        .max(32)
        .required(),

    lastname: Joi.string()
        .min(2)
        .max(64)
        .required(),

    phoneNumber: Joi.string()
        .min(10)
        .max(10)
        .required(),

    level: Joi.string()
        .min(1)
        .max(1)
        .required(),

    password: Joi.string()
        .optional()
        .min(6)
});

export function creataUserValidate(data: UserAtributs) {
    return  createUserSchema.validate(data);
}

const loginUserSchema = Joi.object({
    armyId: Joi.string()
        .min(7)
        .max(7)
        .required(),

    password: Joi.string()
        .min(6)
        .required()
});

export function loginUserValidate(date: LoginAtributs) {
    return loginUserSchema.validate(date)
}