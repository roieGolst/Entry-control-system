import express, { Router }  from "express";
import { authValidate } from "./authValidate";
import * as Routes from ".";

const router: Router = express.Router();

router.use(express.json());

router.use("/users", authValidate, Routes.user);
router.use("/devices", authValidate, Routes.device);
router.use("/permissions", authValidate, Routes.premission);
router.use("/logs", authValidate, Routes.logs);
router.use("/login", Routes.login);


export default router;