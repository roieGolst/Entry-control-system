import express, { Router }  from "express";

const router: Router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
    const user = req.query.armyId;

})

export default router;