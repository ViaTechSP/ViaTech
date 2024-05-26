var database = require("../database/config")

function buscarMaquinas(idEmpresa) {
    var instrucao = 
    `
    select * from Estacao 
    JOIN Linha ON fkLinha = idLinha
    JOIN Empresa on FkEmpresa = idEmpresa
    WHERE fkEmpresa = ${idEmpresa}
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

function obterHistoricoAlerta(idEmpresa) {
    var instrucao = 
    `
    SELECT h.tipo, r.*, e.nome 
	FROM historicoAlerta AS h
    JOIN registro AS r
    ON fkRegistro = idRegistro
    JOIN especificacaoMaquina
    ON fkEspecificacaoMaquina = idEspecificacaoMaquina
    JOIN maquina
    ON fkMaquina = idMaquina
    JOIN estacao as E
    ON fkEstacao = idEstacao
    JOIN linha 
    ON fkLinha = idLinha
    WHERE fkEmpresa = ${idEmpresa}
    LIMIT 8
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

function obterInfoHardware(fkEstacao) {
    console.log('entrou na model')
    var instrucao = `
        SELECT * from Maquina JOIN especificacaoMaquina 
        ON fkMaquina = idMaquina 
        WHERE fkEstacao = ${fkEstacao};
    `;

    return database.executar(instrucao);
}

module.exports = {
    buscarMaquinas,
    buscarLinhas,
    buscarEstacoes,
    obterInfoHardware,
    obterHistoricoAlerta
};