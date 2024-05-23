var database = require("../database/config")

function cadastrarFun(nomeVar, cpfVar, emailVar, senhaVar, fkEmpresaVar) {
    var instrucao = `INSERT INTO funcionario (nome, cpf, email, senha, cargo, fkEmpresa) VALUES ('${nomeVar}', '${cpfVar}', '${emailVar}', '${senhaVar}', 'gerente', ${fkEmpresaVar});`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function autenticar(emailVar, senhaVar) {
    var instrucao = `SELECT * FROM Funcionario JOIN Empresa ON fkEmpresa = idEmpresa WHERE email = '${emailVar}' AND senha = '${senhaVar}';`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarId(email) {
    var instrucao = `SELECT id FROM Funcionario WHERE email = '${email}';`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterarSenha(novaSenha, idFuncionario) {
    var instrucao = `UPDATE funcionario SET senha = '${novaSenha}' WHERE id = ${idFuncionario};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarInfo(idFuncionario) {
    var instrucao = `SELECT * FROM Funcionario WHERE id = '${idFuncionario}';`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterarInfo(idFuncionario, nome, cpf, email, senha, cargo) {
    var instrucao = 
    `UPDATE funcionario SET 
    nome = '${nome}',
    cpf = '${cpf}',
    email = '${email}',
    senha = '${senha}',
    cargo = '${cargo}' 
    WHERE id = ${idFuncionario};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirFun(idEmpresa){
    var query = `SELECT funcionario.* FROM funcionario JOIN empresa ON empresa.idEmpresa = fkEmpresa WHERE idEmpresa = ${idEmpresa};`;
    
    console.log('executando query: ', query)
    return database.executar(query);
}

module.exports = {
    autenticar,
    cadastrarFun,
    buscarId,
    alterarSenha,
    buscarInfo,
    alterarInfo,
    exibirFun
};