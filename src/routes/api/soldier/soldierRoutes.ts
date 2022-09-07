import express, { Router }  from "express";
import { soldierUtils } from "../../../utils/db";
import { creataSoldierValidate } from "../../../validation/soldier";

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

    const { error } = creataSoldierValidate(req.body);
    
    if(error){
        res.status(400).send(`Validation error: ${error.message}`);
        return;
    }

    const { iserror } = await soldierUtils.addSoldier(req.body);

    if(iserror) {
        if(iserror.errors[0].message){
            res.status(400).send(`Error message: ${iserror.errors[0].message}`);
        }
        else{
            res.status(400).send(`Error message: ${iserror.message})`);
        }
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

    res.send(`Soldier delted`);
});

export default router;