import Device from "../../DB/models/Device";

const INSIDE_GATE = 2;

type DeviceAtributs = {
    serialNumber: string;
    location: string;
    gateType: number;
    level: number;
}

export async function addDevice(obj: DeviceAtributs): Promise<Device | unknown>{
    try {
        if(obj.gateType == INSIDE_GATE) {
            let device = await Device.create(
                {
                    serialNumber: obj.serialNumber,
                    location: obj.location,
                    gateType: obj.gateType,
                }
            );
            return Promise.resolve(device);  
        }

        let device = await Device.create(
            {
                serialNumber: obj.serialNumber,
                location: obj.location,
                gateType: obj.gateType,
                level: obj.level
            }
        );
        return Promise.resolve(device);
    }
    catch(err) {
        return Promise.resolve(err);
    }
}

export async function getDevice(serialNumber: string): Promise<Device | null> {
    let device = await Device.findByPk(serialNumber);

    return Promise.resolve(device);
}

export async function updateDeviceLocation(serialNumber: string, location: string): Promise<boolean>{
    if(await Device.findByPk(serialNumber) === null) {
        return false
    }
    
    await Device.update(
        { location: location},
        { where: { serialNumber: serialNumber } }
    );

    return true;
}

export async function deleteDevice(serialNumber: string): Promise<boolean> {
    let device = await Device.findByPk(serialNumber);

    if(device === null) {
        return false;
    }

    await Device.destroy(
        {
            where: {serialNumber: serialNumber}
        }
    );

    return true;
}