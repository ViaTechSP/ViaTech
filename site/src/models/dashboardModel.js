var database = require("../database/config")


function obterDadosGrafico(fkEstacao) {
    var instrucao = `
        SELECT * from Registro JOIN especificacaoMaquina 
        ON fkespecificacaoMaquina = idespecificacaoMaquina 
        JOIN maquina
        ON fkMaquina = idMaquina 
        WHERE fkEstacao = ${fkEstacao}
        ORDER BY dtHora DESC;
    `;

    return database.executar(instrucao);
}

function buscarMaquinas(idEmpresa) {
    var instrucao = 
    `
    select e.idEstacao, e.nome from Estacao AS e
    JOIN Linha ON fkLinha = idLinha
    JOIN Empresa on FkEmpresa = idEmpresa
    WHERE fkEmpresa = ${idEmpresa}
    LIMIT 20;
    `
    
    return database.executar(instrucao);
}

function obterHistoricoAlerta(idEmpresa) {
    var instrucao = 
    `
    SELECT e.nome, h.* FROM historicoAlerta AS H
	JOIN registro
    ON fkRegistro = idRegistro
    JOIN especificacaoMaquina
    ON fkEspecificacaoMaquina = idEspecificacaoMaquina
	JOIN maquina
	ON fkMaquina = idMaquina
    JOIN estacao AS e
    ON fkEstacao = idEstacao
    JOIN Linha
    ON fkLinha = idLinha
    WHERE fkEmpresa = ${idEmpresa}
    ORDER BY idHistoricoAlerta DESC
    LIMIT 8;
    `
    
    return database.executar(instrucao);
}

function obterInfoHeader(fkEstacao) {
    var instrucao = `
        SELECT * from Maquina JOIN especificacaoMaquina 
        ON fkMaquina = idMaquina 
        WHERE fkEstacao = ${fkEstacao};
    `;

    return database.executar(instrucao);
}

function obterInfoKPIAlertas(fkEstacao) {
    var instrucao = `
    SELECT COUNT(h.tipo) AS total, h.tipo FROM historicoAlerta AS H
	JOIN registro
    ON fkRegistro = idRegistro
    JOIN especificacaoMaquina
    ON fkEspecificacaoMaquina = idEspecificacaoMaquina
	JOIN maquina
	ON fkMaquina = idMaquina
    JOIN estacao AS e
    ON fkEstacao = idEstacao
    WHERE fkEstacao = ${fkEstacao}
    GROUP BY tipo;
    `;
    return database.executar(instrucao);
}

function obterInfoKPIComponente(fkEstacao) {
    var instrucao = `
    SELECT COUNT(h.idHistoricoAlerta) AS total, h.componente FROM historicoAlerta AS H
	JOIN registro
    ON fkRegistro = idRegistro
    JOIN especificacaoMaquina
    ON fkEspecificacaoMaquina = idEspecificacaoMaquina
	JOIN maquina
	ON fkMaquina = idMaquina
    JOIN estacao AS e
    ON fkEstacao = idEstacao
    WHERE fkEstacao = ${fkEstacao} AND
	h.dtHora >= DATE_SUB(NOW(), INTERVAL 1 WEEK)
	AND h.dtHora <= NOW()
    GROUP BY componente
    ORDER BY total DESC
    LIMIT 1;
    `;
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

    function buscarLinhasAlerta(idEmpresa) {
    var instrucao = 
    `
    select idLinha, linha.nome from linha JOIN empresa ON fkEmpresa = idEmpresa WHERE idEmpresa = ${idEmpresa};
    `
    
    return database.executar(instrucao);
}

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

module.exports = {
    buscarMaquinas,
    buscarLinhas,
    buscarLinhasAlerta,
    buscarEstacoes,
    obterInfoHeader,
    obterDadosGrafico,
    obterInfoKPIAlertas,
    filtrarPorAlerta,
    pesquisarEstacao,
    obterInfoKPIComponente,
    obterHistoricoAlerta,
    exibirLinha,
    deletarLinha
};