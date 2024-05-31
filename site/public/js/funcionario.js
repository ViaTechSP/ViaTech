function exibirFun() {
        var idEmpresa = sessionStorage.ID_EMPRESA;

       document.getElementById('formularioExibir').style.display = 'block';
       document.getElementById('ver').style.color = '#e6e62c';
       document.getElementById('adicionarFuncionario').style.color = 'black';
       document.getElementById('formularioExibir').style.display = 'flex';
       document.getElementById('formularioExibir').style.flexDirection = 'row';
       document.getElementById('formularioAdd').style.display = 'none';

      //  document.getElementById('formularioExcluir').style.display = 'none';
      //  document.getElementById('formularioEditar').style.display = 'none';
      
       var primeiraColuna = document.getElementById('primeiraColuna');  
       primeiraColuna.innerHTML = "";
       
       var segundaColuna = document.getElementById('segundaColuna');  
       segundaColuna.innerHTML = "";
       
      //  var nome_funcionario = sessionStorage.NOME_EMPRESA;
       
       var lista_funcionario = [];
       var funcionario = [];

       fetch(`/usuarios/exibirFun/${idEmpresa}`, { 
          method: "GET", 
        })     
   
       .then(function (resposta) {
          if (!resposta.ok) { 
            throw new Error('Erro na requisição');
           }
          return resposta.json();
         })
  
        /*Criando uma função anonima, e na 'resposta' será armazenado os dados coletados antes*/ 
       .then((resposta) => { 
        lista_funcionario = resposta;
        funcionario = resposta;
        
        var tamanho_funcionario = lista_funcionario.length;
        // var tamanho_nome6 = funcionario.length;
   
       var auxiliar = 0;

       for (var i = 0; i < tamanho_funcionario; i++) {
   
        var id_fun = lista_funcionario[i].idFuncionario
        var nome_atual = lista_funcionario[i].nome;
        var cargo_atual = lista_funcionario[i].cargo;
        var email_atual = lista_funcionario[i].email;
        var cpf_atual = lista_funcionario[i].cpf;
        
        auxiliar++;
   
        if(auxiliar % 2 == 0){
          primeiraColuna.innerHTML += `<div id="exibindoFuncionarioPar" class="itemFun">${nome_atual} - ${cargo_atual}<br>${cpf_atual}<br>${email_atual}</div>`;
        
        }  else{
          segundaColuna.innerHTML += `<div id="exibindoFuncionarioImpar" class="itemFun">${nome_atual} - ${cargo_atual}<br>${cpf_atual}<br>${email_atual}</div>`;
        }
       }
     });
  
}
  
function addFun() {
        document.getElementById('formularioExibir').style.display = 'none';
       document.getElementById('ver').style.color = 'black';
        document.getElementById('adicionarFuncionario').style.color = '#e6e62c';
        document.getElementById('formularioAdd').style.display = '  block';
        document.getElementById('formularioAdd').style.display = 'flex';
          // document.getElementById('formularioExcluir').style.display = 'none';
          // document.getElementById('formularioEditar').style.display = 'none';
}
  
function excluirFun() {
          document.getElementById('formularioAdd').style.display = 'none';
          document.getElementById('formularioExcluir').style.display = 'block';
          document.getElementById('formularioEditar').style.display = 'none';
          document.getElementById('formularioExibir').style.display = 'none';
}
  
function cadastrarFun() {
        var nome = input_nome.value;
        var cpf = input_cpf.value.replace(/[^\d]/g, '');
        var imagem =input_imagem.value;
        var email = input_email.value;
        var senha = input_senha.value;
        var cargo = input_cargo.value;
        var fkEmpresa = sessionStorage.ID_EMPRESA;
        
        var validacaoNulo = nome != null && cpf != null && email != null && senha != null && fkEmpresa != null;
        var validacaoVazio = nome != '' && cpf != '' && email != '' && senha != '' && fkEmpresa != '';
        var validacaoSenha = (senha.length >= 6 && ((senha.indexOf("@") >= 0) || (senha.indexOf("!") >= 0) || (senha.indexOf("#") >= 0) || (senha.indexOf(".") >= 0) || (senha.indexOf("?") >= 0)))
        var validacaoImagem = imagem != null && imagem !== '';
      
        if(imagem == null || imagem == ''){
          imagem = "https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png";
        }

        if (validacaoNulo && validacaoVazio) {
          if (validacaoSenha) { 
            
            fetch("/usuarios/cadastrarFun", {
              method: "POST", 
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                imagemSever, imagem,
                nomeServer: nome,
                cpfServer: cpf,
                emailServer: email,
                senhaServer: senha,
                cargoServer: cargo,
                fkEmpresaServer: fkEmpresa
              }),
            }).then(function (resposta) {
              if (resposta.ok) {
                swal({
                  title: 'Sucesso',
                  text: 'Cadastro realizado',
                  icon: 'success',
                  timer: 2000,
                  showConfirmButton: false,
              })
              } else {
                resposta.text().then(function (texto) {
                });
              }
            }).catch(function (error) {
              console.error('Erro na requisição:', error);
              alert('Erro ao cadastrar: ' + error.message);
            });
            
          } else {
            swal('Erro', "Senha inválida!", 'error');
          }
      } else {
        swal('Erro!', "Preencha todos os campos corretamente", 'error');
      }
}
    