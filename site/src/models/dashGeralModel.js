var database = require("../database/config")

function buscarEstacoes(idEmpresa, idLinha) {
    var query;

    if (idLinha == 'todas') {
        query = 
        `SELECT idEstacao, estacao.nome FROM estacao
        JOIN linha
        ON fkLinha = idLinha
        JOIN empresa
        ON fkEmpresa = idEmpresa
        where idEmpresa = ${idEmpresa} ORDER BY estacao.nome;
        `
    } else {
        query =
        `SELECT idEstacao, estacao.nome FROM estacao
        JOIN linha
        ON fkLinha = idLinha
        JOIN empresa
        ON fkEmpresa = idEmpresa
        where idEmpresa = ${idEmpresa} AND idLinha = ${idLinha} ORDER BY estacao.nome DESC;
        `
    }
    
    return database.executar(query);
}

function calcularTotalMaquinas(idEmpresa) {
    var query = 
    `select count(idEstacao) as total from estacao 
	join linha on fkLinha = idLinha
    join empresa on fkEmpresa = idEmpresa
    where idEmpresa = ${idEmpresa};`
    
    return database.executar(query);
}

function pesquisarEstacao(pesquisa, idEmpresa) {
    var query =
    `SELECT idEstacao, estacao.nome FROM estacao
    JOIN linha
    ON fkLinha = idLinha
    JOIN empresa
    ON fkEmpresa = idEmpresa
    where estacao.nome = '${pesquisa}' and idEmpresa = ${idEmpresa};
    `
    return database.executar(query);
}

function atualizarQtdProblemas(idLinha) {
    var query;

    if (idLinha == 'todas') {
        query =
        `SELECT count(idHistorico) qtdProblemas FROM historicoAlerta h
	    JOIN Registro r ON fkRegistro = idRegistro
        JOIN especificacaoMaquina em ON fkEspecificacaoMaquina = idEspecificacaoMaquina
        JOIN maquina m ON fkMaquina = idMaquina
        JOIN estacao e ON fkEstacao = idEstacao
        WHERE h.tipo = 'Problema'
        AND h.dtHora BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW();
        `
    } else {
        query =
        `SELECT count(idHistorico) qtdProblemas FROM historicoAlerta h
        JOIN Registro r ON fkRegistro = idRegistro
        JOIN especificacaoMaquina em ON fkEspecificacaoMaquina = idEspecificacaoMaquina
        JOIN maquina m ON fkMaquina = idMaquina
        JOIN estacao e ON fkEstacao = idEstacao
        WHERE fkLinha = ${idLinha} AND h.tipo = 'Problema'
        AND h.dtHora BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW();
        `
    }
        
    return database.executar(query);
}

function atualizarEstacaoAlerta(idLinha, idEmpresa) {
    var query;

    if (idLinha == 'todas') {
        query =
        `SELECT e.nome, count(r.idRegistro) as qtdAlertas FROM registro r
        JOIN especificacaoMaquina em 
            ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
        JOIN maquina mq
            ON em.fkMaquina = mq.idMaquina
        JOIN estacao e
            ON mq.fkEstacao = e.idEstacao
        JOIN linha l
            ON e.fkLinha = l.idLinha
        JOIN metrica m
            ON m.fkLinha = l.idLinha
        JOIN empresa
            ON fkEmpresa = idEmpresa
        WHERE (r.discoDisponivel < m.CuidadoDisco
            OR r.discoDisponivel < m.ProblemaDisco
            OR r.cpuUtilizada > m.CuidadoCpu
            OR r.cpuUtilizada > m.ProblemaCpu
            OR r.ramUtilizada > m.CuidadoRam
            OR r.ramUtilizada > m.ProblemaRam
            OR r.qtdDispositivosUsb > m.maxUsb)
            AND r.dtHora BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW()
            AND idEmpresa = ${idEmpresa} 
            GROUP BY e.nome LIMIT 1;
        `
    } else {
        query =
        `SELECT e.nome, count(r.idRegistro) as qtdAlertas FROM registro r
        JOIN especificacaoMaquina em 
            ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
        JOIN maquina mq
            ON em.fkMaquina = mq.idMaquina
        JOIN estacao e
            ON mq.fkEstacao = e.idEstacao
        JOIN linha l
            ON e.fkLinha = l.idLinha
        JOIN metrica m
            ON m.fkLinha = l.idLinha
        JOIN empresa
            ON fkEmpresa = idEmpresa
        WHERE 
              (r.discoDisponivel < m.CuidadoDisco
            OR r.discoDisponivel < m.ProblemaDisco
            OR r.cpuUtilizada > m.CuidadoCpu
            OR r.cpuUtilizada > m.ProblemaCpu
            OR r.ramUtilizada > m.CuidadoRam
            OR r.ramUtilizada > m.ProblemaRam
            OR r.qtdDispositivosUsb > m.maxUsb)
            AND r.dtHora BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW()
            AND idLinha = ${idLinha} 
            GROUP BY e.nome LIMIT 1;
        `
    }
    
    return database.executar(query);
}

