import Permission from "../../DB/models/Permission";
import { userUtils, deviceUtils } from "./index";

type PermissionAtributs = {
    armyId: number;
    deviceSerial: string;
}

export async function addPermission(obj: PermissionAtributs): Promise<Permission | unknown>{
    try {
        let moment = new Date();
        moment.setFullYear(moment.getFullYear() + 1);

        const user = await userUtils.getUser(obj.armyId);
        const device = await deviceUtils.getDevice(obj.deviceSerial);
        const asPermission = await Permission.findOne({ where: {armyId: obj.armyId, deviceSerial: obj.deviceSerial} });

        if(user === null) {
            throw Error("Can't create permission on user that not exists");
        }

        if(device === null) {
            throw Error("Can't create permission on device that not exists");
        }

        if(asPermission !== null) {
            throw Error("Permission already exists");
        }

        const permission = await Permission.create(
            {
                armyId: obj.armyId,
                deviceSerial: obj.deviceSerial,
                expirationDate: moment.toISOString()
            }
        )
        return Promise.resolve(permission);
    }
    catch(err) {
        return Promise.resolve(err);
    }
}

export async function getPermission(armyId: number ,deviceSerial?: string): Promise<Permission | null> {
    if(!deviceSerial) {
        const permission = await Permission.findOne(
            {
                where: {armyId: armyId}
            }
        )
    
        return Promise.resolve(permission);
    }

    const permission = await Permission.findOne(
        {
            where: {armyId: armyId, deviceSerial: deviceSerial}
        }
    )

    return Promise.resolve(permission);
}

export async function deletePermission(armyId: number ,deviceSerial: string): Promise<boolean> {
    let permission = await Permission.findOne(
        { 
            where: { armyId: armyId, deviceSerial: deviceSerial }
        }
    )

    if(permission === null) {
        return false;
    }

    await Permission.destroy(
        {
            where: { armyId: armyId, deviceSerial: deviceSerial }
        }
    );

    return true;
}