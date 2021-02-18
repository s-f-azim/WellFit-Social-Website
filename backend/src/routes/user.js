import express from "express";
import { createUser, loginUser } from "../controllers/users.js";

const router = new express.Router();

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);

export default router;
