var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrarFun", function (req, res) {
    usuarioController.cadastrarFun(req, res);
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

router.get("/exibirFun/:idEmpresa", function (req, res) {
    usuarioController.exibirFun(req, res);
});

router.get("/buscarInfoAlerta/", function (req, res) {
    usuarioController.buscarInfoAlerta(req, res);
});

module.exports = router;