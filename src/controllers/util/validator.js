const validaSenha = (password) => {
  const regexValidador = /^(?=.*\d)(?=.*[$*&@#?!;:])[0-9a-zA-Z$*&@#?!;:]{8,}$/;

  return regexValidador.test(password);
};

module.exports = { validaSenha };
