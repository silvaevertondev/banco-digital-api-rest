let { contas } = require("../bancodedados");
const validarCampos = require("../funcoes/validarCampos");
const { validarUsuario } = require("../funcoes/validarUsuario");

const listarContas = (req, res) => {
  if (contas.length === 0) {
    return res
      .status(404)
      .json({ mensagem: "Não há registro de contas cadastradas!" });
  }
  return res.status(200).json(contas);
};

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  const campos = validarCampos(req.body);

  if(!campos){
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
  }
  
  const cpfExistente = contas.find((conta) => {
    return conta.usuario.cpf === cpf;
  });
  const emailExistente = contas.find((conta) => {
    return conta.usuario.email === email;
  });

  if (cpfExistente || emailExistente) {
    return res.status(400).json({
      mensagem: "Já existe uma conta com o CPF ou e-mail informado!",
    });
  }

  const novaConta = {
    numero: contas.length + 1,
    saldo: 0,
    usuario: {
      nome: nome.trim(),
      cpf: cpf.trim(),
      data_nascimento: data_nascimento.trim(),
      telefone: telefone.trim(),
      email: email.trim(),
      senha: senha.trim(),
    },
  };

  contas.push(novaConta);

  return res.status(201).send();
};

const atualizarUsuario = (req, res) => {
  const { numeroConta } = req.params;
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  const campos = validarCampos(req.body);

  if(!campos){
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
  }

  //verificação de existência do usuário
  const contaExistente = validarUsuario(numeroConta, contas);

  if (!contaExistente) {
    return res
      .status(404)
      .json({ mensagem: "O usuário informado não existe!" });
  }

  //verificação de CPF e email repetido
  if (cpf) {
    const cpfRepetido = contas.find((conta) => {
      return (
        conta.usuario.cpf === cpf && conta.numero !== contaExistente.numero
      );
    });

    if (cpfRepetido) {
      return res
        .status(400)
        .json({ mensagem: "Já existe uma conta com o CPF informado!" });
    }
  }

  if (email) {
    const emailRepetido = contas.find((conta) => {
      return (
        conta.usuario.email === email && conta.numero !== contaExistente.numero
      );
    });

    if (emailRepetido) {
      return res
        .status(400)
        .json({ mensagem: "Já existe uma conta com o E-mail informado!" });
    }
  }
  //atualizando usuario
  contaExistente.usuario = {
    nome: nome.trim(),
    cpf: cpf.trim(),
    data_nascimento: data_nascimento.trim(),
    telefone: telefone.trim(),
    email: email.trim(),
    senha: senha.trim(),
  };

  return res.status(204).send();
};

const excluirConta = (req, res) => {
  const { numeroConta } = req.params;

  //verificação de existência do usuário
  const contaExistente = validarUsuario(numeroConta, contas);

  if (!contaExistente) {
    return res.status(404).json({
      mensagem: "O número de conta informado não existe ou não é válido!",
    });
  }

  //verificação de saldo
  if (contaExistente.saldo !== 0) {
    return res.status(400).json({
      mensagem: "A conta só pode ser removida se o saldo for zero!",
    });
  }

  //filtrando contas e excluíndo a conta em questão
  contas = contas.filter((conta) => {
    return conta.numero !== Number(numeroConta);
  });

  return res.status(204).send();
};

module.exports = {
  listarContas,
  criarConta,
  atualizarUsuario,
  excluirConta,
};
