var database = require("../database/config")

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

function pesquisarEstacao(pesquisa) {
    var query =
    `SELECT idEstacao, estacao.nome FROM estacao
    JOIN linha
    ON fkLinha = idLinha
    JOIN empresa
    ON fkEmpresa = idEmpresa
    where estacao.nome = '${pesquisa}';
    `
    
    return database.executar(query);
}

function filtrarPorAlerta(alerta) {
    var query =
    `SELECT DISTINCT estacao.idEstacao, estacao.nome FROM Estacao
	JOIN Maquina ON fkEstacao = idEstacao
    JOIN especificacaoMaquina ON fkMaquina = idMaquina
    JOIN registro ON fkEspecificacaoMaquina = idEspecificacaoMaquina
    JOIN historicoAlerta ON fkRegistro
    WHERE tipo = '${alerta}';
    `
    
    return database.executar(query);
}

module.exports = {
    buscarEstacoes,
    pesquisarEstacao,
    filtrarPorAlerta
};