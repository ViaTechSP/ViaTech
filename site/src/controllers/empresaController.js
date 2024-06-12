var empresaModel = require("../models/empresaModel");

function cadastrarEmpresa(req, res) {
  var razaoSocial = req.body.razaoSocialServer;
  var nomeFantasia = req.body.nomeFantasiaServer;
  var cnpj = req.body.cnpjServer;

  if (razaoSocial == undefined) {
      res.status(400).send("razaoSocial está undefined!");
  } else if (nomeFantasia == undefined) {
      res.status(400).send("nomeFantasia está undefined!");
  } else if (cnpj == undefined) {
      res.status(400).send("cnpj está undefined!");
  } else {
      empresaModel.cadastrarEmpresa(razaoSocial, nomeFantasia, cnpj).then((resultado) => {
          if (resultado > 0) {
              res.status(200).json(resultado);
          } else {
              res.status(204).send("Nenhuma empresa cadastrada!");
          }
      }).catch((erro) => {
          console.error('Erro ao cadastrar empresa:', erro);
          res.status(500).json({ mensagem: 'Erro ao cadastrar empresa' });
      });
  }
}

function buscarId(req, res) {
  var cnpj = req.params.cnpj;

  if (cnpj == undefined) {
      res.status(400).send("cnpj está undefined!");
  } else {
      empresaModel.buscarId(cnpj).then((resultado) => {
          if (resultado.length > 0) {
              res.status(200).json(resultado);
          } else {
              res.status(204).send("Nenhum ID encontrado!");
          }
      }).catch((erro) => {
          console.error('Erro ao buscar ID da empresa:', erro);
          res.status(500).json({ mensagem: 'Erro ao buscar ID da empresa' });
      });
  }
}


module.exports = {
    cadastrarEmpresa,
    buscarId
}
