module.exports = (sequelize, type) => {
  const queryInterface = sequelize.getQueryInterface();
  const tableName = 'User';
  const model = {
    Id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    UserName: {
      type: type.STRING,
      allowNull: false,
    },
    Password: {
      type: type.STRING,
      allowNull: false,
    },
  };

  // Create table if don't exist
  queryInterface.createTable(tableName, model);

  return sequelize.define(tableName, model);
};
