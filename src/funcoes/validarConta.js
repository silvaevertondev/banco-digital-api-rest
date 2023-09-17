const validarConta = (numero_conta, contas) => {
  const contaExiste = contas.find((conta) => {
    return conta.numero === Number(numero_conta);
  });
  return contaExiste;
};

module.exports = {
  validarConta,
};
