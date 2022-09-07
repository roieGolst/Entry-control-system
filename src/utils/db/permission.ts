import Permission from "../../DB/models/Permission";
import { soldierUtils, deviceUtils } from "./index";

class AddPermissionResponse {
    permission: Permission | undefined;
    iserror?: any
    
    constructor(permission: Permission | undefined, error: any = undefined) {
        this.permission = permission;
        this.iserror = error;
    }
}

export type PermissionAtributs = {
    armyId: number;
    deviceSerial: string;
}

export async function addPermission(obj: PermissionAtributs): Promise<AddPermissionResponse>{
    try {
        let moment = new Date();
        moment.setFullYear(moment.getFullYear() + 1);

        const soldier = await soldierUtils.getSoldier(obj.armyId);
        const device = await deviceUtils.getDevice(obj.deviceSerial);
        const asPermission = await Permission.findOne({ where: {armyId: obj.armyId, deviceSerial: obj.deviceSerial} });

        if(!soldier) {
            throw Error("Can't create permission on user that not exists");
        }

        if(!device) {
            throw Error("Can't create permission on device that not exists");
        }

        if(asPermission) {
            throw Error("Permission already exists");
        }

        const permission = await Permission.create(
            {
                armyId: obj.armyId,
                deviceSerial: obj.deviceSerial,
                expirationDate: moment.toISOString()
            }
        )
        return new AddPermissionResponse(permission);
    }
    catch(err) {
        return new AddPermissionResponse(undefined, err);
    }
}

export async function getPermission(armyId: number ,deviceSerial?: string): Promise<Permission | null> {
    if(!deviceSerial) {
        const permission = await Permission.findOne(
            {
                where: {armyId: armyId}
            }
        )
    
        return permission;
    }

    const permission = await Permission.findOne(
        {
            where: {armyId: armyId, deviceSerial: deviceSerial}
        }
    )

    return permission;
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