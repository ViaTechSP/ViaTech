var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.post("/cadastrarEmpresa", function (req, res) {
    empresaController.cadastrarEmpresa(req, res);
})

router.post("/cadastrarLinha", function (req, res) {
    empresaController.cadastrarLinha(req, res);
})

router.get("/buscarId/:cnpj", function (req, res) {
    console.log('entrou na rota');
    empresaController.buscarId(req, res);
})

module.exports = router;