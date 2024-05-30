var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");


// DASHBOARD MÁQUINA:
router.get("/obterDadosGrafico/:fkEstacao", function (req, res) {
    dashboardController.obterDadosGrafico(req, res);
})

router.get("/obterHistoricoAlerta/:idEmpresa", function (req, res) {
    dashboardController.obterHistoricoAlerta(req, res);
})

router.get("/listarMaquinas/:idEmpresa", function (req, res) {
    dashboardController.buscarMaquinas(req, res);
})

router.get("/obterInfoHeader/:fkEstacao", function (req, res) {
    dashboardController.obterInfoHeader(req, res);
})

router.get("/obterInfoKPIAlertas/:fkEstacao", function (req, res) {
    dashboardController.obterInfoKPIAlertas(req, res);
})

router.get("/obterInfoKPIComponente/:fkEstacao", function (req, res) {
    dashboardController.obterInfoKPIComponente(req, res);
})

router.get("/obterInfoHardware/:fkEstacao", function (req, res) {
    dashboardController.obterInfoHardware(req, res);
})

// DASHBOARD GERAL:
router.get("/listarLinhas/:idEmpresa", function (req, res) {
    dashboardController.buscarLinhas(req, res);
})

router.get("/exibirEstacoes/:idEmpresa/:idLinha", function (req, res) {
    dashboardController.buscarEstacoes(req, res);
})

router.get("/filtrarPorAlerta/:alerta", function (req, res) {
    dashboardController.filtrarPorAlerta(req, res);
})

router.get("/pesquisarEstacao/:pesquisarVar", function (req, res) {
    dashboardController.pesquisarEstacao(req, res);
})

// ALERTAS LINHAS E ESTAÇÕES
router.get("/listarLinhasAlerta/:idEmpresa", function (req, res) {
    dashboardController.buscarLinhasAlerta(req, res);
})

router.get("/exibirLinha/:idEmpresa", function (req, res) {
    dashboardController.exibirLinha(req, res);
});

router.delete("/deletarLinha/:idLinha", function (req, res) {
    console.log('entrou')
    dashboardController.deletarLinha(req, res);
});



module.exports = router;