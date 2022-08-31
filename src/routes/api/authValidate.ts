import { NextFunction, Request, Response } from "express";
import env from "../../config/env.json";
import jwt from "jsonwebtoken";

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