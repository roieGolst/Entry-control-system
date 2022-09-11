import Joi from "joi";
import { SoldierAtributs } from "../utils/db/soldier";
import magicNumbers from "../config/magicNumbers.json";
import { IValidationResult } from "./index";

const soldierSchema = Joi.object({

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

export default {
    validate: (data: any): IValidationResult<SoldierAtributs> =>  {
        const result = soldierSchema.validate(data);

        if(result.error) {
            return {
                error: result?.error?.details[0].message || "Vlidation error"
            };
        }

        return {
            result: data as SoldierAtributs,
        };
        
    }
}