function atualizarQtdAlertasAtual(idLinha, idEmpresa) {
    var query;

    if (idLinha == 'todas') {
        query =
        `SELECT COUNT(DISTINCT e.nome) as qtdEstacoesComAlertas
        FROM registro r
            JOIN especificacaoMaquina em 
                ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
            JOIN maquina mq
                ON em.fkMaquina = mq.idMaquina
            JOIN estacao e
                ON mq.fkEstacao = e.idEstacao
            JOIN linha l
                ON e.fkLinha = l.idLinha
            JOIN metrica m
                ON m.fkLinha = l.idLinha
            JOIN empresa
                ON fkEmpresa = idEmpresa
        WHERE (r.discoDisponivel < m.CuidadoDisco
                OR r.discoDisponivel < m.ProblemaDisco
                OR r.cpuUtilizada > m.CuidadoCpu
                OR r.cpuUtilizada > m.ProblemaCpu
                OR r.ramUtilizada > m.CuidadoRam
                OR r.ramUtilizada > m.ProblemaRam
                OR r.qtdDispositivosUsb > m.maxUsb)
            AND r.dtHora >= DATE_SUB(NOW(), INTERVAL 100000 SECOND)
            AND idEmpresa = ${idEmpresa};
        `
    } else {
        query =
        `SELECT COUNT(DISTINCT e.nome) as qtdEstacoesComAlertas
        FROM registro r
            JOIN especificacaoMaquina em 
                ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
            JOIN maquina mq
                ON em.fkMaquina = mq.idMaquina
            JOIN estacao e
                ON mq.fkEstacao = e.idEstacao
            JOIN linha l
                ON e.fkLinha = l.idLinha
            JOIN metrica m
                ON m.fkLinha = l.idLinha
            JOIN empresa
                ON fkEmpresa = idEmpresa
        WHERE (r.discoDisponivel < m.CuidadoDisco
                OR r.discoDisponivel < m.ProblemaDisco
                OR r.cpuUtilizada > m.CuidadoCpu
                OR r.cpuUtilizada > m.ProblemaCpu
                OR r.ramUtilizada > m.CuidadoRam
                OR r.ramUtilizada > m.ProblemaRam
                OR r.qtdDispositivosUsb > m.maxUsb)
            AND r.dtHora >= DATE_SUB(NOW(), INTERVAL 100000 SECOND)
            AND idLinha = ${fkLinha};
        `
    }
    
    return database.executar(query);
}





