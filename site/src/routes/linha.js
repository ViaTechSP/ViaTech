var express = require("express");
var router = express.Router();

var linhaController = require("../controllers/linhaController");

router.get("/exibirLinha/:idEmpresa", function (req, res) {
    linhaController.exibirLinha(req, res);
});

router.get("/ultimaLinhaInserida/:idEmpresa", function (req, res) {
    linhaController.ultimaLinhaInserida(req, res);
});

router.delete("/deletarLinha/:idLinha", function (req, res) {
    console.log('entrou')
    linhaController.deletarLinha(req, res);
});

router.post("/cadastrarLinha", function (req, res) {
    linhaController.cadastrarLinha(req, res);
})

router.put("/salvarLinha/:idLinha", function (req, res) {
    linhaController.salvarLinha(req, res);
});

// router.get("/listarLinhas/:idEmpresa", function (req, res) {
//     linhaController.buscarLinhas(req, res);
// })

module.exports = router;