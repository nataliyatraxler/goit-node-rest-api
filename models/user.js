import { DataTypes } from "sequelize";

export const defineUserModel = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     
      avatarURL: {
  type: DataTypes.STRING,
  defaultValue: null,
},


      subscription: {
        type: DataTypes.ENUM("starter", "pro", "business"),
        defaultValue: "starter",
      },
      token: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      freezeTableName: true, // 👈 не дозволяє Sequelize перейменовувати в "Users"
      tableName: "Users",    // 👈 явно вказуємо назву таблиці
    }
  );

  return User;
};
