var database = require("../database/config");

function obterDadosGrafico(fkEstacao) {
    var instrucao = `
        SELECT FORMAT(r.dtHora, 'HH:mm:ss') as dataHora,
               r.cpuUtilizada, r.discoDisponivel,
               r.ramUtilizada, r.qtdDispositivosUsb
        FROM Registro r
        JOIN especificacaoMaquina em ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
        JOIN maquina m ON em.fkMaquina = m.idMaquina
        WHERE m.fkEstacao = ${fkEstacao}
        ORDER BY r.idRegistro DESC
        OFFSET 0 ROWS FETCH NEXT 7 ROWS ONLY;
    `;

    return database.executar(instrucao);
}

function obterDadosTempoReal(fkEstacao) {
    var instrucao = `
        SELECT FORMAT(r.dtHora, 'HH:mm:ss') as dataHora,
               r.cpuUtilizada, r.discoDisponivel,
               r.ramUtilizada, r.qtdDispositivosUsb
        FROM Registro r
        JOIN especificacaoMaquina em ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
        JOIN maquina m ON em.fkMaquina = m.idMaquina
        WHERE m.fkEstacao = ${fkEstacao}
        ORDER BY r.idRegistro DESC
        OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY;
    `;

    return database.executar(instrucao);
}

function buscarMaquinas(idEmpresa) {
    var instrucao = `
        SELECT e.idEstacao, e.nome
        FROM Estacao e
        JOIN Linha l ON e.fkLinha = l.idLinha
        JOIN Empresa emp ON l.fkEmpresa = emp.idEmpresa
        WHERE emp.idEmpresa = ${idEmpresa}
        OFFSET 0 ROWS FETCH NEXT 20 ROWS ONLY;
    `;
   
    return database.executar(instrucao);
}

function obterHistoricoAlerta(idEmpresa) {
    var instrucao = `
        SELECT e.nome, h.*
        FROM historicoAlerta h
        JOIN registro r ON h.fkRegistro = r.idRegistro
        JOIN especificacaoMaquina em ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
        JOIN maquina m ON em.fkMaquina = m.idMaquina
        JOIN estacao e ON m.fkEstacao = e.idEstacao
        JOIN Linha l ON e.fkLinha = l.idLinha
        WHERE l.fkEmpresa = ${idEmpresa}
        ORDER BY h.idHistorico DESC
        OFFSET 0 ROWS FETCH NEXT 8 ROWS ONLY;
    `;
   
    return database.executar(instrucao);
}

function obterInfoHeader(fkEstacao) {
    var instrucao = `
        SELECT *
        FROM Maquina m
        JOIN especificacaoMaquina em ON m.idMaquina = em.fkMaquina
        WHERE m.fkEstacao = ${fkEstacao};
    `;

    return database.executar(instrucao);
}

function obterInfoKPIAlertas(fkEstacao) {
    var instrucao = `
        SELECT COUNT(h.tipo) AS total, h.tipo
        FROM historicoAlerta h
        JOIN registro r ON h.fkRegistro = r.idRegistro
        JOIN especificacaoMaquina em ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
        JOIN maquina m ON em.fkMaquina = m.idMaquina
        JOIN estacao e ON m.fkEstacao = e.idEstacao
        WHERE e.idEstacao = ${fkEstacao}
        GROUP BY h.tipo;
    `;
    return database.executar(instrucao);
}

function obterInfoKPIComponente(fkEstacao) {
    var instrucao = `
        SELECT COUNT(h.idHistorico) AS total, h.componente
        FROM historicoAlerta h
        JOIN registro r ON h.fkRegistro = r.idRegistro
        JOIN especificacaoMaquina em ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
        JOIN maquina m ON em.fkMaquina = m.idMaquina
        JOIN estacao e ON m.fkEstacao = e.idEstacao
        WHERE e.idEstacao = ${fkEstacao}
          AND h.dtHora >= DATEADD(WEEK, -1, GETDATE())
          AND h.dtHora <= GETDATE()
        GROUP BY h.componente
        ORDER BY total DESC
        OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY;
    `;
    return database.executar(instrucao);
}

function listarCategoria(){
    var instrucao = `SELECT * FROM categoria;`;

    return database.executar(instrucao);

}

function addComentario(idFun, comentario, idCategoria, idEstacao){
    var instrucao = `INSERT INTO comentario (fkFuncionario, descricao, fkCategoria, fkMaquina) VALUES (${idFun}, '${comentario}', ${idCategoria}, ${idEstacao});`;
    return database.executar(instrucao);
}

function exibirComentario(idEstacao, idCategoria){
    var instrucao = `
        SELECT idComentario, fkMaquina, dtHora, descricao, email, categoria.nome AS categoria
        FROM comentario
        JOIN funcionario ON fkFuncionario = idFuncionario
        JOIN categoria ON fkCategoria = idCategoria
        WHERE fkMaquina = ${idEstacao} ${idCategoria != 0 ? 'AND fkCategoria = ' + idCategoria : ''}
        ORDER BY dtHora;
    `;

    return database.executar(instrucao);
}

module.exports = {
    buscarMaquinas,
    obterInfoHeader,
    obterDadosGrafico,
    obterDadosTempoReal,
    obterInfoKPIAlertas,
    obterInfoKPIComponente,
    obterHistoricoAlerta,
    listarCategoria,
    addComentario,
    exibirComentario
};
