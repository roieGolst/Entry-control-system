import express, { Router }  from "express";
import { authValidate } from "./token/authValidate";
import * as Routes from "./index";

const router: Router = express.Router();

router.use(express.json());

router.use("/users", authValidate, Routes.user);
router.use("/devices", authValidate, Routes.device);
router.use("/permissions", authValidate, Routes.premission);
router.use("/logs", authValidate, Routes.logs);
router.use("/soldiers", authValidate,Routes.soldier);
router.use("/login", Routes.login);
router.use("/token", Routes.token);


export default router;