$(document).ready(function(){
    $('#input_cnpj').mask('00.000.000/0000-00');
    $('#input_cpf').mask('000.000.000-00');
});

function cadastrarEmpresa() {
    var nomeFantasia = input_nomeFantasia.value;
    var razaoSocial = input_razaoSocial.value;
    var cnpj = input_cnpj.value.replace(/[^\d]/g, '');

    if (nomeFantasia == '' || razaoSocial == '' || cnpj == '') {
      swal("erro", "Preencha todos os campos", "error");
    } else if (cnpj.length != 14) {
      swal("erro", "Preencha o campo CNPJ corretamente")
    } else {

    fetch("/empresa/cadastrarEmpresa", {
     method: "POST", headers: { "Content-Type": "application/json",},
     body: JSON.stringify({
     nomeFantasiaServer: nomeFantasia, 
     razaoSocialServer: razaoSocial,
     cnpjServer: cnpj
    }),
     }).then(function (resposta) {
      if(resposta.ok) {
        var div_cadastro = document.getElementById("div_email");
        var div_primerio_fun = document.getElementById("divPrimerioFun");
        div_cadastro.style.display = 'none';
        div_primerio_fun.style.display = 'block';
        div_primerio_fun.style.display = 'flex';
      } else {
        swal("Não foi possível realizar o cadastro!", "Verifique os dados e tente novamente!" )
      }
    })
  }
}

function buscarIdEmpresa() {
  var cnpj = input_cnpj.value.replace(/[^\d]/g, '');

  if (cnpj.length != 14 || cnpj == null || cnpj == '') {
    swal("erro", "CNPJ não encontrado", "error");
  } 
  else {

  fetch(`/empresa/buscarId/${cnpj}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          if (resposta.length > 0) {
            var idEmpresa = resposta[0].idEmpresa;
            cadastrarFun(idEmpresa);
          } else {
            console.error('Nenhum ID de empresa encontrado');
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
}

function cadastrarFun(idEmpresa) {
  var nome = input_nome.value;
  var cpf = input_cpf.value
  var email = input_email.value;
  var senha = input_senha.value;
  var fkEmpresa = idEmpresa;
  
  var validacaoNulo = nome != null && cpf != null && email != null && senha != null && fkEmpresa != null;
  var validacaoVazio = nome != '' && cpf != '' && email != '' && senha != '' && fkEmpresa != '';
  var validacaoSenha = (senha.length >= 6 && ((senha.indexOf("@") >= 0) || (senha.indexOf("!") >= 0) || (senha.indexOf("#") >= 0) || (senha.indexOf(".") >= 0) || (senha.indexOf("?") >= 0)))

  if (validacaoNulo && validacaoVazio) {
    if (validacaoSenha) {

      fetch("/usuarios/cadastrarFun", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeServer: nome,
          cpfServer: cpf,
          emailServer: email,
          senhaServer: senha,
          fkEmpresaServer: fkEmpresa
        }),
      }).then(function (resposta) {
        if (resposta.ok) {
        //   swal.fire({
        //     title: 'Redirecionando para o login',
        //     text: 'Aguarde...',
        //     icon: 'info',
        //     timer: 2500,
        //     showConfirmButton: false,
        // }).then(() => {
            window.location = "login.html";
        // });
        } else {
          resposta.text().then(function (texto) {
          });
        }
      }).catch(function (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao cadastrar: ' + error.message);
      });
      
    } else {
      swal('Erro', "Senha inválida!");
    }
} else {
  swal('Erro', "Preencha todos os campos corretamente");
}
}

function clicarMenu() {
    if(itens.style.display == 'block'){
      itens.style.display = 'none'
    } else{
      itens.style.display = 'block'
    }
}