var dashboardModel = require("../models/dashboardModel");

function buscarMaquinas(req, res) {

    var idEmpresa = req.params.idEmpresa;

    console.log(`Recuperando Maquinas`);

    dashboardModel.buscarMaquinas(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
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
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterHistoricoAlerta(req, res) {
    var idEmpresa = req.params.idEmpresa;

    dashboardModel.obterHistoricoAlerta(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarEstacoes(req, res){
    var idEmpresa = req.params.idEmpresa;
    var idLinha = req.params.idLinha;

    
    dashboardModel.buscarEstacoes(idEmpresa, idLinha).then((resultado) => {
        res.status(200).json(resultado);
    });
}


function obterInfoHardware(req, res) {

    var fkEstacao = req.params.fkEstacao;

    if (fkEstacao == undefined) {
        res.status(400).send("Sua estação está undefined!");
    } else {

    dashboardModel.obterInfoHardware(fkEstacao)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas Dashboards.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
    }
}

module.exports = {
    buscarMaquinas,
    buscarLinhas,
    buscarEstacoes,
    obterInfoHardware,
    obterHistoricoAlerta
}