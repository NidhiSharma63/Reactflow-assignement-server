import express from "express";
import multer from "multer";

import { registerUser } from "../controllers/Auth.js";
import createWorkFlow from "../controllers/CreateWorkflow.js";
import getWorkflowIds from "../controllers/GetWorkflowIds.js";
import { triggerWorkFlow } from "../controllers/TriggerWorkFlow.js";
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// for the separate routes run the following functionas
router.route("/register").post(registerUser);
router.route("/create-workflow").post(createWorkFlow);
router.route("/trigger-workflow").post(upload.single("file"), triggerWorkFlow);
router.route("/workflows").get(getWorkflowIds);
export default router;
