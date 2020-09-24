const jwt = require('jsonwebtoken');
require('dotenv-safe').config();

function getTokenFromHeaders(request) {
  const token =
    request.body.token ||
    request.query.token ||
    request.headers['x-access-token'] ||
    request.headers['authorization'];

  return token;
}

module.exports = {
  signJwt(id) {
    const payload = { id };
    return jwt.sign(payload, process.env.SECRET);
  },
  verifyJwt(request) {
    const token = getTokenFromHeaders(request);
    if (!token) {
      return { auth: false, message: 'Falha na autenticação' };
    }
    return jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return { auth: false, message: 'Falha na autenticação' };

      return { auth: true, message: 'Usuário autenticado' };
    });
  },
};
