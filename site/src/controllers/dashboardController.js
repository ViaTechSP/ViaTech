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

function listarCategoria(req, res){
    
    dashboardModel.listarCategoria().then((resultado) => {
        res.status(200).json(resultado);
    });
}

function addComentario(req, res){
        var comentario = req.body.comentario;
        var idCategoria = req.body.idCategoria;
        var idEstacao = req.body.idEstacao;
        var idFun = req.body.idFun;

        console.log('idcategoria =>>>>>>>>>>>>>>>>>>>.', idCategoria)
        
        
        dashboardModel.addComentario(idFun, comentario, idCategoria, idEstacao).then((resultado) => {
            res.status(200).json(resultado);
        });
    
}

function exibirComentario(req, res){

    var idEstacao = req.params.idEstacao;    
    var idCategoria = req.params.idCategoria;    
    dashboardModel.exibirComentario(idEstacao, idCategoria).then((resultado) => {
        res.status(200).json(resultado);
    });
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
}