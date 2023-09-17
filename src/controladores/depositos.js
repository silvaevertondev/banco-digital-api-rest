let { contas, depositos } = require("../bancodedados");
const { format } = require("date-fns");
const { validarConta } = require("../funcoes/validarConta");

const depositar = (req, res) => {
  const { numero_conta, valor } = req.body;

  
    if (!numero_conta && !valor) {
      return res
        .status(404)
        .json({ mensagem: "O número da conta e o valor são obrigatórios!" });
    }

    const contaExistente = validarConta(numero_conta, contas);

    if (!contaExistente) {
      return res
        .status(404)
        .json({ mensagem: "A conta informada não existe!" });
    }

    if (valor <= 0) {
      return res.status(400).json({
        mensagem: "O depósito não pode ser um valor menor ou igual a zero!",
      });
    }

    const momentoDeposito = new Date();

    contaExistente.saldo += Number(valor);

    const data = format(momentoDeposito, "yyyy-MM-dd HH:mm:ss");

    const deposito = {
      data,
      numero_conta,
      valor,
    };

    depositos.push(deposito);

    return res.status(201).json(deposito);
  
};

module.exports = {
  depositar,
};
