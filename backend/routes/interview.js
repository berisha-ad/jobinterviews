import express from "express";
import {
  clearChatHistory,
  startInterview,
} from "../controllers/interviewController.js";
import { addMessage } from "../controllers/interviewController.js";

const router = express.Router();

router.route("/").post(startInterview);
router.route("/chat").post(addMessage);
router.route("/clear").post(clearChatHistory);

export default router;
