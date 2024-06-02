var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/obterDadosGrafico/:fkEstacao", function (req, res) {
    dashboardController.obterDadosGrafico(req, res);
})

router.get("/obterDadosTempoReal/:fkEstacao", function (req, res) {
    dashboardController.obterDadosTempoReal(req, res);
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

module.exports = router;