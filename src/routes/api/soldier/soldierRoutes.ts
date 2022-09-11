import express, { Router }  from "express";
import { soldierUtils } from "../../../utils/db";
import { soldierValidator } from "../../../validation";

const router: Router = express.Router();

router.use(express.json());

router.get("/:armyId", async (req, res) => {
    const armyId = parseInt(req.params.armyId);
    const soldier = await soldierUtils.getSoldier(armyId);

    if(!soldier) {
        res.status(400).send(`Soldier not define`);
        return;
    }

    res.send(soldier);
});

router.post("/create", async (req, res) => {

    const isValidate = soldierValidator.validate(req.body);
    
    if(!isValidate.result){
        res.status(400).send(`Validation error: ${isValidate.error}`);
        return;
    }

    const soldier = await soldierUtils.addSoldier(isValidate.result);

    if(!soldier.result) {
        res.status(400).send(`Error message: ${soldier.error})`);
        return;
    }

    res.send("Soldier created");

});

router.put("/updateName/:armyId", async (req, res) => {
    const armyId = parseInt(req.params.armyId);
    const requestedName: string = req.body.name;

    let soldierUpdated = await soldierUtils.updateSoldierName(armyId, requestedName);

    if(!soldierUpdated) {
        res.status(400).send(`Soldier not define`);
        return;
    }

    res.send(`Updated Soldier name`);
})



router.delete("/:armyId", async (req, res) => {
    const armyId = parseInt(req.params.armyId);

    const result = await soldierUtils.deleteSoldier(armyId);

    if(!result) {
        res.status(400).send("Soldier not define");
        return;
    }

    res.json(`Soldier delted`);
});

export default router;