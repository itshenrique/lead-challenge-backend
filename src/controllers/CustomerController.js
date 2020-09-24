const { Lead, Customer } = require('../models');
const { statusLead } = require('./util/enum');
const jwt = require('../middleware/jwt');

module.exports = {
  async confirmarDados(request, response) {
    const userAuth = jwt.verifyJwt(request);
    if (userAuth.auth === true) {
      const data = {
        leadId: request.body.leadId,
      };

      Lead.update(
        { StatusId: statusLead['Dados Confirmados'] },
        { where: { Id: data.leadId } }
      )
        .then(() => {
          Customer.create({
            LeadId: data.leadId,
          }).then((result) => {
            return response.json({
              metodo: 'confirmarDados',
              resultado: 'SUCESSO',
              payload: {
                leadId: data.leadId,
                customerId: result.Id,
              },
            });
          });
        })
        .catch((err) => {
          console.error(err);
          return response.json({
            metodo: 'salvarLead',
            resultado: 'ERROR',
          });
        });
    } else {
      return response.json({
        metodo: 'confirmarDados',
        resultado: 'ERRO',
        payload: {
          mensagem: userAuth.message,
        },
      });
    }
  },
};
