var dashboardModel = require("../models/dashboardModel");

    // DASHBOARD MÁQUINA
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


// DASHBOARD GERAL
function buscarEstacoes(req, res){
    var idEmpresa = req.params.idEmpresa;
    var idLinha = req.params.idLinha;

    dashboardModel.buscarEstacoes(idEmpresa, idLinha).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function filtrarPorAlerta(req, res){
    var alerta = req.params.alerta;

    dashboardModel.filtrarPorAlerta(alerta).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function pesquisarEstacao(req, res){
    var pesquisa = req.params.pesquisarVar;

    console.log('pesquisa: ', pesquisa)

    dashboardModel.pesquisarEstacao(pesquisa).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function buscarLinhas(req, res) {
    var idEmpresa = req.params.idEmpresa;

    dashboardModel.buscarLinhas(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    })
}

function exibirLinha(req, res){
    var idEmpresa = req.params.idEmpresa;
    
    dashboardModel.exibirLinha(idEmpresa).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function deletarLinha(req, res) {
    var idLinha = req.params.idLinha;

    dashboardModel.deletarLinha(idLinha)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar a linha: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    buscarMaquinas,
    buscarLinhas,
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
}