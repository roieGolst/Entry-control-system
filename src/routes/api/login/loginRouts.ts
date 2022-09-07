import express, { Router }  from "express";
import { userUtils } from "../../../utils/db";
import { loginUserValidate } from "../../../validation/users";
import jwt from "jsonwebtoken";
import env from "../../../config/env.json";

const router: Router = express.Router();

router.use(express.json());

router.post("/", async (req, res) => {
    const { error } = loginUserValidate(req.body);

    if(error) {
        res.status(400).send(`Validation error: ${error.message}`);
        return;
    }

    const user = await userUtils.checkUser(req.body);

    if(!user) {
        res.status(401).send("User name or password worng!");
    }

    const token = jwt.sign({id: user!.password}, env.SECRET_TOKEN);

        res.header("auth-token", token).send(token);
        return;
    
})

export default router;