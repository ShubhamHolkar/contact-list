/**
 * Imports
 */
import express from "express";
import {
  createContact,
  getContactList,
  updateContact,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();
router.route("/").post(createContact);
router.route("/").put(updateContact);
router.route("/").delete(deleteContact);
router.route("/").get(getContactList);
export default router;
