var dashGeralModel = require("../models/dashGeralModel");

function buscarEstacoes(req, res){
    var idEmpresa = req.params.idEmpresa;
    var idLinha = req.params.idLinha;

    dashGeralModel.buscarEstacoes(idEmpresa, idLinha).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function pesquisarEstacao(req, res){
    var pesquisa = req.params.pesquisarVar;

    console.log('pesquisa: ', pesquisa)

    dashGeralModel.pesquisarEstacao(pesquisa).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function filtrarPorAlerta(req, res){
    var alerta = req.params.alerta;

    dashGeralModel.filtrarPorAlerta(alerta).then((resultado) => {
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

module.exports = {
    buscarEstacoes,
    pesquisarEstacao,
    filtrarPorAlerta,
    atualizarQtdProblemas,
    atualizarEstacaoAlerta
}