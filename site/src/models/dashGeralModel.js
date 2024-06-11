var database = require("../database/config");

function buscarEstacoes(idEmpresa, idLinha) {
    var query;

    if (idLinha == 'todas') {
        query = `
            SELECT idEstacao, estacao.nome 
            FROM estacao
            JOIN linha ON fkLinha = idLinha
            JOIN empresa ON fkEmpresa = idEmpresa
            WHERE idEmpresa = ${idEmpresa}
            ORDER BY estacao.nome;
        `;
    } else {
        query = `
            SELECT idEstacao, estacao.nome 
            FROM estacao
            JOIN linha ON fkLinha = idLinha
            JOIN empresa ON fkEmpresa = idEmpresa
            WHERE idEmpresa = ${idEmpresa} AND idLinha = ${idLinha}
            ORDER BY estacao.nome DESC;
        `;
    }

    return database.executar(query);
}

function calcularTotalMaquinas(idEmpresa) {
    var query = `
        SELECT COUNT(idEstacao) AS total 
        FROM estacao
        JOIN linha ON fkLinha = idLinha
        JOIN empresa ON fkEmpresa = idEmpresa
        WHERE idEmpresa = ${idEmpresa};
    `;

    return database.executar(query);
}

function pesquisarEstacao(pesquisa, idEmpresa) {
    var query = `
        SELECT idEstacao, estacao.nome 
        FROM estacao
        JOIN linha ON fkLinha = idLinha
        JOIN empresa ON fkEmpresa = idEmpresa
        WHERE estacao.nome = '${pesquisa}' AND idEmpresa = ${idEmpresa};
    `;

    return database.executar(query);
}

function atualizarQtdProblemas(idLinha, idEmpresa) {
    var query;

    if (idLinha == 'todas') {
        query = `
            SELECT COUNT(idHistorico) AS qtdProblemas 
            FROM historicoAlerta h
            JOIN registro r ON fkRegistro = idRegistro
            JOIN especificacaoMaquina em ON fkEspecificacaoMaquina = idEspecificacaoMaquina
            JOIN maquina m ON fkMaquina = idMaquina
            JOIN estacao e ON fkEstacao = idEstacao
            JOIN linha l ON fkLinha = idLinha
            WHERE h.tipo = 'Problema'
            AND fkEmpresa = ${idEmpresa}
            AND h.dtHora BETWEEN DATEADD(DAY, -7, GETDATE()) AND GETDATE();
        `;
    } else {
        query = `
            SELECT COUNT(idHistorico) AS qtdProblemas 
            FROM historicoAlerta h
            JOIN registro r ON fkRegistro = idRegistro
            JOIN especificacaoMaquina em ON fkEspecificacaoMaquina = idEspecificacaoMaquina
            JOIN maquina m ON fkMaquina = idMaquina
            JOIN estacao e ON fkEstacao = idEstacao
            WHERE fkLinha = ${idLinha} AND h.tipo = 'Problema'
            AND h.dtHora BETWEEN DATEADD(DAY, -7, GETDATE()) AND GETDATE();
        `;
    }

    return database.executar(query);
}

function atualizarEstacaoAlerta(idLinha, idEmpresa) {
    var query;

    if (idLinha == 'todas') {
        query = `
            SELECT e.nome, COUNT(idHistorico) AS qtdAlertas 
            FROM historicoAlerta h
            JOIN registro r ON h.fkRegistro = r.idRegistro
            JOIN especificacaoMaquina em ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
            JOIN maquina m ON em.fkMaquina = m.idMaquina
            JOIN estacao e ON m.fkEstacao = e.idEstacao
            JOIN linha l ON e.fkLinha = l.idLinha
            WHERE l.fkEmpresa = ${idEmpresa}
            AND CAST(h.dtHora AS DATE) = CAST(GETDATE() AS DATE)
            GROUP BY e.nome
            ORDER BY qtdAlertas DESC;
        `;
    } else {
        query = `
            SELECT e.nome, COUNT(idHistorico) AS qtdAlertas 
            FROM historicoAlerta h
            JOIN registro r ON h.fkRegistro = r.idRegistro
            JOIN especificacaoMaquina em ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
            JOIN maquina m ON em.fkMaquina = m.idMaquina
            JOIN estacao e ON m.fkEstacao = e.idEstacao
            WHERE e.fkLinha = ${idLinha}
            AND CAST(h.dtHora AS DATE) = CAST(GETDATE() AS DATE)
            GROUP BY e.nome
            ORDER BY qtdAlertas DESC;
        `;
    }

    return database.executar(query);
}

