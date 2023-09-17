let { contas } = require("../bancodedados");
const { validarConta } = require("../funcoes/validarConta");


const saldo = (req, res) => {
  const { numero_conta, senha } = req.query;

  if (numero_conta === "" || senha === "") {
    return res.status(404).json({
      mensagem: "Os campos de número de conta e senha são obrigatórios!",
    });
  }

  const contaExistente = validarConta(numero_conta, contas);

  if (!contaExistente) {
    return res.status(404).json({ mensagem: "Conta bancária não encontrada!" });
  }

  if (contaExistente.usuario.senha !== senha) {
    return res.status(404).json({ mensagem: "A senha informada é inválida!" });
  }

  
  const exibirSaldo = {
    saldo: contaExistente.saldo,
  };

  return res.status(200).json(exibirSaldo);
};

module.exports = {
  saldo,
};
