var express = require("express");
var router = express.Router();

var dashGeralController = require("../controllers/dashGeralController");

router.get("/exibirEstacoes/:idEmpresa/:idLinha", function (req, res) {
    dashGeralController.buscarEstacoes(req, res);
});

router.get("/pesquisarEstacao/:pesquisarVar/:idEmpresa", function (req, res) {
    dashGeralController.pesquisarEstacao(req, res);
});

router.get("/filtrarPorAlerta/:alerta/:idLinha/:idEmpresa", function (req, res) {
    dashGeralController.filtrarPorAlerta(req, res);
});

router.get("/atualizarQtdProblemas/:idLinha/:idEmpresa", function (req, res) {
    dashGeralController.atualizarQtdProblemas(req, res);
});

router.get("/calcularTotalMaquinas/:idEmpresa", function (req, res) {
    dashGeralController.calcularTotalMaquinas(req, res);
});

router.get("/atualizarEstacaoAlerta/:idLinha/:idEmpresa", function (req, res) {
    dashGeralController.atualizarEstacaoAlerta(req, res);
});

router.get("/atualizarQtdAlertasAtual/:idLinha/:idEmpresa", function (req, res) {
    dashGeralController.atualizarQtdAlertasAtual(req, res);
});

router.get("/verificarAlerta/:idMaquina", function (req, res) {
    dashGeralController.verificarAlerta(req, res);
});

module.exports = router;