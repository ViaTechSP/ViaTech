var database = require("../database/config")

function buscarComputadores(idEmpresa) {
    var instrucao = 
    `
    select idComputador, estacao.nome from  computador
	JOIN estacao
		ON fkEstacao = idEstacao
	JOIN linha
		ON fkLinha = idLinha
	JOIN empresa
		ON fkEmpresa = idEmpresa
	WHERE idEmpresa = ${idEmpresa}
    LIMIT 20;
    `
    
    return database.executar(instrucao);
}

function buscarLinhas(idEmpresa) {
    var instrucao = 
    `
    select idLinha, linha.nome from linha JOIN empresa ON fkEmpresa = idEmpresa WHERE idEmpresa = ${idEmpresa};
    `
    
    return database.executar(instrucao);
}

function buscarEstacoes(idEmpresa, idLinha) {
    var query =
    `SELECT idEstacao, estacao.nome FROM estacao
    JOIN linha
    ON fkLinha = idLinha
    JOIN empresa
    ON fkEmpresa = idEmpresa
    where idEmpresa = ${idEmpresa} AND idLinha = ${idLinha};
    `

    return database.executar(query);
}

function obterInfoHardware(fkComputador) {
    console.log('entrou na model')
    var instrucao = `
        SELECT * from componente WHERE fkComputador = ${fkComputador};
    `;

    return database.executar(instrucao);
}

module.exports = {
    buscarComputadores,
    buscarLinhas,
    buscarEstacoes,
    obterInfoHardware
};