import express, { Router }  from "express";
import { permissionUtils } from "../../utils/db";

const router: Router = express.Router();

router.use(express.json());

router.get("/:armyId", async (req, res) => {
    const armyId = parseInt(req.params.armyId);
    const permission = await permissionUtils.getPermission(armyId);

    if(permission === null) {
        res.status(400).send(`Permission not define`);
        return;
    }

    res.send(permission);
});

router.get("/:armyId/:deviceSerial", async (req, res) => {
    const armyId = parseInt(req.params.armyId);
    const deviceSerial = req.params.deviceSerial;
    const permission = await permissionUtils.getPermission(armyId, deviceSerial);

    if(permission === null) {
        res.status(400).send(`Permission not define`);
        return;
    }

    res.send(permission);
});

router.post("/create", async (req, res) => {
    const permission = await permissionUtils.addPermission(req.body);

    if(permission instanceof Error) {
        res.status(400).send(`Error message: ${permission.message}`);
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