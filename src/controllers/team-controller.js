import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";

import {
  findPlayersByTeamId,
  populatePlayers,
  updatePlayersTeam,
} from "../services/player-service.js";
import { findTeamById, saveTeam } from "../services/team-service.js";
const createTeam = asyncHandler(async (req, res) => {
  const { players, teamName } = req.body;
  const id = uuidv4();
  let result = {};
  let populatedPlayers = await populatePlayers(players);
  updatePlayersTeam(players, id); // update teamId column in players which are assigned to this team
  saveTeam(id, teamName); //save team to db
  result = {
    id,
    teamName,
    players: populatedPlayers,
  };
  res.status(200).json(result);
});

const getTeamById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let result = {};
  const team = await findTeamById(id);
  const players = await findPlayersByTeamId(id);

  result = {
    ...team,
    players,
  };
  res.status(200).json(result);
});
const getTeams = asyncHandler(async (req, res) => {
  const { players, teamName } = req.body;
});

export default { createTeam, getTeamById, getTeams };
