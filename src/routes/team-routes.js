import express from "express";
import teamController from "../controllers/team-controller.js";
const teamRouter = express.Router();

teamRouter.post("/", teamController.createTeam);
teamRouter.get("/:id", teamController.getTeamById);
teamRouter.get("/", teamController.getTeams);

export default teamRouter;
