import Devices from "../../DB/models/Device";
import Soldier from "../../DB/models/Soldier";
import * as Utils from "../db"

const OUTSIDE_GATE = 1;
const INSIDE_GATE = 2;

export async function isGrantedUser(armyId: number, deviceSerial: string): Promise<boolean> {
    const soldier = await  Utils.soldierUtils.getSoldier(armyId);
    
    if(soldier == null) {
        await Utils.logUtils.addLog({
            type: "Entry",
            armyId: armyId,
            deviceSerial: deviceSerial,
            status: false, 
            response: "soldier not exists"
        });

        return false;
    }

    const moment = new Date();
    const databaseDate = new Date(soldier.expiraionDate);
    
    if(databaseDate.toISOString() < moment.toISOString()) {
        await Utils.logUtils.addLog({
            type: "Entry",
            armyId: armyId,
            deviceSerial: deviceSerial,
            status: false, 
            response: "Soldier expire"
        });

        return false;
    }

    const device = await Utils.deviceUtils.getDevice(deviceSerial);

    if(device == null) {
        await Utils.logUtils.addLog({
            type: "Entry",
            armyId: armyId,
            deviceSerial: deviceSerial,
            status: false, 
            response: "Device not exists"
        });

        return false;
    }

    switch(device.gateType) {
        case OUTSIDE_GATE:
            const hasPermission = await outsideGateVerification(soldier, device);
            return hasPermission;

        case INSIDE_GATE:
            const isGranted = await insideGateVerification(soldier, device);
            return isGranted;

        default:
            await Utils.logUtils.addLog({
                type: "Error",
                armyId: armyId,
                deviceSerial: deviceSerial,
                status: false, 
                response: "Invalid gate entry"
            });

            throw Error("Somting worng, no entry");
    }
}

async function outsideGateVerification(soldier: Soldier, device: Devices): Promise<boolean> {
    if(soldier.level >= device.level) {
        await Utils.logUtils.addLog({
            type: "Entry",
            armyId: soldier.armyId,
            deviceSerial: device.serialNumber,
            status: true, 
            response: `Entry approved, level aproved`
        });

        return true;
    }
    else {
        await Utils.logUtils.addLog({
            type: "Entry",
            armyId: soldier.armyId,
            deviceSerial: device.serialNumber,
            status: false, 
            response: `No pass, level not aproved`
        });

        return false;
    }
}

async function insideGateVerification(soldier: Soldier, device: Devices): Promise<boolean> {
    const permission = await Utils.permissionUtils.getPermission(soldier.armyId, device.serialNumber);

    if(permission === null) {
        await Utils.logUtils.addLog({
            type: "Entry",
            armyId: soldier.armyId,
            deviceSerial: device.serialNumber,
            status: false, 
            response: "No permission"
        });

        return false;
    }

    const moment = new Date();
    const databaseDate = new Date(permission.expirationDate);

    if(databaseDate.toISOString() < moment.toISOString()) {
        await Utils.logUtils.addLog({
            type: "Entry",
            armyId: soldier.armyId,
            deviceSerial: device.serialNumber,
            status: false, 
            response: "Permission expired"
        });

        return false;
    }

    await Utils.logUtils.addLog({
        type: "Entry",
        armyId: soldier.armyId,
        deviceSerial: device.serialNumber,
        status: true, 
        response: "Entry approved, permission aproved"
    });

    return true;  
}
