import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`ELO rating API listening on port ${port}`);
});
