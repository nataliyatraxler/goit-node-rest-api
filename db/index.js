import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";
import { defineUserModel } from "../models/user.js";
import { defineContactModel } from "../models/contact.js";

// 1. Ініціалізація Sequelize
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
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

// 2. Визначення моделей
const User = defineUserModel(sequelize);
const Contact = defineContactModel(sequelize);

// 3. Зв’язки між моделями
User.hasMany(Contact, { foreignKey: "owner" });
Contact.belongsTo(User, { foreignKey: "owner" });

// 4. Експорт
export { sequelize, User, Contact };
