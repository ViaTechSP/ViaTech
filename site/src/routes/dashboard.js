var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/listarMaquinas/:idEmpresa", function (req, res) {
    dashboardController.buscarMaquinas(req, res);
})

router.get("/listarLinhas/:idEmpresa", function (req, res) {
    dashboardController.buscarLinhas(req, res);
})

router.get("/obterHistoricoAlerta/:idEmpresa", function (req, res) {
    dashboardController.obterHistoricoAlerta(req, res);
})

router.get("/exibirEstacoes/:idEmpresa/:idLinha", function (req, res) {
    dashboardController.buscarEstacoes(req, res);
})

router.get("/obterInfoHardware/:fkEstacao", function (req, res) {
    dashboardController.obterInfoHardware(req, res);
})

module.exports = router;