import express, { Router }  from "express";
import { isGrantedUser } from "../../../utils/gate/gateUtils";

const router: Router = express.Router();

router.use(express.json());

router.get("/:armyId/:deviceSerial", async (req, res) => {
    const armyId = parseInt(req.params.armyId);
    const deviceSerial = req.params.deviceSerial;
    
    const isGranted = await isGrantedUser(armyId, deviceSerial);

    if(!isGranted) {
        res.status(400).send("No entry");
        return;
    }

    res.send("Wellcom");
})

export default router;