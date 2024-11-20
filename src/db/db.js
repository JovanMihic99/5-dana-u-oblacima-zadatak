import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", (err) => {
  if (err) return console.error("Error connecting to database", err.message);
  // console.log("Connected to in-memory sqlite3 database");
});

// Utility function to wrap db.run in a Promise
function runQuery(db, query) {
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (err) reject(err); // Reject on error
      else resolve(); // Resolve on success
    });
  });
}

async function createTables() {
  // Create table queries
  const createTeamsQuery = `CREATE TABLE IF NOT EXISTS teams (
    id TEXT PRIMARY KEY,
    teamName TEXT NOT NULL UNIQUE
)`;
  const createPlayersQuery = `CREATE TABLE IF NOT EXISTS players (
    id TEXT PRIMARY KEY,
    nickname TEXT NOT NULL,
    wins INT DEFAULT 0,
    losses INT DEFAULT 0,
    elo INT DEFAULT 0,
    hoursPlayed INT DEFAULT 0,
    ratingAdjustment INT DEFAULT NULL,
    teamId TEXT DEFAULT NULL,
    FOREIGN KEY (teamId) REFERENCES teams(id)
)`;
  const createMatchesQuery = `CREATE TABLE IF NOT EXISTS matches (
    id TEXT PRIMARY KEY,
    team1Id TEXT,
    team2Id TEXT,
    winningTeamId TEXT DEFAULT NULL,
    duration INT DEFAULT 0,
    FOREIGN KEY (team1Id) REFERENCES teams(id),
    FOREIGN KEY (team2Id) REFERENCES teams(id),
    FOREIGN KEY (winningTeamId) REFERENCES teams(id)
)`;

  try {
    // Run all queries sequentially
    await runQuery(db, createTeamsQuery);
    console.log("Teams table created");
    await runQuery(db, createPlayersQuery);
    console.log("Players table created");
    await runQuery(db, createMatchesQuery);
    console.log("Matches table created");
  } catch (err) {
    console.error("Error creating tables:", err.message);
  }
}

export { createTables, runQuery, db };
