import Device from "../../DB/models/Device";
import magicNumber from "../../config/magicNumbers.json";


class AddDeviceResponse {
    device: Device | undefined;
    iserror?: any
    
    constructor(device: Device | undefined, error: any = undefined) {
        this.device = device;
        this.iserror = error;
    }
}

export type DeviceAtributs = {
    serialNumber: string;
    location: string;
    gateType: number;
    level?: number;
}

export async function addDevice(obj: DeviceAtributs): Promise<AddDeviceResponse>{
    try {
        if(obj.gateType == magicNumber.INSIDE_GATE) {
            let device = await Device.create(
                {
                    serialNumber: obj.serialNumber,
                    location: obj.location,
                    gateType: obj.gateType,
                }
            );
            return new AddDeviceResponse(device);  
        }

        if(obj.gateType == magicNumber.OUTSIDE_GATE && !obj.level) {
            throw Error("When gate type is 2, level is required!")
        }

        let device = await Device.create(
            {
                serialNumber: obj.serialNumber,
                location: obj.location,
                gateType: obj.gateType,
                level: obj.level
            }
        );

        return new AddDeviceResponse(device);
    }
    catch(err) {
        return new AddDeviceResponse(undefined, err);
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