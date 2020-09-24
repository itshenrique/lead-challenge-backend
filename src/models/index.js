const Sequelize = require('sequelize');
const UserModel = require('./user');
const LeadModel = require('./lead');
const CustomerModel = require('./customer');
const StatusLeadModel = require('./statusLead');
const OpportunityModel = require('./opportunity');

sequelize = new Sequelize('database', 'user', 'pass123', {
  dialect: 'sqlite',
  storage: 'data/db/storage.sqlite',
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

const User = UserModel(sequelize, Sequelize);
const Lead = LeadModel(sequelize, Sequelize);
const Customer = CustomerModel(sequelize, Sequelize);
const StatusLead = StatusLeadModel(sequelize, Sequelize);
const Opportunity = OpportunityModel(sequelize, Sequelize);

//Constraints
StatusLead.hasMany(Lead, { foreignKey: 'StatusId' });
Lead.hasMany(Opportunity, { foreignKey: 'LeadId' });
Lead.hasOne(Customer, { foreignKey: 'LeadId' });

sequelize
  .authenticate()
  .then(() => {
    console.log(
      'Connection has been established successfully to the sqlite database.'
    );
  })
  .catch((err) => {
    console.error('Unable to connect to the sqlite database:', err);
  });

module.exports = { User, Lead, Customer, StatusLead, Opportunity };
