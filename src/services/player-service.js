import { db } from "../db/db.js";
export async function populatePlayers(players) {
  let res = [];
  for (const pId of players) {
    res.push(await findPlayerById(pId));
  }
  return res;
}

export async function findPlayerById(id) {
  try {
    const selectQuery = `SELECT * FROM players WHERE id = ?`;
    const row = await new Promise((resolve, reject) => {
      db.get(selectQuery, [id], (err, row) => {
        if (err) {
          return reject(new Error(err.message));
        }
        if (!row) {
          return reject(new Error(`Player ${id} not found`));
        }
        resolve(row);
      });
    });
    return row;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
export async function findPlayersByTeamId(teamId) {
  try {
    const selectQuery = `SELECT * FROM players WHERE teamId = ?`;

    let rows = await new Promise((resolve, reject) => {
      db.all(selectQuery, [teamId], (err, rows) => {
        if (err) {
          return reject(new Error(err.message));
        }
        if (!rows) {
          return reject(new Error(`No Players with teamId: ${teamId} found`));
        }
        resolve(rows);
      });
    });
    return rows;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function updatePlayersTeam(players, teamId) {
  for (const playerId of players) {
    try {
      const updateQuery = `UPDATE players SET teamId = ? WHERE id = ?`;
      await new Promise((resolve, reject) => {
        db.run(updateQuery, [teamId, playerId], (err) => {
          if (err) return reject(new Error(err.message));
          resolve();
        });
      });
      console.log(`Player ${playerId}'s team updated to ${teamId}`);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
}
