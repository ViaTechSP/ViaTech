const { columns } = require("mssql");

function atualizarInfo() {
    document.getElementById('ipt_empresa').value = sessionStorage.NOME_EMPRESA;
    var idFuncionario = sessionStorage.ID_FUNCIONARIO;



    var exibirPerfil = document.getElementById("profileImage");
    var urlDaImagem = document.getElementById("ipt_alterImage");
    // var urlDaImagem = ipt_alterImage.value;

    // console.log('imageeem', urlDaImagem)




    if(exibirPerfil && urlDaImagem){
        exibirPerfil.src = "https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png";
    }

    var testeDeImagem;

    console.log('id =>', idFuncionario)

    fetch(`/usuarios/buscarInfo/${idFuncionario}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          if (resposta.length > 0) {
            document.getElementById('profileImage').src = resposta[0].urlFoto;
            document.getElementById('ipt_nome').value = resposta[0].nome;
            document.getElementById('ipt_cpf').value = resposta[0].cpf;
            document.getElementById('ipt_cargo').value = resposta[0].cargo;
            document.getElementById('ipt_email').value = resposta[0].email;
            document.getElementById('ipt_senha').value = resposta[0].senha;

            if(resposta[0].urlFoto == null){
            exibirPerfil.src = "https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png";

            }

          } else {
            console.error('Nenhuma informação encontrada');
          }
        });
      } else {
        console.error('Nenhum dado encontrado ou erro na API');
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção do idEmpresa: ${error.message}`);
    });

    



}

function alterar() {
    const inputs = document.querySelectorAll('input');
    const botaoAlterar = document.getElementById('botao_alterar');
    const botaoSalvar = document.getElementById('botao_salvar');

    inputs.forEach(input => {
        if(input.id != 'ipt_empresa') input.toggleAttribute('disabled');
    })

    botaoAlterar.style.display = 'none';
    botaoSalvar.style.display = 'flex';
}

function salvar() {
    var imagem = ipt_alterImage.value; //é uma input com nome de botão
    var nome = ipt_nome.value;
    var cpf = ipt_cpf.value;
    var cargo = ipt_cargo.value;
    var email = ipt_email.value;
    var senha = ipt_senha.value;
    var idFuncionario = sessionStorage.ID_FUNCIONARIO;

    if(imagem != '' && nome != '' && cpf != '' && cargo != '' && email != '' && senha != '' && idFuncionario != '') {
    
    fetch(`/usuarios/alterarInfo/`,{
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            idFuncionario: idFuncionario,
            imagem: imagem,
            nome: nome,
            cpf: cpf,
            email: email,
            senha: senha,
            cargo: cargo 
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            atualizarInfo();
            const inputs = document.querySelectorAll('input');
            const botaoAlterar = document.getElementById('botao_alterar');
            const botaoSalvar = document.getElementById('botao_salvar');
            
            inputs.forEach(input => {
                if(input.id != 'ipt_empresa') input.toggleAttribute('disabled');
            })
            
            botaoAlterar.style.display = 'flex';
            botaoSalvar.style.display = 'none';
            swal('Sucesso!', "Informações alteradas!");

        } else if(imagem.length > 800){
          swal('Não deu!', "O link da imagem é muito grande!", "error");
        }
          else {
            swal('Erro', "Não foi possível trocar a senha!");
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
    }
}