import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../db/db.js";

const createPlayer = asyncHandler(async (req, res) => {
  const { nickname } = req.body;

  // Nickname validation (rework this later)
  if (!nickname) {
    return res.status(400).json({ message: `Error: Nickname is required` });
  }
  const selectNicknameQuery = `SELECT * FROM players WHERE nickname = ?`;
  db.get(selectNicknameQuery, [nickname], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      return res.status(400).json({
        message: `Error: Nickname already taken, please choose a different one`,
      });
    }

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
});
const getPlayerById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // SELECT query
  const selectQuery = `SELECT * FROM players WHERE id = ?`;
  db.get(selectQuery, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(400).json({ error: "Player not found" });
    }
    return res.status(200).json(row);
  });
});

export default { createPlayer, getPlayerById };
