import mongoose from "mongoose";

const MissionSchema = new mongoose.Schema({
  title: String,
  theme: String,
  nodes: Array,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Mission", MissionSchema, "misiones");