import express, { Router }  from "express";
import { permissionValidator } from "../../../validation/index";
import { permissionUtils } from "../../../utils/db";

const router: Router = express.Router();

router.use(express.json());

router.get("/:armyId", async (req, res) => {
    const armyId = parseInt(req.params.armyId);
    const permission = await permissionUtils.getPermission(armyId);

    if(!permission) {
        res.status(400).send(`Permission not define`);
        return;
    }

    res.json(permission);
});

router.get("/:armyId/:deviceSerial", async (req, res) => {
    const armyId = parseInt(req.params.armyId);
    const deviceSerial = req.params.deviceSerial;
    const permission = await permissionUtils.getPermission(armyId, deviceSerial);

    if(!permission) {
        res.status(400).send(`Permission not define`);
        return;
    }

    res.json(permission);
});

router.post("/create", async (req, res) => {
    const isValid = permissionValidator.validate(req.body);

    if(!isValid.result) {
        res.status(400).send(`Validation error: ${isValid.error}`);
        return;
    }

    const permission = await permissionUtils.addPermission(isValid.result);

    if(!permission.result) {
            res.status(400).send(`Error message: ${permission.error})`);
            return;
        }

    res.send("permission created");
});

router.delete("/:armyId/:deviceSerial", async (req, res) => {
    const armyId = parseInt(req.params.armyId);
    const deviceSerial = req.params.deviceSerial
    const result = await permissionUtils.deletePermission(armyId, deviceSerial);

    if(!result) {
        res.status(400).send("User not define");
        return;
    }

    res.send(`User delted`);
});

export default router;