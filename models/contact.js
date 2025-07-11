import { DataTypes } from "sequelize";

export const defineContactModel = (sequelize) => {
  const Contact = sequelize.define(
    "Contact",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: "Contacts",
    }
  );

  return Contact;
};
