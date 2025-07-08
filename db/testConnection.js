import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Sequelize } from "sequelize";

// Отримуємо __dirname (в ESM модулях)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Явно підключаємо .env з кореня проєкту
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("DB_PASSWORD is:", process.env.DB_PASSWORD);
console.log("Connecting with:");
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD); // обережно — тимчасово!
console.log("DB_HOST:", process.env.DB_HOST);


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl:
        process.env.DB_SSL === "true"
          ? { require: true, rejectUnauthorized: false }
          : false,
    },
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
  } finally {
    await sequelize.close();
  }
})();
