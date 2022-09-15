import express, { Router }  from "express";
import { userUtils } from "../../../utils/db";
import { userValidator } from "../../../validation";

const router: Router = express.Router();

router.use(express.json());

router.get("/:armyId", async (req, res) => {
    const armyId = parseInt(req.params.armyId);
    const user = await userUtils.getUser(armyId);

    if(!user) {
        res.status(400).send(`User not define`);
        return;
    }

    res.json(user);
});

router.post("/create", async (req, res) => {
    const isValid = userValidator.userValidate(req.body);
    
    if(!isValid.result){
        res.status(400).send(`Validation error: ${isValid.error}`);
        return;
    }

    const user = await userUtils.addUser(isValid.result);

    if(!user.result) {
        res.status(400).send(`Error message: ${user.error})`);
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