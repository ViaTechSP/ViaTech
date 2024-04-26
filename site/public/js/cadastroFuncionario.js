
     //$(document).ready(function(){
     //         $('#input_cpf').mask('000.000.000-00', {reverse: true});
     //         $('#input_telefone').mask('(00)00000-0000');
     // });
    // var nome = sessionStorage.NOME_EMPRESA;
    // console.log(nome);
    // var nome_usuario = document.getElementById("nome_atual");
    // var exibir_nome = document.getElementById('nome_atual');
    
    // nome_usuario.innerHTML = nome;


    function clicarMenu() {
      const menu = document.getElementById('menuLateral');
      menu.classList.toggle('escondido');
  
      if (menu.classList.contains('escondido')) {
          menuEscondido.style.display = 'block'
          containerMenuLateral.style.display = 'none';
      }
      else {
          menuEscondido.style.display = 'none'
          containerMenuLateral.style.display = 'block'
      }
      }
  
      function exibirFun() {
          document.getElementById('formularioExibir').style.display = 'block';
          document.getElementById('formularioAdd').style.display = 'none';
          document.getElementById('formularioExcluir').style.display = 'none';
          document.getElementById('formularioEditar').style.display = 'none';
  
  
          var lista_funcionario = [];

          var nome_funcionario = sessionStorage.NOME_EMPRESA;
          
  
  
  
      }
  
      function addFun() {
          document.getElementById('formularioAdd').style.display = 'block';
          document.getElementById('formularioExcluir').style.display = 'none';
          document.getElementById('formularioEditar').style.display = 'none';
          document.getElementById('formularioExibir').style.display = 'none';
      }
  
      function excluirFun() {
          document.getElementById('formularioAdd').style.display = 'none';
          document.getElementById('formularioExcluir').style.display = 'block';
          document.getElementById('formularioEditar').style.display = 'none';
          document.getElementById('formularioExibir').style.display = 'none';
      }
  
      function cadastrarFun(){
        var nome = input_nome.value;
        var cpf = input_cpf.value;
        var telefone = input_telefone.value;
        var email = input_email.value;
        var senha = input_senha.value;
        var cargo = input_cargo.value;
        var idEmpresa = sessionStorage.ID_EMPRESA;

        console.log(idEmpresa);

     
  
        var validado = ((nome.length >= 1 && nome != '') && (cpf.length == 11) && (telefone.length == 11) && ((senha.indexOf("!") >= 0) || (senha.indexOf("@") >= 0) || (senha.indexOf("#") >= 0) || (senha.indexOf("$") >= 0) || (senha.indexOf("&") >= 0) || (senha.indexOf(".") >= 0) || (senha.indexOf("?") >= 0)))
     
        var erradoNome = document.getElementById("errado_nome");
        var erradocpf = document.getElementById("errado_cpf");
        var erradoTelefone = document.getElementById("errado_telefone");
        var erradoEmail = document.getElementById("errado_email");
        var erradoSenha = document.getElementById("errado_senha");
        var erradoCargo = document.getElementById("errado_cargo");
    
        erradoNome.textContent = "";
        erradocpf.textContent = "";
        erradoTelefone.textContent = "";
        erradoEmail.textContent = "";
        erradoSenha.textContent = "";
        erradoCargo.textContent = "";
     
        if (nome.trim() === "") {
        erradoNome.textContent = "Insira o nome fantasia";
        erradoNome.style.display = "block";
        erradoNome.style.color = "#ff5353";
        erradoNome.style.fontWeight = "bold";
        return false;
        }
          if (cpf.trim() === "") {
        erradocpf.textContent = "Insira um cpf válido.";
        erradocpf.style.display = "block";
        erradocpf.style.color = "#ff5353";
        erradocpf.style.fontWeight = "bold";
        return false;
        }
      if (telefone.trim() === "" || telefone.replace(/\D/g, '').length !== 11) {
        erradoTelefone.textContent = "Insira um telefone válido.";
        erradoTelefone.style.display = "block";
        erradoTelefone.style.color = "#ff5353";
        erradoTelefone.style.fontWeight = "bold";
        return false;
        }
      if (email.trim() === "" || email.indexOf("@") == -1) {
        erradoEmail.textContent = "Insira um email válido.";
        erradoEmail.style.display = "block";
        erradoEmail.style.color = "#ff5353";
        erradoEmail.style.fontWeight = "bold";
        return false;
        }
          if (senha.length >= 6 && ((senha.indexOf("@") >= 0) || (senha.indexOf("!") >= 0) || (senha.indexOf("#") >= 0) || (senha.indexOf(".") >= 0) || (senha.indexOf("?") >= 0))) {
              console.log("Essa senha tem caractere especial e tem no minimo 6 letras!")
            } else{
            erradoSenha.textContent = "Mínimo 6 caracteres e um caractere especial.";
            erradoSenha.style.display = "block";
            erradoSenha.style.color = "#ff5353";
            erradoSenha.style.fontWeight = "bold";
            }
      if(validado){
         fetch("/usuarios/cadastrarFun", { /* Requisição */
         method: "POST", /* Enviando para routers */
         headers: {
         "Content-Type": "application/json",
         },
         body: JSON.stringify({
         /*cTransformando em JSON e enviando para o servidor */
         nomeServer: nome, 
         cpfServer: cpf,
         telefoneSerer: telefone,
         emailServer: email,
         senhaServer: senha,
         cargoServer: cargo,
         idEmpresaSever: idEmpresa
           }),
         })
        //  console.log(body.ID_EMPRESA)
        }
  }