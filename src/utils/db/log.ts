import Log from "../../DB/models/Log";

export type LogAtributs = {
    type: string
    armyId: number;
    deviceSerial: string;
    status: boolean;
    response: string
}

export async function addLog(obj: LogAtributs): Promise<Log | unknown> {
    try {
        const nowTime = new Date();

        const log = await Log.create(
            {
                type: obj.type,
                armyId: obj.armyId,
                deviceSerial: obj.deviceSerial,
                date: nowTime.toISOString(),
                status: obj.status,
                response: obj.response
            }
        );

        return Promise.resolve(log);
    }
    catch(err) {
        return Promise.resolve(err);
    }
}

export async function getLog(armyId: number): Promise<Log[]> {
    const logs = await Log.findAll({
        where: {armyId: armyId},
        attributes: ["type", "armyId", "deviceSerial", "date", "status", "response"],
    }
    );
    
    return logs;
}