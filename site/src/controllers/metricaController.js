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

function primeiraMetrica(req, res){
    console.log('Estou por aqui controller')
    var idLinha = req.params.idLinha;

    var minimoDisco = req.body.minimoDisco ;
    var maximoDisco = req.body.maximoDisco ;
    var minimoCpu = req.body.minimoCpu;
    var maximoCpu = req.body.maximoCpu;
    var minimoRam = req.body.minimoRam;
    var maximoRam = req.body.maximoRam;
    var qtdUsb = req.body.qtdUsb;

    if(idLinha == undefined){
        res.status(400).send("Seu idLinha está undefined!");
    }else if (minimoDisco == undefined) {
        res.status(400).send("Seu minimoDisco está undefined!");
    } else if (maximoDisco == undefined) {
        res.status(400).send("Seu maximoDisco está undefined!");
    } else if (minimoCpu == undefined) {
        res.status(400).send("Seu minimoCpu está undefined!");
    } else if(maximoCpu == undefined) {
        res.status(400).send("Seu maximoCpu está undefined!");
    } else if(minimoRam == undefined){
        res.status(400).send("Seu minimoRam está undefined!");
    } else if(maximoRam == undefined){
        res.status(400).send("Seu maximoRam está undefined!");
    } else if(qtdUsb == undefined){
        res.status(400).send("Seu qtdUsb está undefined!");
    } else {
        metricaModel.cadastrarFun(minimoDisco, maximoDisco, minimoCpu, maximoCpu, minimoRam, maximoRam, qtdUsb, idLinha)
            .then(
                function (resultado) {
                    res.json(resultado);
                    console.log("enviou p model")
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao cadastrar as metricas! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    buscarInfoMetrica,
    alterarInfoMetrica,
    obterMetricasEstacao,
    resetarMetrica,
    primeiraMetrica
}