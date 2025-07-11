import { sequelize } from "../db/index.js";
import { defineUserModel } from "./user.js";
import { defineContactModel } from "./contact.js";

// Ініціалізація моделей
const User = defineUserModel(sequelize);
const Contact = defineContactModel(sequelize);

// Зв'язки між моделями
User.hasMany(Contact, { foreignKey: "owner" });
Contact.belongsTo(User, { foreignKey: "owner" });

export { sequelize, User, Contact };
