import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; 
import { sequelize } from "./models/index.js";
import authRouter from "./routes/authRouter.js";
import contactsRouter from "./routes/contactsRouter.js";

// ⬇️ Для коректної роботи __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🌱 Завантаження змінних середовища
dotenv.config();

const app = express();

// 📦 Middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// 🖼️ Статика (для avatar)
app.use(express.static(path.join(__dirname, "public")));

// 🔗 Роутери
app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

// ❌ 404 — маршрут не знайдено
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// ⚠️ Обробка помилок
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// 🚀 Запуск сервера з БД
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection has been established successfully.");

    await sequelize.sync({ alter: true }); // У продакшені — бажано замінити на { force: false }
    app.listen(PORT, () => {
      console.log(`✅ Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error("❌ DB sync error:", error.message);
    process.exit(1);
  }
};

start();
