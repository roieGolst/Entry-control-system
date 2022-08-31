import express, { Router }  from "express";
import { userUtils } from "../../../utils/db";
import { creataUserValidate } from "../../../validation/users";

const router: Router = express.Router();

router.use(express.json());

router.get("/:armyId", async (req, res) => {
    const armyId = parseInt(req.params.armyId);
    const user = await userUtils.getUser(armyId);

    if(user === null) {
        res.status(400).send(`User not define`);
        return;
    }

    res.send(user);
});

router.post("/create", async (req, res) => {

    const { error } = creataUserValidate(req.body);
    
    if(error){
        res.status(400).send(error.message);
        return;
    }

    const user = await userUtils.addUser(req.body);

    if(user instanceof Error) {
        res.status(400).send(`Error message: ${user.message}`);
        return;
    }

    res.send("User created");

});

router.put("/updateName/:armyId", async (req, res) => {
    const armyId = parseInt(req.params.armyId);
    const requestedName: string = req.body.name;

    let userUpdated = await userUtils.updateUserName(armyId, requestedName);

    if(!userUpdated) {
        res.status(400).send(`User not define`);
        return;
    }

    res.send(`Updated user name`);
})

router.put("/updatePassword/:armyId", async (req, res) => {
    const armyId = parseInt(req.params.armyId);
    const reuestedPassword: string = req.body.password;

    let userUpdated = await userUtils.updateUserPassword(armyId, reuestedPassword);

    if(!userUpdated) {
        res.status(400).send(`User not define`);
        return;
    }

    res.send(`Password updated`);
})



router.delete("/:armyId", async (req, res) => {
    const armyId = parseInt(req.params.armyId);

    const result = await userUtils.deleteUser(armyId);

    if(!result) {
        res.status(400).send("User not define");
        return;
    }

    res.send(`User delted`);
});

export default router;