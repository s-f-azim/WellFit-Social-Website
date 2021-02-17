import express from "express";
import { createUser } from "../controllers/users.js";

const router = new express.Router();

router.route("/signup").post(createUser);

export default router;
