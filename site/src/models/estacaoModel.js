var database = require("../database/config");

function exibirEstacao(idLinha){
    var query = `SELECT estacao.* FROM estacao join linha on idLinha = fkLinha where idLinha = ${idLinha};`;
    
    console.log('executando query: ', query)
    return database.executar(query);
}

function deletarLinha(idLinha) {
    
    var instrucaoSql = `DELETE FROM linha WHERE idLinha = ${idLinha};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarEstacao(nome, idLinha) {  

    var instrucao = 
    `INSERT INTO estacao (nome, fkLinha) VALUES ('${nome}', ${idLinha});`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function salvarLinha(numero, nome, idLinha) {

    var instrucao = 
    `UPDATE linha SET 
    numero = ${numero},
    nome = '${nome}'
    WHERE idLinha = ${idLinha};`;

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
    deletarLinha,
    cadastrarEstacao,
    salvarLinha,
    // buscarLinhas
};