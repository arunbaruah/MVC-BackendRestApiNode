const schemaValidator = require('../common/schemaValidator');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Address: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        schema: schemaValidator({
          type: "object",
          Street: { type: String },
          City: { type: String },
          Zip: { type: String },
          State: { type: String },
          Country: { type: String }
        }),
      }
    }

  });
  return User;
};
