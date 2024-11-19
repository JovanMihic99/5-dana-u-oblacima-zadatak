import asyncHandler from "express-async-handler";

const createPlayer = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Create player controller" });
});

export default { createPlayer };
