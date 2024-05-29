var database = require("../database/config")

function cadastrarEmpresa(razaoSocial, nomeFantasia, cnpj) {

    var instrucao = 
    `INSERT INTO empresa (razaoSocial, nomeFantasia, CNPJ) VALUES ('${razaoSocial}', '${nomeFantasia}', '${cnpj}');`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarId(cnpj) {
    console.log('entrou na model ein')
    var instrucao =
    `SELECT idEmpresa FROM empresa WHERE CNPJ = '${cnpj}';`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrarLinha(nome, numero, idEmpresa) {

    var instrucao = 
    `INSERT INTO linha (nome, numero, fkEmpresa) VALUES ('${nome}', ${numero}, ${idEmpresa});`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarEmpresa,
    buscarId,
    cadastrarLinha
};