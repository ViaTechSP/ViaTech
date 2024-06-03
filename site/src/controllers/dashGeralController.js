var dashGeralModel = require("../models/dashGeralModel");

function buscarEstacoes(req, res){
    var idEmpresa = req.params.idEmpresa;
    var idLinha = req.params.idLinha;

    dashGeralModel.buscarEstacoes(idEmpresa, idLinha).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function calcularTotalMaquinas(req, res){
    var idEmpresa = req.params.idEmpresa;

    dashGeralModel.calcularTotalMaquinas(idEmpresa).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function pesquisarEstacao(req, res){
    var pesquisa = req.params.pesquisarVar;
    var idEmpresa = req.params.idEmpresa;

    console.log('pesquisa: ', pesquisa)

    dashGeralModel.pesquisarEstacao(pesquisa, idEmpresa).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function filtrarPorAlerta(req, res){
    var alerta = req.params.alerta;
    var idLinha = req.params.idLinha;
    var idEmpresa = req.params.idEmpresa;

    dashGeralModel.filtrarPorAlerta(alerta, idLinha, idEmpresa).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function atualizarQtdProblemas(req, res){
    var idLinha = req.params.idLinha;

    dashGeralModel.atualizarQtdProblemas(idLinha).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function atualizarEstacaoAlerta(req, res){
    var idLinha = req.params.idLinha;

    dashGeralModel.atualizarEstacaoAlerta(idLinha).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function atualizarQtdAlertasAtual(req, res){
    var idLinha = req.params.idLinha;
    var idEmpresa = req.params.idEmpresa;

    console.log('idEmpresa =>', idEmpresa);

    dashGeralModel.atualizarQtdAlertasAtual(idLinha, idEmpresa).then((resultado) => {
        res.status(200).json(resultado);
    });
}

module.exports = {
    buscarEstacoes,
    calcularTotalMaquinas,
    pesquisarEstacao,
    filtrarPorAlerta,
    atualizarQtdProblemas,
    atualizarEstacaoAlerta,
    atualizarQtdAlertasAtual
}