function filtrarPorAlerta(alerta, idLinha, idEmpresa) {
    var query;

    if (idLinha == 'todas') {
        if (alerta == "Cuidado") {  
            query = 
            `SELECT DISTINCT e.nome, 
            'Cuidado' as tipoAlerta
            FROM registro r
            JOIN especificacaoMaquina em 
                ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
            JOIN maquina mq
                ON em.fkMaquina = mq.idMaquina
            JOIN estacao e
                ON mq.fkEstacao = e.idEstacao
            JOIN linha l
                ON e.fkLinha = l.idLinha
            JOIN metrica m
                ON m.fkLinha = l.idLinha
            JOIN empresa
                ON fkEmpresa = idEmpresa
            WHERE ((r.discoDisponivel < m.cuidadoDisco AND r.discoDisponivel > m.problemaDisco)
            OR (r.cpuUtilizada > m.cuidadoCpu AND r.cpuUtilizada < m.problemaCpu)
            OR (r.ramUtilizada > m.cuidadoRam AND r.ramUtilizada < m.problemaRam))
            AND r.dtHora >= DATE_SUB(NOW(), INTERVAL 5 SECOND)
            AND idEmpresa = ${idEmpresa};
            `
        } else if (alerta == 'Problema') {
            query = 
            `SELECT DISTINCT e.nome, 
            'Problema' as tipoAlerta
            FROM registro r
            JOIN especificacaoMaquina em 
                ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
            JOIN maquina mq
                ON em.fkMaquina = mq.idMaquina
            JOIN estacao e
                ON mq.fkEstacao = e.idEstacao
            JOIN linha l
                ON e.fkLinha = l.idLinha
            JOIN metrica m
                ON m.fkLinha = l.idLinha
            JOIN empresa
                ON fkEmpresa = idEmpresa
            WHERE (r.discoDisponivel < m.problemaDisco
             OR r.cpuUtilizada > m.problemaCpu
             OR r.ramUtilizada > m.problemaRam
             OR r.qtdDispositivosUsb > m.maxUsb)
             AND r.dtHora >= DATE_SUB(NOW(), INTERVAL 100000 SECOND)
             AND idEmpresa = ${idEmpresa};
            `
        }

    } else {
    if (alerta == "Cuidado") {  
        query = 
        `SELECT DISTINCT e.nome, 
        'Cuidado' as tipoAlerta
        FROM registro r
        JOIN especificacaoMaquina em 
            ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
        JOIN maquina mq
            ON em.fkMaquina = mq.idMaquina
        JOIN estacao e
            ON mq.fkEstacao = e.idEstacao
        JOIN linha l
            ON e.fkLinha = l.idLinha
        JOIN metrica m
            ON m.fkLinha = l.idLinha
        JOIN empresa
            ON fkEmpresa = idEmpresa
        WHERE ((r.discoDisponivel < m.cuidadoDisco AND r.discoDisponivel > m.problemaDisco)
        OR (r.cpuUtilizada > m.cuidadoCpu AND r.cpuUtilizada < m.problemaCpu)
        OR (r.ramUtilizada > m.cuidadoRam AND r.ramUtilizada < m.problemaRam))
        AND r.dtHora >= DATE_SUB(NOW(), INTERVAL 100000 SECOND)
        AND idLinha = ${idLinha};
        `
    } else if (alerta == 'Problema') {
        query = 
        `SELECT DISTINCT e.nome, 
        'Problema' as tipoAlerta
        FROM registro r
        JOIN especificacaoMaquina em 
            ON r.fkEspecificacaoMaquina = em.idEspecificacaoMaquina
        JOIN maquina mq
            ON em.fkMaquina = mq.idMaquina
        JOIN estacao e
            ON mq.fkEstacao = e.idEstacao
        JOIN linha l
            ON e.fkLinha = l.idLinha
        JOIN metrica m
            ON m.fkLinha = l.idLinha
        JOIN empresa
            ON fkEmpresa = idEmpresa
        WHERE (r.discoDisponivel < m.problemaDisco
         OR r.cpuUtilizada > m.problemaCpu
         OR r.ramUtilizada > m.problemaRam
         OR r.qtdDispositivosUsb > m.maxUsb)
         AND r.dtHora >= DATE_SUB(NOW(), INTERVAL 100000 SECOND)
         AND idLinha = ${idLinha};
        `
    }
}
    return database.executar(query);
}




module.exports = {
    buscarEstacoes,
    calcularTotalMaquinas,
    pesquisarEstacao,
    filtrarPorAlerta,
    atualizarQtdProblemas,
    atualizarEstacaoAlerta,
    atualizarQtdAlertasAtual
};