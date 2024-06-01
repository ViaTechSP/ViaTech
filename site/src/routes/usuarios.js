var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

// FUNCIONARIO

router.post("/cadastrarFun", function (req, res) {
    usuarioController.cadastrarFun(req, res);
});

router.get("/exibirFun/:idEmpresa", function (req, res) {
    usuarioController.exibirFun(req, res);
});

router.put("/salvarFun/:idFuncionario", function (req, res) {
    usuarioController.salvarFun(req, res);
});

router.delete("/deletarFun/:idFuncionario", function (req, res) {
    console.log('entrou')
    usuarioController.deletarFun(req, res);
});



router.get("/autenticar/:email/:senha", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/buscarId/:email", function (req, res) {
    usuarioController.buscarId(req, res);
});

router.put("/alterarSenha", function (req, res) {
    usuarioController.alterarSenha(req, res);
});

router.get("/buscarInfo/:idFuncionario", function (req, res) {
    usuarioController.buscarInfo(req, res);
});

router.put("/alterarInfo", function (req, res) {
    usuarioController.alterarInfo(req, res);
});


module.exports = router;