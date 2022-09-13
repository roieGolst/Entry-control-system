import Joi from "joi";
import { DeviceAtributs } from "../utils/db/device";
import magicNumber from "../config/magicNumbers.json";
import { IValidationResult } from "./index";

const deviceSchema = Joi.object({
    serialNumber: Joi.string()
        .min(magicNumber.MIN_SERIAL_NUMBER_LENGTH)
        .max(magicNumber.MAX_SERIAL_NUMBER_LENGTH)
        .required(),

    location: Joi.string()
        .min(magicNumber.MIN_LOCATION_LENGTH)
        .max(magicNumber.MAX_LOCATION_LENGTH)
        .required(),

    gateType: Joi.number()
        .valid(magicNumber.INSIDE_GATE, magicNumber.OUTSIDE_GATE)
        .required(),

    level: Joi.number()
        .min(0)
        .max(9)
}).custom((obj, helpers) => {
    if(obj.gateType == magicNumber.OUTSIDE_GATE && isNaN(obj.level)) {
        throw Error("When gate type is 1, level is required!");
    }
})

export default {
    validate: (data: any): IValidationResult<DeviceAtributs> =>  {
        const result = deviceSchema.validate(data);


        if(result.error) {
            return {
                error: result?.error?.details[0].message || "Vlidation error"
            };
        }

        

        return {
            result: data as DeviceAtributs,
        };
        
    }
}
