import express from "express";
import {
  createUser,
  loginUser,
  getUser,
  logoutUser,
  updateUser,
  followUser,
} from "../controllers/users.js";
import passport from "../../config/passport-setup.js";
const router = new express.Router();

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router
  .route("/editProfile")
  .patch(passport.authenticate("jwt", { session: false }), updateUser);
router
  .route("/profile")
  .get(passport.authenticate("jwt", { session: false }), getUser);
router
  .route("/follow")
  .patch(passport.authenticate("jwt", { session: false }), followUser);
export default router;
