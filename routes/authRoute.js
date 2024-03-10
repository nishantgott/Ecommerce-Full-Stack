import express from "express";
import { registerController, loginController, testController } from "../controllers/authContoller.js";
import { requireSignIn, requiresAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/test", requireSignIn, testController);

router.get("/auth-check", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

router.get("/auth-checkadmin", requiresAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

export default router;