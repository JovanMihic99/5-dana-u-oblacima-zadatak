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

async function isNicknameTaken(teamName) {
  try {
    const selectQuery = `SELECT * FROM teams WHERE teamName = ?`;
    const row = await new Promise((resolve, reject) => {
      db.get(selectQuery, [teamName], (err, row) => {
        if (err) {
          return reject(new Error(err.message));
        }

        resolve(row);
      });
    });
    if (row) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error.stack);
    throw error;
  }
}

export default { createTeam, getTeamById, isNicknameTaken };
