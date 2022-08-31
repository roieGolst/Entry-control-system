import express, { Router }  from "express";
import { deviceUtils } from "../../../utils/db";
import { createDeviceValidate } from "../../../validation/device";

const router: Router = express.Router();

router.use(express.json());

router.get("/:serialNumber", async (req, res) => {
    const serialNumber = req.params.serialNumber;

    const requestedDevice =  await deviceUtils.getDevice(serialNumber);

    if(requestedDevice === null) {
        res.status(400).send("Device not exists");
    }

    res.send(requestedDevice);
});

router.post("/create", async (req, res) => {

    const { error } = createDeviceValidate(req.body);

    if(error) {
        res.status(400).send(error.message);
        return;
    }

    const device = await deviceUtils.addDevice(req.body);

    if(device === null) {
        res.status(400).send("Device not exists");
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