import Joi from "joi";
import { PermissionAtributs } from "../utils/db/permission";
import magicNumbers from "../config/magicNumbers.json";

const createPermissionSchema = Joi.object({
    armyId: Joi.string()
        .min(magicNumbers.ARMY_ID_LENGTH)
        .max(magicNumbers.ARMY_ID_LENGTH)
        .required(),

    deviceSerial: Joi.string()
        .min(magicNumbers.MIN_SERIAL_NUMBER_LENGTH)
        .max(magicNumbers.MAX_SERIAL_NUMBER_LENGTH)
        .required()
})

export function createPermissionValidate(data: PermissionAtributs) {
    return createPermissionSchema.validate(data);
}