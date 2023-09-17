let { contas, saques } = require("../bancodedados");
const { format } = require("date-fns");
const { validarConta } = require("../funcoes/validarConta");


const sacar = (req, res) => {
 
    const { numero_conta, valor, senha } = req.body;

    if (numero_conta === "" || valor === "" || senha === "") {
      return res
        .status(404)
        .json({ mensagem: "Os campos de número de conta, valor e senha são obrigatórios!" });
    }

    const contaExistente = validarConta(numero_conta, contas);

    if (!contaExistente) {
      return res
        .status(404)
        .json({ mensagem: "A conta informada não existe!" });
    }

    if (contaExistente.usuario.senha !== senha) {
      return res
        .status(404)
        .json({ mensagem: "A senha informada é inválida!" });
    }
  

    if (contaExistente.saldo <= 0) {
      return res.status(404).json({ mensagem: "Não há saldo na conta!" });
    }

    if (valor <= 0) {
      return res.status(400).json({
        mensagem: "O valor não pode ser menor ou igual a zero!",
      });
    }

    const momentoSaque = new Date();

    contaExistente.saldo -= Number(valor);

    const data = format(momentoSaque, "yyyy-MM-dd HH:mm:ss");

    const saque = {
      data,
      numero_conta,
      valor,
    };

    saques.push(saque);
    return res.status(201).json(saque);
};

module.exports = {
  sacar,
};
