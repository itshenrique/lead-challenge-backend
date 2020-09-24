module.exports = (sequelize, type) => {
  const queryInterface = sequelize.getQueryInterface();
  const tableName = 'Lead';
  const model = {
    Id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Date: {
      type: 'TIMESTAMP',
      allowNull: false,
    },
    CustomerName: {
      type: type.STRING,
      allowNull: false,
    },
    CustomerPhone: {
      type: type.STRING,
      allowNull: false,
    },
    CustomerEmail: {
      type: type.STRING,
      allowNull: false,
    },
    StatusId: {
      type: type.INTEGER,
      allowNull: false,
    },
  };

  // Create table if don't exist
  queryInterface.createTable(tableName, model);

  return sequelize.define(tableName, model);
};
