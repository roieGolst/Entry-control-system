import Device from "../../DB/models/Device";
import magicNumber from "../../config/magicNumbers.json";
import { InsertResult } from "./index";
import { UniqueConstraintError } from "sequelize";

export type DeviceAtributs = {
    serialNumber: string;
    location: string;
    gateType: number;
    level?: number;
}

export async function addDevice(obj: any): Promise<InsertResult<DeviceAtributs>> {
    try {
        if(obj.gateType == magicNumber.INSIDE_GATE) {
            let device = await Device.create(
                {
                    serialNumber: obj.serialNumber,
                    location: obj.location,
                    gateType: obj.gateType,
                }
            );
            return {
                result: device
            }  
        }

        // if(obj.gateType == magicNumber.OUTSIDE_GATE && !obj.level) {
        //     return{
        //         error: "When gate type is 1, level is required!"
        //     }
        // }

        let device = await Device.create(
            {
                serialNumber: obj.serialNumber,
                location: obj.location,
                gateType: obj.gateType,
                level: obj.level
            }
        );

        return {
            result: device
        }  
    }
    catch(err) {
        if(err instanceof UniqueConstraintError) {
            return {
                error: err.errors[0].message || "Validation error"
            }  
        }
        return {
            error: err
        }  
    }
}

export async function getDevice(serialNumber: string): Promise<Device | null> {
    let device = await Device.findByPk(serialNumber);

    return device;
}

export async function updateDeviceLocation(serialNumber: string, location: string): Promise<boolean>{
    if(!await Device.findByPk(serialNumber)) {
        return false;
    }
    
    await Device.update(
        { location: location},
        { where: { serialNumber: serialNumber } }
    );

    return true;
}

export async function deleteDevice(serialNumber: string): Promise<boolean> {
    let device = await Device.findByPk(serialNumber);

    if(!device) {
        return false;
    }

    await Device.destroy(
        {
            where: {serialNumber: serialNumber}
        }
    );

    return true;
}