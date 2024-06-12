var metricaModel = require("../models/metricaModel");

function buscarInfoMetrica(req, res) {
    var idLinha = req.params.idLinha;

    if (!idLinha) {
        res.status(400).send("O idLinha está undefined!");
    } else {
        metricaModel.buscarInfoMetrica(idLinha)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch((erro) => {
          res.status(500).json({ mensagem: 'Erro ao buscar ID da empresa', erro });
        });
    }
}

function alterarInfoMetrica(req, res) {
    var idLinha = req.params.idLinha;

    var minimoDisco = req.body.minimoDisco ;
    var maximoDisco = req.body.maximoDisco ;
    var minimoCpu = req.body.minimoCpu;
    var maximoCpu = req.body.maximoCpu;
    var minimoRam = req.body.minimoRam;
    var maximoRam = req.body.maximoRam;
    var qtdUsb = req.body.qtdUsb;
    
    metricaModel.alterarInfoMetrica(idLinha, minimoDisco, maximoDisco, minimoCpu, maximoCpu, minimoRam, maximoRam, qtdUsb)
    .then(function (resultado) {
        if (resultado.affectedRows > 0) {
            res.json(resultado);
        } else {
            res.status(204).send("Nenhuma alteração realizada!");
        }
    })
    .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar o post: ", erro.message);
            res.status(500).json(erro.message);
        }
    );
}

function resetarMetrica(req, res) {
    var idLinha = req.params.idLinha;

    var minimoDisco = req.body.minimoDisco ;
    var maximoDisco = req.body.maximoDisco ;
    var minimoCpu = req.body.minimoCpu;
    var maximoCpu = req.body.maximoCpu;
    var minimoRam = req.body.minimoRam;
    var maximoRam = req.body.maximoRam;
    var qtdUsb = req.body.qtdUsb;
    
    metricaModel.resetarMetrica(idLinha, minimoDisco, maximoDisco, minimoCpu, maximoCpu, minimoRam, maximoRam, qtdUsb)
    .then(function (resultado) {
        if (resultado.affectedRows > 0) {
            res.json(resultado);
        } else {
            res.status(204).send("Nenhuma alteração realizada!");
        }
    })
    .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar o post: ", erro.message);
            res.status(500).json(erro.message);
        });
}

function obterMetricasEstacao(req, res) {
    var fkEstacao = req.params.fkEstacao;

    metricaModel.obterMetricasEstacao(fkEstacao)
    .then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    })
    .catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar o post: ", erro.message);
        res.status(500).json(erro.message);
    });
}

function primeiraMetrica(req, res) {
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
                if (resultado.affectedRows > 0) {
                    res.json(resultado);
                } else {
                    res.status(204).send("Nenhuma alteração realizada!");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao cadastrar as métricas! Erro: ",
                    erro.message
                );
                res.status(500).json(erro.message);
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