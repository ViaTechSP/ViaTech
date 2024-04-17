var database = require("../database/config")

function autenticar(emailVar, senhaVar) {
    var instrucao = `
        SELECT idEmpresa, nomeFantasia, email, senha, telefone, CNPJ FROM empresa WHERE email = '${emailVar}' AND senha = '${senhaVar}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function cadastrar(nomeFantasiaVar, cnpjVar, telefoneVar, emailVar, senhaVar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeFantasiaVar, cnpjVar, telefoneVar, emailVar, senhaVar);
    
    var instrucao = `
        INSERT INTO empresa (nomeFantasia, CNPJ, telefone, email, senha) VALUES ('${nomeFantasiaVar}', '${cnpjVar}', '${telefoneVar}', '${emailVar}', '${senhaVar}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pegarId(emailVar) {
    var instrucao = `
        SELECT idEmpresa, nomeFantasia, email, senha, telefone, CNPJ FROM empresa WHERE email = '${emailVar}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function alterarSenha(novaSenhaVar, idEmpresaVar) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ");
    var instrucao = `
        UPDATE empresa SET senha = '${novaSenhaVar}' WHERE idEmpresa = ${idEmpresaVar};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrar,
    pegarId,
    alterarSenha
};