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

function exibirImagem() {
  var caminnho = document.getElementById('caminho');
  var inputImagem = input_imagem.value;

  if(inputImagem == null || inputImagem === ''){
    caminnho.src = 'https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png';
  }

  if (inputImagem) {
      caminnho.src = inputImagem;
      caminnho.style.display = 'block'; // Exibe a imagem
  }
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
        var validacaoSenha = (senha.length >= 6 && ((senha.indexOf("@") >= 0) || (senha.indexOf("!") >= 0) || (senha.indexOf("#") >= 0) || (senha.indexOf(".") >= 0) || (senha.indexOf("?") >= 0)));
      
        if(imagem == null || imagem == ''){
          imagem = "https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png";
        }

        console.log(imagem)
        exibirImagem();


        if (validacaoNulo && validacaoVazio) {
          if (validacaoSenha) { 
            if(imagem.length <= 800){
           
            fetch("/usuarios/cadastrarFun", {
              method: "POST", 
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                imagem: imagem,
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
            })
          } else{
            swal('Puts!', 'A url da imagem é grande demais.')
          }
          } else {
            swal('Erro', "Senha inválida!", 'error');
          } 
          
      } else {
        swal('Erro!', "Preencha todos os campos corretamente", 'error');
      }
}
    
function exibirDivAddFun(){
  document.getElementById('container-fun').style.display = 'block';
  document.getElementById('container-fun').style.display = 'flex';
  document.getElementById('containerExibir').style.display = 'none';
  document.getElementById('add').style.color = '#F27A5E';
  document.getElementById('ver').style.color = 'black';
}

function exibirFun(){
  document.getElementById('containerExibir').style.display = 'block';
  document.getElementById('containerExibir').style.display = 'flex';
  document.getElementById('container-fun').style.display = 'none';
  document.getElementById('add').style.color = 'black';
  document.getElementById('ver').style.color = '#F27A5E';

    var idEmpresa = sessionStorage.ID_EMPRESA;
    var container = document.getElementById('containerExibir');  
    var lista_funcionario = [];

    container.innerHTML ="";

     fetch(`/usuarios/exibirFun/${idEmpresa}`, { 
        method: "GET", 
      }).then(function (resposta) {

        if (!resposta.ok) { 
          swal({
            title: "Ops",
            text: "Parece que você ainda não possui funcionários cadastrados!",
            icon: "warning",
        }).then((confirmacao) => {
          // exibirDivAddFun();
            if (confirmacao) {
                exibirDivAddFun();
            }
        });
          throw new Error('Erro na requisição');
         }
        return resposta.json();
       })
       
       .then((resposta) => { 
       lista_funcionario = resposta;

       if (lista_funcionario.length === 0) {
        swal({
            title: "Ops",
            text: "Parece que você ainda não possui funcionários cadastrados!",
            icon: "warning",
        }).then((confirmacao) => {
            if (confirmacao) {
                exibirDivAddFun();
            }
        });
    }
          
     var tamanhoFun = lista_funcionario.length;
     var auxiliar = 0;

     for (var i = 0; i < tamanhoFun; i++) {
       var id_fun = lista_funcionario[i].idFuncionario;
       var foto_atual = lista_funcionario[i].urlFoto;
       var nome_atual = lista_funcionario[i].nome;
       var cpf_atual = lista_funcionario[i].cpf;
       var email_atual = lista_funcionario[i].email;
       var cargo_atual = lista_funcionario[i].cargo;
      
       auxiliar++;

       container.innerHTML += `
        <div class="funcionario">
             <div class="container-imagem">
              <img id="caminhoFun${id_fun}" src="${foto_atual}" class="profile-pic">
              <label><input type="text" placeholder="Insira a url da imagem" style="display: none;" class="ipt_fun_img" id="input_img_${id_fun}" disabled></label>
             </div>

            <div class="dados">
              <label>Nome: <input type="text" class="ipt_fun" id="input_nome_${id_fun}" value="${nome_atual}" disabled></label>
              <label>CPF: <input type="text" class="ipt_fun" id="input_cpf_${id_fun}" value="${cpf_atual}" disabled></label>
              <label>E-mail: <input type="text" class="ipt_fun" id="input_email_${id_fun}" value="${email_atual}" disabled></label>
              <label>Cargo: <input type="text" class="ipt_fun" id="input_cargo_${id_fun}" value="${cargo_atual}" disabled></label>
            </div>

            <div class="opcoes">
              <span class="material-symbols-outlined selecionar" onclick="salvarFun(${id_fun})" id="botao_salvar_${id_fun}" style="color: green; display: none;">check</span>
              <span class="material-symbols-outlined selecionar" onclick="editarFun(${id_fun})">edit</span>
              <span class="material-symbols-outlined selecionar" onclick="deletarFun(${id_fun})">delete</span>
              <span class="material-symbols-outlined selecionar" onclick="exibirFun(${id_fun})" id="cancelar_${id_fun}" style="color: red; display: none;">cancel</span>
            </div>
        </div>`;       
     }
   });
}

