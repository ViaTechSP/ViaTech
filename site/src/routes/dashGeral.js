var express = require("express");
var router = express.Router();

var dashGeralController = require("../controllers/dashGeralController");

router.get("/exibirEstacoes/:idEmpresa/:idLinha", function (req, res) {
    dashGeralController.buscarEstacoes(req, res);
});

router.get("/pesquisarEstacao/:pesquisarVar", function (req, res) {
    dashGeralController.pesquisarEstacao(req, res);
});

router.get("/filtrarPorAlerta/:alerta", function (req, res) {
    dashGeralController.filtrarPorAlerta(req, res);
});

router.get("/atualizarQtdProblemas/:idLinha", function (req, res) {
    dashGeralController.atualizarQtdProblemas(req, res);
});

router.get("/atualizarEstacaoAlerta/:idLinha", function (req, res) {
    dashGeralController.atualizarEstacaoAlerta(req, res);
});

module.exports = router;