import { DataTypes } from "sequelize";

export const defineUserModel = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      verify: {
  type: DataTypes.BOOLEAN,
  defaultValue: false,
},
verificationToken: {
  type: DataTypes.STRING,
},


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
      freezeTableName: true, 
      tableName: "Users",   
    }
  );

  return User;
};
