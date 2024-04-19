var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/obterDados", function (req, res) {
    console.log('entrou na rota')    
    dashboardController.obterDados(req, res);
})

module.exports = router;