function atualizarQtdAlertasAtual(idLinha, idEmpresa) {
    var query;

    if (idLinha == 'todas') {
        query = `
            SELECT COUNT(DISTINCT e.nome) AS qtdEstacoesComAlertas
            FROM registro r
            JOIN especificacaoMaquina em ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
            JOIN maquina mq ON em.fkMaquina = mq.idMaquina
            JOIN estacao e ON mq.fkEstacao = e.idEstacao
            JOIN linha l ON e.fkLinha = l.idLinha
            JOIN metrica m ON m.fkLinha = l.idLinha
            JOIN empresa ON l.fkEmpresa = ${idEmpresa}
            WHERE (r.discoDisponivel < m.CuidadoDisco
                    OR r.discoDisponivel < m.ProblemaDisco
                    OR r.cpuUtilizada > m.CuidadoCpu
                    OR r.cpuUtilizada > m.ProblemaCpu
                    OR r.ramUtilizada > m.CuidadoRam
                    OR r.ramUtilizada > m.ProblemaRam
                    OR r.qtdDispositivosUsb > m.maxUsb)
                AND r.dtHora >= DATEADD(SECOND, -5, GETDATE())
                AND l.fkEmpresa = ${idEmpresa};
        `;
    } else {
        query = `
            SELECT COUNT(DISTINCT e.nome) AS qtdEstacoesComAlertas
            FROM registro r
            JOIN especificacaoMaquina em ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
            JOIN maquina mq ON em.fkMaquina = mq.idMaquina
            JOIN estacao e ON mq.fkEstacao = e.idEstacao
            JOIN linha l ON e.fkLinha = l.idLinha
            JOIN metrica m ON m.fkLinha = l.idLinha
            JOIN empresa ON l.fkEmpresa = ${idEmpresa}
            WHERE (r.discoDisponivel < m.CuidadoDisco
                    OR r.discoDisponivel < m.ProblemaDisco
                    OR r.cpuUtilizada > m.CuidadoCpu
                    OR r.cpuUtilizada > m.ProblemaCpu
                    OR r.ramUtilizada > m.CuidadoRam
                    OR r.ramUtilizada > m.ProblemaRam
                    OR r.qtdDispositivosUsb > m.maxUsb)
                AND r.dtHora >= DATEADD(SECOND, -5, GETDATE())
                AND e.fkLinha = ${idLinha};
        `;
    }

    return database.executar(query);
}


