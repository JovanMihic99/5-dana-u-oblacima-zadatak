import express from "express";
import playerController from "../controllers/player-controller.js";
import { validateNickname } from "../middleware/validators/player-validator.js";
const playerRouter = express.Router();

playerRouter.post("/create", validateNickname, playerController.createPlayer);
playerRouter.get("/:id", playerController.getPlayerById);
playerRouter.get("/", playerController.getPlayers);

export default playerRouter;
