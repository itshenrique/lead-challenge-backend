const { Lead, Opportunity } = require('../models');
const { statusLead } = require('./util/enum');
const jwt = require('../middleware/jwt');

module.exports = {
  async buscaLeads(request, response) {
    const userAuth = jwt.verifyJwt(request);
    if (userAuth.auth === true) {
      const leads = await Lead.findAll({
        attributes: [
          ['Id', 'id'],
          ['CustomerName', 'name'],
          ['StatusId', 'statusId'],
        ],
      });
      return response.json({
        metodo: 'buscaLeads',
        resultado: 'SUCESSO',
        payload: {
          leads,
        },
      });
    } else {
      return response.json({
        metodo: 'buscaLeads',
        resultado: 'ERRO',
        payload: {
          mensagem: userAuth.message,
        },
      });
    }
  },

  async salvarLead(request, response) {
    const data = {
      name: request.body.name,
      phone: request.body.phone,
      email: request.body.email,
      opportunities: request.body.opportunities,
    };

    const result = await Lead.create({
      Date: new Date().getTime(),
      CustomerName: data.name,
      CustomerPhone: data.phone,
      CustomerEmail: data.email,
      StatusId: statusLead['Cliente em Potencial'],
    })
      .then((result) => {
        data.opportunities.forEach((opportunity) => {
          Opportunity.create({
            LeadId: result.Id,
            Description: opportunity,
          });
        });

        return response.json({
          metodo: 'salvarLead',
          resultado: 'SUCESSO',
          payload: {
            id: result.Id,
            nome: result.CustomerName,
          },
        });
      })
      .catch((err) => {
        console.error(err);
        return response.json({
          metodo: 'salvarLead',
          resultado: 'ERROR',
        });
      });
  },
};
