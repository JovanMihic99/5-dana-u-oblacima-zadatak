import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import {
  findAllPlayers,
  findPlayerById,
  createNewPlayer,
} from "../services/player-service.js";
const createPlayer = asyncHandler(async (req, res) => {
  const { nickname } = req.body;
  const id = uuidv4();

  let result;
  try {
    result = await createNewPlayer(id, nickname);
  } catch (err) {
    return res.status(500).json({ error: `Something went wrong` });
  }
  return res.status(200).json(result);
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
    result = await findAllPlayers();
  } catch (err) {
    return res.status(404).json({ error: `No players found` });
  }
  return res.status(200).json(result);
});

export default { createPlayer, getPlayerById, getPlayers };
