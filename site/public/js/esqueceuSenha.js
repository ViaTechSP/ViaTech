function avancar(){        
    var email = input_login.value;
    var divEmail = div_email;
    
    if(email != null || email != ''){
    var divRedefinir = document.getElementById("div_redefinir");

    fetch(`/usuarios/buscarId/${email}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          if (resposta.length > 0) {
            sessionStorage.ID_FUNCIONARIO = resposta[0].idFuncionario;
            console.log(resposta[0].idFuncionario);

            divEmail.style.display = "none";
            divRedefinir.style.display = "block";
            divRedefinir.style.display = "flex";
          } else {
            swal('erro', 'Nenhum usuário encontrado com esse e-mail');
          }
        });
      } else {
        swal('erro', 'Nenhum usuário encontrado com esse e-mail');
      }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção do idEmpresa: ${error.message}`);
    });
    } else {
        swal('erro', 'Insira um e-mail válido!', "error");
    }
}

function confirmar(){
    var novaSenha = input_nova_senha.value;
    var confirmar_senha = input_senha.value;
    var idFuncionario = sessionStorage.ID_FUNCIONARIO;

    if(novaSenha != null && novaSenha != '' && novaSenha == confirmar_senha) {
    
    fetch(`/usuarios/alterarSenha/`,{
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            novaSenha: novaSenha,
            idFuncionario: idFuncionario
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            window.location = 'login.html';
        } else {
            swal('Erro!', "Não foi possível trocar a senha!");
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
    }
}

function clicarMenu() {
    if(itens.style.display == 'block'){
        itens.style.display = 'none'
    } else{
        itens.style.display = 'block'
    }
}

function voltar(){
    var divEmail = document.getElementById("div_email");
    divEmail.style.display = "block";
    
    var divRedefinir = document.getElementById("div_redefinir");
    divRedefinir.style.display = "none";
}