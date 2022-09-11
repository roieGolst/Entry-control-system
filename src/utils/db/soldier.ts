import Soldier from "../../DB/models/Soldier";
import { InsertResult } from "./index";
import { UniqueConstraintError } from "sequelize";

export type SoldierAtributs = {
    armyId: number;
    name: string;
    lastname: string;
    phoneNumber: string;
    level: number;
}

export async function addSoldier(obj: any): Promise<InsertResult<SoldierAtributs>>{
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
        return {
            result: soldier
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