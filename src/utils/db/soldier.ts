import Soldier from "../../DB/models/Soldier";

class AddSoldierResponse {
    soldier: Soldier | undefined;
    iserror?: any
    
    constructor(soldier: Soldier | undefined, error: any = undefined) {
        this.soldier = soldier;
        this.iserror = error;
    }
}

export type SoldierAtributs = {
    armyId: number;
    name: string;
    lastname: string;
    phoneNumber: string;
    level: number;
}

export async function addSoldier(obj: SoldierAtributs): Promise<AddSoldierResponse>{
    try {
        let date = new Date();
        date.setFullYear(date.getFullYear() + 1);


        let soldier = await Soldier.create(
            {
                armyId: obj.armyId,
                name: obj.name,
                lastname: obj.lastname,
                phoneNumber: obj.phoneNumber,
                level: obj.level,
                expiraionDate: date.toDateString()
            }
        );
        return new AddSoldierResponse(soldier);
    }
    catch(err) {
        return new AddSoldierResponse(undefined, err);
    }
}

export async function getSoldier(armyId: number): Promise<Soldier | null> {
    let soldier = await Soldier.findByPk(armyId);

    return soldier;
}

export async function updateSoldierName(armyId: number, updatedName: string): Promise<boolean>{
    if(! await Soldier.findByPk(armyId)) {
        return false;
    }
    
    await Soldier.update(
        { name: updatedName},
        { where: { armyId: armyId } }
    );

    return true;
}

export async function deleteSoldier(armyId: number): Promise<boolean> {
    let soldier = await Soldier.findByPk(armyId);

    if(!soldier) {
        return false;
    }

    await Soldier.destroy(
        {
            where: {armyId: armyId}
        }
    );

    return true;
}