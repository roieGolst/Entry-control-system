import bcrypt from "bcrypt";
import User from "../../DB/models/User";
const SALT_ROUNDS = 10;

export type UserAtributs = {
    Admin?: boolean
    armyId: number;
    name: string;
    lastname: string;
    phoneNumber: string;
    level: number;
    password?: string;
}

export async function addUser(obj: UserAtributs): Promise<User | unknown>{
    try {
        let date = new Date();
        date.setFullYear(date.getFullYear() + 1);


        if(!obj.Admin || !obj.password) {
            const user = await User.create(
                {
                    Admin: false,
                    armyId: obj.armyId,
                    name: obj.name,
                    lastname: obj.lastname,
                    phoneNumber: obj.phoneNumber,
                    level: obj.level,
                    expiraionDate: date.toISOString()
                }
            );

            return Promise.resolve(user); 
        }


        let user = await User.create(
            {
                Admin: obj.Admin,
                armyId: obj.armyId,
                name: obj.name,
                lastname: obj.lastname,
                phoneNumber: obj.phoneNumber,
                level: obj.level,
                password: await bcrypt.hash(obj.password, SALT_ROUNDS),
                expiraionDate: date.toDateString()
            }
        );
        return Promise.resolve(user);
    }
    catch(err) {
        return Promise.resolve(err);
    }
}

export async function getUser(armyId: number): Promise<User | null> {
    let user = await User.findByPk(armyId);

    return Promise.resolve(user);
}

export async function updateUserName(armyId: number, updatedName: string): Promise<boolean>{
    if(await User.findByPk(armyId) === null) {
        return false;
    }
    
    await User.update(
        { name: updatedName},
        { where: { armyId: armyId } }
    );

    return true;
}

export async function deleteUser(armyId: number): Promise<boolean> {
    let user = await User.findByPk(armyId);

    if(user === null) {
        return false;
    }

    await User.destroy(
        {
            where: {armyId: armyId}
        }
    );

    return true;
}