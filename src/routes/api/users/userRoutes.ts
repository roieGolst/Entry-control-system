import express, { Router }  from "express";
import { userUtils } from "../../../utils/db";
import { creataUserValidate } from "../../../validation/users";

const router: Router = express.Router();

router.use(express.json());

router.get("/:armyId", async (req, res) => {
    const armyId = parseInt(req.params.armyId);
    const user = await userUtils.getUser(armyId);

    if(!user) {
        res.status(400).send(`User not define`);
        return;
    }

    res.send(user);
});

router.post("/create", async (req, res) => {
    const packetBody = JSON.parse(req.body);
    const { error } = creataUserValidate(packetBody);
    
    if(error){
        res.status(400).send(`Validation error: ${error.message}`);
        return;
    }

    const { iserror } = await userUtils.addUser(packetBody);

    if(iserror) {
        if(iserror.errors[0].message){
            res.status(400).send(`Error message: ${iserror.errors[0].message}`);
        }
        else{
            res.status(400).send(`Error message: ${iserror.message})`);
        }
        return;
    }

    res.send("User created");

});

router.put("/updateName/:armyId", async (req, res) => {
    const armyId = parseInt(req.params.armyId);
    const requestedName = JSON.stringify(req.body.name);

    let userUpdated = await userUtils.updateUserName(armyId, requestedName);

    if(!userUpdated) {
        res.status(400).send(`User not define`);
        return;
    }

    res.send(`Updated user name`);
})

router.put("/updatePassword/:armyId", async (req, res) => {
    const armyId = parseInt(req.params.armyId);
    const reuestedPassword = JSON.stringify(req.body.password);

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