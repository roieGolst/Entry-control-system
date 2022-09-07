import bcrypt from "bcrypt";
import User from "../../DB/models/User";
const SALT_ROUNDS = 10;

class AddUserResponse {
    user: User | undefined;
    iserror?: any
    
    constructor(user: User | undefined, error: any = undefined) {
        this.user = user;
        this.iserror = error;
    }
}

export type UserAtributs = {
    armyId: number;
    name: string;
    lastname: string;
    phoneNumber: string;
    password: string;
}

export type LoginAtributs = {
    armyId: number,
    password: string
}

export async function addUser(obj: UserAtributs): Promise<AddUserResponse>{
    try {
        let date = new Date();
        date.setFullYear(date.getFullYear() + 1);


        let user = await User.create(
            {
                armyId: obj.armyId,
                name: obj.name,
                lastname: obj.lastname,
                phoneNumber: obj.phoneNumber,
                password: await bcrypt.hash(obj.password, SALT_ROUNDS),
                expiraionDate: date.toDateString()
            }
        );
        return new AddUserResponse(user);
    }
    catch(err) {
        return new AddUserResponse(undefined, err);
    }
}

export async function getUser(armyId: number): Promise<User | null> {
    let user = await User.findByPk(armyId);

    return user;
}

export async function updateUserName(armyId: number, updatedName: string): Promise<boolean>{
    if(! await User.findByPk(armyId)) {
        return false;
    }
    
    await User.update(
        { name: updatedName},
        { where: { armyId: armyId } }
    );

    return true;
}

export async function updateUserPassword(armyId: number, requestedPassword: string): Promise<boolean>{
    if(! await User.findByPk(armyId)) {
        return false;
    }

    const vaildPassword = await bcrypt.hash(requestedPassword, SALT_ROUNDS);
    
    await User.update(
        { password: vaildPassword},
        { where: { armyId: armyId } }
    );

    return true;
}

export async function deleteUser(armyId: number): Promise<boolean> {
    let user = await User.findByPk(armyId);

    if(!user) {
        return false;
    }

    await User.destroy(
        {
            where: {armyId: armyId}
        }
    );

    return true;
}

export async function checkUser(obj: LoginAtributs): Promise<User | undefined> {
    const user = await getUser(obj.armyId);

    if(!user) {
        return undefined;
    }

    const isVaildPassword = await bcrypt.compare(obj.password, user.password);

    if(!isVaildPassword) {
        return undefined;
    }

    return user;
}