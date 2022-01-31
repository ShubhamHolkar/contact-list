/**
 * Imports
 */
import express from "express";
import {
  checkUserExists,
  register,
  login,
  verifyAccount,
} from "../controllers/userController.js";

const router = express.Router();
router.route("/").get(checkUserExists);
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/verify").put(verifyAccount);

export default router;
