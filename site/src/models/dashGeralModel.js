var database = require("../database/config")

function buscarEstacoes(idEmpresa, idLinha) {
    var query =
    `SELECT idEstacao, estacao.nome FROM estacao
    JOIN linha
    ON fkLinha = idLinha
    JOIN empresa
    ON fkEmpresa = idEmpresa
    where idEmpresa = ${idEmpresa} AND idLinha = ${idLinha} ORDER BY idEstacao DESC;
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

function atualizarQtdProblemas(idLinha) {
    var query =
    `SELECT count(idHistorico) qtdProblemas FROM historicoAlerta h
	JOIN Registro r ON fkRegistro = idRegistro
    JOIN especificacaoMaquina em ON fkEspecificacaoMaquina = idEspecificacaoMaquina
    JOIN maquina m ON fkMaquina = idMaquina
    JOIN estacao e ON fkEstacao = idEstacao
    WHERE fkLinha = ${idLinha} AND h.tipo = 'Problema'
    AND h.dtHora BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW();
    `
    
    return database.executar(query);
}

function atualizarEstacaoAlerta(idLinha) {
    var query =
    `SELECT e.nome, count(idEstacao) qtdAlertas FROM historicoAlerta h
	JOIN Registro r ON fkRegistro = idRegistro
    JOIN especificacaoMaquina em ON fkEspecificacaoMaquina = idEspecificacaoMaquina
    JOIN maquina m ON fkMaquina = idMaquina
    JOIN estacao e ON fkEstacao = idEstacao
    WHERE fkLinha = ${idLinha}
    AND h.dtHora BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW()
    GROUP BY idEstacao LIMIT 1;
    `
    
    return database.executar(query);
}

module.exports = {
    buscarEstacoes,
    pesquisarEstacao,
    filtrarPorAlerta,
    atualizarQtdProblemas,
    atualizarEstacaoAlerta
};