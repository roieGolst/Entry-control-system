import express, { Router }  from "express";
import { userUtils } from "../../../utils/db";
import { userValidator } from "../../../validation";
import jwt from "jsonwebtoken";
import env from "../../../config/env.json";
import User from "../../../DB/models/User";
import { genereteToken } from "../token/authValidate";

const router: Router = express.Router();

router.use(express.json());

router.post("/", async (req, res) => {
    const isValid = userValidator.loginValidate(req.body);

    if(!isValid.result) {
        res.status(400).send(`Validation error: ${isValid.error}`);
        return;
    }

    const user = await userUtils.checkUser(isValid.result);

    if(!user) {
        res.status(401).send("User name or password worng!");
    }

    const token = genereteToken(user as User);
    const refreshToken = jwt.sign({armyID: user!.armyId, password: user!.password}, env.REFRESH_TOKEN);

    res.cookie("refresh-token", refreshToken);
    res.json({"access-token": token})
    return;
    
})

export default router;