import Joi from "joi";
import { DeviceAtributs } from "../utils/db/device";
import magicNumber from "../config/magicNumbers.json";

const createDeviceSchema = Joi.object({
    serialNumber: Joi.string()
        .min(magicNumber.MIN_SERIAL_NUMBER_LENGTH)
        .max(magicNumber.MAX_SERIAL_NUMBER_LENGTH)
        .required(),

    location: Joi.string()
        .min(magicNumber.MIN_LOCATION_LENGTH)
        .max(magicNumber.MAX_LOCATION_LENGTH)
        .required(),

    gateType: Joi.string()
        .valid(`${magicNumber.INSIDE_GATE}`, `${magicNumber.OUTSIDE_GATE}`)
        .required(),

    level: Joi.string()
        .min(magicNumber.LEVEL_LENGTH)
        .max(magicNumber.LEVEL_LENGTH)
        .optional(),
})

export function createDeviceValidate(data: DeviceAtributs) {
    return createDeviceSchema.validate(data);
}