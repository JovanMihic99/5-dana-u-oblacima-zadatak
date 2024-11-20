import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db/db.js";
import { findAllPlayers, findPlayerById } from "../services/player-service.js";
const createPlayer = asyncHandler(async (req, res) => {
  const { nickname } = req.body;

  // Nickname validation (rework this later)

  const id = uuidv4();
  // INSERT query
  const query = `INSERT INTO players (id, nickname) VALUES (? , ?)`;
  db.run(query, [id, nickname], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({
      id,
      nickname,
      wins: 0,
      loses: 0,
      elo: 0,
      hoursPlayed: 0,
      ratingAdjustment: null,
      teamId: null,
    });
  });
});

const getPlayerById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let result;
  try {
    result = await findPlayerById(id);
  } catch (err) {
    return res.status(404).json({ error: `Player ${id} not found` });
  }

  return res.status(200).json(result);
});

const getPlayers = asyncHandler(async (req, res) => {
  let result;
  try {
    console.log("getting players...");
    result = await findAllPlayers();
  } catch (err) {
    return res.status(404).json({ error: `No players found` });
  }
  return res.status(200).json(result);
});

export default { createPlayer, getPlayerById, getPlayers };
