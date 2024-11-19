import express from "express";
import playerController from "../controllers/player-controller.js";
const playerRouter = express.Router();

playerRouter.post("/create", playerController.createPlayer);
playerRouter.get("/:id", playerController.getPlayerById);

export default playerRouter;
