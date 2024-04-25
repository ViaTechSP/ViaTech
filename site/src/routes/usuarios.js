var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrarFun", function (req, res) {
    usuarioController.cadastrarFun(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});


// router.post("/pegarId", function (req, res) {
//     usuarioController.pegarId(req, res);
// });

router.put("/alterarSenha", function (req, res) {
    usuarioController.alterarSenha(req, res);
});

module.exports = router;