var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.post("/obterInfoHardware", function (req, res) {
    console.log('entrou na rota')    
    dashboardController.obterInfoHardware(req, res);
})

module.exports = router;