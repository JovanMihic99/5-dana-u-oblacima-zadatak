import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import { saveMatch, updateTeamsAfterMatch } from "../services/match-service.js";

const recordMatch = asyncHandler(async (req, res) => {
  const { team1Id, team2Id, winningTeamId, duration } = req.body;
  const winnerId = winningTeamId === team1Id ? team1Id : team2Id; // get winner
  const looserId = winningTeamId !== team1Id ? team1Id : team2Id; // get looser
  await saveMatch(team1Id, team2Id, winningTeamId, duration); // save the match results to the db
  await updateTeamsAfterMatch(winnerId, looserId, duration); // update wins/losses and calculate ELO for all players
  return res.status(200).json({});
});

export default { recordMatch };
