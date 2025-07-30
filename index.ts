import express from "express";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log("✅ Jordy MCP Server is running on port 3000");
});
