import Permission from "../../DB/models/Permission";
import { soldierUtils, deviceUtils } from "./index";
import { InsertResult } from "./index";
import { UniqueConstraintError } from "sequelize"

export type PermissionAtributs = {
    armyId: number;
    deviceSerial: string;
}

export async function addPermission(obj: any): Promise<InsertResult<PermissionAtributs>>{
    try {
        let moment = new Date();
        moment.setFullYear(moment.getFullYear() + 1);

        const soldier = await soldierUtils.getSoldier(obj.armyId);
        const device = await deviceUtils.getDevice(obj.deviceSerial);
        const asPermission = await Permission.findOne({ where: {armyId: obj.armyId, deviceSerial: obj.deviceSerial} });

        if(!soldier) {
            return {
                error: "Can't create permission on user that not exists"
            }
        }

        if(!device) {
            return {
                error: "Can't create permission on device that not exists"
            }
        }

        if(asPermission) {
            return {
                error: "Permission already exists"
            }
        }

        const permission = await Permission.create(
            {
                armyId: obj.armyId,
                deviceSerial: obj.deviceSerial,
                expirationDate: moment.toISOString()
            }
        )
        return  {
            result: permission
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