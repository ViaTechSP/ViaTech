var dashboardModel = require("../models/dashboardModel");

function obterDadosGrafico(req, res) {
    var fkEstacao = req.params.fkEstacao;

    dashboardModel.obterDadosGrafico(fkEstacao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    })
}

function obterDadosTempoReal(req, res) {
    var fkEstacao = req.params.fkEstacao;

    dashboardModel.obterDadosTempoReal(fkEstacao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    })
}

function buscarMaquinas(req, res) {
    var idEmpresa = req.params.idEmpresa;

    dashboardModel.buscarMaquinas(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    })
}

function obterInfoHeader(req, res) {
    var fkEstacao = req.params.fkEstacao;

    dashboardModel.obterInfoHeader(fkEstacao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    })
}

function obterInfoKPIAlertas(req, res) {
    var fkEstacao = req.params.fkEstacao;

    dashboardModel.obterInfoKPIAlertas(fkEstacao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    })
}

function obterInfoKPIComponente(req, res) {
    var fkEstacao = req.params.fkEstacao;

    dashboardModel.obterInfoKPIComponente(fkEstacao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    })
}

function obterHistoricoAlerta(req, res) {
    var idEmpresa = req.params.idEmpresa;

    dashboardModel.obterHistoricoAlerta(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    })
}

module.exports = {
    buscarMaquinas,
    obterInfoHeader,
    obterDadosGrafico,
    obterDadosTempoReal,
    obterInfoKPIAlertas,
    obterInfoKPIComponente,
    obterHistoricoAlerta
}