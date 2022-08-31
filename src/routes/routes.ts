import express from "express";
import apiRouts from "./api/apiRoutes";
import { entry } from "./api";

const app = express();

app.use("/api", apiRouts);
app.use("/entry", entry);

export default app;

