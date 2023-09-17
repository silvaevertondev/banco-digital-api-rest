const validarUsuario = (numeroConta, contas) => {
    const usuarioExiste = contas.find((conta) => {
      return conta.numero === Number(numeroConta);
    });
    return usuarioExiste;
  };
  
  module.exports = {
    validarUsuario,
  };
  