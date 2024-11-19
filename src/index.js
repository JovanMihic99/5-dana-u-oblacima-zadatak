import dotenv from "dotenv";
import app from "./app.js";
import { createTables } from "./db/db.js";

dotenv.config();
const port = process.env.PORT || 3000;

// Database initialization
createTables()
  .then(() => {
    console.log("All tables created successfully!");
  })
  .catch((err) => {
    console.error("An error occurred:", err.message);
  });

app.listen(port, () => {
  console.log(`ELO rating API listening on port ${port}`);
});
