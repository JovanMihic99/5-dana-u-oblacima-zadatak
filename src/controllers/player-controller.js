import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import sqlite3 from "sqlite3";
// import dbPromise from "../../db/database.js";
import { runQuery, db } from "../../db/db.js";
const createPlayer = asyncHandler(async (req, res) => {
  const { nickname } = req.body;
  if (!nickname) {
    res.status(400);
    throw new Error("Player nickname is required");
  }
  const id = uuidv4();

  const query = `INSERT INTO players (id, nickname) VALUES (? , ?)`;
  db.run(query, [id, nickname], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({
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
  const selectQuery = `SELECT * FROM players WHERE id = ?`;

  db.get(selectQuery, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(400).json({ error: "Player not found" });
    }
    res.status(200).json(row);
  });
});

export default { createPlayer, getPlayerById };
