import express, { Router }  from "express";
import { deviceUtils } from "../../../utils/db";
import { deviceValidator } from "../../../validation";

const router: Router = express.Router();

router.use(express.json());

router.get("/:serialNumber", async (req, res) => {
    const serialNumber = req.params.serialNumber;

    const requestedDevice =  await deviceUtils.getDevice(serialNumber);

    if(!requestedDevice) {
        res.status(400).send("Device not exists");
        return;
    }

    res.json(requestedDevice);
});

router.post("/create", async (req, res) => {
    
    const isValid = deviceValidator.validate(req.body);

    if(!isValid.result) {
        res.status(400).send(`Validation error: ${isValid.error}`);
        return;
    }

    const device = await deviceUtils.addDevice(isValid.result);

    if(!device.result) {
        res.status(400).send(`Error message: ${device.error}`);
        return;
    }

    res.send("New device created");
});

router.delete("/:serialNumber", async (req, res) => {
    const serialNumber = req.params.serialNumber;

    const result = await deviceUtils.deleteDevice(serialNumber);

    if(!result) {
        res.status(400).send("Device not exsits");
        return;
    }

    res.send(`Device delted`);
});



export default router;