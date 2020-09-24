const { Router } = require('express');
const LeadController = require('./controllers/LeadController');
const UserController = require('./controllers/UserController');
const InitController = require('./controllers/InitController');
const CustomerController = require('./controllers/CustomerController');
const OpportunityController = require('./controllers/OpportunityController');

const routes = Router();

routes.post('/init', InitController.init);
routes.post('/login', UserController.login);
routes.post('/cadastrar/usuario', UserController.create);
routes.get('/buscar/leads', LeadController.buscaLeads);
routes.post('/cadastrar/lead', LeadController.salvarLead);
routes.put('/atualizar/dados', CustomerController.confirmarDados);
routes.put('/atualizar/reuniao', OpportunityController.agendarReuniao);

module.exports = routes;
