let { contas, transferencias } = require("../bancodedados");
const { format } = require("date-fns");

const transferir = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

     if (
      numero_conta_origem === "" ||
      numero_conta_destino === "" ||
      valor === "" ||
      senha === ""
    ) {
      return res
        .status(404)
        .json({ mensagem: "todos os campos são obrigatórios!" });
    }

    const contaOrigemExiste = contas.find((contaOrigem) => {
      return contaOrigem.numero === Number(numero_conta_origem);
    });

    if (!contaOrigemExiste) {
      return res.status(404).json({ mensagem: "Conta de origem não existe!" });
    }

    const contaDestinoExiste = contas.find((contaDestino) => {
      return contaDestino.numero === Number(numero_conta_destino);
    });

    if (!contaDestinoExiste) {
      return res.status(404).json({ mensagem: "Conta de destino não existe!" });
    }

    if (contaOrigemExiste.usuario.senha !== senha) {
      return res
        .status(404)
        .json({ mensagem: "A senha informada é inválida!" });
    }

    if (contaOrigemExiste.saldo === 0 || contaOrigemExiste.saldo < valor) {
      return res.status(404).json({ mensagem: "Saldo insuficiente!" });
    }

    const momentoTransferencia = new Date();

    contaOrigemExiste.saldo -= Number(valor);
    contaDestinoExiste.saldo += Number(valor);

    const data = format(momentoTransferencia, "yyyy-MM-dd HH:mm:ss");

    const transferencia = {
      data,
      numero_conta_origem,
      numero_conta_destino,
      valor,
    };

    transferencias.push(transferencia);
    return res.status(201).json(transferencia);
};

module.exports = {
  transferir,
};
