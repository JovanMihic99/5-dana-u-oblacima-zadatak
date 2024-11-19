import express from "express";
import matchController from "../controllers/match-controller.js";
const matchRouter = express.Router();

matchRouter.post("/", matchController.createMatch);
// matchRouter.get("/:id", matchController.getMatchById);

export default matchRouter;
