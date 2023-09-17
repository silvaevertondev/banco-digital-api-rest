const {
  saques,
  depositos,
  transferencias,
} = require("../bancodedados");

const extrairDepositos = (numeroConta) => depositos.filter((deposito) => deposito.numero_conta === numeroConta);

const extrairSaques = (numeroConta) => saques.filter((saque) => saque.numero_conta === numeroConta);

const extrairTransferenciasEnviadas = (numeroConta) => transferencias.filter((transferencia) => transferencia.numero_conta_origem === numeroConta);

const extrairTransferenciasRecebidas = (numeroConta) => transferencias.filter((transferencia) => transferencia.numero_conta_destino === numeroConta);



module.exports = {
  extrairDepositos,
  extrairSaques,
  extrairTransferenciasEnviadas,
  extrairTransferenciasRecebidas,
};
