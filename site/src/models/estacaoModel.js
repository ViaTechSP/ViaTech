var database = require("../database/config");

function exibirEstacao(idLinha){
    var query = `SELECT estacao.* FROM estacao join linha on idLinha = fkLinha where idLinha = ${idLinha};`;
    
    console.log('executando query: ', query)
    return database.executar(query);
}

function deletarEstacao(idEstacao) {
    
    var instrucaoSql = `DELETE FROM estacao WHERE idEstacao = ${idEstacao};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarEstacao(nome, idLinha) {  

    var instrucao = 
    `INSERT INTO estacao (nome, fkLinha) VALUES ('${nome}', ${idLinha});`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function salvarEstacao(nome, idEstacao) {

    var instrucao = 
    `UPDATE estacao SET 
    nome = '${nome}'
    WHERE idEstacao = ${idEstacao};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}




// function buscarLinhas(idEmpresa) {
//     var instrucao = 
//     `
//     select idLinha, linha.nome from linha JOIN empresa ON fkEmpresa = idEmpresa WHERE idEmpresa = ${idEmpresa};
//     `
    
//     return database.executar(instrucao);
// }

module.exports = {
    exibirEstacao,
    deletarEstacao,
    cadastrarEstacao,
    salvarEstacao,
    // buscarLinhas
};