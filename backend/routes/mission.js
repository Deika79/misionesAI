import express from "express";
import Mission from "../models/Mission.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    res.json(mission);
  } catch (error) {
    res.status(404).json({ error: "No encontrada" });
  }
});

export default router;