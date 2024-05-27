function acessar() {
    var email = input_email.value;
    var senha = input_senha.value;
        
    if (email != null && email != '' && senha != null && senha != '') {

        fetch(`/usuarios/autenticar/${email}/${senha}`, { cache: 'no-store' })
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (resposta) {
              if (resposta.length > 0) {
                console.log('resposta ====>', resposta);

                sessionStorage.ID_EMPRESA = resposta[0].fkEmpresa;
                sessionStorage.ID_FUNCIONARIO = resposta[0].id;
                sessionStorage.NOME_EMPRESA = resposta[0].nomeFantasia;
                sessionStorage.NOME_USUARIO = resposta[0].nome;
                sessionStorage.CPF_USUARIO = resposta[0].cpf;
                sessionStorage.EMAIL_USUARIO = resposta[0].email;
                sessionStorage.SENHA_USUARIO = resposta[0].senha;
                sessionStorage.CARGO_USUARIO = resposta[0].cargo;

                window.location = "perfil.html"
              } else {
                swal('Puts', 'nenhum usuário encontrado!', "error")
              }
            });
          } else {
            console.error('Nenhum dado encontrado ou erro na API');
          }
        })
        .catch(function (error) {
          console.error(`Erro na obtenção do usuário: ${error.message}`);
        });    
    } else {
        swal('Eii', 'preencha todos os dados corretamente!');
    }

}




   function login(){
       
       var exibir_frase = frase_validacao;
       var validar_email = input_email.value;
       var divEmail = div_email;

       if(validar_email.indexOf("@") >= 1 && validar_email.indexOf(".") >= 1){
       var divRedefinir = document.getElementById("div_redefinir");

       acessar();
       
   } else{
           exibir_frase.style.display = "block";
           exibir_frase.style.color = "#ff5353";
           exibir_frase.style.fontWeight = "bold";
       
       }
   }

   function Login(){
       window.location = "login.html"
   }
       function Cadastrar(){
           window.location ="cadastro.html"
   }