import mongoose from "mongoose";

export async function connectDB() {
  try {
    // 🔍 Debug para comprobar que llega la URI
    console.log("MONGO_URI:", process.env.MONGO_URI);

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI no está definida en el .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("🟢 MongoDB conectado");
  } catch (error) {
    console.error("🔴 Error MongoDB:", error.message);
    process.exit(1); // opcional pero recomendado
  }
}