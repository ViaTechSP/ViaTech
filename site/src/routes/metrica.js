var express = require("express");
var router = express.Router();

var metricaController = require("../controllers/metricaController");

router.get("/buscarInfoMetrica/:idLinha", function (req, res) {
    metricaController.buscarInfoMetrica(req, res);
});

router.put("/alterarInfoMetrica/:idLinha", function (req, res) {
    metricaController.alterarInfoMetrica(req, res);
});

router.get("/obterMetricasEstacao/:fkEstacao", function (req, res) {
    metricaController.obterMetricasEstacao(req, res);
});

module.exports = router;