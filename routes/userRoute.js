import express from "express";
import userController from "../controller/userController.js";
import adminAuth from "../middleware/admin.js";
import tokenAuth from "../middleware/auth.js";
import validID from "../middleware/validObjectId.js";
const router = express.Router();

router.post("/", userController.signup);
router.post("/login", userController.login);
router.get("/", adminAuth, userController.get);
router.get("/:id", [validID, tokenAuth], userController.getId);
router.put("/:id", [validID, tokenAuth], userController.updateId);
router.delete("/:id", [validID, adminAuth], userController.deleteId);
export default router;
