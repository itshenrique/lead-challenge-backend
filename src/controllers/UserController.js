// index, show, store, update, destroy
const { User } = require('../models');
const validator = require('./util/validator');
const jwt = require('../middleware/jwt');

module.exports = {
  async create(request, response) {
    const data = {
      username: request.body.username,
      password: request.body.password,
    };

    if (!validator.validaSenha(data.password)) {
      return response.json({
        metodo: 'createUser',
        resultado: 'ERROR',
        payload: {
          mensagem: 'Senha inválida',
        },
      });
    }

    User.create({
      UserName: data.username,
      Password: data.password,
    })
      .then((user) => {
        const token = jwt.signJwt(user.Id);

        return response.json({
          metodo: 'createUser',
          resultado: 'SUCESSO',
          token,
        });
      })
      .catch((err) => {
        console.error(err);
        return response.json({
          metodo: 'createUser',
          resultado: 'ERROR',
        });
      });
  },
  async login(request, response) {
    const data = {
      username: request.body.username,
      password: request.body.password,
    };

    if (
      data.username === '' ||
      data.password === '' ||
      data.username === undefined ||
      data.password === undefined
    ) {
      return response.json({
        metodo: 'loginUser',
        resultado: 'ERROR',
        payload: {
          mensagem: 'Usuário ou senha vazio',
        },
      });
    }

    const resultQuery = await User.findOne({
      where: {
        username: data.username,
        password: data.password,
      },
    });

    if (resultQuery === null) {
      return response.json({
        metodo: 'loginUser',
        resultado: 'ERROR',
        payload: {
          mensagem: 'Usuário não encontrado',
        },
      });
    }

    const token = jwt.signJwt(resultQuery.Id);

    return response.json({
      metodo: 'loginUser',
      resultado: 'SUCESSO',
      token,
    });
  },
};
