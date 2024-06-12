var linhaModel = require("../models/linhaModel");

// function buscarLinhas(req, res) {
//     var idEmpresa = req.params.idEmpresa;

//     linhaModel.buscarLinhas(idEmpresa).then(function (resultado) {
//         if (resultado.length > 0) {
//             res.status(200).json(resultado);
//         } else {
//             res.status(204).send("Nenhum resultado encontrado!")
//         }
//     })
// }

function exibirLinha(req, res) {
    var idEmpresa = req.params.idEmpresa;
    console.log('Controller exibirLinha ', idEmpresa);

    if (idEmpresa == undefined) {
        res.status(400).send("idEmpresa está undefined!");
    } else {
        linhaModel.exibirLinha(idEmpresa).then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma linha encontrada!");
            }
        }).catch((erro) => {
            console.error('Erro ao exibir linha:', erro);
            console.error('Mensagem de erro:', erro.message);
            res.status(500).json({ mensagem: 'Erro ao exibir linha', erro: erro.message });
        });
    }
}

function ultimaLinhaInserida(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("idEmpresa está undefined!");
    } else {
        linhaModel.ultimaLinhaInserida(idEmpresa).then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma linha encontrada!");
            }
        }).catch((erro) => {
            console.error('Erro ao buscar a última linha inserida:', erro);
            console.error('Mensagem de erro:', erro.message);
            res.status(500).json({ mensagem: 'Erro ao buscar a última linha inserida', erro: erro.message });
        });
    }
}

function deletarLinha(req, res) {
    var idLinha = req.params.idLinha;

    if (idLinha == undefined) {
        res.status(400).send("idLinha está undefined!");
    } else {
        linhaModel.deletarLinha(idLinha).then((resultado) => {
            if (resultado > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma linha deletada!");
            }
        }).catch((erro) => {
            console.error('Erro ao deletar a linha:', erro);
            console.error('Mensagem de erro:', erro.message);
            res.status(500).json({ mensagem: 'Erro ao deletar a linha', erro: erro.message });
        });
    }
}

function cadastrarLinha(req, res) {
    var nome = req.body.nome;
    var numero = req.body.numero;
    var idEmpresa = req.body.idEmpresa;

    if (nome == undefined) {
        res.status(400).send("nome está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("numero está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("idEmpresa está undefined!");
    } else {
        linhaModel.cadastrarLinha(nome, numero, idEmpresa).then((resultado) => {
            if (resultado > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma linha cadastrada!");
            }
        }).catch((erro) => {
            console.error('Erro ao cadastrar linha:', erro);
            console.error('Mensagem de erro:', erro.message);
            res.status(500).json({ mensagem: 'Erro ao cadastrar linha', erro: erro.message });
        });
    }
}

function salvarLinha(req, res) {
    var idLinha = req.params.idLinha;
    var nome = req.body.nome;
    var numero = req.body.numero;

    if (idLinha == undefined) {
        res.status(400).send("idLinha está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("nome está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("numero está undefined!");
    } else {
        linhaModel.salvarLinha(numero, nome, idLinha).then((resultado) => {
            if (resultado > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma linha salva!");
            }
        }).catch((erro) => {
            console.error('Erro ao salvar linha:', erro);
            console.error('Mensagem de erro:', erro.message);
            res.status(500).json({ mensagem: 'Erro ao salvar linha', erro: erro.message });
        });
    }
}

module.exports = {
    // buscarLinhas,
    exibirLinha,
    deletarLinha,
    cadastrarLinha,
    salvarLinha,
    ultimaLinhaInserida
}