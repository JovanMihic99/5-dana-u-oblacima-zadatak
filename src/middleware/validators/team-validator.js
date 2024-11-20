import expressAsyncHandler from "express-async-handler";
import { isTeamNameTaken } from "../../services/team-service.js";
import { findPlayerById } from "../../services/player-service.js";

export const validateTeam = expressAsyncHandler(async (req, res, next) => {
  const { players, teamName } = req.body;
  if (!players) {
    return res.status(400).json({
      error: "Players are required",
    });
  }
  if (players.length !== 5) {
    return res.status(400).json({
      error: "Players array must contain exactly 5 elements",
    });
  }
  if (!teamName) {
    return res.status(400).json({
      error: "Team name is required",
    });
  }
  if (await isTeamNameTaken(teamName)) {
    return res.status(400).json({
      error: "Team name is already taken. Please choose a different one",
    });
  }
  // check if players exist
  for (const player of players) {
    try {
      await findPlayerById(player);
    } catch (error) {
      return res.status(404).json({
        error: `Player ${player} does not exist`,
      });
    }
  }
  next();
});
