var dashGeralModel = require("../models/dashGeralModel");

function buscarEstacoes(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var idLinha = req.params.idLinha;

    if (idEmpresa == undefined) {
        res.status(400).send("idEmpresa está undefined!");
    } else if (idLinha == undefined) {
        res.status(400).send("idLinha está undefined!");
    } else {
        dashGeralModel.buscarEstacoes(idEmpresa, idLinha).then((resultado) => {
            if (!resultado || resultado.length === 0) {
                res.status(404).send("Nenhuma estação encontrada");
            } else {
                res.status(200).json(resultado);
            }
        }).catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao buscar as estações! Erro: ", erro.message);
            res.status(500).json(erro.message);
        });
    }
}

function calcularTotalMaquinas(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("idEmpresa está undefined!");
    } else {
        dashGeralModel.calcularTotalMaquinas(idEmpresa).then((resultado) => {
            if (!resultado || resultado.length === 0) {
                res.status(404).send("Nenhuma máquina encontrada");
            } else {
                res.status(200).json(resultado);
            }
        }).catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao calcular o total de máquinas! Erro: ", erro.message);
            res.status(500).json(erro.message);
        });
    }
}

function pesquisarEstacao(req, res) {
    var pesquisa = req.params.pesquisarVar;
    var idEmpresa = req.params.idEmpresa;

    if (pesquisa == undefined) {
        res.status(400).send("pesquisarVar está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("idEmpresa está undefined!");
    } else {
        dashGeralModel.pesquisarEstacao(pesquisa, idEmpresa).then((resultado) => {
            if (!resultado || resultado.length === 0) {
                res.status(404).send("Nenhuma estação encontrada");
            } else {
                res.status(200).json(resultado);
            }
        }).catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao pesquisar a estação! Erro: ", erro.message);
            res.status(500).json(erro.message);
        });
    }
}

function filtrarPorAlerta(req, res) {
    var alerta = req.params.alerta;
    var idLinha = req.params.idLinha;
    var idEmpresa = req.params.idEmpresa;

    if (alerta == undefined) {
        res.status(400).send("alerta está undefined!");
    } else if (idLinha == undefined) {
        res.status(400).send("idLinha está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("idEmpresa está undefined!");
    } else {
        dashGeralModel.filtrarPorAlerta(alerta, idLinha, idEmpresa).then((resultado) => {
            if (!resultado || resultado.length === 0) {
                res.status(404).send("Nenhum alerta encontrado");
            } else {
                res.status(200).json(resultado);
            }
        }).catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao filtrar por alerta! Erro: ", erro.message);
            res.status(500).json(erro.message);
        });
    }
}

function atualizarQtdProblemas(req, res) {
    var idLinha = req.params.idLinha;
    var idEmpresa = req.params.idEmpresa;

    if (idLinha == undefined) {
        res.status(400).send("idLinha está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("idEmpresa está undefined!");
    } else {
        dashGeralModel.atualizarQtdProblemas(idLinha, idEmpresa).then((resultado) => {
            if (!resultado || resultado.length === 0) {
                res.status(404).send("Nenhuma atualização de problemas encontrada");
            } else {
                res.status(200).json(resultado);
            }
        }).catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao atualizar a quantidade de problemas! Erro: ", erro.message);
            res.status(500).json(erro.message);
        });
    }
}

function atualizarEstacaoAlerta(req, res) {
    var idLinha = req.params.idLinha;
    var idEmpresa = req.params.idEmpresa;

    if (idLinha == undefined) {
        res.status(400).send("idLinha está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("idEmpresa está undefined!");
    } else {
        dashGeralModel.atualizarEstacaoAlerta(idLinha, idEmpresa).then((resultado) => {
            if (!resultado || resultado.length === 0) {
                res.status(404).send("Nenhuma atualização de alerta encontrada");
            } else {
                res.status(200).json(resultado);
            }
        }).catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao atualizar o alerta da estação! Erro: ", erro.message);
            res.status(500).json(erro.message);
        });
    }
}

function atualizarQtdAlertasAtual(req, res) {
    var idLinha = req.params.idLinha;
    var idEmpresa = req.params.idEmpresa;

    if (idLinha == undefined) {
        res.status(400).send("idLinha está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("idEmpresa está undefined!");
    } else {
        dashGeralModel.atualizarQtdAlertasAtual(idLinha, idEmpresa).then((resultado) => {
            if (!resultado || resultado.length === 0) {
                res.status(404).send("Nenhuma atualização de alerta encontrada");
            } else {
                res.status(200).json(resultado);
            }
        }).catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao atualizar a quantidade de alertas atuais! Erro: ", erro.message);
            res.status(500).json(erro.message);
        });
    }
}

function verificarAlerta(req, res) {
    var idMaquina = req.params.idMaquina;

    if (idMaquina == undefined) {
        res.status(400).send("idMaquina está undefined!");
    } else {
        dashGeralModel.verificarAlerta(idMaquina).then((resultado) => {
            if (!resultado || resultado.length === 0) {
                res.status(404).send("Nenhum alerta encontrado");
            } else {
                res.status(200).json(resultado);
            }
        }).catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao verificar o alerta! Erro: ", erro.message);
            res.status(500).json(erro.message);
        });
    }
}

module.exports = {
    buscarEstacoes,
    calcularTotalMaquinas,
    pesquisarEstacao,
    filtrarPorAlerta,
    atualizarQtdProblemas,
    atualizarEstacaoAlerta,
    atualizarQtdAlertasAtual,
    verificarAlerta
}