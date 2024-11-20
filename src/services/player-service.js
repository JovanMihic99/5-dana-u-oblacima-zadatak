import { db } from "../db/db.js";

export async function createNewPlayer(id, nickname) {
  try {
    const query = `INSERT INTO players (id, nickname) VALUES (? , ?)`;
    const result = await new Promise((resolve, reject) => {
      db.run(query, [id, nickname], function (err) {
        if (err) {
          return reject(new Error(err.message));
        }
        resolve({
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
    return result;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

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

    let result = await new Promise((resolve, reject) => {
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
    return result;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function findAllPlayers() {
  try {
    const selectQuery = `SELECT * FROM players`;
    let result = await new Promise((resolve, reject) => {
      db.all(selectQuery, [], (err, rows) => {
        if (err) {
          return reject(new Error(err.message));
        }
        if (!rows.length) {
          return reject(new Error(`No players found`));
        }

        resolve(rows);
      });
    });
    return result;
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
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
}

export async function updatePlayer(id, player) {
  const { nickname, wins, losses, elo, hoursPlayed, teamId, ratingAdjustment } =
    player;
  try {
    const updateQuery = `UPDATE players SET nickname = ?, wins = ?, losses = ?, elo = ?, hoursPlayed = ?, teamId = ?, ratingAdjustment = ? WHERE id = ?`;
    await new Promise((resolve, reject) => {
      db.run(
        updateQuery,
        [
          nickname,
          wins,
          losses,
          elo,
          hoursPlayed,
          teamId,
          ratingAdjustment,
          id,
        ],
        (err) => {
          if (err) return reject(new Error(err.message));
          resolve();
        }
      );
    });
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function isNicknameTaken(nickname) {
  try {
    const selectQuery = `SELECT * FROM players WHERE nickname = ?`;
    const row = await new Promise((resolve, reject) => {
      db.get(selectQuery, [nickname], (err, row) => {
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
