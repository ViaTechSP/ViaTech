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

function resetarMetrica(req, res) {
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
    
    metricaModel.resetarMetrica(idLinha, minimoDisco, maximoDisco, minimoCpu, maximoCpu, minimoRam, maximoRam, qtdUsb)
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

function primeiraMetrica(req, res) {
    console.log('Deu certo controller primeiraMetrica');

    var idLinha = req.params.idLinha;
    var minimoDisco = req.body.minimoDisco;
    var maximoDisco = req.body.maximoDisco;
    var minimoCpu = req.body.minimoCpu;
    var maximoCpu = req.body.maximoCpu;
    var minimoRam = req.body.minimoRam;
    var maximoRam = req.body.maximoRam;
    var qtdUsb = req.body.qtdUsb;

    if (!idLinha) {
        res.status(400).send("O idLinha está undefined!");
    } else if (!minimoDisco) {
        res.status(400).send("O minimoDisco está undefined!");
    } else if (!maximoDisco) {
        res.status(400).send("O maximoDisco está undefined!");
    } else if (!minimoCpu) {
        res.status(400).send("O minimoCpu está undefined!");
    } else if (!maximoCpu) {
        res.status(400).send("O maximoCpu está undefined!");
    } else if (!minimoRam) {
        res.status(400).send("O minimoRam está undefined!");
    } else if (!maximoRam) {
        res.status(400).send("O maximoRam está undefined!");
    } else if (!qtdUsb) {
        res.status(400).send("O qtdUsb está undefined!");
    } else {
        metricaModel.primeiraMetrica(idLinha, minimoDisco, maximoDisco, minimoCpu, maximoCpu, minimoRam, maximoRam, qtdUsb)
            .then(function (resultado) {
                res.json(resultado);
                console.log("enviou p model");
            })
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao cadastrar as métricas! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    buscarInfoMetrica,
    alterarInfoMetrica,
    obterMetricasEstacao,
    resetarMetrica,
    primeiraMetrica
}