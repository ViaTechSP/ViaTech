var express = require("express");
var router = express.Router();

var estacaoController = require("../controllers/estacaoController");

router.get("/exibirEstacao/:idLinha", function (req, res) {
    estacaoController.exibirEstacao(req, res);
});

router.delete("/deletarEstacao/:idEstacao", function (req, res) {
    console.log('entrou')
    estacaoController.deletarEstacao(req, res);
});

router.post("/cadastrarEstacao", function (req, res) {
    estacaoController.cadastrarEstacao(req, res);
})

router.put("/salvarEstacao/:idEstacao", function (req, res) {
    estacaoController.salvarEstacao(req, res);
});



module.exports = router;