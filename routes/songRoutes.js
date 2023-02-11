import express from "express";
import songController from "../controller/songController.js";
import adminAuth from "../middleware/admin.js";
import tokenAuth from "../middleware/auth.js";
import validID from "../middleware/validObjectId.js";
const songRouter = express.Router();

songRouter.post("/", adminAuth, songController.create);
songRouter.get("/", songController.getSong);
songRouter.put("/:id", [validID, adminAuth], songController.updateSong);
songRouter.delete("/:id", [validID, adminAuth], songController.deleteSong);
songRouter.put("/like/:id", [validID, tokenAuth], songController.likedSong);
songRouter.get("/like", tokenAuth, songController.getLiked);

export default songRouter;
