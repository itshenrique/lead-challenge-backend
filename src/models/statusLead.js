module.exports = (sequelize, type) => {
  const queryInterface = sequelize.getQueryInterface();
  const tableName = 'StatusLead';
  const model = {
    Id: {
      type: type.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    Description: {
      type: type.STRING,
      allowNull: false,
    },
  };

  // Create table if don't exist
  queryInterface.createTable(tableName, model);

  return sequelize.define(tableName, model);
};
