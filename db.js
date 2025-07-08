import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

// Тест підключення
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // 🔁 синхронізація моделей
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
    process.exit(1);
  }
};

// ⬅️ ВАЖЛИВО: саме тут default
export default sequelize;
