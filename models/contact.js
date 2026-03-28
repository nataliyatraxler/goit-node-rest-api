// models/contact.js
import { DataTypes } from "sequelize";
import sequelize from "../db/index.js"; // або твій правильний шлях

const Contact = sequelize.define("Contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

export default Contact; // ✅ Ось це дозволяє імпортувати `import Contact from`
