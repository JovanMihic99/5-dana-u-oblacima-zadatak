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

  const query = `INSERT INTO players (id, nickname) VALUES ('${id}', '${nickname}')`;
  try {
    // Run insert query
    await runQuery(db, query);
    // console.log(`Player ${nickname} inserted into players table`);
    res.status(200).json({
      message: `Player ${nickname} with id: ${id} inserted into players table`,
    });
  } catch (err) {
    res.status(500).json({ message: `Error executing query: ${err.message}` });
  }
});

const getPlayerById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  let result;
  const query = `SELECT * FROM players WHERE id = ?`;
  try {
    db.get(query, [id], (err, row) => {
      if (err) {
        console.error("Error executing query:", err.message);
      } else {
        result = row;
        console.log("Player data:", row);
        res.status(200).json({
          message: result,
        });
      }
    });
  } catch (err) {
    res.status(500).json({ message: `Error executing query: ${err.message}` });
  }
});

export default { createPlayer, getPlayerById };
