var database = require("../database/config");

function buscarInfoMetrica(idLinha) {
    var instrucao = `SELECT * FROM metrica WHERE fkLinha = ${idLinha};`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterarInfoMetrica(idLinha, minimoDisco, maximoDisco, minimoCpu, maximoCpu, minimoRam, maximoRam, qtdUsb) {
    var instrucao = 
    `UPDATE metrica SET 
    cuidadoDisco = '${minimoDisco}',
    problemaDisco = '${maximoDisco}',
    cuidadoCpu = '${minimoCpu}',
    problemaCpu = '${maximoCpu}',
    cuidadoRam = '${minimoRam}',
    problemaRam = '${maximoRam}',
    maxUsb = '${qtdUsb}' 
    WHERE fkLinha = '${idLinha}'`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarInfoMetrica,
    alterarInfoMetrica
};