import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

import { sequelize } from "./models/index.js"; // ⬅️ Підключення БД та асоціацій
import authRouter from "./routes/authRouter.js";
import contactsRouter from "./routes/contactsRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// 🔗 Маршрути
app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

// 404 — неіснуючий маршрут
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Обробка помилок
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// Запуск сервера з підключенням БД
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection has been established successfully.");

    await sequelize.sync({ alter: true }); // ⚠️ У продакшені краще `sync({ force: false })`

    app.listen(PORT, () => {
      console.log(`✅ Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error("❌ DB sync error:", error.message);
    process.exit(1);
  }
};

start();
