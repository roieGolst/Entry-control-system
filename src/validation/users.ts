import Joi from "joi";
import { LoginAtributs, UserAtributs } from "../utils/db/user";
import magicNumbers from "../config/magicNumbers.json";
import { IValidationResult } from "./index";

const userSchema = Joi.object({

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



const loginSchema = Joi.object({
    armyId: Joi.string()
        .min(magicNumbers.ARMY_ID_LENGTH)
        .max(magicNumbers.ARMY_ID_LENGTH)
        .required(),

    password: Joi.string()
        .min(magicNumbers.MIN_PASSWORD_LENGTH)
        .required()
});


export default {
    userValidate: (data: any): IValidationResult<UserAtributs> =>  {
        const result = userSchema.validate(data);

        if(result.error) {
            return {
                error: result?.error?.details[0].message || "Vlidation error"
            };
        }

        return {
            result: data as UserAtributs,
        };
        
    },

    loginValidate: (data: any): IValidationResult<LoginAtributs> =>  {
        const result = loginSchema.validate(data);

        if(result.error) {
            return {
                error: result?.error?.details[0].message || "Vlidation error"
            };
        }

        return {
            result: data as LoginAtributs,
        };
    }
}