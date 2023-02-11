import express from "express";
import playlistController from "../controller/playlistController.js";
//import adminAuth from "../middleware/admin.js";
import tokenAuth from "../middleware/auth.js";
import validID from "../middleware/validObjectId.js";
const playRouter = express.Router();

playRouter.post("/", tokenAuth, playlistController.create);
playRouter.put("/edit/:id", [validID, tokenAuth], playlistController.edit);
playRouter.put("/add-song", tokenAuth, playlistController.add);
playRouter.put("/remove", tokenAuth, playlistController.remove);
playRouter.get("/favourite", tokenAuth, playlistController.favourite);
playRouter.get("/random", tokenAuth, playlistController.random);
playRouter.get("/:id", [validID, tokenAuth], playlistController.idSong);
playRouter.get("/", tokenAuth, playlistController.getAll);
playRouter.delete("/:id", [validID, tokenAuth], playlistController.delete);

export default playRouter;
