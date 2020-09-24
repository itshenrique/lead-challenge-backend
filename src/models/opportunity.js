module.exports = (sequelize, type) => {
  const queryInterface = sequelize.getQueryInterface();
  const tableName = 'Opportunity';
  const model = {
    Id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    LeadId: {
      type: type.INTEGER,
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
