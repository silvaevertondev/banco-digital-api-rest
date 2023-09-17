let { contas } = require("../bancodedados");
let {
  extrairDepositos,
  extrairSaques,
  extrairTransferenciasEnviadas,
  extrairTransferenciasRecebidas,
} = require("../funcoes/extrato");
const { validarConta } = require("../funcoes/validarConta");

const extrato = (req, res) => {
  const { numero_conta, senha } = req.query;

  
    if (!numero_conta || !senha) {
      return res.status(404).json({
        mensagem: "Os campos de número de conta e senha são obrigatórios!",
      });
    }

    const contaExistente = validarConta(numero_conta, contas);

    if (!contaExistente) {
      return res
        .status(404)
        .json({ mensagem: "Conta bancária não encontrada!" });
    }

    if (contaExistente.usuario.senha !== senha) {
      return res
        .status(404)
        .json({ mensagem: "A senha informada é inválida!" });
    }

    const depositos = extrairDepositos(numero_conta);
    const saques = extrairSaques(numero_conta);
    const transferenciasEnviadas = extrairTransferenciasEnviadas(numero_conta);
    const transferenciasRecebidas =
      extrairTransferenciasRecebidas(numero_conta);

    const extrato = {
      depositos,
      saques,
      transferenciasEnviadas,
      transferenciasRecebidas,
    };

    return res.status(200).json(extrato);
};

module.exports = {
  extrato,
};
