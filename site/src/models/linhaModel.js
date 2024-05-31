var database = require("../database/config");

function exibirLinha(idEmpresa){
    var query = `SELECT linha.* FROM linha WHERE fkEmpresa = ${idEmpresa};`;
    
    console.log('executando query: ', query)
    return database.executar(query);
}

function deletarLinha(idLinha) {
    
    var instrucaoSql = `DELETE FROM linha WHERE idLinha = ${idLinha};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarLinha(nome, numero, idEmpresa) {

    var instrucao = 
    `INSERT INTO linha (nome, numero, fkEmpresa) VALUES ('${nome}', ${numero}, ${idEmpresa});`;

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
    exibirLinha,
    deletarLinha,
    cadastrarLinha,
    salvarLinha
    // buscarLinhas
};