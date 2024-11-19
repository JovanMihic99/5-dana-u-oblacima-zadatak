import expressAsyncHandler from "express-async-handler";
import { isNicknameTaken } from "../../services/player-service.js";

export const validateNickname = expressAsyncHandler(async (req, res, next) => {
  const { nickname } = req.body; // Adjust based on your required fields
  if (!nickname) {
    return res.status(400).json({
      error: "Nickname is required",
    });
  }
  if (await isNicknameTaken(nickname)) {
    return res.status(400).json({
      error: "Nickname is already taken. Please choose a different one",
    });
  }

  next();
});
