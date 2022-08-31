import Joi from "joi";
import { UserAtributs } from "../utils/db/user";

export const creataUserValidate = (data: UserAtributs) => {
    const createUserSchema = Joi.object({
        Admin: Joi.string()
            .optional()
            .min(1)
            .max(1)
            .required(),
    
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
    return  createUserSchema.validate(data);
}