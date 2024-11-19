import { findPlayersByTeamId, updatePlayer } from "./player-service.js";
import { db } from "../db/db.js";
export async function saveMatch(team1Id, team2Id, winningTeamId, duration) {
  try {
    const insertQuery = `INSERT INTO matches (team1Id,team2Id,winningTeamId, duration ) VALUES (?,?,?,?)`;
    await new Promise((resolve, reject) => {
      db.run(
        insertQuery,
        [team1Id, team2Id, winningTeamId, duration],
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

export async function updateTeamsAfterMatch(winnerId, looserId, tie, hours) {
  // note: this whole function's performance should be improved, also must add logic to skip updating scores in case of tie
  try {
    // winners
    const winningPlayers = await findPlayersByTeamId(winnerId);
    const totalWinnerELO = winningPlayers.reduce(
      (sum, player) => sum + player.elo,
      0
    );
    const avgELOWinners = totalWinnerELO / winningPlayers.length;
    // loosers
    const loosingPlayers = await findPlayersByTeamId(looserId);
    const totalLooserELO = loosingPlayers.reduce(
      (sum, player) => sum + player.elo,
      0
    );
    const avgELOLosers = totalLooserELO / loosingPlayers.length;

    for (const player of winningPlayers) {
      const k = calculateRatingAdjustment(player);
      await updatePlayer(player.id, "wins", player.wins + 1); // update wins
      await updatePlayer(player.id, "hoursPlayed", player.hoursPlayed + hours); //update hours played
      // todo: implement some logic to check if the rating should even be updated, as to not waste resources
      await updatePlayer(player.id, "ratingAdjustment", k); // update rating adjustment
      await updatePlayer(
        player.id,
        "elo",
        calculateELO("win", player.elo, avgELOLosers, k)
      );
    }

    for (const player of loosingPlayers) {
      const k = calculateRatingAdjustment(player);

      await updatePlayer(player.id, "losses", player.losses + 1);
      await updatePlayer(player.id, "hoursPlayed", player.hoursPlayed + hours);
      await updatePlayer(player.id, "ratingAdjustment", k);
      await updatePlayer(
        player.id,
        "elo",
        calculateELO("loss", player.elo, avgELOWinners, k)
      );
    }
    let updatedWInners = await findPlayersByTeamId(winnerId);

    console.log(
      "updated winners:",
      updatedWInners.map((p) => p.elo)
    );
  } catch (err) {
    console.error(err);
  }
}

export function calculateRatingAdjustment(player) {
  const { hours } = player;
  let k = 50;
  switch (true) {
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
  console.log({ currentELO, expectedELO, ratingAdjustment, s, result });
  newELO = currentELO + ratingAdjustment * (s - expectedELO);
  //   console.log({ result, r1, r2, k, s, e, rNew });
  return newELO;
}
