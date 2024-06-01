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

function resetarMetrica(idLinha, minimoDisco, maximoDisco, minimoCpu, maximoCpu, minimoRam, maximoRam, qtdUsb) {
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

function obterMetricasEstacao(fkEstacao) {
    var instrucao =
    `SELECT m.* FROM Metrica m 
	JOIN Linha l ON m.fkLinha = l.idLinha
    JOIN Estacao e ON e.fkLinha = l.idLinha
    WHERE idEstacao = ${fkEstacao};`

    return database.executar(instrucao);
}

function primeiraMetrica(idLinha, minimoDisco, maximoDisco, minimoCpu, maximoCpu, minimoRam, maximoRam, qtdUsb){
    var instrucao = `INSERT INTO metrica (cuidadoDisco, problemaDisco, cuidadoCpu, problemaCpu, cuidadoRam, problemaRam, maxUsb, fkLinha) VALUES (${minimoDisco}, ${maximoDisco}, ${minimoCpu}, ${maximoCpu}, ${minimoRam}, ${maximoRam}, ${qtdUsb}) WHERE fkLinha = ${idLinha};`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarInfoMetrica,
    alterarInfoMetrica,
    obterMetricasEstacao,
    resetarMetrica
};