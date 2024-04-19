var dashboardModel = require("../models/dashboardModel");

function obterDados(req, res) {

    console.log(`Recuperando os últimos dados`);

    dashboardModel.obterDados().then(function (resultado) {
        if (resultado.length > 0) {
            console.log('entrou no if')
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

module.exports = {
    obterDados
}