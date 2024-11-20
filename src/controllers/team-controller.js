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
  try {
    let populatedPlayers = await populatePlayers(players);
    updatePlayersTeam(players, id); // assing the TeamId to each corresponding player
    saveTeam(id, teamName); //save team to db (I'm not sure if this is actually required, but I'm leaving it in)
    result = {
      id,
      teamName,
      players: populatedPlayers,
    };
  } catch (error) {
    console.error(error);
    res.status(400).json;
  }

  res.status(200).json(result);
});

const getTeamById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let result = {};
  let team;
  try {
    team = await findTeamById(id);
  } catch (error) {
    if (!team) {
      return res.status(404).json({ error: `${error.message}` });
    }
    throw new Error(error);
  }

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
