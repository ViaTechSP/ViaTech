var dashboardModel = require("../models/dashboardModel");

function obterInfoHardware(req, res) {

    var fkComputador = req.body.fkComputadorServer;

    
    if (fkComputador == undefined) {
        res.status(400).send("Seu computador está undefined!");
    } else {

    console.log(`Recuperando os últimos dados`);

    dashboardModel.obterInfoHardware(fkComputador)
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas Dashboards.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
    }
}

module.exports = {
    obterInfoHardware
}