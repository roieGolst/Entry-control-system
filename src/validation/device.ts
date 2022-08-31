import Joi from "joi";
import { DeviceAtributs } from "../utils/db/device";

const createDeviceSchema = Joi.object({
    serialNumber: Joi.string()
        .min(5)
        .max(50)
        .required(),

    location: Joi.string()
        .min(2)
        .max(100)
        .required(),

    gateType: Joi.string()
        .min(1)
        .max(1)
        .required(),

    level: Joi.string()
        .min(1)
        .max(1)
        .required(),
})

export function createDeviceValidate(data: DeviceAtributs) {
    return createDeviceSchema.validate(data);
}