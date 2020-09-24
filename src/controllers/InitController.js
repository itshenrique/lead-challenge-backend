const { StatusLead, User } = require('../models');
const { statusLead } = require('./util/enum');

module.exports = {
  async init(request, response) {
    Object.entries(statusLead).map((status) => {
      console.log(status[0]);
      StatusLead.create({ Description: status[0], Id: status[1] });
    });

    return response.json({
      metodo: 'init',
      resultado: 'SUCESSO',
      payload: {
        statusLead,
      },
    });
  },
};
