var database = require("../database/config")

// <==================================================================== FUNCIONARIO ==================================================================================>

function cadastrarFun(imagemVar, nomeVar, cpfVar, emailVar, senhaVar, cargo, fkEmpresaVar) {
    var instrucao = '';
    if (cargo == null || cargo == undefined || cargo == '') {
        instrucao = `INSERT INTO funcionario (urlFoto, nome, cpf, email, senha, cargo, fkEmpresa) VALUES ('${imagemVar}', '${nomeVar}', '${cpfVar}', '${emailVar}', '${senhaVar}', 'Gerente', ${fkEmpresaVar});`;
    } else {
        instrucao = `INSERT INTO funcionario (urlFoto, nome, cpf, email, senha, cargo, fkEmpresa) VALUES ('${imagemVar}', '${nomeVar}', '${cpfVar}', '${emailVar}', '${senhaVar}', '${cargo}', ${fkEmpresaVar});`;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirFun(idEmpresa){
    var query = `SELECT funcionario.* FROM funcionario WHERE fkEmpresa = ${idEmpresa} ORDER BY nome ;`;
    
    console.log('executando query: ', query)
    return database.executar(query);
}



function autenticar(emailVar, senhaVar) {
    var instrucao = `SELECT * FROM Funcionario JOIN Empresa ON fkEmpresa = idEmpresa WHERE email = '${emailVar}' AND senha = '${senhaVar}';`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarId(email) {
    var instrucao = `SELECT idFuncionario FROM Funcionario WHERE email = '${email}';`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterarSenha(novaSenha, idFuncionario) {
    var instrucao = `UPDATE funcionario SET senha = '${novaSenha}' WHERE idFuncionario = ${idFuncionario};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarInfo(idFuncionario) {
    var instrucao = `SELECT * FROM Funcionario WHERE idFuncionario = '${idFuncionario}';`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterarInfo(idFuncionario, imagem, nome, cpf, email, senha, cargo) {
    var instrucao = 
    `UPDATE funcionario SET 
    urlFoto = '${imagem}',
    nome = '${nome}',
    cpf = '${cpf}',
    email = '${email}',
    senha = '${senha}',
    cargo = '${cargo}' 
    WHERE idFuncionario = ${idFuncionario};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function salvarFun(img, nome, cpf, email, cargo, idFuncionario) {

    var instrucao = 
    `UPDATE funcionario SET 
    urlFoto = '${img}',
    nome = '${nome}',
    cpf = '${cpf}',
    email = '${email}',
    cargo = '${cargo}'
    WHERE idFuncionario = ${idFuncionario};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarFun(idFuncionario) {
    
    var instrucaoSql = `DELETE FROM funcionario WHERE idFuncionario = ${idFuncionario};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrarFun,
    buscarId,
    alterarSenha,
    buscarInfo,
    alterarInfo,
    exibirFun,
    salvarFun,
    deletarFun
};