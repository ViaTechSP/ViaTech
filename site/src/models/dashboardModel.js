var database = require("../database/config")

function obterDadosGrafico(fkEstacao) {
    var instrucao = `
        SELECT r.dtHora, cpuUtilizada, discoDisponivel, 
        ramUtilizada, qtdDispositivosUsb 
        from Registro r JOIN especificacaoMaquina 
        ON fkespecificacaoMaquina = idespecificacaoMaquina 
        JOIN maquina
        ON fkMaquina = idMaquina 
        WHERE fkEstacao = ${fkEstacao}
        ORDER BY dtHora;
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
    ORDER BY idHistorico DESC
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
    SELECT COUNT(h.idHistorico) AS total, h.componente FROM historicoAlerta AS H
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

module.exports = {
    buscarMaquinas,
    obterInfoHeader,
    obterDadosGrafico,
    obterInfoKPIAlertas,
    obterInfoKPIComponente,
    obterHistoricoAlerta
};