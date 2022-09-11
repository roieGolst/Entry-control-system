import Joi from "joi";
import { PermissionAtributs } from "../utils/db/permission";
import magicNumbers from "../config/magicNumbers.json";
import { IValidationResult } from "./index";

const PermissionSchema = Joi.object({
    armyId: Joi.string()
        .min(magicNumbers.ARMY_ID_LENGTH)
        .max(magicNumbers.ARMY_ID_LENGTH)
        .required(),

    deviceSerial: Joi.string()
        .min(magicNumbers.MIN_SERIAL_NUMBER_LENGTH)
        .max(magicNumbers.MAX_SERIAL_NUMBER_LENGTH)
        .required()
})

export default {
    validate: (data: any): IValidationResult<PermissionAtributs> =>  {
        const result = PermissionSchema.validate(data);

        if(result.error) {
            return {
                error: result?.error?.details[0].message || "Vlidation error"
            };
        }

        return {
            result: data as PermissionAtributs,
        };
        
    }
}