function editarFun(idFuncionario){
  console.log('numero do id -> ', idFuncionario)

  var mudarClasseImg = document.getElementById(`input_img_${idFuncionario}`);
  var mudarClasseNome = document.getElementById(`input_nome_${idFuncionario}`);
  var mudarClasseCpf = document.getElementById(`input_cpf_${idFuncionario}`);
  var mudarClasseEmail = document.getElementById(`input_email_${idFuncionario}`);
  var mudarClasseCargo = document.getElementById(`input_cargo_${idFuncionario}`);

   mudarClasseImg.style.display = 'block';
   
   mudarClasseImg.classList.remove('ipt_fun'); 
   mudarClasseNome.classList.remove('ipt_fun'); 
   mudarClasseCpf.classList.remove('ipt_fun'); 
   mudarClasseEmail.classList.remove('ipt_fun'); 
   mudarClasseCargo.classList.remove('ipt_fun'); 

   mudarClasseImg.classList.add('ipt_fun_editar');
   mudarClasseNome.classList.add('ipt_fun_editar');
   mudarClasseCpf.classList.add('ipt_fun_editar');
   mudarClasseEmail.classList.add('ipt_fun_editar');
   mudarClasseCargo.classList.add('ipt_fun_editar');

   mudarClasseImg.disabled = false; 
   mudarClasseNome.disabled = false; 
   mudarClasseCpf.disabled = false; 
   mudarClasseEmail.disabled = false; 
   mudarClasseCargo.disabled = false; 
   
   document.getElementById(`cancelar_${idFuncionario}`).style.display = 'block';
   document.getElementById(`botao_salvar_${idFuncionario}`).style.display = 'block';
}

function salvarFun(idFuncionario){

  var img = document.getElementById(`input_img_${idFuncionario}`).value;
  var nome = document.getElementById(`input_nome_${idFuncionario}`).value;
  var cpf = document.getElementById(`input_cpf_${idFuncionario}`).value;
  var email = document.getElementById(`input_email_${idFuncionario}`).value;
  var cargo = document.getElementById(`input_cargo_${idFuncionario}`).value;
  console.log('id do funcionário ==>', idFuncionario);

  // alert(idFuncionario, nome)


  // if(img == null){
  //   img = 'https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png';
  // }


  if(nome !== '' && email !== '' && cargo !== '' && cpf !== ''){
    fetch(`/usuarios/salvarFun/${idFuncionario}`,{
       method: "PUT", headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         img : img,
         nome: nome,
         cpf: cpf,
         email: email,
         cargo: cargo
      })
    }).then(function (resposta) {
        if (resposta.ok) {

          swal('Sucesso!', "Informações alteradas!", 'success');

           exibirFun();          
          
           var mudarClasseImg = document.getElementById(`input_img_${idFuncionario}`);
           var mudarClasseNome = document.getElementById(`input_nome_${idFuncionario}`);
           var mudarClasseCpf = document.getElementById(`input_cpf_${idFuncionario}`);
           var mudarClasseEmail = document.getElementById(`input_email_${idFuncionario}`);
           var mudarClasseEmail = document.getElementById(`input_cargo_${idFuncionario}`);

           mudarClasseImg.classList.remove('input-container-editar'); 
           mudarClasseNome.classList.remove('input-container-editar'); 
           mudarClasseCpf.classList.remove('input-container-editar'); 
           mudarClasseEmail.classList.remove('input-container-editar'); 
           mudarClasseCargo.classList.remove('input-container-editar'); 

           mudarClasseImg.classList.add('ipt_fun');
           mudarClasseNome.classList.add('ipt_fun');
           mudarClasseCpf.classList.add('ipt_fun');
           mudarClasseEmail.classList.add('ipt_fun');
           mudarClasseCargo.classList.add('ipt_fun');

           mudarClasseImg.disabled = true; 
           mudarClasseNome.disabled = true; 
           mudarClasseCpf.disabled = true; 
           mudarClasseEmail.disabled = true; 
           mudarClasseCargo.disabled = true; 
           
           document.getElementById(`cancelar_${idFuncionario}`).style.display = 'none';
           document.getElementById(`botao_salvar_${idFuncionario}`).style.display = 'none';
        } else {
         swal('Erro!', 'Não foi possível alterar os dados do funcionário', 'error')
        }
      }).catch(function (resposta) {
       console.log(`#ERRO: ${resposta}`);
      });
  } else{
   swal("Ei!", "Preencha todos os campos!");
  }
}

function deletarFun(idFuncionario) {
  swal({
    title: "Cuidado!",
    text: "Você excluirá o funcionário do sistema. Você tem certeza que deseja continuar?",
    icon: "warning",
    buttons: {
       cancel: "Cancelar",
       confirm: "SIM!"
    }
}).then((confirmacao) => {
    if (confirmacao) {

        console.log('id fun=>', idFuncionario);
        fetch(`/usuarios/deletarfun/${idFuncionario}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
          },
        }).then(function (resposta) {
          if (resposta.ok) {
            swal({
              title: "Sucesso!",
              text: "O funcionário foi excluído!",
              icon: "success",
          }).then((confirmacao) => {
            if(confirmacao){
              exibirFun();
            }
          })
      
          } else {
            resposta.text().then(function (texto) {
            });
          }
        }).catch(function (error) {
        });
    }
});
}

$(document).ready(function() {
  $('#input_cpf').mask('000.000.000-00', { reverse: false });
});

// Validando toda vez que ele muda o valor da input de img do funcionario
document.addEventListener('DOMContentLoaded', function() {
  var inputImagem = document.getElementById('input_imagem');
  inputImagem.addEventListener('input', exibirImagem);
});