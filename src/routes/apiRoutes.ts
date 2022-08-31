import express from "express";
import * as router from "./index";

const app = express();


app.use("/", router.login);
// app.use("/:armyId/users", router.user);
// app.use("/:armyId/devices", router.device);
// app.use("/:armyId/permissions", router.premission);
// app.use("/:armyId/logs", router.logs);
// app.use("/:armyId/entry", router.entry);