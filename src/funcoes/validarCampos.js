const validarCampos = ({nome, cpf, data_nascimento, telefone, email, senha}) => {
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return false;
    }
    return true;      
}


module.exports = validarCampos;