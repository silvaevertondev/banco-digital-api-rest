const express = require('express');
const { validarSenha } = require('./intermediarios');
const { listarContas, criarConta, atualizarUsuario, excluirConta } = require('./controladores/contas');
const { depositar } = require('./controladores/depositos');
const { sacar } = require('./controladores/saques');
const { transferir } = require('./controladores/transferencias');
const { saldo } = require('./controladores/saldo');
const { extrato } = require('./controladores/extrato');

const rotas = express();

rotas.get('/contas', listarContas, validarSenha);
rotas.post('/contas', criarConta, validarSenha);
rotas.put('/contas/:numeroConta/usuario', atualizarUsuario, validarSenha);
rotas.delete('/contas/:numeroConta', excluirConta, validarSenha);

rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', sacar);
rotas.post('/transacoes/transferir', transferir);

rotas.get('/contas/saldo', saldo);
rotas.get('/contas/extrato', extrato);


module.exports = rotas;