function filtrarPorAlerta(alerta, idLinha, idEmpresa) {
    var query;

    if (idLinha == 'todas') {
        if (alerta == "Cuidado") {
            query = `
                SELECT DISTINCT e.nome, 'Cuidado' AS tipoAlerta
                FROM registro r
                JOIN especificacaoMaquina em ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
                JOIN maquina mq ON em.fkMaquina = mq.idMaquina
                JOIN estacao e ON mq.fkEstacao = e.idEstacao
                JOIN linha l ON e.fkLinha = l.idLinha
                JOIN metrica m ON m.fkLinha = l.idLinha
                JOIN empresa ON l.fkEmpresa = ${idEmpresa}
                WHERE ((r.discoDisponivel < m.CuidadoDisco AND r.discoDisponivel > m.ProblemaDisco)
                OR (r.cpuUtilizada > m.CuidadoCpu AND r.cpuUtilizada < m.ProblemaCpu)
                OR (r.ramUtilizada > m.CuidadoRam AND r.ramUtilizada < m.ProblemaRam))
                AND r.dtHora >= DATEADD(SECOND, -5, GETDATE())
                AND l.fkEmpresa = ${idEmpresa};
            `;
        } else if (alerta == "Problema") {
            query = `
                SELECT DISTINCT e.nome, 'Problema' AS tipoAlerta
                FROM registro r
                JOIN especificacaoMaquina em ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
                JOIN maquina mq ON em.fkMaquina = mq.idMaquina
                JOIN estacao e ON mq.fkEstacao = e.idEstacao
                JOIN linha l ON e.fkLinha = l.idLinha
                JOIN metrica m ON m.fkLinha = l.idLinha
                JOIN empresa ON l.fkEmpresa = ${idEmpresa}
                WHERE (r.discoDisponivel < m.ProblemaDisco
                OR r.cpuUtilizada > m.ProblemaCpu
                OR r.ramUtilizada > m.ProblemaRam)
                AND r.dtHora >= DATEADD(SECOND, -5, GETDATE())
                AND l.fkEmpresa = ${idEmpresa};
            `;
        }
    } else {
        if (alerta == "Cuidado") {
            query = `
                SELECT DISTINCT e.nome, 'Cuidado' AS tipoAlerta
                FROM registro r
                JOIN especificacaoMaquina em ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
                JOIN maquina mq ON em.fkMaquina = mq.idMaquina
                JOIN estacao e ON mq.fkEstacao = e.idEstacao
                JOIN linha l ON e.fkLinha = l.idLinha
                JOIN metrica m ON m.fkLinha = l.idLinha
                JOIN empresa ON l.fkEmpresa = ${idEmpresa}
                WHERE ((r.discoDisponivel < m.CuidadoDisco AND r.discoDisponivel > m.ProblemaDisco)
                OR (r.cpuUtilizada > m.CuidadoCpu AND r.cpuUtilizada < m.ProblemaCpu)
                OR (r.ramUtilizada > m.CuidadoRam AND r.ramUtilizada < m.ProblemaRam))
                AND r.dtHora >= DATEADD(SECOND, -5, GETDATE())
                AND e.fkLinha = ${idLinha};
            `;
        } else if (alerta == "Problema") {
            query = `
                SELECT DISTINCT e.nome, 'Problema' AS tipoAlerta
                FROM registro r
                JOIN especificacaoMaquina em ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
                JOIN maquina mq ON em.fkMaquina = mq.idMaquina
                JOIN estacao e ON mq.fkEstacao = e.idEstacao
                JOIN linha l ON e.fkLinha = l.idLinha
                JOIN metrica m ON m.fkLinha = l.idLinha
                JOIN empresa ON l.fkEmpresa = ${idEmpresa}
                WHERE (r.discoDisponivel < m.ProblemaDisco
                OR r.cpuUtilizada > m.ProblemaCpu
                OR r.ramUtilizada > m.ProblemaRam)
                AND r.dtHora >= DATEADD(SECOND, -5, GETDATE())
                AND e.fkLinha = ${idLinha};
            `;
        }
    }

    return database.executar(query);
}


function verificarAlerta(idMaquina) {
    var query = `
        SELECT 
            CASE 
                WHEN ultimo_registro.dtHora >= DATEADD(SECOND, -5, GETDATE()) THEN h.tipo
                ELSE 'ideal'
            END AS tipo 
        FROM historicoAlerta h
        JOIN (
            SELECT MAX(dtHora) AS dtHora
            FROM historicoAlerta
            WHERE fkRegistro IN (
                SELECT idRegistro
                FROM registro
                JOIN especificacaoMaquina ON fkEspecificacaoMaquina = idEspecificacaoMaquina
                JOIN maquina ON fkMaquina = idMaquina
                WHERE fkEstacao = ${idMaquina}
            )
        ) AS ultimo_registro ON h.dtHora = ultimo_registro.dtHora;
    `;

    return database.executar(query);
}

module.exports = {
    buscarEstacoes,
    calcularTotalMaquinas,
    pesquisarEstacao,
    atualizarQtdProblemas,
    atualizarEstacaoAlerta,
    atualizarQtdAlertasAtual,
    filtrarPorAlerta,
    verificarAlerta
};
