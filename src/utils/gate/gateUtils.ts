import Devices from "../../DB/models/Device";
import User from "../../DB/models/User";
import * as Utils from "../db"

const OUTSIDE_GATE = 1;
const INSIDE_GATE = 2;

export async function isGrantedUser(armyId: number, deviceSerial: string): Promise<boolean> {
    const user = await  Utils.userUtils.getUser(armyId);
    
    if(user == null) {
        await Utils.logUtils.addLog({
            type: "Entry",
            armyId: armyId,
            deviceSerial: deviceSerial,
            status: false, 
            response: "User not exists"
        });

        return false;
    }

    const moment = new Date();
    const databaseDate = new Date(user.expiraionDate);
    
    if(databaseDate.toISOString() < moment.toISOString()) {
        await Utils.logUtils.addLog({
            type: "Entry",
            armyId: armyId,
            deviceSerial: deviceSerial,
            status: false, 
            response: "User expire"
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
            const hasPermission = await outsideGateVerification(user, device);
            return hasPermission;

        case INSIDE_GATE:
            const isGranted = await insideGateVerification(user, device);
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

async function outsideGateVerification(user: User, device: Devices): Promise<boolean> {
    if(user.level >= device.level) {
        await Utils.logUtils.addLog({
            type: "Entry",
            armyId: user.armyId,
            deviceSerial: device.serialNumber,
            status: true, 
            response: `Entry approved, level aproved`
        });

        return true;
    }
    else {
        await Utils.logUtils.addLog({
            type: "Entry",
            armyId: user.armyId,
            deviceSerial: device.serialNumber,
            status: false, 
            response: `No pass, level not aproved`
        });

        return false;
    }
}

async function insideGateVerification(user: User, device: Devices): Promise<boolean> {
    const permission = await Utils.permissionUtils.getPermission(user.armyId, device.serialNumber);

    if(permission === null) {
        await Utils.logUtils.addLog({
            type: "Entry",
            armyId: user.armyId,
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
            armyId: user.armyId,
            deviceSerial: device.serialNumber,
            status: false, 
            response: "Permission expired"
        });

        return false;
    }

    await Utils.logUtils.addLog({
        type: "Entry",
        armyId: user.armyId,
        deviceSerial: device.serialNumber,
        status: true, 
        response: "Entry approved, permission aproved"
    });

    return true;  
}
