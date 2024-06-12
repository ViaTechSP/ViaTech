var dashboardModel = require("../models/dashboardModel");

function obterDadosGrafico(req, res) {
    var fkEstacao = req.params.fkEstacao;

    if (fkEstacao == undefined) {
        res.status(400).send("fkEstacao está undefined!");
    } else {
        dashboardModel.obterDadosGrafico(fkEstacao).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao obter dados do gráfico! Erro: ", erro.message);
            res.status(500).json(erro.message);
        });
    }
}

function obterDadosTempoReal(req, res) {
    var fkEstacao = req.params.fkEstacao;

    if (fkEstacao == undefined) {
        res.status(400).send("fkEstacao está undefined!");
    } else {
        dashboardModel.obterDadosTempoReal(fkEstacao).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao obter dados em tempo real! Erro: ", erro.message);
            res.status(500).json(erro.message);
        });
    }
}

function buscarMaquinas(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("idEmpresa está undefined!");
    } else {
        dashboardModel.buscarMaquinas(idEmpresa).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao buscar máquinas! Erro: ", erro.message);
            res.status(500).json(erro.message);
        });
    }
}

function obterInfoHeader(req, res) {
    var fkEstacao = req.params.fkEstacao;

    if (fkEstacao == undefined) {
        res.status(400).send("fkEstacao está undefined!");
    } else {
        dashboardModel.obterInfoHeader(fkEstacao).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao obter informações do header! Erro: ", erro.message);
            res.status(500).json(erro.message);
        });
    }
}

function obterInfoKPIAlertas(req, res) {
    var fkEstacao = req.params.fkEstacao;

    if (fkEstacao == undefined) {
        res.status(400).send("fkEstacao está undefined!");
    } else {
        dashboardModel.obterInfoKPIAlertas(fkEstacao).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao obter informações de KPI alertas! Erro: ", erro.message);
            res.status(500).json(erro.message);
        });
    }
}

function obterInfoKPIComponente(req, res) {
    var fkEstacao = req.params.fkEstacao;

    if (fkEstacao == undefined) {
        res.status(400).send("fkEstacao está undefined!");
    } else {
        dashboardModel.obterInfoKPIComponente(fkEstacao).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao obter informações de KPI componentes! Erro: ", erro.message);
            res.status(500).json(erro.message);
        });
    }
}

function obterHistoricoAlerta(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("idEmpresa está undefined!");
    } else {
        dashboardModel.obterHistoricoAlerta(idEmpresa).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao obter histórico de alerta! Erro: ", erro.message);
            res.status(500).json(erro.message);
        });
    }
}

function listarCategoria(req, res) {
    dashboardModel.listarCategoria().then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhuma categoria encontrada!");
        }
    }).catch((erro) => {
        console.log(erro);
        console.log("\nHouve um erro ao listar categorias! Erro: ", erro.message);
        res.status(500).json(erro.message);
    });
}

function addComentario(req, res) {
    var comentario = req.body.comentario;
    var idCategoria = req.body.idCategoria;
    var idEstacao = req.body.idEstacao;
    var idFun = req.body.idFun;

    if (comentario == undefined) {
        res.status(400).send("comentario está undefined!");
    } else if (idCategoria == undefined) {
        res.status(400).send("idCategoria está undefined!");
    } else if (idEstacao == undefined) {
        res.status(400).send("idEstacao está undefined!");
    } else if (idFun == undefined) {
        res.status(400).send("idFun está undefined!");
    } else {
        dashboardModel.addComentario(idFun, comentario, idCategoria, idEstacao).then((resultado) => {
            if (resultado.affectedRows > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum comentário adicionado!");
            }
        }).catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao adicionar comentário! Erro: ", erro.message);
            res.status(500).json(erro.message);
        });
    }
}

function exibirComentario(req, res) {
    var idEstacao = req.params.idEstacao;
    var idCategoria = req.params.idCategoria;

    if (idEstacao == undefined) {
        res.status(400).send("idEstacao está undefined!");
    } else if (idCategoria == undefined) {
        res.status(400).send("idCategoria está undefined!");
    } else {
        dashboardModel.exibirComentario(idEstacao, idCategoria).then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum comentário encontrado!");
            }
        }).catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao exibir comentário! Erro: ", erro.message);
            res.status(500).json(erro.message);
        });
    }
}


module.exports = {
    buscarMaquinas,
    obterInfoHeader,
    obterDadosGrafico,
    obterDadosTempoReal,
    obterInfoKPIAlertas,
    obterInfoKPIComponente,
    obterHistoricoAlerta,
    listarCategoria,
    addComentario,
    exibirComentario
}