import express from "express";
import { NextFunction, Request, Response, Router } from "express";
import env from "../../../config/env.json";
import jwt from "jsonwebtoken";
import User from "../../../DB/models/User";

const router: Router = express.Router();

router.use(express.json());

router.post("/", (req, res) => {
    const token = req.header("auth-token") ;
    if(!token) {
        res.sendStatus(401);
        return;
    }

    try{
        let user = jwt.verify(token, env.REFRESH_TOKEN);

        const newToken = genereteToken(user as User);
        res.json({ "access-token": newToken })
        return;
    }
    catch(err) {
        res.send(err);
    }
})

export function authValidate(req: Request, res: Response, next: NextFunction): void {
    const token = req.header("auth-token");

    if(!token) {
        res.status(401).send("Access denied");
        return;
    }

    try {
        jwt.verify(token, env.SECRET_TOKEN);
        next();
    }
    catch(err) {
        res.status(400).send("Invalid token");
    }
}

export function genereteToken(user: User): string {
    return jwt.sign({ armyId: user.armyId, password: user.password }, env.SECRET_TOKEN, { expiresIn: "1m" });
}

export default router;
