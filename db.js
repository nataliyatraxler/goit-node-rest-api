import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Render вимагає SSL
    },
  },
});

export const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful'); // 🔥 Вивід у консоль
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1); // ❌ завершення у разі помилки
  }
};
