var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/listarComputadores/:idEmpresa", function (req, res) {
    dashboardController.buscarComputadores(req, res);
})

router.get("/listarLinhas/:idEmpresa", function (req, res) {
    dashboardController.buscarLinhas(req, res);
})

router.get("/exibirEstacoes/:idEmpresa", function (req, res) {
    dashboardController.buscarEstacoes(req, res);
})


router.post("/obterInfoHardware", function (req, res) {
    console.log('entrou na rota')    
    dashboardController.obterInfoHardware(req, res);
})

module.exports = router;