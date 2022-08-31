import express from "express";
import * as router from "./index";

const app = express();

app.use("/users", router.user);
app.use("/devices", router.device);
app.use("/permissions", router.premission);
app.use("/logs", router.logs);
app.use("/entry", router.entry);

export default app;

