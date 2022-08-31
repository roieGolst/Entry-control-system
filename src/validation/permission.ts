import Joi, { func } from "joi";
import { PermissionAtributs } from "../utils/db/permission";

const createPermissionSchema = Joi.object({
    armyId: Joi.string()
        .min(7)
        .max(7)
        .required(),

    deviceSerial: Joi.string()
        .min(5)
        .max(50)
        .required()
})

export function createPermissionValidate(data: PermissionAtributs) {
    return createPermissionSchema.validate(data);
}