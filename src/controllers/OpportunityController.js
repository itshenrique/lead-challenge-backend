const { Opportunity, Lead } = require('../models');
const { statusLead } = require('./util/enum');
const jwt = require('../middleware/jwt');

module.exports = {
  async agendarReuniao(request, response) {
    const userAuth = jwt.verifyJwt(request);
    if (userAuth.auth === true) {
      const data = {
        leadId: request.body.leadId,
        date: request.body.date,
      };
      Lead.update(
        { StatusId: statusLead['Reunião Agendada'] },
        { where: { Id: data.leadId } }
      ).catch((err) => {
        console.error(err);
        return response.json({
          metodo: 'agendarReuniao',
          resultado: 'ERROR',
        });
      });

      const opportunities = await Opportunity.findAll({
        where: { LeadId: data.leadId },
      });

      Promise.all(
        opportunities.map((opportunity) => {
          Opportunity.update(
            {
              Description: `${opportunity.Description} Agendado: ${data.date}`,
            },
            { where: { Id: opportunity.Id } }
          );
        })
      )
        .then(() => {
          return response.json({
            metodo: 'agendarReuniao',
            resultado: 'SUCESSO',
          });
        })
        .catch((err) => {
          console.error(err);
          return response.json({
            metodo: 'agendarReuniao',
            resultado: 'ERROR',
          });
        });
    } else {
      return response.json({
        metodo: 'agendarReuniao',
        resultado: 'ERRO',
        payload: {
          mensagem: userAuth.message,
        },
      });
    }
  },
};
