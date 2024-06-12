var estacaoModel = require("../models/estacaoModel");

function exibirEstacao(req, res) {
    var idLinha = req.params.idLinha;

    if (idLinha == undefined) {
        res.status(400).send("idLinha está undefined!");
    } else {
        estacaoModel.exibirEstacao(idLinha).then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma estação encontrada!");
            }
        }).catch((erro) => {
            console.error('Erro ao exibir estação:', erro);
            res.status(500).json({ mensagem: 'Erro ao exibir estação' });
        });
    }
}

function deletarEstacao(req, res) {
    var idEstacao = req.params.idEstacao;

    if (idEstacao == undefined) {
        res.status(400).send("idEstacao está undefined!");
    } else {
        estacaoModel.deletarEstacao(idEstacao).then((resultado) => {
            if (resultado.affectedRows > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma estação deletada!");
            }
        }).catch((erro) => {
            console.error('Erro ao deletar estação:', erro);
            res.status(500).json({ mensagem: 'Erro ao deletar estação' });
        });
    }
}

function cadastrarEstacao(req, res) {
    var nome = req.body.nome;
    var idLinha = req.body.idLinha;

    if (nome == undefined) {
        res.status(400).send("nome está undefined!");
    } else if (idLinha == undefined) {
        res.status(400).send("idLinha está undefined!");
    } else {
        estacaoModel.cadastrarEstacao(nome, idLinha).then((resultado) => {
            if (resultado.affectedRows > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma estação cadastrada!");
            }
        }).catch((erro) => {
            console.error('Erro ao cadastrar estação:', erro);
            res.status(500).json({ mensagem: 'Erro ao cadastrar estação' });
        });
    }
}

function salvarEstacao(req, res) {
    var idEstacao = req.params.idEstacao;
    var nome = req.body.nome;

    if (idEstacao == undefined) {
        res.status(400).send("idEstacao está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("nome está undefined!");
    } else {
        estacaoModel.salvarEstacao(nome, idEstacao).then((resultado) => {
            if (resultado.affectedRows > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma estação salva!");
            }
        }).catch((erro) => {
            console.error('Erro ao salvar estação:', erro);
            res.status(500).json({ mensagem: 'Erro ao salvar estação' });
        });
    }
}


module.exports = {
    deletarEstacao,
    cadastrarEstacao,
    salvarEstacao,
    exibirEstacao
}