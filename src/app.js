import express from "express";
import playerRouter from "./routes/player-router.js";
import teamRouter from "./routes/team-routes.js";
const app = express();

// Middleware
app.use(express.json());
// Routes
app.use("/players", playerRouter);
app.use("/teams", teamRouter);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong." });
});

export default app;
