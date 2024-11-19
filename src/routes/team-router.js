import express from "express";
import teamController from "../controllers/team-controller.js";
import { validateTeam } from "../middleware/validators/team-validator.js";
const teamRouter = express.Router();

teamRouter.post("/", validateTeam, teamController.createTeam);
teamRouter.get("/:id", teamController.getTeamById);

export default teamRouter;
