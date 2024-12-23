import { findPlayersByTeamId, updatePlayer } from "./player-service.js";
import { db } from "../db/db.js";
export async function saveMatch(id, team1Id, team2Id, winningTeamId, duration) {
  try {
    const insertQuery = `INSERT INTO matches (id,team1Id,team2Id,winningTeamId, duration ) VALUES (?,?,?,?,?)`;
    await new Promise((resolve, reject) => {
      db.run(
        insertQuery,
        [id, team1Id, team2Id, winningTeamId, duration],
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

export async function updateTeamsAfterMatch(
  matchTied,
  winnerId,
  looserId,
  hours
) {
  try {
    // winners
    const winningPlayers = await findPlayersByTeamId(winnerId);
    const totalWinnerELO = winningPlayers.reduce(
      (sum, player) => sum + player.elo,
      0
    );
    const avgELOWinners = totalWinnerELO / winningPlayers.length; // average elo of opponent team
    // losers
    const loosingPlayers = await findPlayersByTeamId(looserId);
    const totalLooserELO = loosingPlayers.reduce(
      (sum, player) => sum + player.elo,
      0
    );
    const avgELOLosers = totalLooserELO / loosingPlayers.length;
    const winnersAndLoosers = [...winningPlayers, ...loosingPlayers]; // combine winner and losers to loop through them in one loop
    for (let i = 0; i < winnersAndLoosers.length; i++) {
      const player = winnersAndLoosers[i];
      const k = calculateRatingAdjustment(player);
      player.ratingAdjustment = k;
      player.hoursPlayed += hours;

      if (i < winningPlayers.length) {
        // first 5 are winners, other 5 are loosers
        if (!matchTied) player.wins += 1;
        player.elo = calculateELO("win", player.elo, avgELOLosers, k);
      } else {
        if (!matchTied) player.losses += 1;
        player.elo = calculateELO("loss", player.elo, avgELOWinners, k);
      }
      await updatePlayer(player.id, player);
    }
  } catch (err) {
    console.error(err);
  }
}

export function calculateRatingAdjustment(player) {
  const { hours } = player;
  let k = 50;
  switch (true) {
    case hours < 500:
      k = 50;
      break;
    case hours >= 500 && hours < 1000:
      k = 40;
      break;
    case hours >= 1000 && hours < 3000:
      k = 30;
      break;
    case hours >= 3000 && hours < 5000:
      k = 20;
      break;
    case hours >= 5000:
      k = 10;
      break;
  }
  return k;
}

export function calculateELO(
  result,
  currentELO,
  averageOponentTeamELO,
  ratingAdjustment
) {
  let s, expectedELO, newELO;
  s = 0.5; // in case of tie
  if (result === "win") {
    s = 1; // in case of win
  } else if (result === "loss") {
    s = 0; //in case of loss
  }

  expectedELO =
    1 / (1 + Math.pow(10, (averageOponentTeamELO - currentELO) / 400));
  newELO = currentELO + ratingAdjustment * (s - expectedELO);

  return newELO;
}
