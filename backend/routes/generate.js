import express from "express";
import { generateMission, generateImage } from "../services/openai.js";
import Mission from "../models/Mission.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { curso, asignatura, contenido } = req.body;

    const mission = await generateMission(curso, asignatura, contenido);

    // 🔥 generar imagen IA
    const image = await generateImage(mission.theme, contenido);

    const fullMission = {
      ...mission,
      image,
    };

    const saved = await Mission.create(fullMission);

    res.json({
      ...fullMission,
      id: saved._id.toString(),
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando misión" });
  }
});

export default router;