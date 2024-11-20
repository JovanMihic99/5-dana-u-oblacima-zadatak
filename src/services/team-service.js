import { db } from "../db/db.js";
export async function findTeamById(id) {
  try {
    const selectQuery = `SELECT * FROM teams WHERE id = ?`;
    const row = await new Promise((resolve, reject) => {
      db.get(selectQuery, [id], (err, row) => {
        if (err) {
          return reject(new Error(err.message));
        }
        if (!row) {
          return reject(new Error(`Team ${id} not found`));
        }
        resolve(row);
      });
    });
    return row;
  } catch (error) {
    // console.error(error.message);
    throw error;
  }
}

export async function saveTeam(id, teamName) {
  try {
    const insertQuery = `INSERT INTO teams (id,teamName) VALUES (?,?)`;
    await new Promise((resolve, reject) => {
      db.run(insertQuery, [id, teamName], (err, row) => {
        if (err) return reject(new Error(err.message));
        resolve();
      });
    });
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function isTeamNameTaken(teamName) {
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
