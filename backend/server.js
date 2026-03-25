import "dotenv/config";

import express from "express";
import cors from "cors";
import generateRoute from "./routes/generate.js";
import missionRoute from "./routes/mission.js";
import { connectDB } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 conectar Mongo primero
await connectDB();

// 🔥 rutas
app.use("/api/generate", generateRoute);
app.use("/api/mission", missionRoute);

// test
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

// 🔥 CAMBIO IMPORTANTE PARA RENDER
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});