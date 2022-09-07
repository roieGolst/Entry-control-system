import express, { Router }  from "express";
import { deviceUtils } from "../../../utils/db";
import { createDeviceValidate } from "../../../validation/device";

const router: Router = express.Router();

router.use(express.json());

router.get("/:serialNumber", async (req, res) => {
    const serialNumber = req.params.serialNumber;

    const requestedDevice =  await deviceUtils.getDevice(serialNumber);

    if(!requestedDevice) {
        res.status(400).send("Device not exists");
        return;
    }

    res.send(requestedDevice);
});

router.post("/create", async (req, res) => {
    
    const { error } = createDeviceValidate(req.body);

    if(error) {
        res.status(400).send(`Validation error: ${error.message}`);
        return;
    }

    const { iserror } = await deviceUtils.addDevice(req.body);

    if(iserror) {
        if(iserror.errors[0].message){
            res.status(400).send(`Error message: ${iserror.errors[0].message}`);
        }
        else{
            res.status(400).send(`Error message: ${iserror.message})`);
        }
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