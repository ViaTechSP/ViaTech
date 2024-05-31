var metricaModel = require("../models/metricaModel");

function buscarInfoMetrica(req, res) {
    var idLinha = req.params.idLinha;

        metricaModel.buscarInfoMetrica(idLinha)
        .then((resultado) => {
          res.status(200).json(resultado);
        })
        .catch((erro) => {
          res.status(500).json({ mensagem: 'Erro ao buscar ID da empresa', erro });
        });
}

function alterarInfoMetrica(req, res) {
    // var idFuncionario = req.body.idFuncionario;
    
    var idLinha = req.params.idLinha;

    var minimoDisco = req.body.minimoDisco ;
    var maximoDisco = req.body.maximoDisco ;
    var minimoCpu = req.body.minimoCpu;
    var maximoCpu = req.body.maximoCpu;
    var minimoRam = req.body.minimoRam;
    var maximoRam = req.body.maximoRam;
    var qtdUsb = req.body.qtdUsb;
    // var minimoProblema = req.body.minimoProblema;
    // var minimoIdeal = req.body.minimoIdeal;
    // var maximoCuidado = req.body.maximoCuidado;
    // var maximoProblema = req.body.maximoProblema;
    
    metricaModel.alterarInfoMetrica(idLinha, minimoDisco, maximoDisco, minimoCpu, maximoCpu, minimoRam, maximoRam, qtdUsb)
    .then(function (resultado) {
        res.json(resultado);
        
    })
    .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function obterMetricasEstacao(req, res) {
    var fkEstacao = req.params.fkEstacao;

    metricaModel.obterMetricasEstacao(fkEstacao).then((resultado) => {
      res.status(200).json(resultado);
    })
}

module.exports = {
    buscarInfoMetrica,
    alterarInfoMetrica,
    obterMetricasEstacao
}