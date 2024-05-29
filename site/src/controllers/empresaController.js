var empresaModel = require("../models/empresaModel");

function cadastrarEmpresa(req, res){
    var razaoSocial = req.body.razaoSocialServer;
    var nomeFantasia = req.body.nomeFantasiaServer;
    var cnpj = req.body.cnpjServer;
    
    empresaModel.cadastrarEmpresa(razaoSocial, nomeFantasia, cnpj).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function buscarId(req, res) {
    var cnpj = req.params.cnpj;
  
    empresaModel.buscarId(cnpj)
      .then((resultado) => {
        console.log('entrou no then + resultado', resultado);
        res.status(200).json(resultado);
      })
      .catch((erro) => {
        console.error('Erro ao buscar ID da empresa:', erro);
        res.status(500).json({ mensagem: 'Erro ao buscar ID da empresa' });
      });
  }


  // LINHA E ESTAÇÃO

  function cadastrarLinha(req, res){
    var nome = req.body.nome;
    var numero = req.body.numero;
    var idEmpresa = req.body.idEmpresa;
    
    
    empresaModel.cadastrarLinha(nome, numero, idEmpresa).then((resultado) => {
        res.status(200).json(resultado);
    });
}


module.exports = {
    cadastrarEmpresa,
    buscarId,
    cadastrarLinha
}
